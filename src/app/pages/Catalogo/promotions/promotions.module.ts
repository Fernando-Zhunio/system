import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions.routing';
import { PromotionsIndexComponent } from './promotions-index/promotions-index.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CreateOrEditPromotionComponent } from './create-or-edit-promotion/create-or-edit-promotion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchesModule } from '../../../Modulos/searches/searches.module';


@NgModule({
  declarations: [PromotionsIndexComponent, CreateOrEditPromotionComponent],
  imports: [
  CommonModule,
    PromotionsRoutingModule,
    SearchTemplateModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    SearchesModule,
    ReactiveFormsModule,
  ]
})
export class PromotionsModule {}
