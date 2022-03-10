import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { IOrder, IShipping } from '../../../../interfaces/iorder';
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
export class ShippingOrderSectionComponent implements OnInit {
  types: any[] = [];
  title = 'Envíos';
  subscription: Subscription = null;
  warehouses: Iwarehouse[] = [];
  // warehouse_select: Iwarehouse = null;
  formSearch = new FormControl(null);
  searching = false;
  shipping: IShipping = null;
  intervalSearch: any;
  noEntriesFoundLabel = 'No se encontraron registros';
  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    weight: new FormControl(null, [Validators.required]),
    height: new FormControl(null, [Validators.required]),
    width: new FormControl(null, [Validators.required]),
    length: new FormControl(null, [Validators.required]),
    origin_warehouse_id: new FormControl(null, [Validators.required]),
  });
  isLoading = false;
  status: 'edit' | 'create' = 'create';
  constructor(private standard: StandartSearchService, public dialogRef: MatDialogRef<ShippingOrderSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: IOrder, shipping_id: number }) { }

  ngOnInit() {
    let observe: Observable<any>;
    this.isLoading = true;
    if (this.data?.shipping_id) {
      this.status = 'edit';
      this.title = 'Editando ' + this.title;
      observe = this.standard.methodGet(routes_api_shipping.edit(this.data.order.id, this.data.shipping_id));
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
          // this.warehouse_select = this.warehouses.find(x => x.id === this.shipping.origin_warehouse_id);
        }
      }
      this.isLoading = false;
    }, err => { this.isLoading = false; });

    this.subscription = this.formSearch.valueChanges.subscribe(value => {
      console.log(value);
      if (value.length > 2) {
        this.buscarInterval(value);
      }
    });
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
  }

  selectionType(event: MatSelectChange): void {
    console.log(event);
    const id = event.value;
    if (event.value == 'pickup') {
      this.form.get('amount').setValue(0);
      this.form.get('weight').disable();
      this.form.get('height').disable();
      this.form.get('width').disable();
      this.form.get('length').disable();
    } else {
      this.form.get('amount').enable();
      this.form.get('weight').enable();
      this.form.get('height').enable();
      this.form.get('width').enable();
      this.form.get('length').enable();
    }
  }

  searchWarehouses(text) {
    console.log(text);
    this.standard.methodGet(routes_api_shipping.search_warehouses(text)).subscribe(res => {
      console.log(res);
      this.warehouses = res.data.data;
      this.searching = false;
    }, err => { this.searching = false; });
  }

  buscarInterval(text): void {
    this.searching = true;
    clearTimeout(this.intervalSearch);
    this.intervalSearch = setTimeout(() => {
      this.searchWarehouses(text);
    }, 1000);
  }

  selectWarehouse(event: MatAutocompleteSelectedEvent | number): void {
    const id = typeof event == 'number' ? event : event?.option?.value;
    // this.warehouse_select = this.warehouses.find(x => x.id === id);
    this.form.get('origin_warehouse_id').setValue(id);
  }

  saveInServer(): void {
    const data = this.form.value;
    if (this.form.valid) {
      this.isLoading = true;
      let observable: Observable<any>;
      if (this.status === 'create') {
        observable = this.standard.methodPost(routes_api_shipping.store(this.data.order.id), data);
      } else {
        observable = this.standard.methodPut(routes_api_shipping.update(this.data.order.id, this.data.shipping_id), data);
      }
      observable.subscribe(res => {
        console.log(res);
        this.dialogRef.close(res.data);
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
    } else {
      this.form.markAllAsTouched();
      SwalService.swalFire({ title: 'Error', text: 'Formulario invalido', icon: 'error' });
    }
  }

}
