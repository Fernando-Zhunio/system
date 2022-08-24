import { Component, EventEmitter, Input, OnInit, Output, Sanitizer } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Iproduct3 } from '../../../../../interfaces/iproducts';
import { SwalService } from '../../../../../services/swal.service';
import { StandartSearchService } from './../../../../../services/standart-search.service';
import { IproductVtexSku } from './../../../../../interfaces/iproducts';
import {
  IvtexProducts,
  IvtexResponseProduct,
  IvtexSkuStore,
  vtexResponseSku,
} from './../../../../../interfaces/vtex/iproducts';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ispecification } from './../../../../../interfaces/vtex/ispecification';
import { Subscription } from 'rxjs';
import { collect } from 'collect.js';
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
  selector: 'app-form-skus',
  templateUrl: './form-skus.component.html',
  styleUrls: ['./form-skus.component.css'],
})
export class FormSkusComponent implements OnInit {
  constructor(
    private s_standart: StandartSearchService,
    private sanitizer: DomSanitizer,
    private ngx_spinner: NgxSpinnerService
  ) {}

  // @Input() idProduct: number;
  @Input() sku: IvtexSkuStore = null;
  @Input() vtex_product: IvtexResponseProduct;
  @Input() vtexSpecificationsSkus: Ispecification[] = [];
  @Output() emitSave = new EventEmitter<any>();

  @Input() status: 'create' | 'update' = 'create';
  formSku: FormGroup = new FormGroup({
    ProductId: new FormControl(null, [Validators.required]),
    IsActive: new FormControl(null, []),
    Name: new FormControl(null, [Validators.required]),
    RefId: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    PackagedHeight: new FormControl(null, [Validators.required]),
    PackagedLength: new FormControl(null, [Validators.required]),
    PackagedWidth: new FormControl(null, [Validators.required]),
    PackagedWeightKg: new FormControl(null, [Validators.required]),
    Height: new FormControl(null, []),
    Length: new FormControl(null, []),
    Width: new FormControl(null, []),
    WeightKg: new FormControl(null, []),
    CubicWeight: new FormControl(null, []),
    IsKit: new FormControl(false, []),
    RewardValue: new FormControl(null, []),
    EstimatedDateArrival: new FormControl(null, []),
    ManufacturerCode: new FormControl(null, []),
    CommercialConditionId: new FormControl(null, []),
    MeasurementUnit: new FormControl(null, []),
    UnitMultiplier: new FormControl(null, [Validators.required]),
    ModalType: new FormControl(null, []),
    KitItensSellApart: new FormControl(false, []),
  });


  formFileSku: FormGroup = new FormGroup({
    IsMain: new FormControl(false, [Validators.required]),
    Label: new FormControl('', [Validators.required]),
    Name: new FormControl('', [Validators.required]),
    Text: new FormControl('', [Validators.required]),
    // Img:new FormControl(null,[Validators.required]),
  });
  formSpecification: FormGroup = new FormGroup({});
  permission_page = {product_create_or_edit: ['super-admin', 'product-admin.vtex.product-vtex.edit']}
  file: File = null;
  imagesSku: {
    FileId: number;
    ImageName: string;
    ImageUrl: string;
  }[] = [];
  currentImgSku: any;
  isLoadSku: boolean = false;
  isLoadDestroyImg: boolean = false;
  server_vtex_file: string = environment.server_vtex_file;
  suscriptionProducts: Subscription;
  ngOnInit(): void {
    this.onChangeStepper(null);
  }

  onChangeStepper(event): void {
    if (this.status == 'update') {
      this.sku.RewardValue = !this.sku.RewardValue ? null : this.sku.RewardValue;
      this.sku.KitItensSellApart = this.sku.KitItensSellApart || false;

      const collect_sku = collect(this.sku);
      const diff = collect_sku.intersectByKeys(this.formSku.getRawValue());
      this.formSku.setValue(diff.all());
      this.imagesSku = Array.isArray(this.sku.Images) ? this.sku.Images : [];
    } else{
      this.formSku.setValue({
        CommercialConditionId: this.sku.CommercialConditionId,
        CubicWeight: this.sku.CubicWeight,
        EstimatedDateArrival: this.sku.EstimatedDateArrival,
        Height: this.sku.RealHeight,
        IsActive: this.sku.IsActive,
        IsKit: this.sku.IsKit,
        KitItensSellApart: this.sku.KitItensSellApart || false,
        Length: this.sku.RealLength,
        ManufacturerCode: this.sku.ManufacturerCode,
        MeasurementUnit: this.sku.MeasurementUnit,
        ModalType: this.sku.ModalType,
        Name: this.sku.Name,
        PackagedHeight: this.sku.Height,
        PackagedLength: this.sku.Length,
        PackagedWeightKg: this.sku.WeightKg,
        PackagedWidth: this.sku.Width,
        ProductId: this.sku.ProductId,
        RewardValue: this.sku.RewardValue,
        UnitMultiplier: this.sku.UnitMultiplier,
        WeightKg: this.sku.RealWeightKg,
        Width: this.sku.RealWidth,
        RefId: this.sku.RefId
      });
    }

    this.selectedTabChange();
  }
  selectedTabChange(): void {
    this.vtexSpecificationsSkus.forEach((element) => {
      const specification = this.sku?.Specifications ? this.sku?.Specifications.find(
        (item) => item.FieldId == element.FieldId
      ) : null;
      let value;
      if (specification) value = element.FieldTypeName == 'Radio' ? specification.FieldValues[0] : specification.FieldValues;
      let control: FormControl;
      if (element.IsRequired)
        control = new FormControl(value, [Validators.required]);
      else control = new FormControl(value);
      // formGroup.addControl(element.FieldId, control);
      this.formSpecification.addControl(element.FieldId, control);
    });
    // }
    //   },
    //   (err) => {
    //     // this.isLoadProduct = false;
    //   }
    // );
  }


  convertDataSpecificationForServer() {
    let dataSpecification = Object.assign({}, this.formSpecification.value);
    // let specifications = [];
    const sendSpecifications: IformatSpecification[] = [];
    for (const specification in dataSpecification) {
      const itemSpecification = this.vtexSpecificationsSkus.find(
        (x) => x.FieldId == specification
      );
      const FieldId = itemSpecification.FieldId;
      const FieldName = itemSpecification.Name;

      const FieldValueIds = dataSpecification[specification] && (Array.isArray(dataSpecification[specification])) ? dataSpecification[specification].map(value => {
        return itemSpecification.Values.find(x => x.Value == value).FieldValueId
      }) : dataSpecification[specification] ? [specification] : [];
      const FieldValues = dataSpecification[specification] && Array.isArray(dataSpecification[specification]) ? dataSpecification[specification] : dataSpecification[specification] ? [dataSpecification[specification]] : [];
      const IsFilter = itemSpecification.IsFilter;
      const FieldGroupName = itemSpecification.FieldGroupName;
      const FieldGroupId = itemSpecification.FieldGroupId;
       sendSpecifications.push({FieldId, FieldName, FieldValueIds, FieldValues, IsFilter, FieldGroupId, FieldGroupName})
    }
    return sendSpecifications;
  }


  saveInServeSku(): void {
    if (this.formSku.valid && this.formSpecification.valid) {
      this.isLoadSku = true;
      const specifications = this.convertDataSpecificationForServer();
      this.s_standart
        .updatePut(
          // "/products-admin/vtex/sku-vtex" + this.sku.Id,
          `products-admin/vtex/products/${this.sku.ProductId}/skus/${this.sku.Id}`,
          {specifications, ...this.formSku.getRawValue()}
        )
        .subscribe((res) => {
          this.emitSave.emit({data: res});
          if (res && res.hasOwnProperty('success') && res.success) {
            this.status = 'update';
            // this.emitSave.emit()
          }
        });
    }
    else{
      SwalService.swalToast('Aun hay campos por completar en este formulario o en especificaciones', 'error', 'top-end')
    }
  }

  saveInServeSkuImg(): void {
    if (this.formFileSku.valid) {
      const formData = new FormData();
      const name = this.formFileSku.get('Name').value;
      formData.append('Img', this.file);
      formData.append('IsMain', this.formFileSku.get('IsMain').value);
      formData.append('Label', this.formFileSku.get('Label').value);
      formData.append('Name', name);
      formData.append('Text', this.formFileSku.get('Text').value);
      this.isLoadSku = true;
      this.ngx_spinner.show('sku-img');
      this.s_standart
        .uploadFormData(
          'products-admin/vtex/sku-vtex-image/' + this.sku.Id,
          formData
        )
        .subscribe(
          (res) => {
            if (res && res.hasOwnProperty('success') && res.success) {
              /**
               * "Id": number,
               * "ArchiveId": number,
               * "SkuId": number,
               * "Name": string,
               * "IsMain": boolean,
               * "Label": string
               **/
              const res_data = res.data;
              this.imagesSku.push({
                FileId: res_data.FileId,
                ImageName: res_data.ImageName,
                // ImageUrl: `${this.server_vtex_file}ids/${res_data.ArchiveId}/${name}.${this.file.type}`,
                ImageUrl: res.data.ImageUrl,
              });
            }
            this.ngx_spinner.hide('sku-img');
            this.formFileSku.reset();
            this.file = null;
            this.currentImgSku = null;
          },
          () => this.ngx_spinner.hide('sku-img')
        );
    }
    else{
      SwalService.swalToast('Aun hay campos por completar en este formulario o en especificaciones', 'error', 'top-end')
    }
  }

  loadImgSku(event): void {
    let img: any = event.target.files[0];
    if (img) {
      this.file = img;
      this.currentImgSku = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(img)
      );
    }
  }

  destroyImg(id): void {
    if (!this.isLoadDestroyImg){
      this.s_standart
        .destory(
          `products-admin/vtex/sku-vtex-image/sku/${this.sku.Id}/image/${id}`
        )
        .subscribe((res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            const imgIndex = this.imagesSku.findIndex(
              (item) => item.FileId === id
            );
            this.imagesSku.splice(imgIndex, 1);
            SwalService.swalToast('Eliminado con exito');
          }
        });
    }
  }
}
