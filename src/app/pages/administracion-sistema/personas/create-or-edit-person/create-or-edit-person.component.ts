import { formatDate, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Cperson } from '../../../../class/cperson';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-create-or-edit-person',
  templateUrl: './create-or-edit-person.component.html',
  styleUrls: ['./create-or-edit-person.component.css'],
})
export class CreateOrEditPersonComponent implements OnInit {
  constructor(
    private router_active: ActivatedRoute,
    private s_standart: StandartSearchService,
    private location: Location
  ) {}

  @ViewChild('photoUserInput') photoUserInput: ElementRef;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  // minDate = new Date();
  maxDateBirthDay = new Date();
  maxDate = new Date();
  title: string = 'Creando nueva Persona';
  state: 'create' | 'edit' = 'create';
  cities: any = {};
  positions: any = {};
  locations: any = {};
  sexes: any = {};
  id_types: any = {};
  types: any = {};
  person: Cperson = new Cperson();
  isloadperson: boolean = false;
  isCompletedFormPerson: boolean = false;
  stateStepper: string;
  isloadContact: boolean = false;
  infoAndContact = [];
  photo: any;
  file_img: File;
  stateInfoAndContact: 'create' | 'edit' = 'create';
  itemCurrentForEdit: { id: number; type: string; value: string };

  form_person: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    identification_type: new FormControl(null, [Validators.required]),
    identification_number: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    sex: new FormControl(null, [Validators.required]),
    start_date: new FormControl(this.maxDate, [Validators.required]),
    city_id: new FormControl(null, [Validators.required]),
    department_position_id: new FormControl(null, [Validators.required]),
    location_id: new FormControl(null, [Validators.required]),
  });

  form_data_person: FormGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.maxDateBirthDay.setFullYear(this.maxDate.getFullYear() - 18);
    this.router_active.data.subscribe((res) => {
      if (res.isEdit) {
        this.isloadperson = true;
        this.state = 'edit';
        this.title = 'Editando Persona';
        const id = Number.parseInt(
          this.router_active.snapshot.paramMap.get('id')
        );
        const url = 'admin/people/' + id + '/edit';
        this.s_standart.show(url).subscribe((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.setDataDefault(response.data);
          }
          this.isloadperson = false;
        });
      } else {
        this.s_standart.show('admin/people/create').subscribe((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.setDataDefault(response.data);
          }
        });
      }
    });
  }

  goInfo(): void {
    this.isCompletedFormPerson = true;
    this.stepper.selected.completed = true;
    this.stepper.next();
    this.s_standart
      .show('admin/people/' + this.person.id + '/contact-info')
      .subscribe((res) => {
        if (res.hasOwnProperty('success') && res.success) {
          this.infoAndContact = res.data.info;
          this.person = res.data.person;
          this.types = res.data.types;
        }
      });
  }

  createFormData(): FormData {
    const data_send = this.form_person.value;
    data_send.start_date = this.s_standart.formatDate(data_send.start_date);
    data_send.birthday = this.s_standart.formatDate(data_send.birthday);
    const form_data_send = new FormData();
    form_data_send.append('first_name', data_send.first_name);
    form_data_send.append('last_name', data_send.last_name);
    form_data_send.append('identification_type', data_send.identification_type);
    form_data_send.append(
      'identification_number',
      data_send.identification_number
    );
    form_data_send.append('birthday', data_send.birthday);
    form_data_send.append('sex', data_send.sex);
    form_data_send.append('start_date', data_send.start_date);
    form_data_send.append('city_id', data_send.city_id);
    form_data_send.append(
      'department_position_id',
      data_send.department_position_id
    );
    form_data_send.append('location_id', data_send.location_id);
    if (this.photo && this.file_img) {
      form_data_send.append('file', this.file_img);
      // data_send.file = this.file_img;
    }

    return form_data_send;
  }

  setDataDefault(data): void {
    this.cities = data.cities;
    this.positions = data.positions;
    this.locations = data.locations;
    this.sexes = data.sexes;
    this.id_types = data.id_types;
    if (this.state == 'edit') {
      const {
        first_name,
        last_name,
        identification_type,
        identification_number,
        birthday,
        sex,
        start_date,
        city_id,
        department_position_id,
        location_id,
      } = data.person;
      this.form_person.setValue({
        first_name,
        last_name,
        identification_type,
        identification_number,
        birthday,
        sex,
        start_date,
        city_id: city_id.toString(),
        department_position_id: department_position_id.toString(),
        location_id: location_id.toString(),
      });
      this.person = data.person;
      if(data.person.photo){
        this.photo = data.person.photo.permalink;
      }
    }
  }

  saveInServerPerson(): void {
    if (this.state == 'create') {
      if (this.form_person.valid) {
        this.isloadperson = true;
        const form_data_send = this.createFormData();
        this.s_standart
          .uploadFormData('admin/people', form_data_send)
          .subscribe(
            (res) => {
              if (res.hasOwnProperty('success') && res.success) {
                this.person = res.data.person;
                this.types = res.data.types;
                this.isCompletedFormPerson = true;
                this.stepper.selected.completed = true;
                this.stepper.next();
              }
              this.isloadperson = false;
            },
            (err) => {
              this.isloadperson = false;
            }
          );
      } else {
        this.form_person.markAllAsTouched();
      }
    } else if (this.state == 'edit') {
      if (this.form_person.valid) {
        this.isloadperson = true;
        const form_data_send: FormData = this.createFormData();
        form_data_send.append('_method', 'put');
        this.s_standart
          .uploadFormData('admin/people/' + this.person.id, form_data_send)
          .subscribe(
            (res) => {
              if (res.hasOwnProperty('success') && res.success) {
                this.person = res.data.person;
                this.types = res.data.types;
                this.infoAndContact = res.data.info;
                this.isCompletedFormPerson = true;
                this.stepper.selected.completed = true;
                this.stepper.next();
              }
              this.isloadperson = false;
            },
            (err) => {
              this.isloadperson = false;
            }
          );
      } else {
        this.form_person.markAllAsTouched();
      }
    }
  }

  saveInServerInfo(): void {
    if (this.stateInfoAndContact == 'create') {
      if (this.form_data_person.valid) {
        this.isloadContact = true;
        this.s_standart
          .store('admin/people/' + this.person.id + '/contact-info', {
            ...this.form_data_person.value,
          })
          .subscribe(
            (res) => {
              if(res && res.hasOwnProperty('success') && res.success){
                this.infoAndContact.push(res.data);
                this.asCreateInfo();
              }
              else
              SwalService.swalToast('Ups! Sucedio un error intentalo luego');
              this.isloadContact = false;
            },
            (err) => {
              this.isloadContact = false;
              console.log(err);
            }
          );
      }
    } else if (this.stateInfoAndContact == 'edit') {
      if (this.form_data_person.valid) {
        this.isloadContact = true;
        this.s_standart
          .updatePut(
            'admin/people/' +
              this.person.id +
              '/contact-info/' +
              this.itemCurrentForEdit.id,
            { ...this.form_data_person.value }
          )
          .subscribe(
            (res) => {
              this.isloadContact = false;
              const index = this.infoAndContact.findIndex(
                (x) => x.id == res.data.id
              );
              this.infoAndContact[index] = res.data;

              this.asCreateInfo();
            },
            (err) => {
              this.isloadContact = false;
              console.log(err);
            }
          );
      }
    }
  }

  getBase64FromFile(img, callback):void {
    let fileReader = new FileReader();
    fileReader.addEventListener('load', (evt) => {
      callback(fileReader.result);
    });
    fileReader.readAsDataURL(img);
  }

  uploadImg(event): void {
    /* Seria usada de la siguiente manera */
    this.file_img = event.target.files[0];
    this.getBase64FromFile(this.file_img, (base64) => {
      this.photo = base64;
    });
  }

  goBack(): void {
    this.location.back();
  }

  editItemCurrent(id): void {
    // if(this.itemCurrentForEdit.id != id){
    this.itemCurrentForEdit = this.infoAndContact.find((x) => x.id == id);
    const { type, value } = this.itemCurrentForEdit;
    this.form_data_person.setValue({ type, value });
    this.stateInfoAndContact = 'edit';
    // }
  }

  deleteItem(id): void {
    SwalService.swalConfirmation(
      'Eliminar Item',
      'Seguro que desea eliminar este item',
      'warning'
    ).then((res) => {
      if (res.isConfirmed) {
        this.s_standart
          .destory('admin/people/' + this.person.id + '/contact-info/' + id)
          .subscribe((res) => {
            if (res.hasOwnProperty('success') && res.success) {
              const index_for_delete = this.infoAndContact.findIndex(
                (x) => x.id == id
              );
              if (index_for_delete != -1) {
                this.infoAndContact.splice(index_for_delete, 1);
              }
            }
          });
      }
    });
  }

  asCreateInfo() {
    this.stateInfoAndContact = 'create';
    this.form_data_person.reset();
  }

  clearPhoto(): void {
    this.photoUserInput.nativeElement.value = '';
    this.photo = null;
    this.file_img = null;
  }
}
