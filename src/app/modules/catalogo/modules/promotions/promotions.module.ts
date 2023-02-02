import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsIndexComponent } from './pages/promotions-index/promotions-index.component';
import { SearchTemplateTableComponent } from '../../../../Modulos/search-template/search-template-table/search-template-table.component';
import { PromotionsRouting } from './promotions.routing';
import { MatTableModule } from '@angular/material/table';
import { TranslatefzModule } from '../../../../Modulos/translatefz/translatefz.module';
import { MatListModule } from '@angular/material/list';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { SearchProductsDialogModule } from '../../../../shared/standalone-components/simple-search/simple-search.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SearchCampaignDialogComponent } from './components/search-campaign-dialog/search-campaign-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SearchTemplateTableComponent,
    PromotionsRouting,
    MatTableModule,
    TranslatefzModule,
    MatListModule,
    NgxPermissionsModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    SearchProductsDialogModule,
    FormsModule,
    MatSelectModule,
  ],
  declarations: [PromotionsIndexComponent, SearchCampaignDialogComponent]
})
export class PromotionsModule { }
