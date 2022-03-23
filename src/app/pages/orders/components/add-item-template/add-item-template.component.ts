import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import { IClientAddressOrder } from '../../../../interfaces/iclient-address-order';
import { IClientOrder } from '../../../../interfaces/iclient-order';
// import { IItemOrder } from '../../../../interfaces/iitem-order';
import {  IDiscountAndTaxes, IItemOrder, IOrder } from '../../../../interfaces/iorder';
import { IProduct } from '../../../../interfaces/promotion';
import { SwalService } from '../../../../services/swal.service';
import { CreateOrEditDiscountOrTaxOrderComponent } from '../create-or-edit-discount-or-tax-order/create-or-edit-discount-or-tax-order.component';
import { ShippingOrderSectionComponent } from '../shipping-order-section/shipping-order-section.component';
import { IPaginate, StandartSearchService } from './../../../../services/standart-search.service';

@Component({
  selector: 'app-add-item-template',
  templateUrl: './add-item-template.component.html',
  styleUrls: ['./add-item-template.component.scss']
})
export class AddItemTemplateComponent implements OnInit {

  @Input() client: IClientOrder;
  @Input() address: IClientAddressOrder;
  @Input() order: IOrder;
  @Input() channels: any[] = [];
  @Input() types: any[] = [];

  constructor(private standard: StandartSearchService, private dialog: MatDialog) {
    this.classOrderItem = new OrderItem(standard);
  }
  get itemsOrder() { return this.classOrderItem.itemsOrder; }
  get isLoadingItem() {
    return this.classOrderItem.isLoadingItem;
  }
  discountsAndTaxes: Map<number, IDiscountAndTaxes> = new Map<number, IDiscountAndTaxes>();
  products: Map<number, IProduct> = new Map<number, IProduct>();
  urlProducts: string = 'system-orders/products';
  isOpenSearchProducts: boolean = false;
  classOrderItem: OrderItem;

  channel(id) {
    // console.log(this.channels.find(x => x.id === id).name || 'Sin canal');
    return this.channels.find(x => x.id === id)?.name;
  }

  type(id) {
    return this.types.find(x => x.id === id);
  }

  ngOnInit() {
  }

  getDataProducts(event: IPaginate<IProduct>): void {
    console.log(event);
    this.products = new Map<number, IProduct>(event.data.map(x => [x.id, x]));
    console.log(this.products);
  }

  selectedProduct(event: MatSelectionListChange): void {
    if (this.classOrderItem.isEditingItem) {
      this.classOrderItem.formEdit.get('product_id').setValue(event.options[0].value);
      const nameProduct = this.products.get(event.options[0].value).name;
      this.classOrderItem.formEdit.get('product').setValue(nameProduct);
      this.isOpenSearchProducts = false;
    } else {
      this.classOrderItem.form.get('product_id').setValue(event.options[0].value);
      const nameProduct = this.products.get(event.options[0].value).name;
      this.classOrderItem.form.get('product').setValue(nameProduct);
      this.isOpenSearchProducts = false;
    }
  }

  openDialogCreateOrEditDiscountOrTax(id: number): void {
    console.log(id);
    this.dialog.open(CreateOrEditDiscountOrTaxOrderComponent, {
      width: '500px',
      data: { id, order: this.order },

      disableClose: true,

    }).beforeClosed().subscribe(res => {
      if (res) {
        if (this.discountsAndTaxes.has(res.id)){
          this.discountsAndTaxes.delete(res.id);
        }
        this.discountsAndTaxes.set(res.id, res);
        this.getOrder();
      }
    });
  }

  openDialogShipping(id: number = null): void {
    this.dialog.open(ShippingOrderSectionComponent, {
      width: '500px',
      data: { shipping_id: id, order: this.order },
      disableClose: true,
    }).beforeClosed().subscribe(res => {
      if (res) {
        this.getOrder();
      }
    });
  }

  createOrEditItemOrder(): void {
    const form = this.classOrderItem.isEditingItem ? this.classOrderItem.formEdit : this.classOrderItem.form;
    if (form.valid) {
      this.classOrderItem.createOrEdit({ order_id: this.order.id, form: form.value, isEdit: this.classOrderItem.isEditingItem }, this.getOrder.bind(this));
    } else {
      SwalService.swalFire({ title: 'Error', text: 'Faltan datos', icon: 'error' });
    }
  }

  deleteItemOrder(order_id, id: number): void {
    this.classOrderItem.deleteItemOrder(order_id, id, this.getOrder.bind(this));
  }

  deleteAdditionalAmount(id: number): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el Monto?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${this.order.id}/additional-amount/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Monto eliminado', icon: 'success' });
            this.discountsAndTaxes.delete(id);
            this.getOrder();
          }
        });
      }
    });
  }

  deleteShipping(id: number): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el Envió?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${this.order.id}/shippings/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Envió eliminado', icon: 'success' });
            // this.discountsAndTaxes.delete(id);
            if (res?.success) {
              const index = this.order.shippings.findIndex(x => x.id === id);
              if (index !== -1) {
                this.order.shippings.splice(index, 1);
              }

            }

            this.getOrder();
          }
        });
      }
    });
  }

  getOrder(): void {
    this.standard.methodGet(`system-orders/orders/${this.order.id}`).subscribe(res => {
      if (res.success) {
        this.order = res.data;
        this.discountsAndTaxes = new Map<number, IDiscountAndTaxes>(this.order.additional_amounts.map(x => [x.id, x]));
      }
    });
  }


}



class OrderItem {
  isLoadingItem = false;
  standard: StandartSearchService;
  itemsOrder: Map<number, IItemOrder> = new Map<number, IItemOrder>();
  itemEditing: IItemOrder;
  isEditingItem = false;
  form: FormGroup = new FormGroup({
    product: new FormControl({ value: null, disabled: true }, [Validators.required]),
    product_id: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  });

  // isEditingItem: boolean = false;
  formEdit: FormGroup = new FormGroup({
    product: new FormControl({ value: null, disabled: true }, [Validators.required]),
    product_id: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  });


  constructor(private _standard: StandartSearchService) {
    this.standard = _standard;
  }

  enabledEditingItemOrder(id): void {
    this.itemEditing = this.itemsOrder.get(id);
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

  disabledEditingItemOrder(): void {
    this.isEditingItem = false;
    this.form.enable();
    this.formEdit.disable();
  }

  createOrEdit({ order_id, form, isEdit }, callback = null): void {
    this.isLoadingItem = true;
    let observer: Observable<any>;
    if (isEdit) {
      observer = this.standard.methodPut(`system-orders/orders/${order_id}/items/${this.itemEditing.id}`, form);
    } else {
      observer = this.standard.methodPost(`system-orders/orders/${order_id}/items`, form);
    }
    observer.subscribe(res => {
      if (res?.success) {
        const item = res.data;
        if (this.itemsOrder.has(item.id)) {
          this.itemsOrder.delete(item.id);
        }
        if (this.isEditingItem) {
          this.disabledEditingItemOrder();
          SwalService.swalFire({ title: 'Mensaje', text: 'Actualizado correctamente', icon: 'success' });
        }
        this.itemsOrder.set(item.id, item);
        if (callback) {
          callback(item);
        }
      }
      this.isLoadingItem = false;
    }, err => {
      this.isLoadingItem = false;
    });
  }

  deleteItemOrder(order_id, id, callback = null): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el item?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${order_id}/items/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Item eliminado', icon: 'success' });
            this.itemsOrder.delete(id);
            if (callback) {
              callback();
            }
          }
        });
      }
    });
  }
}
