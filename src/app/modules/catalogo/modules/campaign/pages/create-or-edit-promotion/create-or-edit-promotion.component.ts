import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AirDatepicker from 'air-datepicker';
import { CreateOrEdit2 } from '../../../../../../class/create-or-edit-2';
// import { DialogProductsService } from '../../../../../../services/dialog-products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { SwalService } from '../../../../../../services/swal.service';
import { SimpleSearchComponent } from '../../../../../../shared/standalone-components/simple-search/simple-search.component';
import { SimpleSearchSelectorService } from '../../../../../../shared/standalone-components/simple-search/simple-search-selector.service';
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
  dpMax: any;
  dpMin: any;
  override form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    status: new FormControl('', [Validators.required]),
  });
  campaign: Campaign;
  formArrayProductSelected: FormArray = new FormArray<FormGroup>([]);

  constructor(
    protected act_router: ActivatedRoute,
    protected methodsHttp: MethodsHttpService,
    protected router: Router,
    protected override location: Location,
    private chs: SimpleSearchSelectorService
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

  addProduct({ id, name, img, code }, price = null, quantity = null): void {
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
  }

  override getDataForSendServer(): any {
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
      this.addProduct({ id: item.id, name: item.name, img: item.image, code: item.code }, item.pivot.price, item.pivot.quantity);
    });
  }

  openDialogProductSearch(): void {
    this.chs.openDialog(SimpleSearchComponent,
      {
        placeholder: 'Escribe el nombre del producto o código',
        isMultiSelection: false,
        path: 'catalogs/campaigns/promotions/search-products'
      })
      .beforeClose().subscribe((res: any) => {
        if (res?.data) {
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


