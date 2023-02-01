import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
// import { SwalService } from '../../../../../services/swal.service';
import { convertFormatDate } from '../../../../../shared/class/tools';
import { Person } from '../../../../../shared/interfaces/person';

@Component({
  selector: 'app-create-or-edit-person',
  templateUrl: './create-or-edit-person.component.html',
  styleUrls: ['./create-or-edit-person.component.css'],
})
export class CreateOrEditPersonComponent extends CreateOrEdit2<any> implements OnInit {
  public urlSave: string = 'admin/people';
  constructor(
    protected act_router: ActivatedRoute,
    protected router: Router,
    protected methodsHttp: MethodsHttpService,
    protected override location: Location
  ) {
    super()
  }

  @ViewChild('photoUserInput') photoUserInput: ElementRef;

  maxDateBirthDay = new Date();
  maxDate = new Date();
  title: string = 'Persona';
  // state: 'create' | 'edit' = 'create';
  cities: any = {};
  positions: any = {};
  locations: any = {};
  sexes: any = {};
  idTypes: any = {};
  types: any = {};
  person: Person;
  photo: any;
  file_img: File | null;
  itemCurrentForEdit: { id: number; type: string; value: string };

  override form: FormGroup = new FormGroup({
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

  ngOnInit(): void {
    this.init(true);
    this.maxDateBirthDay.setFullYear(this.maxDate.getFullYear() - 18);
  }

  generateFormData(): FormData | null {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    const formValues = this.form.value;
    formValues.start_date = convertFormatDate(formValues.start_date);
    formValues.birthday = convertFormatDate(formValues.birthday);

    const dataSend = new FormData();
    Object.keys(formValues).forEach((key) => {
      dataSend.append(key, formValues[key]);
    });

    if (this.photo && this.file_img) {
      dataSend.append('file', this.file_img);
    }

    return dataSend;
  }

  override setData(data): void {
    this.cities = data.cities;
    this.positions = data.positions;
    this.locations = data.locations;
    this.sexes = data.sexes;
    this.idTypes = data.id_types;

    if (this.status == 'edit') {
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
      this.form.setValue({
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

  // saveInServerPerson(): void {
  //   if (this.state == 'create') {
  //     if (this.form.valid) {
  //       this.isloadperson = true;
  //       const form_data_send = this.generateFormData();
  //       this.s_standart
  //         .uploadFormData('admin/people', form_data_send)
  //         .subscribe(
  //           (res) => {
  //             if (res.hasOwnProperty('success') && res.success) {
  //               this.person = res.data.person;
  //               this.types = res.data.types;
  //               this.isCompletedFormPerson = true;
  //               // this.stepper.selected!.completed = true;
  //               // this.stepper.next();
  //             }
  //             this.isloadperson = false;
  //           },
  //           () => {
  //             this.isloadperson = false;
  //           }
  //         );
  //     } else {
  //       this.form.markAllAsTouched();
  //     }
  //   } else if (this.state == 'edit') {
  //     if (this.form.valid) {
  //       this.isloadperson = true;
  //       const form_data_send: FormData = this.generateFormData();
  //       form_data_send.append('_method', 'put');
  //       this.s_standart
  //         .uploadFormData('admin/people/' + this.person.id, form_data_send)
  //         .subscribe(
  //           (res) => {
  //             if (res.hasOwnProperty('success') && res.success) {
  //               this.person = res.data.person;
  //               this.types = res.data.types;
  //               this.infoAndContact = res.data.info;
  //               this.isCompletedFormPerson = true;
  //               // this.stepper.selected!.completed = true;
  //               // this.stepper.next();
  //             }
  //             this.isloadperson = false;
  //           },
  //           () => {
  //             this.isloadperson = false;
  //           }
  //         );
  //     } else {
  //       this.form.markAllAsTouched();
  //     }
  //   }
  // }

  getBase64FromFile(img, callback):void {
    let fileReader = new FileReader();
    fileReader.addEventListener('load', (_evt) => {
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

  override go(): void {
    this.location.back();
  }

  // asCreateInfo() {
  //   this.stateInfoAndContact = 'create';
  //   this.form_data_person.reset();
  // }

  clearPhoto(): void {
    this.photoUserInput.nativeElement.value = '';
    this.photo = null;
    this.file_img = null;
  }
}
