import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductRoutingModule, AdminProductsMainComponents } from './administracion-productos-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [AdminProductsMainComponents],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    NgxPermissionsModule

  ]
})
export class AdministracionProductosModule { }
