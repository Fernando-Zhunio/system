import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductRoutingModule } from './administracion-productos-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { VtexProductosModule } from './vtex-productos/vtex-productos.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    AdminProductRoutingModule,
    VtexProductosModule,
    NgxPermissionsModule,
    RouterModule
  ]
})
export class AdministracionProductosModule { }
