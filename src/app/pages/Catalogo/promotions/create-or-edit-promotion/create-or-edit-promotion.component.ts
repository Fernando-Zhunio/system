import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { SearchComponent } from '../../../../components/search/search.component';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SharedService } from './../../../../services/shared/shared.service';
import { SwalService } from '../../../../services/swal.service';
import { IProduct } from '../../../../interfaces/promotion';

@Component({
  templateUrl: './create-or-edit-promotion.component.html',
  styleUrls: ['./create-or-edit-promotion.component.css']
})
export class CreateOrEditPromotionComponent extends CreateOrEdit<any> implements OnInit {
  public title: string;
  public urlSave: any;

  constructor(public activated_route: ActivatedRoute, public service: StandartSearchService, public router: Router) {
    super(activated_route, service, router);
    this.title = 'Promoción';
    this.urlSave = 'catalogs/promotions';
  }

  @ViewChild('search') search: SearchComponent;
  urlSearchProducts: string = 'catalogs/promotions/search-products';

  durationType: string[] = [];
  statuses: string[] = [];
  key_param: string = 'promotion_id';


  form: FormGroup = new FormGroup({
    title: new FormControl(null),
    price: new FormControl(null, [Validators.required]),
    duration_type: new FormControl(null, [Validators.required]),
    status: new FormControl(null),
    note: new FormControl(null),
    products: new FormControl([], [Validators.required, Validators.minLength(2)]),
    date_range_start: new FormControl(null),
    date_range_end: new FormControl(null),
  });
  products: Map<string, IProduct> = new Map<string, IProduct>();
  hasDate: boolean = false;
  products_edit: Map<string, IProduct> = new Map<string, IProduct>();
  productsSelected: Map<string, IProduct> = new Map<string, IProduct>();

  ngOnInit(): void {
    this.init();
  }

  setData(response): void {
    if (this.status === 'edit') {
      this.data = response.promotion;
      this.selectionDuration({ value: this.data.duration_type });
      this.form.get('title').setValue(this.data.title);
      this.form.get('price').setValue(this.data.price_formated);
      this.form.get('duration_type').setValue(this.data.duration_type);
      this.form.get('status').setValue(this.data.status);
      this.form.get('note').setValue(this.data.note);
      this.form.get('date_range_start').setValue(this.data.start_date);
      this.form.get('date_range_end').setValue(this.data.end_date);
      this.products_edit = new Map<string, IProduct>(this.data.products.map(item => [item.id, item]));
      this.data.products.forEach((item: IProduct) => {
        this.addProductSelected(item.id);
        this.form.get('quantity_' + item.id).setValue(item.pivot.quantity);
        this.form.get('listPrice_' + item.id).setValue(item.pivot.price);
      });
      // this.addProductSelected(this.data.products[0].id);

    }
    this.durationType = response.price_durations;
    this.statuses = response.statuses;
  }

  getData(data): void {
    this.products = data;
  }

  getProducts($event): void {
    this.products = new Map<string, IProduct>($event.data.map(item => [item.id, item]));
  }

  addProductSelected(key): void {
    this.generateFormProducts(key);
    let products_form = this.form.get('products').value;
    if (!products_form) { products_form = []; }
    products_form.push(key);
    this.form.get('products').setValue(products_form);
    this.productsSelected.set(key, this.products.get(key) || this.products_edit.get(key));
  }

  generateFormProducts(key): void {
    const quantity = 'quantity_' + key;
    const formQuantity = new FormControl(null, [Validators.required]);

    const listPrice = 'listPrice_' + key;
    const formListPrice = new FormControl(null, [Validators.required]);

    this.form.addControl(quantity, formQuantity);
    this.form.addControl(listPrice, formListPrice);
  }

  removeProductSelected(key): void {
    let products_form = this.form.get('products').value;
    if (!products_form) {
      products_form = [];
    } else {
      products_form.splice(products_form.indexOf(key), 1);
      this.form.get('products').setValue(products_form);
      this.removeFormProducts(key);
      this.productsSelected.delete(key);
    }
  }


  removeFormProducts(key): void {
    const quantity = 'quantity_' + key;
    this.form.removeControl(quantity);

    const listPrice = 'listPrice_' + key;
    this.form.removeControl(listPrice);
  }

  getDataForSendServer(): any {
    if (this.form.valid) {
      const data = this.form.value;
      if (this.hasDate) {
        data.date_range_start = SharedService.convertDateForLaravelOfDataPicker(data.date_range_start);
        data.date_range_end = SharedService.convertDateForLaravelOfDataPicker(data.date_range_end);
        console.log(data);
      } else {
        data.date_range_start = null;
        data.date_range_end = null;
      }
      return data;
    }
    SwalService.swalToast('Por favor, verifique los campos en rojo', 'error');
    return false;
  }

  go(): void {
    this.router.navigate(['/catalogo/promotions']);
  }

  selectionDuration($event): void {
    console.log($event);
    this.hasDate = $event.value === 'date_range' ? true : false;
    if (this.hasDate) {
      this.form.get('date_range_start').setValidators(Validators.required);
      this.form.get('date_range_end').setValidators(Validators.required);
    } else {
      this.form.get('date_range_start').setValidators(null);
      this.form.get('date_range_end').setValidators(null);
    }
  }
}

