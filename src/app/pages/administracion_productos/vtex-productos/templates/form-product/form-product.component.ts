import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { Iproduct3 } from "../../../../../interfaces/iproducts";
import { StandartSearchService } from "../../../../../services/standart-search.service";
import { SwalService } from "../../../../../services/swal.service";
import collect from "collect.js";
import { IvtexProducts, IvtexResponseProduct } from "../../../../../interfaces/vtex/iproducts";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-product",
  templateUrl: "./form-product.component.html",
  styleUrls: ["./form-product.component.css"],
})
export class FormProductComponent implements OnInit {
  constructor(
    private s_spinner: NgxSpinnerService,
    private s_standart: StandartSearchService
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
  @Input() agregados: Iproduct3[];
  @Input() status:'create'|'edit' = 'create';
  @Input() vtexProduct:IvtexProducts;

  isPanelCategoriesVisible: boolean = false;
  suscriptionCategories: Subscription;
  selectionState: "marcas" | "categorias" = "categorias";
  isLoadCategories: boolean = true;
  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  categorySelect: number;
  brandSelect: number;
  isLoadProduct: boolean = false;
  @Output() product = new EventEmitter<IvtexResponseProduct>();;

  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;

  suscriptionProducts: Subscription;

  ngOnInit(): void {}

  // @Input() vtexProduct:IvtexProducts = null;
  stateInitUpdate():void{
        let {
        Id,
        Name,
        DepartmentId,
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
          // DepartmentId,
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
        })
  }

  add(name, id): void {
    // alert(id)
    if (this.selectionState == "categorias") {
      this.form.controls["CategoryId"].setValue(name);
      this.categorySelect = id;
    } else if (this.selectionState == "marcas") {
      this.form.controls["BrandId"].setValue(name);
      this.brandSelect = id;
    }
    this.closeVtexCategories();
  }

  closeVtexCategories(): void {
    this.isPanelCategoriesVisible = false;
    this.s_spinner.hide("spinner-categories");
    if (this.suscriptionCategories) {
      this.suscriptionCategories.unsubscribe();
    }
  }

  writingName(): void {
    console.log("fer");
    const _textLink: any = this.form.controls["Name"].value;
    let textLink = _textLink
      .replaceAll(/\s{2,}|\s/g, "-")
      .replaceAll(/,|\./g, "");
    this.form.controls["LinkId"].setValue(textLink);
  }

  addVtexCategory(): void {
    this.isPanelCategoriesVisible = true;
    this.s_spinner.show("spinner-categories");
    this.isLoadCategories = true;
    this.selectionState = "categorias";
    this.suscriptionCategories = this.s_standart
      .index("products-admin/vtex-categories")
      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res.data;
        this.isLoadCategories = false;
      });
  }

  addVtexBrand(): void {
    this.isPanelCategoriesVisible = true;
    this.s_spinner.show("spinner-categories");
    this.isLoadCategories = true;
    this.selectionState = "marcas";
    this.suscriptionCategories = this.s_standart
      .index("products-admin/vtex-brand")
      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res.data;
        this.isLoadCategories = false;
      });
  }

  saveProduct() {
    if (this.form.valid) {
      let sendData = Object.assign({}, this.form.getRawValue());
      sendData.CategoryId = this.categorySelect;
      sendData.BrandId = this.brandSelect;
      sendData.ReleaseDate = formatDate(new Date(sendData.ReleaseDate ),'yyyy/MM/dd','en');
      const collection =  collect(this.agregados)
      const products_ids =  collection.flatMap(value => value.id);
      this.isLoadProduct = true;
      if(this.status == "create"){
        this.suscriptionProducts = this.s_standart
          .store("products-admin/product-vtex", {products_ids:products_ids.all(),...sendData})
          .subscribe(
            (res) => {
              console.log(res);
              this.isLoadProduct = false;
              this.product.emit(res.data);
            },
            (err) => {
              this.isLoadProduct = false;
            }
          );
      }
      else if(this.status == "edit"){
        this.suscriptionProducts = this.s_standart
        .updatePut("products-admin/product-vtex/"+this.vtexProduct.Id, {products_ids:products_ids.all(),...sendData})
        .subscribe(
          (res) => {
            console.log(res);
            this.isLoadProduct = false;
            this.product.emit(res.data);
          },
          (err) => {
            this.isLoadProduct = false;
          }
        );
      }
    }
  }

  onChangeStepper(event): void {
    console.log(event);
    // if (event.previouslySelectedIndex == 0) {
    //   if (this.agregados.length == 0) {
    //     SwalService.swalToast(
    //       "Error donde quieres ingresar sin un previo paso"
    //     );
    //   }
    // }

    if (event.selectedIndex == 1) {
      this.asigneDataFormCreation();
    }
  }

  asigneDataFormCreation(): void {
    if(this.status == "edit"){
      this.stateInitUpdate()
      return
    }
    this.form.controls["Name"].setValue(this.agregados[0].name);
    this.form.controls["Title"].setValue(this.agregados[0].name);
    let refId: string = "";
    this.agregados.forEach((value, index) => {
      if (index == 0) refId += value.code;
      else refId += "-" + value.code;
    });
    console.log(refId);
    // const refId1 = this.agregados.map(value=>value.code)
    // console.log(refId1);
    this.form.controls["RefId"].setValue(refId);
    const _textLink: any = this.form.controls["Name"].value;
    let textLink = _textLink
      .replaceAll(/\s{2,}|\s/g, "-")
      .replaceAll(/,|\./g, "");
    this.form.controls["LinkId"].setValue(textLink);
  }

  selectedTabChange($event): void {
    console.log($event);
    if(this.categorySelect){
      this.suscriptionProducts = this.s_standart
      .index("products-admin/vtex-specification/"+this.categorySelect)
      .subscribe(
        (res) => {
          console.log(res);
          this.isLoadProduct = false;
        },
        (err) => {
          this.isLoadProduct = false;
        }
      );
    }

  }
}
