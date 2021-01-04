import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductRoutingModule, AdminProductsMainComponents } from './administracion-productos-routing.module';



@NgModule({
  declarations: [AdminProductsMainComponents],
  imports: [
    CommonModule,
    AdminProductRoutingModule

  ]
})
export class AdministracionProductosModule { }
