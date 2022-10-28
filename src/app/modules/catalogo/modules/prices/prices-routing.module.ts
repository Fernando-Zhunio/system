import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { Permission_products_prices } from '../../../../class/permissions-modules';
// import { prices_permission_module } from '../../../class/permissions-modules/prices-permissions';
import { PricesIndexComponent } from './pages/prices-index/prices-index.component';

const permissions_module = Permission_products_prices.prices;

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
