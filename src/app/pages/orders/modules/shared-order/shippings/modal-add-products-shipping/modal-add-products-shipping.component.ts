import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItemOrder, IProductItemOrder } from '../../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../../services/standart-search.service';

@Component({
  selector: 'app-modal-add-products-shipping',
  templateUrl: './modal-add-products-shipping.component.html',
  styleUrls: ['./modal-add-products-shipping.component.scss']
})
export class ModalAddProductsShippingComponent implements OnInit {

  products: IProductItemOrder[] = [];
  productsSelected: IItemOrder[] = [];
  isLoading: boolean = false;
  constructor(private standard: StandartSearchService, public dialogRef: MatDialogRef<ModalAddProductsShippingComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExterna: { order_id: number, shipping_id: number, isModify: boolean }) { }

  ngOnInit(): void {
    this.getProductsAvailable();
    this.getProductsSelected();
  }

  getProductsAvailable(): void {
    this.isLoading = true;
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/products/remaining`;
    this.standard.methodGet<IProductItemOrder[]>(path).subscribe(res => {
      if (res?.success) {
        this.products = res.data;
      }
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

  getProductsSelected(): void {
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products`;
    this.standard.methodGet<IItemOrder[]>(path).subscribe(res => {
      if (res?.success) {
        this.productsSelected = res.data;
      }
    });
  }

  modifyProductsQuantity(product_id: number, quantity): void {
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products/${product_id}`;
    this.standard.methodPut<IItemOrder>(path, {quantity}).subscribe(res => {
      if (res?.success) {
        this.productsSelected.find(x => x.id == product_id ).quantity = res.data.quantity;
        this.getProductsAvailable();
      }
    });
  }

  deleteProductsQuantity(product_id: number): void {
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products/${product_id}`;
    this.standard.methodDelete<IItemOrder>(path).subscribe(res => {
      if (res?.success) {
        // this.productsSelected.find(x => x.id == product_id ).quantity = res.data.quantity;
        const index = this.productsSelected.findIndex(x => x.id == product_id);
        this.productsSelected.splice(index, 1);
        this.getProductsAvailable();
      }
    });
  }

  addProductShipping(id, quantity): void {
    this.isLoading = true;
    const path = `system-orders/orders/${this.dataExterna.order_id}/shippings/${this.dataExterna.shipping_id}/products`;
    this.standard.methodPost(path, { product_id: id, quantity}).subscribe(res => {
      if (res?.success) {
        this.getProductsSelected();
        this.getProductsAvailable();
      }
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

 validateMinMaxRangeQuantity(e, max): void {
  const typedNumber = parseInt(e.key);
  const currentVal = parseInt(e.target.value) || '';
  console.log(currentVal);
  const newVal = parseInt(typedNumber.toString() + currentVal.toString());

  if (newVal < 1 || newVal > max) {
    e.preventDefault();
    e.stopPropagation();
  }
 }


}
