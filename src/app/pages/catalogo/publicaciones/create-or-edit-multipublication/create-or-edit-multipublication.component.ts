import { Component, OnInit, ViewChild } from "@angular/core";
import { CtableAndPaginator } from "../../../../class/ctable-and-paginator";
import { ActivatedRoute } from "@angular/router";
import { StandartSearchService } from "../../../../services/standart-search.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ItableAndPaginator } from "../../../../interfaces/itable-and-paginator";
import { CTemplateSearch } from "../../../../class/ctemplate-search";
import { HeaderSearchComponent } from "../../../../components/header-search/header-search.component";
import { Iproduct3 } from "../../../../interfaces/iproducts";
import { IvtexResponseProduct } from "../../../../interfaces/vtex/iproducts";
import { FormGroup } from '@angular/forms';

@Component({
  selector: "app-create-or-edit-multipublication",
  templateUrl: "./create-or-edit-multipublication.component.html",
  styleUrls: ["./create-or-edit-multipublication.component.css"],
})
export class CreateOrEditMultipublicationComponent implements OnInit {
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  constructor(
    public activated_route: ActivatedRoute,
    public s_standart: StandartSearchService,
    public snack_bar: MatSnackBar
  ) {}

  products: Iproduct3[] = []
  url: string = "products-admin/product-simple";
  productsSelections: Iproduct3[] = [];
  goPass: number = 1;
  formFirst: FormGroup = new FormGroup({

  })

  ngOnInit(): void {}

  loadData(event): void{
    this.products = event;
  }

  agregarProducto(id): void{
    const productFind = this.products.findIndex(item => item.id == id)

    if (productFind == -1) return

    const productsRelations = this.productsSelections.find(item => item.id == id)
    if (productsRelations) return;

    this.productsSelections.push(this.products[productFind]);
    this.products.splice(productFind, 1);
  }

  desagregarProducto(id): void{
    const productFind = this.productsSelections.findIndex(item => item.id == id)

    if (productFind == -1) return

    const productsRelations = this.products.find(item => item.id == id)
    if (productsRelations) return;

    this.products.push(this.productsSelections[productFind]);
    this.productsSelections.splice(productFind, 1);
  }


}
