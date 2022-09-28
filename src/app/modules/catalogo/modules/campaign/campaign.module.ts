import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignIndexComponent } from './pages/campaign-index/campaign-index.component';
import { CampaignRoutingModule } from './campaign.routing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditCampaignComponent } from './pages/create-or-edit-campaign/create-or-edit-campaign.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslatefzModule } from '../../../../Modulos/translatefz/translatefz.module';
import { PromotionIndexComponent } from './pages/promotion-index/promotion-index.component';
import { CreateOrEditPromotionComponent } from './pages/create-or-edit-promotion/create-or-edit-promotion.component';
import { SearchProductsModule } from '../../../../shared/search-products/search-products.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatTableModule } from '@angular/material/table';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { DetailsPromotionComponent } from './components/details-promotion/details-promotion.component';
import { MatListModule } from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FilePondModule } from 'ngx-filepond';
import {MatRippleModule} from '@angular/material/core';
import { SearchTemplateTableComponent } from '../../../../Modulos/search-template/search-template-table/search-template-table.component';
import {MatBadgeModule} from '@angular/material/badge';
import { SearchProductsDialogModule } from '../../../../shared/search-products-dialog/search-products-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CampaignRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    TranslatefzModule,
    SearchProductsModule,
    NgxPermissionsModule,
    MatTableModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressBarModule,
    FilePondModule,
    MatRippleModule,
    SearchTemplateTableComponent,
    MatBadgeModule,
    SearchProductsDialogModule,
  ],
  declarations: [
    DetailsPromotionComponent, 
    CampaignIndexComponent, 
    CreateOrEditPromotionComponent, 
    CreateOrEditCampaignComponent, 
    PromotionIndexComponent]
})
export class CampaignModule { }
