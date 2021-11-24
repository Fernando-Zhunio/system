import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersusProductosComponent } from './versus-productos/versus-productos.component';
// import { IndexComponent } from './index/index.component';
import {  VersusRoutingModule } from './versus-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { VersusCategoriasComponent } from './versus-categorias/versus-categorias.component';

@NgModule({
  declarations: [ VersusProductosComponent, VersusCategoriasComponent],
  imports: [
    CommonModule,
    VersusRoutingModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    NgxSpinnerModule,
    MatBadgeModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatIconModule
  ]
})
export class VersusModule { }
