import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatDrawer } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";
import { Crud } from "../../../../class/crud";
import { IPrice, IPriceGroup, IProductPrice } from "../../../../interfaces/iprice";
import { StandartSearchService } from "../../../../services/standart-search.service";
import { ModalListPricesComponent } from "../tools/modal-list-prices/modal-list-prices.component";

@Component({
  selector: "app-prices-index",
  templateUrl: "./prices-index.component.html",
  styleUrls: ["./prices-index.component.css"],
})
export class PricesIndexComponent
  extends Crud<IProductPrice>
  implements OnInit
{
  constructor(
    // private _location: Location,
    protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar,
    public act_router: ActivatedRoute,
    private dialog: MatDialog,
    // private s_permissions: NgxPermissionsService,
  ) {
    super(standardService, snackBar);
  }

  @ViewChild(MatDrawer) sidenavPrice: MatDrawer;
  url: string = "catalogs/products/prices";
  isOpenPrice: boolean = false;
  dataPriceModify: any = {
    id: null,
    name: null,
    isLoading: false,
    data: null,
    isEdit: false,
  };
  isLoadingNewPrice: boolean = false;
  pricesGroup: IPriceGroup[] = [];

  // form: FormGroup = new FormGroup({
  //   price_group_1: new FormControl(null, []),
  //   price_group_2: new FormControl(null, []),
  //   price_group_3: new FormControl(null, []),
  //   price_group_4: new FormControl(null, []),

  //   tax_price_group_1: new FormControl(null, []),
  //   tax_price_group_2: new FormControl(null, []),
  //   tax_price_group_3: new FormControl(null, []),
  //   tax_price_group_4: new FormControl(null, []),
  // });

  form: FormGroup = new FormGroup({});

  // roles = {
  //   ml: ['super-admin','prices-ml'],
  //   my: ['super-admin','prices-my'],
  //   web: ['product-admin.vtex.product-vtex.create', 'product-admin.vtex.product-vtex.update'],
  // }
  ngOnInit(): void {
    // var permissions = this.s_permissions.getPermissions();
    // console.log({ permissions });
    this.standardService.index(`${this.url}/prices-group`).subscribe((res: any) => {
      this.generateTemplateForm(res.data);
      this.pricesGroup =  res.data;
    });
  }

  generateTemplateForm(group): void {
    // const newFormGroup: FormGroup = this.formPublication.controls[
      //   'attribute'
      // ] as FormGroup;
      group.forEach((element) => {
      const control_input = new FormControl(null);
      const control_input_with_tax = new FormControl(null);
      this.form.addControl(
        `price_group_${element.id}`,
        control_input
      );
      this.form.addControl(
        `tax_price_group_${element.id}`,
        control_input_with_tax
      );
    });

  }

  openSidenavPriceForEdit(id: number): void {
    this.sidenavPrice.open();
    this.dataPriceModify.isLoading = true;
    this.dataPriceModify.id = id;
    this.dataPriceModify.name = this.data.get(id).name;
    this.dataPriceModify.isEdit = true;
    this.form.reset();
    this.standardService
      .show(`catalogs/products/${id}/prices/edit`)
      .subscribe((res: any) => {
        this.dataPriceModify.data = res;
        this.dataPriceModify.isLoading = false;
        this.assignData(res?.data);
      });
  }

  openSidenavPriceForCreate(id: number): void {
    this.sidenavPrice.open();
    this.dataPriceModify.isLoading = true;
    this.dataPriceModify.id = id;
    this.dataPriceModify.name = this.data.get(id).name;
    this.dataPriceModify.isLoading = false;
    this.dataPriceModify.isEdit = false;
    this.form.reset();
    this.dataPriceModify.data = this.data.get(id);
  }

  openDialogListPrices(key): void {
    const dialogRef = this.dialog.open(ModalListPricesComponent, {
      data: {
        id: key,
        product_name: this.data.get(key).name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.standardService
      .show(`catalogs/products/${key}/prices/edit?type=full`)
      .subscribe((res: any) => {
        this.data.get(key).last_prices = res.data.last_prices;
      });
    });
  }

  // addOrRemoveTax(name: string, isTax = false): void {
  //   console.log(this.form.get(name).value);
  //   if (isTax) {
  //     const price_out_tax = this.form.get("tax_" + name).value / 1.12;

  //     this.form.get(name).setValue(price_out_tax.toFixed(2));
  //   } else {
  //     const price_with_tax = this.form.get(name).value * 1.12;
  //     console.log(price_with_tax);

  //     this.form.get("tax_" + name).setValue(price_with_tax.toFixed(2));
  //   }
  // }

  addOrRemoveTax(id: number, isTax = false): void {
    console.log(this.form.get('price_group_'+id).value);
    const name = 'price_group_'+id;
    if (isTax) {
      const price_out_tax = this.form.get("tax_" + name).value / 1.12;

      this.form.get(name).setValue(price_out_tax.toFixed(2));
    } else {
      const price_with_tax = this.form.get(name).value * 1.12;
      console.log(price_with_tax);

      this.form.get("tax_" + name).setValue(price_with_tax.toFixed(2));
    }
  }

  saveInServer(): void {
      this.isLoadingNewPrice = true;
      this.standardService
        .store(
          `catalogs/products/${this.dataPriceModify.id}/prices`,
          this.form.value
        )
        .subscribe((res:{success:boolean, data: IProductPrice}) => {
          this.data.get(this.dataPriceModify.id).last_prices = res.data.last_prices;
          this.snackBar.open("Se ha guardado el precio", "Cerrar", {
            duration: 3000,
          });
          console.log({res, data: this.data.get(this.dataPriceModify.id)});
          this.sidenavPrice.close();
          this.isLoadingNewPrice = false;
        },error => {
          console.log(error);
          this.isLoadingNewPrice = false;
          this.snackBar.open("No se ha podido guardar el precio", "Cerrar", {
            duration: 3000,
            });
        });
    // }
  }

  assignData(prices: IPrice[]): void {
    // this.pricesGroup.forEach((element) => {
    //   const price_group = `price_group_${element.id}`;
    //   const tax_price_group = `tax_price_group_${element.id}`;
    //   this.form.get(price_group).setValue(product[price_group]);
    //   this.form.get(tax_price_group).setValue(product[tax_price_group]);
    // });
    prices.forEach(element => {
      this.form.get("price_group_" + element.price_group_id).setValue(element.price.toFixed(2));
      this.form.get("tax_price_group_" + element.price_group_id).setValue((element.price*1.12).toFixed(2));
    });
  }

  getParams(key: string): any {
    return this.act_router.snapshot.params[key];
  }

  //  getData(data) {
  //   this.data = new Map<any, IProductPrice>(data.products.data.map((item: IProductPrice) => [item[this.key], item]));
  //   this.pricesGroup =  data.prices_group;
  // }

  
}
