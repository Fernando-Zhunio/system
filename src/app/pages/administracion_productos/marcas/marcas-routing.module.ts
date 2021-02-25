import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from "@angular/core";
import { MarcasCreateOrEditComponent } from "./marcas-create-or-edit/marcas-create-or-edit.component";
import { MarcasComponent } from "./marcas.component";
import { NgxPermissionsGuard } from "ngx-permissions";

@Component({
  selector: "app-marcas",
  template: "<router-outlet></router-outlet>",
})
export class MarcasMainComponents {}

const routes: Routes = [
  {
    path: "",
    component: MarcasMainComponents,
    children: [
      {
        path: "",
        component: MarcasComponent,
        data: {
          permissions: {
            only: ["super-admin", "products-admin.brands.index"],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: "create",
        component: MarcasCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.brands.create"],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: "edit/:id",
        component: MarcasCreateOrEditComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          isEdit: true,
          permissions: {
            only: ["super-admin", "products-admin.brands.edit"],
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcasRoutingModule {}
