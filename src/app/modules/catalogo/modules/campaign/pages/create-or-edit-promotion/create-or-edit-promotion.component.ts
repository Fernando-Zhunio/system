import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AirDatepicker from 'air-datepicker';
import { CreateOrEdit2 } from '../../../../../../class/create-or-edit-2';
// import { DialogProductsService } from '../../../../../../services/dialog-products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { SwalService } from '../../../../../../services/swal.service';
import { SearchProductsDialogComponent } from '../../../../../../shared/search-products-dialog/search-products-dialog.component';
import { CreateHostService } from '../../../../../../shared/services/create-host.service';
import { Campaign } from '../../interfaces/campaign';

// interface PromotionProductSend {
//   id: number;
//   price: number;
//   quantity: number;
//   name: string;
//   img: string;
//   code: string;
// }
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
  dpMax: any;
  dpMin: any;
  // urlSearch: string;
  // hiddenSearchProducts: boolean = true;
  // productsSelected: Map<number, PromotionProductSend> = new Map<number, PromotionProductSend>();
  override form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    status: new FormControl('', [Validators.required]),
    // price: new FormControl(1, [Validators.required]),
  });
  // currentKey: number
  // hiddenAddQuantity: boolean = true;
  // formControlQuantity: FormControl = new FormControl(1, [Validators.min(1)]);
  campaign: Campaign;
  formArrayProductSelected: FormArray = new FormArray<FormGroup>([]);
  // onlyQuantity: boolean = false;

  constructor(
    protected act_router: ActivatedRoute,
    protected methodsHttp: MethodsHttpService,
    protected router: Router,
    protected override location: Location,
    private chs: CreateHostService
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

  addProduct( {id, name, img, code}, price = null, quantity = null ): void {
    if (this.validateNotRepeatProduct(id)) {
      this.formArrayProductSelected.push(new FormGroup({
        id: new FormControl(id, [Validators.required]),
        price: new FormControl(price ?? 1, [Validators.required, Validators.min(0)]),
        quantity: new FormControl(quantity ?? 1, [Validators.required, Validators.min(1)]),
        name: new FormControl(name),
        img: new FormControl(img),
        code: new FormControl(code),
      }));
    }
  }


  deleteProduct(index: number): void {
    this.formArrayProductSelected.removeAt(index);
    // this.productsSelected.delete(key);
  }

  override getDataForSendServer(): any {
    console.log(this.formArrayProductSelected.controls.values());
    if (this.form.valid && this.formArrayProductSelected.controls.length > 0) {
      return {
        ...this.form.value,
        products: Array.from(this.formArrayProductSelected.controls.values())
          .map(item => {
            return {
              id: item.value.id,
              quantity: item.value.quantity,
              price: item.value.price
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
    data.products.forEach((item: any) => {
      this.addProduct({id: item.id, name: item.name, img: item.image, code: item.code}, item.pivot.price, item.pivot.quantity);
      // return [item.id, {
      //   ...item,
      //   quantity: item.pivot.quantity
      // }]
    });
  }

  openDialogProductSearch(): void {
    const options = {
        onlyOne: true,
        url: 'catalogs/campaigns/promotions/search-products'
    };
    this.chs.injectComponent(SearchProductsDialogComponent, options).beforeClose().subscribe((res: any) => {
      if (res?.data) {
        console.log(res);
        this.addProduct(res.data);
      }
    });
  }

  validateNotRepeatProduct(id: number): boolean {
    return this.formArrayProductSelected.controls.findIndex(item => item.value.id === id) === -1;
  }

  getTotalPrice(): number {
    return Array.from(this.formArrayProductSelected.controls.values())
      .reduce((acc, item) => {
        return acc + (item.value.price);
      }, 0);
  }

}


