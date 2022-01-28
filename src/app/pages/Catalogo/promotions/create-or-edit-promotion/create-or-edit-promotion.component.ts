import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { SearchComponent } from '../../../../components/search/search.component';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { Iproduct2 } from './../../../../interfaces/iproducts';

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
  readonly keyArrayFormProduct: string = 'products_id';

  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    duration_type: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    note: new FormControl(null, [Validators.required]),
    products: new FormControl(null, [Validators.required]),
    date_range_start: new FormControl(null, [Validators.required]),
    date_range_end: new FormControl(null, [Validators.required]),
    products_id: new FormArray([]),
  });
  products: Map<string, Iproduct2> =  new Map<string, Iproduct2>();
  productsSelected: Map<string, Iproduct2> =  new Map<string, Iproduct2>();

  ngOnInit(): void {
    this.init();
  }

  get formProductsSelected(): FormArray {
    return this.form.controls['products_id'] as FormArray;
  }

  setData(response): void {
    if (this.status === 'edit') {
      this.data = response.promotion;
    }
    this.durationType = response.price_durations;
    this.statuses = response.statuses;
  }

  getData(data): void {
    this.products = data;
  }

  getProducts($event): void {
    this.products = new Map<string, Iproduct2>($event.data.map(item => [item.id, item]));
  }

  addProductSelected(key): void {
    this.generateFormProducts(key);
    this.productsSelected.set(key, this.products.get(key));
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
    this.removeFormProducts(key);
    this.productsSelected.delete(key);
  }


  removeFormProducts(key): void {
    const quantity = 'quantity_' + key;
    this.form.removeControl(quantity);

    const listPrice = 'listPrice_' + key;
    this.form.removeControl(listPrice);
  }
}

