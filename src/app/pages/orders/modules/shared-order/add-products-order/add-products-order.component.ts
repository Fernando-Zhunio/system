import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import { IItemOrder, IOrder } from '../../../../../interfaces/iorder';
import { IProduct } from '../../../../../interfaces/iproducts';
import { IPaginate, StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-add-products-order',
  templateUrl: './add-products-order.component.html',
  styleUrls: ['./add-products-order.component.scss']
})
export class AddProductsOrderComponent implements OnInit {

  constructor(private standard: StandartSearchService) { }
  @Input() order: IOrder;
  @Input() items: Map<number, IItemOrder> = new Map<number, IItemOrder>();
  @Input() isCancelled: boolean;
  @Output() change = new EventEmitter<string>();
  itemEditing: IItemOrder;
  isOpenSearchProducts = false;
  isEditingItem = false;
  isLoading = false;
  products: Map<number, IProduct> = new Map<number, IProduct>();
  urlProducts: string = 'system-orders/products';
  form: FormGroup = new FormGroup({
    product: new FormControl({ value: null, disabled: true }, [Validators.required]),
    product_id: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  });
  formEdit: FormGroup = new FormGroup({
    product: new FormControl({ value: null, disabled: true }, [Validators.required]),
    product_id: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  });


  ngOnInit() {
  }

  createOrEditItemOrder(): void {
    const form = this.isEditingItem ? this.formEdit : this.form;
    if (form.valid) {
      this.createOrEdit({ order_id: this.order.id, form: form.value, isEdit: this.isEditingItem });
    } else {
      SwalService.swalFire({ title: 'Error', text: 'Faltan datos', icon: 'error' });
    }
  }

  createOrEdit({ order_id, form, isEdit }): void {
    this.isLoading = true;
    let observer: Observable<any>;
    if (isEdit) {
      observer = this.standard.methodPut(`system-orders/orders/${order_id}/items/${this.itemEditing.id}`, form);
    } else {
      observer = this.standard.methodPost(`system-orders/orders/${order_id}/items`, form);
    }
    observer.subscribe(res => {
      if (res?.success) {
        // const item = res.data;
        // if (this.items.has(item.id)) {
        //   this.items.delete(item.id);
        // }
        if (this.isEditingItem) {
          this.disabledEditingItemOrder();
          SwalService.swalFire({ title: 'Mensaje', text: 'Actualizado correctamente', icon: 'success' });
        }
        // this.items.set(item., item);
        this.change.emit('change');

      }
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

  disabledEditingItemOrder(): void {
    this.isEditingItem = false;
    this.form.enable();
    this.formEdit.disable();
  }

  enabledEditingItemOrder(id): void {
    this.itemEditing = this.items.get(id);
    this.isEditingItem = true;
    this.form.disable();
    this.formEdit.enable();
    this.formEdit.setValue({
      product_id: this.itemEditing.product_id,
      quantity: this.itemEditing.quantity,
      price: this.itemEditing.price,
      product: this.itemEditing.product.code + '-' + this.itemEditing.product.name,
    });
  }

  deleteItemOrder(order_id, id, callback = null): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el item?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${order_id}/items/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Item eliminado', icon: 'success' });
            // this.items.delete(id);
            // if (callback) {
            //   callback();
            // }
            this.change.emit('change');
          }
        });
      }
    });
  }

  getDataProducts(event: IPaginate<IProduct>): void {
    console.log(event);
    this.products = new Map<number, IProduct>(event.data.map(x => [x.id, x]));
    console.log(this.products);
  }

  selectedProduct(event: MatSelectionListChange): void {
    if (this.isEditingItem) {
      this.formEdit.get('product_id').setValue(event.options[0].value);
      const nameProduct = this.products.get(event.options[0].value).name;
      this.formEdit.get('product').setValue(nameProduct);
      this.isOpenSearchProducts = false;
    } else {
      this.form.get('product_id').setValue(event.options[0].value);
      const nameProduct = this.products.get(event.options[0].value).name;
      this.form.get('product').setValue(nameProduct);
      this.isOpenSearchProducts = false;
    }
  }

}
