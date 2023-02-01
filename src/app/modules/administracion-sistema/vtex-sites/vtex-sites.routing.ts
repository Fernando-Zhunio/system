import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { CreateOrEditVtexSiteComponent } from "./pages/create-or-edit-vtex-site/create-or-edit-vtex-site.component";
import { CreateOrEditVtexWarehousesComponent } from "./pages/create-or-edit-vtex-warehouses/create-or-edit-vtex-warehouses.component";
import { IndexVtexSitesComponent } from "./pages/index-vtex-sites/index-vtex-sites.component";
import { IndexVtexWarehousesComponent } from "./pages/index-vtex-warehouses/index-vtex-warehouses.component";
import { PERMISSIONS_VTEX_SITES } from "./permissions/vtex-sites.permissions";
import { PERMISSIONS_VTEX_WAREHOUSES } from "./permissions/vtex-warehouses.permissions";
const routes: Routes = [

    {
        path: '',
        component: IndexVtexSitesComponent,
        data: {
            permissions: {
                only: PERMISSIONS_VTEX_SITES.index,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: 'create',
        component: CreateOrEditVtexSiteComponent,
        data: {
            isEdit: false,
            permissions: {
                only: PERMISSIONS_VTEX_SITES.create,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },

    {
        path: ':id/edit',
        component: CreateOrEditVtexSiteComponent,
        data: {
            isEdit: true,
            permissions: {
                only: PERMISSIONS_VTEX_SITES.edit,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
    // Vtex Warehouse
    {
        path: ':id/vtex-warehouses',
        children: [
            {
                path: '',
                component: IndexVtexWarehousesComponent,
                data: {
                    permissions: {
                        only: PERMISSIONS_VTEX_WAREHOUSES.index,
                    },
                },
                canActivate: [NgxPermissionsGuard],
            },
            {
                path: 'create',
                component: CreateOrEditVtexWarehousesComponent,
                data: {
                    isEdit: false,
                    permissions: {
                        only: PERMISSIONS_VTEX_WAREHOUSES.create,
                    },
                },
                canActivate: [NgxPermissionsGuard],
            },
            {
                path: ':id/edit',
                component: CreateOrEditVtexWarehousesComponent,
                data: {
                    isEdit: true,
                    permissions: {
                        only: PERMISSIONS_VTEX_WAREHOUSES.edit,
                    },
                },
                canActivate: [NgxPermissionsGuard],
            },
        ],
        data: {
            permissions: {
                only: PERMISSIONS_VTEX_WAREHOUSES.index,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VtexSitesRoutingModule { }