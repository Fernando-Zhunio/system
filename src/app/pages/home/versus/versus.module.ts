import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersusProductosComponent } from './versus-productos/versus-productos.component';
import { IndexComponent } from './index/index.component';
import { VersusMainComponents, VersusRoutingModule } from './versus-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [VersusMainComponents, VersusProductosComponent, IndexComponent],
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
  ]
})
export class VersusModule { }
