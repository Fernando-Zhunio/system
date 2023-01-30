import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { IndexMercadoLibreAdminComponent } from "./pages/index-mercado-libre-admin/index-mercado-libre-admin.component";
import { CreateOrEditMercadoLibreAdminComponent } from "./pages/mercado-libre-create-or-edit/create-or-edit-mercado-libre-admin.component";
import { PERMISSIONS_MERCADO_LIBRE_ADMIN } from "./permissions/mercado-libre-admin.permissions";

const routes: Routes = [
  {
    path: '',
    component: IndexMercadoLibreAdminComponent,
    data: {
        permissions: {
            only: PERMISSIONS_MERCADO_LIBRE_ADMIN.index
        }
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: CreateOrEditMercadoLibreAdminComponent,
    data: {
        isEdit: false,
        permissions: {
            only: PERMISSIONS_MERCADO_LIBRE_ADMIN.create
        }
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'edit/:id',
    component: CreateOrEditMercadoLibreAdminComponent,
    data: {
        isEdit: true,
        permissions: {
            only: PERMISSIONS_MERCADO_LIBRE_ADMIN.edit
        }
    },
    canActivate: [NgxPermissionsGuard],
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}) export class MercaLibreAdminRoutingModule { }