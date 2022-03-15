import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { prices_permission_module } from '../../../class/permissions-modules/prices-permissions';
import { PricesIndexComponent } from './prices-index/prices-index.component';

const permissions_module = prices_permission_module;

// export const permission_module = {
//   prices: {
//     index: ['super-admin', 'catalogs.products.prices.index'],
//     show: ['super-admin', 'catalogs.products.prices.show'],
//     create: ['super-admin', 'catalogs.products.prices.create'],
//     edit: ['super-admin', 'catalogs.products.prices.edit'],
//     delete: ['super-admin', 'catalogs.products.prices.destroy']
//   },
// };

const routes: Routes = [
  {
    path: 'prices',
    component: PricesIndexComponent,
    data: {
      permissions: {
        only: permissions_module.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PricesRoutingModule {}
