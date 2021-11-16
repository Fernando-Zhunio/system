import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductRoutingModule } from './administracion-productos-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
// import { IndexComponent } from './vtex-productos/index/index.component';

import { VtexProductosModule } from './vtex-productos/vtex-productos.module';
// import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    AdminProductRoutingModule,
    VtexProductosModule,
    NgxPermissionsModule,
    // MatCardModule
  ]
})
export class AdministracionProductosModule { }
