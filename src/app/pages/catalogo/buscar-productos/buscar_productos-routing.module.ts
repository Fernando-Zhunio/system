import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { search_product_permission_module } from '../../../class/permissions-modules/search-products-permissions';
import { BuscarProductosComponent } from './buscar-productos.component';

const permission_module = search_product_permission_module;

const routes: Routes = [
  {
    path: '',
    component: BuscarProductosComponent,
    data: {
      permissions: {
        only:  permission_module.index,
        // all: permission_module.buscar_producto
      },
    },
    canActivate: [NgxPermissionsGuard],
    // children: [
    //   {
    //     path: '',
    //     component: BuscarProductosComponent,
    //   },
    //   {
    //     path: 'create',
    //     component: CategoriasCreateOrEditComponent,
    //     data:{isEdit:false}
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: CategoriasCreateOrEditComponent,
    //     data:{isEdit:true}
    //   },


    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarProductosRoutingModule {}
