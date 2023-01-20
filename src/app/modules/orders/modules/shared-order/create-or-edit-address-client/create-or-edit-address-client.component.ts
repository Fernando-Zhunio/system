import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IClientAddressOrder } from '../../../../../interfaces/iclient-address-order';
import { IClientOrder } from '../../../../../interfaces/iclient-order';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-address-client',
  templateUrl: './create-or-edit-address-client.component.html',
  styleUrls: ['./create-or-edit-address-client.component.scss']
})
export class CreateOrEditAddressClientComponent implements OnInit {
  title: string = 'Dirección ';
  status: string = 'create';
  isLoading: boolean = false;
  form: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    number: new FormControl(null),
    neighborhood: new FormControl(null),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    zip_code: new FormControl(null),
    company: new FormControl(null)
  });
  constructor(public dialogRef: MatDialogRef<CreateOrEditAddressClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client_id: number, address_id?: number, url?: string}, private s_standard: StandartSearchService) {
  }

  ngOnInit(): void {
      const isEdit = this.data.address_id ? true : false;
      if (isEdit) {
          this.status = 'edit';
          this.title += ' Editando';
          this.edit();
      } else {
          this.status = 'create';
          this.title += ' Creando';
      }
  }

  fillForm(data: IClientAddressOrder | IClientOrder): void {
    this.form.patchValue(data);
  }

  edit(): void {
    this.isLoading = true;
    this.s_standard.methodGet<IClientAddressOrder>('system-orders/clients/' + this.data.client_id + '/addresses/' + this.data.address_id + '/edit').subscribe(res => {
      this.fillForm(res.data);
      this.isLoading = false;
    });
  }

  saveInServer(): void {
    this.isLoading = true;
    let url = 'system-orders/clients/' + this.data.client_id + '/addresses';
    let observable: Observable<any>;
    if (this.status === 'edit') {
      if (this.data?.url) {
        url = this.data.url;
      } else {
        url += '/' + this.data.address_id;
       }
      observable = this.s_standard.methodPut(url, this.form.value);
    } else {
      observable = this.s_standard.methodPost(url, this.form.value);
    }
    observable.subscribe(res => {
      this.dialogRef.close(res);
    }, () => {
      this.isLoading = false;
    });
  }
}
