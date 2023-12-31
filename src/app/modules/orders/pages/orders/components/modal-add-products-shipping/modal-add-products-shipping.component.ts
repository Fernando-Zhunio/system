import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItemOrder, IProductItemOrder } from '../../../../../../interfaces/iorder';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';

@Component({
  selector: 'app-modal-add-products-shipping',
  templateUrl: './modal-add-products-shipping.component.html',
  styleUrls: ['./modal-add-products-shipping.component.scss']
})
export class ModalAddProductsShippingComponent implements OnInit {

  products: IProductItemOrder[] = [];
  productsSelected: Map<number, IItemOrder> = new Map<number, IItemOrder>();
  isLoading: boolean = false;
  isLoadingSelected = false;
  constructor(private methodsHttp: MethodsHttpService, public dialogRef: MatDialogRef<ModalAddProductsShippingComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExterna: { order_id: number, shipping_id: number, isModify: boolean }) { }

  ngOnInit(): void {
    this.getProductsAvailable();
    this.getProductsSelected();
  }

  getProductsAvailable(): void {
    this.isLoading = true;
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/products/remaining`;
    this.methodsHttp.methodGet<IProductItemOrder[]>(path).subscribe(res => {
      if (res?.success) {
        this.products = res.data;
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  getProductsSelected(): void {
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products`;
    this.methodsHttp.methodGet<IItemOrder[]>(path).subscribe(res => {
      if (res?.success) {
        this.productsSelected = new Map<number, IItemOrder>(res.data.map(x => [x.product_id, x]));
      }
    });
  }

  modifyProductsQuantity(product_id: number, key, quantity): void {
    this.isLoadingSelected = true;
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products/${product_id}`;
    this.methodsHttp.methodPut<IItemOrder>(path, { quantity }).subscribe(res => {
      if (res?.success) {
        const data = this.productsSelected.get(key)!;
        data.quantity = res.data.quantity;
        this.getProductsAvailable();
      }
      this.isLoadingSelected = false;
    }, () => {
      this.isLoadingSelected = false;
    });
  }

  deleteProductsQuantity(product_id: number,key): void {
    this.isLoadingSelected = true;
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products/${product_id}`;
    this.methodsHttp.methodDelete<IItemOrder>(path).subscribe(res => {
      if (res?.success) {
        this.productsSelected.delete(key);
        this.getProductsAvailable();
      }
      this.isLoadingSelected = false;
    }, () => {
      this.isLoadingSelected = false;
    });
  }

  addProductShipping(id, quantity): void {
    this.isLoading = true;
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products`;
    this.methodsHttp.methodPost(path, { product_id: id, quantity }).subscribe(res => {
      if (res?.success) {
        this.getProductsSelected();
        this.getProductsAvailable();
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  validateMinMaxRangeQuantity(e, max): void {
    // eslint-disable-next-line radix
    const typedNumber = parseInt(e.key);
    // eslint-disable-next-line radix
    const currentVal = parseInt(e.target.value) || '';
    // eslint-disable-next-line radix
    const newVal = parseInt(typedNumber.toString() + currentVal.toString());

    if (newVal < 1 || newVal > max) {
      e.preventDefault();
      e.stopPropagation();
    }
  }


}
