import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-add-info-person-modal',
  templateUrl: './add-info-person-modal.component.html',
  styleUrls: ['./add-info-person-modal.component.css'],
})
export class AddInfoPersonModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddInfoPersonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private s_standart: StandartSearchService
  ) {}

  maxDateBirthDay = new Date();
  maxDate = new Date();
  form_person: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    identification_type: new FormControl(null, [Validators.required]),
    identification_number: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    sex: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    department_position_id: new FormControl(null, [Validators.required]),
    location_id: new FormControl(null, [Validators.required]),
    city_id: new FormControl(null, [Validators.required]),
  });
  @ViewChild('photoUserInput') photoUserInput: ElementRef;
  cities: any = [];
  positions: any = [];
  locations: any = [];
  sexes: any = [];
  file_img: File;
  photo: any;
  id_types: any = [];
  isload: boolean = false;

  ngOnInit(): void {
    this.maxDateBirthDay.setFullYear(this.maxDateBirthDay.getFullYear() - 18);
    console.log(this.maxDateBirthDay);

    this.isload = true;
    this.s_standart.show('user/people/create').subscribe((response) => {
      if (response && response.hasOwnProperty('success') && response.success) {
        this.setDataDefault(response.data);
        this.isload = false;
      }
    });
  }

  setDataDefault(data) {
    for (const i in data.cities) {
      this.cities.push({ id: i, name: data.cities[i] });
    }
    for (const i in data.positions) {
      this.positions.push({ id: i, name: data.positions[i] });
    }
    for (const i in data.locations) {
      this.locations.push({ id: i, name: data.locations[i] });
    }

    for (const i in data.sexes) {
      this.sexes.push({ id: i, name: data.sexes[i] });
    }
    for (const i in data.id_types) {
      this.id_types.push({ id: i, name: data.id_types[i] });
    }
  }

  getBase64FromFile(img, callback): void {
    const fileReader = new FileReader();
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

  clearPhoto(): void {
    this.photoUserInput.nativeElement.value = '';
    this.photo = null;
    this.file_img = null;
  }

  saveInServer(): void {
    if (this.form_person.valid) {
      const data_send = this.createFormData();
      this.isload = true;
      this.s_standart
        .uploadFormData(
          'user/' + this.data.user.id + '/people',
          data_send
        )
        .subscribe((response) => {
          if (
            response &&
            response.hasOwnProperty('success') &&
            response.success
          ) {
            SwalService.swalFire({
              title: 'Gracias!',
              text: 'Guardado con exito',
              icon: 'success',
            });
            this.dialogRef.close(response.data.person);
          }
          this.isload = false;
        }, (error) => { this.isload = false; console.log(error); });
    } else {
      this.form_person.markAllAsTouched();
    }
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
    }

    return form_data_send;
  }
}