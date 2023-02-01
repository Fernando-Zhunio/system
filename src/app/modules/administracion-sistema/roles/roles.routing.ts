import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { CreateOrEditRolesComponent } from "./pages/create-or-edit-roles/create-or-edit-roles.component";
import { IndexRolesComponent } from "./pages/index-roles/index-roles.component";
import { PERMISSIONS_ROLES } from "./permissions/roles.permissions";
const routes: Routes = [
    {
        path: '',
        component: IndexRolesComponent,
        data: {
          permissions: {
            only: PERMISSIONS_ROLES.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditRolesComponent,
        data: {
          isEdit: false,
          permissions: {
            only: PERMISSIONS_ROLES.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: ':id/edit',
        component: CreateOrEditRolesComponent,
        data: {
          isEdit: true,
          permissions: {
            only: PERMISSIONS_ROLES.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }