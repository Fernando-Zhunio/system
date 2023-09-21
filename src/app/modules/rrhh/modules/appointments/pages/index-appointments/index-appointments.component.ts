import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
import { CTemplateSearch } from '../../../../../../class/ctemplate-search';
import { HeaderSearchComponent } from '../../../../../../components/header-search/header-search.component';
import { Iappointment, Iuser } from '../../../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { SharedService } from '../../../../../../services/shared/shared.service';
import { SwalService } from '../../../../../../services/swal.service';
import { ModalSendCvComponent } from '../../../../appointments/tools/modal-send-cv/modal-send-cv.component';
import { ModalZoomComponent } from '../../../../appointments/tools/modal-zoom/modal-zoom.component';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index-appointments.component.html',
  styleUrls: ['./index-appointments.component.css'],
  animations: animation_conditional

})
export class IndexAppointmentsComponent
  extends CTemplateSearch<Iappointment>
{
  constructor(
    private s_shared: SharedService,
    private dialog: MatDialog,
    private router: Router,
    private methodsHttpService: MethodsHttpService,
  ) {
    super();
  }
  url: string = 'rrhh/appointments';
  isOpenCv: boolean = false;
  cv: string = '';
  status: 'normal' | 'send_email' = 'normal';
  statusAppointment: string = 'available';
  userSelectedToEmailCv: Iuser[] = [];
  @ViewChild(HeaderSearchComponent)   headerComponent: HeaderSearchComponent;

  deleteAppointment(id: number) {
    const appointment = this.products.find((x) => x.id === id);
    if (appointment) {
      SwalService.swalConfirmation(
        'Eliminacion de Cita',
        '¿Está seguro de eliminar esta Cita?',
        'question',
        'Si, eliminar',
        'No, cancelar'
      ).then((result) => {
        if (result.isConfirmed) {
          appointment['isLoading'] = true;
          this.methodsHttpService
            .methodDelete(
              `rrhh/requests/${appointment.request.id}/appointments/${appointment.id}`
            )
            .subscribe(
              (res) => {
                appointment['isLoading'] = false;
                if (res && res.hasOwnProperty('success') && res.success) {
                  const index = this.products.findIndex((i) => i.id === id);
                  this.products.splice(index, 1);
                }
              },
              () => {
                appointment['isLoading'] = false;
              }
            );
        }
      });

    }
  }

  modalZoom(id: number) {
    const zoom = this.products.find((x) => x.id === id)?.zoom_meet;
    if (zoom) {
      this.dialog.open(ModalZoomComponent, {
        data: zoom,
      });
    }
  }

  goRequest(id): void {
    this.router.navigate(['/recursos-humanos/request/'], {
      queryParams: { search: id },
    });
  }

  goWork(id): void {
    this.router.navigate(['/recursos-humanos/works/'], {
      queryParams: { search: id },
    });
  }

  openCv(id: number) {
    this.isOpenCv = true;
    const cv = this.products.find(
      (x) => x.id === id
    )?.request.user.resume.attachment.real_permalink;
      if (cv) {
        this.cv = cv;
      }
  }

  gotEditAppointment(id: number) {
    const appointment = this.products.find((x) => x.id === id);
    if (appointment) {
      this.s_shared.requestWork = appointment.request || null;
      this.s_shared.appointmentWork = appointment;
      this.router.navigate([
        `/recursos-humanos/appointments/request/${appointment.request.id}/edit/${id}`,
      ]);
    }
  }

  doFinalist(id: number): void {
    const appointment = this.products.find((x) => x.id === id);
    if (appointment) {
      const url = `rrhh/requests/${appointment.request_id}/statuses`;
      this.methodsHttpService
      .methodPost(url, { status: 'request_finalist' })
      .subscribe(
        (res1: any) => {
          appointment['isLoading'] = false;
          if (res1 && res1.hasOwnProperty('success') && res1.success) {
            appointment.request.current_status.type_action =
              'request_finalist';
          }
        },
        () => {
          appointment['isLoading'] = false;
        }
      );
    }
  }

  doHired(id: number) {
    const appointment = this.products.find((x) => x.id === id);
    if (appointment) {
      if (appointment.request.current_status.type_action === 'request_hired') {
        SwalService.swalConfirmation(
          'Precaución',
          'Este usuario ya esta contratado .\n Deseas cambiar el estado a finalista?',
          'warning',
          'Si, deseo cambiar a finalista'
        ).then((res) => {
          if (res.isConfirmed) {
            appointment['isLoading'] = true;
            const url = `rrhh/requests/${appointment.request_id}/statuses`;
            this.methodsHttpService
              .methodPost(url, { status: 'request_finalist' })
              .subscribe(
                (res1: any) => {
                  appointment['isLoading'] = false;
                  if (res1 && res1.hasOwnProperty('success') && res1.success) {
                    appointment.request.current_status.type_action =
                      'request_finalist';
                  }
                },
                () => {
                  appointment['isLoading'] = false;
                }
              );
          }
        });
        return;
      }
      SwalService.swalConfirmation(
        'Precaución',
        '¿Está seguro de contratar a este trabajador?',
        'question',
        'Si, contratar',
        'No, cancelar'
      ).then((result) => {
        if (result.isConfirmed) {
          const url = `rrhh/requests/${appointment.request_id}/statuses`;
          this.methodsHttpService
            .methodPost(url, { status: 'request_hired' })
            .subscribe((res) => {
              if (res.hasOwnProperty('success') && res.success) {
                appointment.request.current_status.type_action = 'request_hired';
              }
            });
        }
      });
    }
  }

  changedStatus(): void {

    this.dialog.open(ModalSendCvComponent, {
      disableClose: true,
    });
  }

  applyFilter() {
    this.headerComponent.filter_data = {status: this.statusAppointment};
    this.headerComponent.searchBar();
  }

}
