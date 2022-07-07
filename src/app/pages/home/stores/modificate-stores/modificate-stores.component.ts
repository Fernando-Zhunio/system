import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-modificate-stores',
  templateUrl: './modificate-stores.component.html',
  styleUrls: ['./modificate-stores.component.scss']
})
export class ModificateStoresComponent implements OnInit {

  form = new FormGroup({
    city_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    schedules: new FormControl('', [Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA)
  public dataExternal: { title: string, isCreateCity: boolean, isEdit: boolean, data: any },
    private dialogRef: MatDialogRef<ModificateStoresComponent>) { }

  ngOnInit() {
    if (!this.dataExternal.isCreateCity || this.dataExternal.isEdit) {
      this.dataExternal.isCreateCity = false;
      this.form.get('city_name').clearValidators();
      console.log(this.dataExternal.data);
      const { name, address, latitude, longitude, phone, schedules } = this.dataExternal.data;
      this.form.get('name').disable();
      this.form.patchValue({ name, address, latitude, longitude, phone, schedules });
    }
  }

  ok() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      SwalService.swalToast('Formulario invalido', 'error');
    }
  }

}

