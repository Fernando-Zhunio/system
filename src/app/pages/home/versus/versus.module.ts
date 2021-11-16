import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersusProductosComponent } from './versus-productos/versus-productos.component';
import { IndexComponent } from './index/index.component';
import { VersusMainComponents, VersusRoutingModule } from './versus-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [VersusMainComponents, VersusProductosComponent, IndexComponent],
  imports: [
    CommonModule,
    VersusRoutingModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class VersusModule { }
