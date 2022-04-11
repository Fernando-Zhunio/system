import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IDiscountAndTaxes, IOrder } from '../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-create-or-edit-discount-or-tax-order',
  templateUrl: './create-or-edit-discount-or-tax-order.component.html',
  styleUrls: ['./create-or-edit-discount-or-tax-order.component.scss']
})
export class CreateOrEditDiscountOrTaxOrderComponent implements OnInit {

  state: 'create' | 'edit' = 'create';
  title = ' descuento o impuesto';
  isLoading = false;

  constructor(
    private s_standard: StandartSearchService,
    public dialogRef: MatDialogRef<CreateOrEditDiscountOrTaxOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order_id: number, id: number }
  ) { }

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    amount_type: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
  });
  types: any[] = [];
  typesAmounts: any[] = [];

  additionalAmount: IDiscountAndTaxes = null;

  ngOnInit() {
    if (this.data.id) {
      this.state = 'edit';
      this.title = 'Editando ' + this.title;
    } else {
      this.state = 'create';
      this.title = 'Agregando ' + this.title;
    }
    this.init();
  }

  init(): void {
    this.isLoading = true;
    let observer: Observable<any>;
    if (this.data?.id) {
      this.state = 'edit';
      observer = this.s_standard.methodGet<any>(`system-orders/orders/${this.data.order_id}/additional-amounts/${this.data.id}/edit`);
    } else {
      observer = this.s_standard.methodGet<any>(`system-orders/orders/additional-amounts/create`);
    }
    observer.subscribe(res => {
      this.fillData(res.data);
    this.isLoading = false;
    }, err => { console.log(err); this.isLoading = false; });
  }

  fillData(data: any): void {
    this.types = data.types;
    this.typesAmounts = data.amount_types;
    if (this.state === 'edit') {
      this.additionalAmount = data.additionalAmount;
      this.fillForm(this.additionalAmount);
    }
  }

  fillForm(data: any): void {
    this.form.patchValue(data);
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      let observable: Observable<any>;
      if (this.state === 'create') {
        observable = this.s_standard.methodPost<any>(`system-orders/orders/${this.data.order_id}/additional-amounts`, this.form.value);
      } else {
        observable = this.s_standard.methodPut<any>(`system-orders/orders/${this.data.order_id}/additional-amounts/${this.data.id}`, this.form.value);
      }
      observable.subscribe(res => {
        this.isLoading = false;
        this.dialogRef.close(res);
      }
      , err => {
        this.isLoading = false;
        console.error(err);
      }
      );
    } else {
      SwalService.swalFire({title: 'Formulario invalido', text: 'Complete los campos que son requerido', icon: 'error'});
    }
  }

}
