import { Component, Input, OnInit, Sanitizer } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Iproduct3 } from "../../../../../interfaces/iproducts";
import { SwalService } from "../../../../../services/swal.service";
import { StandartSearchService } from "./../../../../../services/standart-search.service";
import { IproductVtexSku } from "./../../../../../interfaces/iproducts";
import {
  IvtexProducts,
  IvtexResponseProduct,
  IvtexSkuStore,
  vtexResponseSku,
} from "./../../../../../interfaces/vtex/iproducts";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "../../../../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-form-skus",
  templateUrl: "./form-skus.component.html",
  styleUrls: ["./form-skus.component.css"],
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

  status: "create" | "update" = "create";
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
    KitItensSellApart: new FormControl(null, []),
  });

  formFileSku: FormGroup = new FormGroup({
    IsMain: new FormControl(false, [Validators.required]),
    Label: new FormControl("", [Validators.required]),
    Name: new FormControl("", [Validators.required]),
    Text: new FormControl("", [Validators.required]),
    // Img:new FormControl(null,[Validators.required]),
  });

  file: File = null;
  imagesSku: any[] = [];
  currentImgSku: any;
  isLoadSku: boolean = false;
  server_vtex_file: string = environment.server_vtex_file;
  ngOnInit(): void {
    this.onChangeStepper(null);
  }

  onChangeStepper(event): void {
    const {
      ActivateIfPossible,
      CommercialConditionId,
      // CreationDate,
      CubicWeight,
      EstimatedDateArrival,
      Height,
      Id,
      IsActive,
      IsKit,
      isKitOptimized,
      Length,
      ManufacturerCode,
      MeasurementUnit,
      ModalType,
      Name,
      RealHeight,
      RealLength,
      RealWeightKg,
      RealWidth,
      ProductId,
      RefId,
      RewardValue,
      UnitMultiplier,
      // Videos,
      WeightKg,
      Width,
    } = this.sku;
    this.formSku.setValue({
      // ActivateIfPossible,
      CommercialConditionId,
      // CreationDate,
      CubicWeight,
      EstimatedDateArrival,
      Height,
      // Id,
      IsActive,
      IsKit,
      KitItensSellApart:isKitOptimized,
      Length,
      ManufacturerCode,
      MeasurementUnit,
      ModalType,
      Name,
      PackagedHeight:RealHeight,
      PackagedLength:RealLength,
      PackagedWeightKg:RealWeightKg,
      PackagedWidth:RealWidth,
      ProductId,
      RefId,
      RewardValue,
      UnitMultiplier,
      // Videos,
      WeightKg,
      Width,
    })
    // this.formSku.controls["ProductId"].setValue(this.sku.ProductId);
    // this.formSku.controls["Name"].setValue(this.sku.Name);
    // this.formSku.controls["RefId"].setValue(this.sku.RefId);
    // this.formSku.controls["CubicWeight"].setValue(this.sku.CubicWeight);
    // this.formSku.controls["Height"].setValue(this.sku.Height);
    // this.formSku.controls["Width"].setValue(this.sku.Width);
    // // this.imagesSku = this.sku.images ? this.sku.images : [];
  }

  saveInServeSku(): void {
    if (this.formSku.valid) {
      this.isLoadSku = true;
      this.s_standart
        .store("/products-admin/sku-vtex" + this.sku.Id, this.formSku.value)
        .subscribe((res) => {
          console.log(res);
          if (res && res.hasOwnProperty("success") && res.success) {
            this.status = "update";
          }
        });
    }
  }

  saveInServeSkuImg(): void {
    if (this.formFileSku.valid) {
      const formData = new FormData();
      const name = this.formFileSku.get("Name").value;
      formData.append("Img", this.file);
      formData.append("IsMain", this.formFileSku.get("IsMain").value);
      formData.append("Label", this.formFileSku.get("Label").value);
      formData.append("Name", name);
      formData.append("Text", this.formFileSku.get("Text").value);
      this.isLoadSku = true;
      this.ngx_spinner.show("sku-img");
      this.s_standart
        .uploadFormData(
          "products-admin/sku-vtex-image/" + this.sku.Id,
          formData
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (res && res.hasOwnProperty("success") && res.success) {
              // this.status = "update";
              const res_data = res.data;
              this.imagesSku.push({
                url: `${this.server_vtex_file}ids/${res_data.ArchiveId}/${name}.${this.file.type}`,
              });
            }
            this.ngx_spinner.hide("sku-img");
          },
          (err) => this.ngx_spinner.hide("sku-img")
        );
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
    this.s_standart
      .destory(`/sku-vtex-image/sku/${this.sku.Id}/image/${id}`)
      .subscribe((res) => {
        console.log(res);
        if (res && res.hasOwnProperty("success") && res.success) {
          const imgIndex = this.imagesSku.findIndex((item) => item.id === id);
          this.imagesSku.splice(imgIndex, 1);
          SwalService.swalToast("Eliminado con exito");
        }
      });
  }
}
