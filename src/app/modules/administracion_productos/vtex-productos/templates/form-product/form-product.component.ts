
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Iproduct3 } from '../../../../../interfaces/iproducts';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import {
  IvtexProducts,
  IvtexResponseProduct,
} from '../../../../../interfaces/vtex/iproducts';
import { formatDate } from '@angular/common';
import { Ispecification } from './../../../../../interfaces/vtex/ispecification';
import collect from 'collect.js';
import { Router } from '@angular/router';
interface IformatSpecification {
  FieldId: number;
  FieldName: string;
  FieldValueIds: number[];
  FieldValues: string[];
  IsFilter: boolean;
  FieldGroupId: number;
  FieldGroupName: string;
}

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent {
  constructor(
    private s_spinner: NgxSpinnerService,
    private s_standart: StandartSearchService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    CategoryId: new FormControl(null, [Validators.required]),
    BrandId: new FormControl(null, [Validators.required]),
    LinkId: new FormControl(null, [Validators.required]),
    RefId: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    IsVisible: new FormControl(false, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    DescriptionShort: new FormControl(null),
    ReleaseDate: new FormControl(new Date(), [Validators.required]),
    KeyWords: new FormControl(null, [Validators.required]),
    Title: new FormControl(null),
    IsActive: new FormControl(false, [Validators.required]),
    TaxCode: new FormControl(null),
    MetaTagDescription: new FormControl(null),
    SupplierId: new FormControl(null),
    ShowWithoutStock: new FormControl(false),
    AdWordsRemarketingCode: new FormControl(null),
    LomadeeCampaignCode: new FormControl(null),
    Score: new FormControl(null),
  });
  permission_page = {product_create_or_edit: ['super-admin', 'product-admin.vtex.product-vtex.create']};
  formSpecification: FormGroup = new FormGroup({});
  @Input() agregados: Iproduct3[];
  @Input() status: 'create' | 'edit' = 'create';
  @Input() vtexProduct: IvtexProducts;
  @Output() product = new EventEmitter<IvtexResponseProduct>();

  isPanelCategoriesVisible: boolean = false;
  suscriptionCategories: Subscription;
  selectionState: 'marcas' | 'categorias' = 'categorias';
  isLoadCategories: boolean = true;
  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  categorySelect: number;
  brandSelect: number;
  isLoadProduct: boolean = false;
  isLoadSpecifications: boolean = false;
  suscriptionProducts: Subscription;
  vtexSpecificationProduct: Ispecification[] = [];
  specificationRadio = null;

  @Output() vtexSpecifications = new EventEmitter<{
    specification_products: Ispecification[];
    specification_skus: Ispecification[];
  }>();
  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0

  stateInitUpdate(): void {
    const {
      Name,
      CategoryId,
      BrandId,
      LinkId,
      RefId,
      IsVisible,
      Description,
      DescriptionShort,
      ReleaseDate,
      KeyWords,
      Title,
      IsActive,
      TaxCode,
      MetaTagDescription,
      SupplierId,
      ShowWithoutStock,
      AdWordsRemarketingCode,
      LomadeeCampaignCode,
      Score,
    } = this.vtexProduct;

    this.brandSelect = BrandId;
    this.categorySelect = CategoryId;

    this.form.setValue({
      Name,
      CategoryId,
      BrandId,
      LinkId,
      RefId,
      IsVisible,
      Description,
      DescriptionShort,
      ReleaseDate,
      KeyWords,
      Title,
      IsActive,
      TaxCode,
      MetaTagDescription,
      SupplierId,
      ShowWithoutStock,
      AdWordsRemarketingCode,
      LomadeeCampaignCode,
      Score,
    });
    this.changeSpecifications();
  }

  add(name, id): void {
    if (this.selectionState == 'categorias') {
      this.form.controls['CategoryId'].setValue(name);
      this.categorySelect = id;
      this.changeSpecifications();
    } else if (this.selectionState == 'marcas') {
      this.form.controls['BrandId'].setValue(name);
      this.brandSelect = id;
    }
    this.closeVtexCategories();
  }

  closeVtexCategories(): void {
    this.isPanelCategoriesVisible = false;
    this.s_spinner.hide('spinner-categories');
    if (this.suscriptionCategories) {
      this.suscriptionCategories.unsubscribe();
    }
  }

  writingName(): void {
    const _textLink: any = this.form.controls['Name'].value;
    const textLink = _textLink
      .replaceAll(/\s{2,}|\s/g, '-')
      .replaceAll(/,|\./g, '');
    this.form.controls['LinkId'].setValue(textLink);
  }

  addVtexCategory(): void {
    this.isPanelCategoriesVisible = true;
    this.s_spinner.show('spinner-categories');
    this.isLoadCategories = true;
    this.selectionState = 'categorias';
    this.suscriptionCategories = this.s_standart
      .index('products-admin/vtex/vtex-categories')
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.isLoadCategories = false;
      });
  }

  addVtexBrand(): void {
    this.isPanelCategoriesVisible = true;
    this.s_spinner.show('spinner-categories');
    this.isLoadCategories = true;
    this.selectionState = 'marcas';
    this.suscriptionCategories = this.s_standart
      .index('products-admin/vtex/vtex-brand')
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.isLoadCategories = false;
      });
  }

  convertDataSpecificationForServer() {
    const dataSpecification = Object.assign({}, this.formSpecification.value);
    const sendSpecifications: IformatSpecification[] = [];
    // eslint-disable-next-line guard-for-in
    for (const specification in dataSpecification) {
      const itemSpecification = this.vtexSpecificationProduct.find(
        (x) => x.FieldId == specification
      );
      const FieldId = itemSpecification?.FieldId!;
      const FieldName = itemSpecification?.Name!;
      const FieldValueIds = dataSpecification[specification] && (Array.isArray(dataSpecification[specification])) ? dataSpecification[specification].map(value => {
        return itemSpecification?.Values.find(x => x.Value == value)?.FieldValueId;
      }) : dataSpecification[specification] ? [specification] : [];
      const FieldValues = dataSpecification[specification] && Array.isArray(dataSpecification[specification]) ? dataSpecification[specification] : dataSpecification[specification] ? [dataSpecification[specification]] : [];
      const IsFilter = itemSpecification?.IsFilter!;
      const FieldGroupName = itemSpecification?.FieldGroupName!;
      const FieldGroupId = itemSpecification?.FieldGroupId!;
       sendSpecifications.push({FieldId, FieldName, FieldValueIds, FieldValues, IsFilter, FieldGroupId, FieldGroupName});
    }
    return sendSpecifications;
  }

  saveProduct(stateSave = 'saveAndSkus') {
    if (this.form.valid && this.formSpecification.valid) {
      const sendData = Object.assign({}, this.form.getRawValue());
      sendData.CategoryId = this.categorySelect;
      sendData.BrandId = this.brandSelect;
      sendData.ReleaseDate = formatDate(
        new Date(sendData.ReleaseDate),
        'yyyy/MM/dd',
        'en'
      );
      const collection = collect(this.agregados);
      const products_ids = collection.flatMap((value) => value.id);
      this.isLoadProduct = true;
      const specifications = this.convertDataSpecificationForServer();

      if (this.status == 'create') {
        this.suscriptionProducts = this.s_standart
          .store('products-admin/vtex/product-vtex', {
            specifications,
            products_ids: products_ids.all(),
            ...sendData,
          })
          .subscribe(
            (res) => {
              this.isLoadProduct = false;
              if (stateSave == 'onlySave') {
                this.router.navigate(['admin-products/vtex-products'], {
                  queryParams: { search: res.data.vtex_api_id },
                });
                return;
              }
              this.product.emit(res.data);
            },
            () => {
              this.isLoadProduct = false;
            }
          );
      } else if (this.status == 'edit') {
        this.suscriptionProducts = this.s_standart
          .updatePut(
            'products-admin/vtex/product-vtex/' + this.vtexProduct.Id,
            { specifications, products_ids: products_ids.all(), ...sendData }
          )
          .subscribe(
            (res) => {
              this.isLoadProduct = false;
              if (stateSave == 'onlySave') {
                this.router.navigate(['admin-products/vtex-products'], {
                  queryParams: { search: this.vtexProduct.Id },
                });
                return;
              }
              this.product.emit(res.data);
            },
            () => {
              this.isLoadProduct = false;
            }
          );
      }
    } else {
      this.form.markAllAsTouched();
      this.formSpecification.markAllAsTouched();
    }
  }

  onChangeStepper(event): void {
    if (event.selectedIndex == 1) {
      this.asigneDataFormCreation();
    }
  }

  asigneDataFormCreation(): void {
    if (this.status == 'edit') {
      this.stateInitUpdate();
      return;
    }
    this.form.controls['Name'].setValue(this.agregados[0].name);
    this.form.controls['Title'].setValue(this.agregados[0].name);
    let refId: string = '';
    this.agregados.forEach((value, index) => {
      if (index == 0) { refId += value.code; }
      else { refId += '-' + value.code; }
    });
    this.form.controls['RefId'].setValue(refId);
    const _textLink: any = this.form.controls['Name'].value;
    let textLink = _textLink
      .replaceAll(/\s{2,}|\s/g, '-')
      .replaceAll(/,|\./g, '');
    this.form.controls['LinkId'].setValue(textLink);
  }

  changeSpecifications(): void {
    this.isLoadSpecifications = true;
    this.suscriptionProducts = this.s_standart
      .index('products-admin/vtex/vtex-specification/' + this.categorySelect)
      .subscribe(
        (res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.vtexSpecifications.emit(res.data);
            res.data.specification_products.forEach((element) => {
              const specification = this.vtexProduct?.Specifications.find(
                (item) => item.FieldId == element.FieldId
              );
              let value;
              if (specification) { value = element.FieldTypeName == 'Radio' ? specification.FieldValues[0] : specification.FieldValues; }
              let control: FormControl;
              if (element.IsRequired) {
                control = new FormControl(value, [Validators.required]);
              } else { control = new FormControl(value); }
              this.formSpecification.addControl(element.FieldId, control);
            });
            this.vtexSpecificationProduct = res.data.specification_products;
          }
          this.isLoadSpecifications = false;
        },
        () => {
          this.isLoadSpecifications = false;
        }
      );
  }

  checkState(event, el, padre) {
    event.preventDefault();
    const val = this.formSpecification.controls[padre];
    if (val.value && val.value === el.value) {
      el.checked = false;
      val.setValue(null);
    } else {
      val.setValue(el.value);
      el.checked = true;
    }
  }

  saveInServerSpecifications(): void {
    if (this.formSpecification.valid) {
      this.s_spinner.show();
      this.s_standart
        .updatePut(
          'products-admin/vtex/product-specification/' + this.vtexProduct.Id,
          this.formSpecification.value
        )
        .subscribe(
          (res) => {
            if (res && res.hasOwnProperty('success') && res.success) {
            }
            this.s_spinner.hide();
          },
          () => {
            this.s_spinner.hide();
          }
        );
    }
  }
}
