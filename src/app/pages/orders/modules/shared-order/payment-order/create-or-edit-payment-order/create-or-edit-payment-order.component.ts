import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateOrEditModal } from '../../../../../../class/create-or-edit-modal';
import { IPaymentOrder } from '../../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-payment-order',
  templateUrl: './create-or-edit-payment-order.component.html',
  styleUrls: ['./create-or-edit-payment-order.component.scss']
})
export class CreateOrEditPaymentOrderComponent extends CreateOrEditModal implements OnInit {
  title: string = 'Pago de orden';
  urlCrud: string = 'system-orders/payments';
  isEdit: boolean;
  hasDataCreate: boolean = true;
  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    installments_type: new FormControl('single'),
  });

  types: any[] = [];

  ngOnInit(): void {
        this.state = this.isEdit ? 'edit' : 'create';
        this.init();
    }

  getId(): number {
    return this.data.data.id;
  }

  constructor(
    public dialogRef: MatDialogRef<CreateOrEditPaymentOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, order_id: number, data: IPaymentOrder },
    public standard: StandartSearchService
  ) {
    super();
    this.isEdit = data.isEdit;
    this.urlCrud = `system-orders/orders/${data.order_id}/payments`;
  }

  override initData(response: any): void {
    this.types = response.data.types;
    if (this.isEdit) {
      this.form.patchValue(response.data.payment);
    }
  }

  override generateUrlCreate(): string {
    return `system-orders/orders/payments/create`;
  }

}
