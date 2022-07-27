import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { IItemOrder, IOrder, IProductItemOrder, IShippingOrder } from '../../../../interfaces/iorder';
import { Iwarehouse } from '../../../../interfaces/iwarehouse';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';

const routes_api_shipping = {
  index: (order: number) => `system-orders/orders/${order}/shippings`,
  create: `system-orders/orders/shippings/create`,
  edit: (order: number, shipping: number) => `system-orders/orders/${order}/shippings/${shipping}/edit`,
  delete: (order: number, shipping: number) => `system-orders/orders/${order}/shippings/${shipping}`,
  update: (order: number, shipping: number) => `system-orders/orders/${order}/shippings/${shipping}`,
  store: (order: number) => `system-orders/orders/${order}/shippings`,
  search_warehouses: (search: string) => `system-orders/warehouses/search?search=${search}`,
};
@Component({
  selector: 'app-shipping-order-section',
  templateUrl: './shipping-order-section.component.html',
  styleUrls: ['./shipping-order-section.component.scss']
})
export class ShippingOrderSectionComponent implements OnInit, OnDestroy {
  types: any[] = [];
  title = 'Envíos';
  subscription: Subscription = null;
  warehouses: Iwarehouse[] = [];
  formSearch = new FormControl(null);
  searching = false;
  shipping: IShippingOrder = null;
  // intervalSearch: any;
  noEntriesFoundLabel = 'No se encontraron registros';
  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    weight: new FormControl(0, [Validators.required]),
    height: new FormControl(0),
    width: new FormControl(0),
    length: new FormControl(0),
    origin_warehouse_id: new FormControl(null, [Validators.required]),
  });
  isLoading = false;
  status: 'edit' | 'create' = 'create';
  products: IProductItemOrder[] = [];
  subscriptionSearch: Subscription = null;
  constructor(private standard: StandartSearchService, public dialogRef: MatDialogRef<ShippingOrderSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExterna: { order_id: number, shipping_id: number }) { }

  ngOnInit() {
    let observe: Observable<any>;
    this.isLoading = true;
    if (this.dataExterna?.shipping_id) {
      this.status = 'edit';
      this.title = 'Editando ' + this.title;
      observe = this.standard.methodGet(routes_api_shipping.edit(this.dataExterna.order_id, this.dataExterna.shipping_id));
    } else {
      this.status = 'create';
      this.title = 'Creando ' + this.title;
      observe = this.standard.methodGet(routes_api_shipping.create);
    }
    observe.subscribe(res => {
      console.log(res);
      if (res?.success) {
        const data = res.data;
        this.types = data.types;
        if (this.status === 'edit') {
          this.shipping = data.shipping;
          this.fillData(this.shipping);
        }
      }
      this.isLoading = false;
    }, err => { this.isLoading = false; });

    this.subscription = this.formSearch.valueChanges.pipe(
      filter(search => !!search),
      tap(() => this.searching = true),
      debounceTime(200),
    ).subscribe(value => {
      console.log(value);
      this.buscarInterval(value);
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // if (this.subscriptionSearch) {
    //   this.subscriptionSearch.unsubscribe();
    // }
  }

  fillData(data): void {
    this.warehouses.push(data.origin_warehouse);
    this.form.setValue({
      type: data.type,
      amount: data.amount,
      weight: data.weight,
      height: data.height,
      width: data.width,
      length: data.length,
      origin_warehouse_id: data.origin_warehouse_id,
    });
    this.selectWarehouse(data.origin_warehouse_id);
    this.selectionType({ value: data.type });
  }

  selectionType(event: MatSelectChange | any): void {
    console.log(event);
    if (event.value == 'pickup') {
      this.form.get('weight').disable();
      this.form.get('height').disable();
      this.form.get('width').disable();
      this.form.get('length').disable();
      this.form.get('amount').setValue(0);
      this.form.get('weight').setValue(0);
      this.form.get('height').setValue(0);
      this.form.get('width').setValue(0);
      this.form.get('length').setValue(0);
    } else {
      this.form.get('amount').enable();
      this.form.get('weight').enable();
      this.form.get('height').enable();
      this.form.get('width').enable();
      this.form.get('length').enable();
    }
  }

  searchWarehouses(text) {
    // console.log(text);
    // if (this.subscriptionSearch) {
    //   this.subscriptionSearch.unsubscribe();
    // }
    this.standard.methodGet(routes_api_shipping.search_warehouses(text)).subscribe(res => {
      console.log(res);
      this.warehouses = res.data.data;
      this.searching = false;
    }, err => { this.searching = false; });
  }

  buscarInterval(text): void {
    // this.searching = true;
    this.searchWarehouses(text);
  }

  selectWarehouse(event: MatAutocompleteSelectedEvent | number): void {
    const id = typeof event == 'number' ? event : event?.option?.value;
    // this.warehouse_select = this.warehouses.find(x => x.id === id);
    this.form.get('origin_warehouse_id').setValue(id);
  }

  saveInServer(): void {
    const dataSend = this.form.value;
    if (this.form.valid) {
      this.isLoading = true;
      let observable: Observable<any>;
      if (this.status === 'create') {
        observable = this.standard.methodPost(routes_api_shipping.store(this.dataExterna.order_id), dataSend);
      } else {
        observable = this.standard.methodPut(routes_api_shipping.update(this.dataExterna.order_id, this.dataExterna.shipping_id), dataSend);
      }
      observable.subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
    } else {
      this.form.markAllAsTouched();
      SwalService.swalFire({ title: 'Error', text: 'Formulario invalido', icon: 'error' });
    }
  }



  addProductShipping(quantity, id): void {

  }



}
