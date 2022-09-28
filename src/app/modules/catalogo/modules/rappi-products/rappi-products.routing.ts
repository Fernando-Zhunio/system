import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionRappiProducts } from '../../../../class/permissions-modules';
import { IndexRappiProductsComponent } from './index-rappi-products/index-rappi-products.component';

const permissionsModule = PermissionRappiProducts

const routes: Routes = [
  {
    path: '',
    component: IndexRappiProductsComponent,
    data: {
      permissions: {only: [permissionsModule.index]}
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RappiProductsRoutingModule { }


