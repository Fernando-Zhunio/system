import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Iappointment,
  Iuser,
} from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SharedService } from '../../../../services/shared/shared.service';
import { Irequest } from './../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { Iperson } from '../../../../interfaces/iperson';
import { Ilocation } from '../../../../interfaces/ilocation';
import { SwalService } from './../../../../services/swal.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-or-edit-appointment',
  templateUrl: './create-or-edit-appointment.component.html',
  styleUrls: ['./create-or-edit-appointment.component.css'],
})
export class CreateOrEditAppointmentComponent implements OnInit {
  constructor(
    private actived_router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private s_standart: StandartSearchService,
    private router: Router,
    private s_shared: SharedService
  ) {}

  isLoad = false;
  title: string = 'Creando Cita';
  state: 'create' | 'edit' = 'create';
  appointmet: Iappointment;
  requestWork: Irequest;
  persons: Iperson[] = [];
  locations: Ilocation[] = [];
  TYPES_APPOINTMENTS = [
    { value: 'video_conference', label: 'Video Conference' },
    { value: 'face_to_face', label: 'Presencial' },
  ];

  formAppointment: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    comment: new FormControl(null),
    request_id: new FormControl(null, [Validators.required]),
    novi_sys_person_id: new FormControl(null),
    novi_sys_location_id: new FormControl(null),
  });

  ngOnInit(): void {
    this.requestWork = this.s_shared.requestWork;
    if (!this.requestWork) {
      this.router.navigate(['recursos-humanos/requests']);
      return;
    } else {
      this.formAppointment.get('request_id').setValue(this.requestWork.id);
    }

    // this.formAppointment.get('novi_sys_location_id').disable();
    // this.formAppointment.get('novi_sys_person_id').disable();
    this.spinner.show();
    this.actived_router.data.subscribe((res) => {
      this.state = res.isEdit ? 'edit' : 'create';
      if (res.isEdit) {
        this.title = 'Editando Cita';
        this.appointmet = this.s_shared.appointmentWork;
        const {
          comment,
          type,
          date,
          novi_sys_location_id,
          novi_sys_person_id,
        } = this.appointmet;
        // asignando datos al formulario;
        this.formAppointment.setValue({
          comment,
          type,
          date: new Date(date).toISOString().substring(0, 16),
          novi_sys_location_id,
          novi_sys_person_id,
          request_id: this.requestWork.id,
        });

        // comprobando si el tipo es video conferencia y activar o desactivar los inputs
        this.changeSelectionType();
        // input type desabilitado
        this.formAppointment.get('type').disable();

        const url = `rrhh/appointments/edit`;
        this.s_standart.show(url).subscribe(
          (res1) => {
            this.spinner.hide();
            if (res1 && res1.hasOwnProperty('success') && res1.success) {
              this.loadData(res1.data);
            }
          },
          (err) => {
            this.spinner.hide();
          }
        );
      } else {
        const url = `rrhh/appointments/create`;
        this.s_standart.show(url).subscribe(
          (res1) => {
            this.spinner.hide();
            if (res1 && res1.hasOwnProperty('success') && res1.success) {
              this.loadData(res1.data);
            }
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  loadData(data): void {
    this.spinner.hide();
    this.persons = data.persons;
    this.locations = data.locations;
  }

  changeSelectionType(): void {
    if (this.formAppointment.get('type').value === 'face_to_face') {
      this.formAppointment.get('novi_sys_location_id').enable();
    } else {
      this.formAppointment.get('novi_sys_location_id').disable();
    }
  }

  saveInServer(): void {
    if (this.formAppointment.valid) {
      if (this.state === 'create') {
        this.create();
      }
      else if (this.state === 'edit') {
        this.edit();
      }
    } else {
      SwalService.swalToast('Por favor llene todos los campos en rojo', 'error');
    }
  }

  create(): void {
    this.isLoad = true;
    const data = this.formAppointment.value;
    const url = `rrhh/requests/${this.requestWork.id}/appointments`;
    data.date = SharedService.convertDateForLaravelOfDataPicker(data.date, 'yyyy-MM-dd HH:mm:ss');
    this.s_standart.store(url, data).subscribe(
      (res) => {
        this.isLoad = false;
        if (res && res.hasOwnProperty('success') && res.success) {
          this.router.navigate(['recursos-humanos/appointments']);
        }
      },
      (err) => {
        this.isLoad = false;
      }
    );
  }

  edit(): void {
    this.isLoad = true;
    const data = this.formAppointment.value;
    const url = `rrhh/requests/${this.requestWork.id}/appointments/${this.appointmet.id}`;
    data.date = SharedService.convertDateForLaravelOfDataPicker(data.date, 'yyyy-MM-dd HH:mm:ss');
    this.s_standart.updatePut(url, data).subscribe(
      (res) => {
        this.isLoad = false;
        if (res && res.hasOwnProperty('success') && res.success) {
          this.router.navigate(['recursos-humanos/appointments']);
        }
      },
      (err) => {
        this.isLoad = false;
      }
    );
  }
}
