import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateOrEdit } from "../../../../class/create-or-edit";
import { IPrice, IProductPrice } from "../../../../interfaces/iprice";
import { StandartSearchService } from "../../../../services/standart-search.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-create-or-edit-price",
  templateUrl: "./create-or-edit-price.component.html",
  styleUrls: ["./create-or-edit-price.component.css"],
})
export class CreateOrEditPriceComponent
  extends CreateOrEdit<IProductPrice>
  implements OnInit
{
  constructor(
    public location: Location,
    public act_router: ActivatedRoute,
    public standard_service: StandartSearchService,
    public router: Router
  ) {
    super(act_router, standard_service, router);
    this.urlSave = `catalogs/products/${this.getId("product_id")}/prices`;
  }

  title: string = "Precios";
  urlSave: string = "catalogs/prices";
  form: FormGroup = new FormGroup({
    price_group_1: new FormControl(null, []),
    price_group_2: new FormControl(null, []),
    price_group_3: new FormControl(null, []),
    price_group_4: new FormControl(null, []),
  });

  ngOnInit(): void {
    this.init();
  }

  setData(data?: any): void {
    this.data = data;
    console.log(this.data);
  }

  getDataForSendServer() {
    if (this.form.valid) {
      return this.form.value;
    }
  }
}
