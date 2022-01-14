import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesGroupIndexComponent } from './prices-group-index/prices-group-index.component';
import { RouterModule } from '@angular/router';
import { PricesRoutingModule } from './prices.module.routing';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditPriceGroupComponent } from './create-or-edit-price-group/create-or-edit-price-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [PricesGroupIndexComponent, CreateOrEditPriceGroupComponent],
  imports: [
    CommonModule,
    RouterModule,
    PricesRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class PricesModule { }
