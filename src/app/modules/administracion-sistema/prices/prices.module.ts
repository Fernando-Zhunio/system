import { NgxSearchBarPaginatorComponent } from './../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPricesGroupComponent } from './pages/index-prices-group/index-prices-group.component';
import { RouterModule } from '@angular/router';
import { PricesRoutingModule } from './prices.module.routing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditPriceGroupComponent } from './pages/create-or-edit-price-group/create-or-edit-price-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [IndexPricesGroupComponent, CreateOrEditPriceGroupComponent],
  imports: [
    CommonModule,
    RouterModule,
    PricesRoutingModule,
    // SearchTemplateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    NgxSearchBarPaginatorComponent,
    MatTableModule,
  ]
})
export class PricesModule { }
