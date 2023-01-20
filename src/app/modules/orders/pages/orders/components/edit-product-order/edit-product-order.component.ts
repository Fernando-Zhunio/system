import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProductsService } from '../../../../../../services/dialog-products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { ProductOrder } from '../../../../interfaces/order';
import { OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-edit-product-order',
  templateUrl: './edit-product-order.component.html',
  styleUrls: ['./edit-product-order.component.scss']
})
export class EditProductOrderComponent implements OnInit {

  constructor(private orderService: OrdersService,
     private methodsHttp: MethodsHttpService,
     private dialog: DialogProductsService,
     @Inject(MAT_DIALOG_DATA) public data: { item: ProductOrder, order_id: number },
     private dialogRef : MatDialogRef<EditProductOrderComponent>
     ) { }

  isLoading: boolean = false;
  form: FormGroup = new FormGroup({
    product: new FormControl({ value: null, disabled: true }, [Validators.required]),
    description: new FormControl(null),
    quantity: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  });
  ngOnInit() {
    this.fillData();
  }

  fillData(): void {
    this.form.patchValue({
      quantity: this.data.item.quantity,
      price: this.data.item.price,
      description: this.data.item.description,
      product: this.data.item?.product,
    });
  }

  openSearchProducts(): void {
    this.dialog.open(
      'system-orders/products',
      {
        data: {
          isMultiple: true
        }
      }).subscribe(res => {
        if (res?.data) {
          this.form.get('product')?.setValue(res.data);
        }
      });
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const values = { ...this.form.value, product_id: this.form.getRawValue().product.id };
      this.methodsHttp.methodPut(`system-orders/orders/${this.data.order_id}/items/${this.getIdProduct()}`, values).subscribe(res => {
        if (res?.success) {
          this.orderService.refreshOrders();
          this.dialogRef.close();
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  getIdProduct(): number {
    return this.data?.item.id;
  }

}
