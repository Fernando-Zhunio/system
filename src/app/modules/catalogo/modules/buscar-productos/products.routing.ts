import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { environment } from '../../../../../environments/environment';
import { PermissionSearchProducts } from '../../../../class/permissions-modules';
import { ProductsComponent } from './pages/products/products.component';

const permission_module = PermissionSearchProducts;

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      permissions: {
        only:  permission_module.index,
        redirectTo: environment.ERROR_403_REDIRECT_URL
      },
    },
    canActivate: [NgxPermissionsGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
