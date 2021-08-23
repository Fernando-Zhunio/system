import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { StandartSearchService } from "./../../../../services/standart-search.service";
import { Subscription } from "rxjs";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Ipagination } from "./../../../../interfaces/ipagination";
import { Iproduct3 } from "../../../../interfaces/iproducts";
import { HeaderSearchComponent } from "../../../../components/header-search/header-search.component";
import { SwalService } from "../../../../services/swal.service";
import { MatStepper } from "@angular/material/stepper";
import { FormProductComponent } from "./../templates/form-product/form-product.component";
import { FormSkusComponent } from "./../templates/form-skus/form-skus.component";
import {
  IvtexProducts,
  IvtexResponseProduct,
  IvtexSkuStore,
} from "./../../../../interfaces/vtex/iproducts";
import { ActivatedRoute } from "@angular/router";
import { Ispecification } from './../../../../interfaces/vtex/ispecification';

@Component({
  selector: "app-create-or-edit",
  templateUrl: "./create-or-edit.component.html",
  styleUrls: ["./create-or-edit.component.css"],
})
export class CreateOrEditComponent implements OnInit {
  constructor(
    private s_standart: StandartSearchService,
    private act_router: ActivatedRoute,
    private spinner_ngx: NgxSpinnerService
  ) {}
  form: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    // DepartmentId: new FormControl({ value: null, disabled: true }),
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
  formsSku: number[] = [];
  status: "create" | "edit" = "create";
  isload: boolean;
  url: string = "products-admin/vtex/product-simple";
  paginator: Ipagination<Iproduct3>;
  products: Iproduct3[] = [];
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @ViewChild("stepper") private myStepper: MatStepper;
  @ViewChild(FormProductComponent)
  private formProductComponent: FormProductComponent;
  idProduct: number;
  vtexProduct: IvtexProducts;
  agregados: Iproduct3[] = [];
  skus:IvtexSkuStore[] = [];

  ngOnInit(): void {

    /* Se ejecuta para comprobar si el estado es para editar */
    this.act_router.data.subscribe((res) => {
      if (res.isEdit) {
        this.status = "edit";
        this.spinner_ngx.show();
        const id = Number.parseInt(this.act_router.snapshot.paramMap.get("id"));
        this.s_standart.show('products-admin/vtex/product-vtex/'+id+'/edit').subscribe((res:{success:boolean,data:IvtexProducts})=>{
          console.log(res);
          if(res &&res.hasOwnProperty('success') && res.success){
            this.vtexProduct = res.data;
            SwalService.swalConfirmation("Editando\n"+this.vtexProduct.Name,"Vas a agregar un sku a este producto?","question","Si, quiero agreagar un sku","No, continuar")
            .then(result=>{
              if(!result.isConfirmed){
                this.goForward();
              }
            })
            this.spinner_ngx.hide();
          }
      },err=>{this.spinner_ngx.hide()});
    }});
  }

  formValidationOne: FormGroup = new FormGroup({
    agregados: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  formValidationTwo: FormGroup = new FormGroup({
    isValid: new FormControl(null, [Validators.required]),
  });

  goBack() {
    this.myStepper.previous();
  }

  goForward() {
    if(this.status == "edit") this.formValidationOne.controls['agregados'].setValue('fernando');
    this.myStepper.next();
  }

  getSkusAfterSaveProduct($event): void {
    if ($event) {
      this.skus = $event;
      this.formValidationTwo.controls["isValid"].setValue("fernando");
      this.goForward();
    }
  }

  agregar(id): void {
    const findProduct = this.products.findIndex((product) => product.id == id);
    if (findProduct == -1) {
      SwalService.swalToast("El producto no se puedo agregar");
      return;
    }
    this.agregados.push(this.products[findProduct]);
    this.formValidationOne.controls["agregados"].setValue(this.agregados);
    this.products.splice(findProduct, 1);
  }

  desagregar(id): void {
    const findProduct = this.agregados.findIndex((product) => product.id == id);
    console.log(findProduct);
    if (findProduct == -1) {
      SwalService.swalToast("El producto no se puedo remover");
      return;
    }
    this.formValidationOne.controls["agregados"].setValue(this.agregados);
    this.products.push(this.agregados[findProduct]);
    this.agregados.splice(findProduct, 1);
  }

  addFormSku(): void {
    if (this.formsSku.length == 0) {
      this.formsSku.push(1);
    } else {
      let index = this.formsSku.length - 1;
      this.formsSku.push(index + 1);
    }
  }

  onChangeStepper(event): void {
    if (event.previouslySelectedIndex == 0) {
      if (this.agregados.length == 0 && this.status !="edit") {
        SwalService.swalToast(
          "Error donde quieres ingresar sin un previo paso"
        );
        return;
      }
    }

    if (event.selectedIndex == 1) {
      this.formProductComponent.onChangeStepper(event);
    }
    // else{
    //   console.log(event);
    //   this.formSkusComponent.onChangeStepper(event);
    // }
  }

  loadData($event): void {
    this.paginator = $event.data;
    this.products =
      this.agregados.length > 0
        ? this.paginator.data.filter((item) => this.agregados.includes(item))
        : this.paginator.data;
    // if (this.agregados.length > 0) {
    //   this.productVtex;
    // }
    console.log(this.paginator);
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
    console.log(event);
  }

  vtexSpecificationsSkus:Ispecification[] = []
  vtexSpecificationsProduct:Ispecification[] = []
  getSpecification($event):void{
    this.vtexSpecificationsProduct = $event.specification_products;
    this.vtexSpecificationsSkus = $event.specification_skus;
  }
}
