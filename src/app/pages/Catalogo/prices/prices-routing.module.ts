import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditPriceComponent } from './create-or-edit-price/create-or-edit-price.component';
import { PricesIndexComponent } from './prices-index/prices-index.component';



const permission_module = {
  prices: {
    index: ['super-admin', 'catalogs.products.prices.index'],
    show: ['super-admin', 'catalogs.products.prices.show'],
    create: ['super-admin', 'catalogs.products.prices.create'],
    edit: ['super-admin', 'catalogs.products.prices.edit'],
    delete: ['super-admin', 'catalogs.products.prices.destroy']
  },
};

const routes: Routes = [
  {
    path: 'prices',
    component: PricesIndexComponent,
    data: {
      permissions: {
        only: permission_module.prices.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  // {
  //   path: ':product_id/prices/create',
  //   component: CreateOrEditPriceComponent,
  //   data: {
  //     isEdit: false
  //   }
  // },
  // {
  //   path: ':product_id/prices/edit',
  //   component: CreateOrEditPriceComponent,
  //   data: {
  //     // permission: permission_module.publicaciones.edit,
  //     isEdit: true
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PricesRoutingModule {}
