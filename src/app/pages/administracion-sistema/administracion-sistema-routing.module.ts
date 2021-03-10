import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GroupProductsComponent } from "../reportes/group-products/group-products.component";
import { NgxPermissionsGuard } from "ngx-permissions";
import { CreateOrEditGroupProductsComponent } from "../reportes/group-products/create-or-edit-group-products/create-or-edit-group-products.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CreateOrEditComponent } from "./usuarios/create-or-edit/create-or-edit.component";

@Component({
  selector: 'app-reports',
  template: '<router-outlet></router-outlet>',
})
export class AdminSystemMainComponents  {
}
const routes: Routes = [
  {
    path:'',
    component:AdminSystemMainComponents,
    children:[
      {
        path:'usuarios',
        component:UsuariosComponent,

        data: {
          permissions: {
            only: ["super-admin", "admin.users.index"],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path:'usuarios/create',
        component:CreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ["super-admin", "admin.users.create"],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path:'usuarios/edit/:id',
        component:CreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ["super-admin", "admin.users.edit"],
          },
        },
        canActivate: [NgxPermissionsGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSystemRoutingModule {}
