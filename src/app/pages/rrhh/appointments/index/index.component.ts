import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CTemplateSearch } from '../../../../class/ctemplate-search';
import { Iappointment } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';
import { ModalZoomComponent } from '../tools/modal-zoom/modal-zoom.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends CTemplateSearch<Iappointment> implements OnInit {

  constructor( private s_shared: SharedService, private dialog: MatDialog, private router: Router, private s_serviceStandart: StandartSearchService) {
    super();
  }
  url: string = 'rrhh/appointments';
  isOpenCv: boolean = false;
  cv: string = '';
  ngOnInit(): void {
  }

  deleteAppointment(id: number) {
    console.log('deleteAppointment', id);
    const appointment = this.products.find((x) => x.id === id);
    console.log(appointment);
    SwalService.swalConfirmation(
      'Eliminacion de Cita',
      '¿Está seguro de eliminar esta Cita?',
      'question',
      'Si, eliminar',
      'No, cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        appointment['isload'] = true;
        this.s_serviceStandart
          .destory(`rrhh/requests/${appointment.request.id}/appointments/${appointment.id}`)
          .subscribe((res) => {
            appointment['isload'] = false;
            console.log(res);
            if (res && res.hasOwnProperty('success') && res.success) {
              const index = this.products.findIndex(
                (i) => i.id === id
              );
              this.products.splice(index, 1);
            }
          }, (err) => {appointment['isload'] = false; });
      }
    });
  }

  modalZoom(id: number) {
    const zoom = this.products.find((x) => x.id === id).zoom_meet;
    this.dialog.open(ModalZoomComponent, {
      data: zoom,
    });
  }

  goRequest(id): void {
    this.router.navigate(['/recursos-humanos/request/'], {queryParams: {search: id}});
  }

  goWork(id): void {
    this.router.navigate(['/recursos-humanos/works/'], {queryParams: {search: id}});
  }

  openCv(id: number) {
    this.isOpenCv = true;
    this.cv = this.products.find((x) => x.id === id).request.user.resume.attachment.real_permalink;
  }

  gotEditAppointment(id: number) {
    const appointment = this.products.find((x) => x.id === id);
    this.s_shared.requestWork = appointment.request;
    this.s_shared.appointmentWork = appointment;
    this.router.navigate([`/recursos-humanos/appointments/request/${appointment.request.id}/edit/${id}`]);
  }
  }


