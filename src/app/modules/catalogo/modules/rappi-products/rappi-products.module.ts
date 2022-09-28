import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRappiProductsComponent } from './index-rappi-products/index-rappi-products.component';
import { RappiProductsRoutingModule } from './rappi-products.routing';
import { SearchTemplateModule } from '../../../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FilePondModule } from 'ngx-filepond';
import { StockRappiModalComponent } from './components/stock-rappi-modal/stock-rappi-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SearchTemplateTableComponent } from '../../../../Modulos/search-template/search-template-table/search-template-table.component';

@NgModule({
  imports: [
    CommonModule,
    RappiProductsRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatSlideToggleModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    FilePondModule,
    MatProgressBarModule,
    NgxPermissionsModule,
    SearchTemplateTableComponent,
  ],
  declarations: [IndexRappiProductsComponent, StockRappiModalComponent]
})
export class RappiProductsModule { }
