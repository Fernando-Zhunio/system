import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServientregaComponent } from './servientrega.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { ServientregaRoutes } from './servientrega.routing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatefzModule } from './../../../Modulos/translatefz/translatefz.module';
import { SharedOrderModule } from '../modules/shared-order/shared-order.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
  CommonModule,
    ServientregaRoutes,
    SearchTemplateModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    TranslatefzModule,
    SharedOrderModule,
  ],
  declarations: [ServientregaComponent]
})
export class ServientregaModule { }
