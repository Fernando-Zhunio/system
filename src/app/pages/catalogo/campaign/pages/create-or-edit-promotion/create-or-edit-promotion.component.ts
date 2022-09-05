import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AirDatepicker from 'air-datepicker';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { SwalService } from '../../../../../services/swal.service';
import { Campaign } from '../../interfaces/campaign';

@Component({
  selector: 'app-create-or-edit-promotion',
  templateUrl: './create-or-edit-promotion.component.html',
  styleUrls: ['./create-or-edit-promotion.component.scss']
})
export class CreateOrEditPromotionComponent extends CreateOrEdit2<any> implements OnInit {

  public title: string = 'Promoción ';
  public urlSave: string = 'catalogs/campaigns';
  airDate1: AirDatepicker | null = null;
  airDate2: AirDatepicker | null = null;
  @ViewChild('inputQuantity') inputQuantity: ElementRef;
  // @ViewChild('dateMax', { static: false }) dpMaxDateElement: ElementRef;
  dpMax: any;
  dpMin: any;
  urlSearch: string;
  hiddenSearchProducts: boolean = true;
  productsSelected: Map<number, any> = new Map<number, any>();
  override form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    status: new FormControl('', [Validators.required]),
    price: new FormControl(1, [Validators.required]),
  });
  currentKey: number
  hiddenAddQuantity: boolean = true;
  formControlQuantity: FormControl = new FormControl(1, [Validators.min(1)]);
  campaign: Campaign;

  constructor(
    protected act_router: ActivatedRoute,
    protected methodsHttp: MethodsHttpService,
    protected router: Router,
    protected override location: Location
  ) {
    super();
  }

  ngOnInit() {
    this.init(false);
    const url = 'catalogs/campaigns/' + this.act_router.snapshot.params['campaign_id'];
    this.methodsHttp.methodGet(url).subscribe((res: any) => {
      if (res?.success) {
        this.campaign = res.data;
      }
    });
  }

  override generateUrl(): string {
    return 'catalogs/campaigns/' + this.act_router.snapshot.params['campaign_id'] + '/promotions';
  }

  override go(): void {
    this.location.back();
  }

  addProduct(key: number): void {
    this.currentKey = key;
    this.hiddenAddQuantity = false;
    this.inputQuantity.nativeElement.focus();
  }

  onlyQuantity: boolean = false;
  editQuantity(key: number): void {
    this.currentKey = key;
    this.hiddenAddQuantity = false;
    this.formControlQuantity.setValue(this.productsSelected.get(key).quantity);
    this.onlyQuantity = true;
    this.inputQuantity.nativeElement.focus();
  }


  addQuantity(): void {
    if (this.formControlQuantity.valid) {
      this.productsSelected.get(this.currentKey).quantity = this.formControlQuantity.value;
      this.hiddenAddQuantity = true;
      this.formControlQuantity.reset(1);
    } else {
      this.formControlQuantity.markAllAsTouched();
    }
  }

  quitAddQuantity(): void {
    this.hiddenAddQuantity = true;
    if (!this.onlyQuantity) {
      this.productsSelected.delete(this.currentKey);
    }
    this.onlyQuantity = false;
  }

  deleteProduct(key: number): void {
    this.productsSelected.delete(key);
  }

  override getDataForSendServer(): any {
    if (this.form.valid && this.productsSelected.size > 0) {
      return {
        ...this.form.value,
        products: Array.from(this.productsSelected.values())
          .map(item => {
            return {
              id: item.id,
              quantity: item.quantity
            }
          })
      }
    } else {
      const message = this.form.invalid ? 'Formulario invalido' : 'No hay productos seleccionados';
      SwalService.swalToast(message, 'error');
    }
  }

  override setData(data): void {
    this.form.patchValue({
      title: data.title,
      description: data.note,
      status: data.status,
      price: data.price_formated
    });
    this.productsSelected = new Map(data.products.map((item: any) => {

      return [item.id, {
        ...item,
        quantity: item.pivot.quantity
      }]
    }));
  }

}


