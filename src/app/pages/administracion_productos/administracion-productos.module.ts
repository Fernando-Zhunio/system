import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductRoutingModule, AdminProductsMainComponents } from './administracion-productos-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
// import { IndexComponent } from './vtex-productos/index/index.component';

import { VtexProductosModule } from './vtex-productos/vtex-productos.module';


@NgModule({
  declarations: [AdminProductsMainComponents],
  imports: [
  CommonModule,
    AdminProductRoutingModule,
    VtexProductosModule,
    NgxPermissionsModule

  ]
})
export class AdministracionProductosModule { }
