import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesIndexComponent } from './prices-index/prices-index.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { ConvertsModule } from '../../../Modulos/converts/converts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricesRoutingModule } from './prices-routing.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditPriceComponent } from './create-or-edit-price/create-or-edit-price.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalListPricesComponent } from './tools/modal-list-prices/modal-list-prices.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PricesIndexComponent, CreateOrEditPriceComponent, ModalListPricesComponent],
  imports: [
    CommonModule,
    RouterModule,
    PricesRoutingModule,
    SearchTemplateModule,
    ConvertsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  entryComponents: [ModalListPricesComponent]
})
export class PricesModule { }
