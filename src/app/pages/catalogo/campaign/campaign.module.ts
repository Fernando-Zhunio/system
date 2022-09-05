import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignIndexComponent } from './pages/campaign-index/campaign-index.component';
import { CampaignRoutingModule } from './campaign.routing';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditCampaignComponent } from './pages/create-or-edit-campaign/create-or-edit-campaign.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslatefzModule } from '../../../Modulos/translatefz/translatefz.module';
import { PromotionIndexComponent } from './pages/promotion-index/promotion-index.component';
import { CreateOrEditPromotionComponent } from './pages/create-or-edit-promotion/create-or-edit-promotion.component';
import { SearchProductsModule } from '../../../shared/search-products/search-products.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CampaignRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    TranslatefzModule,
    SearchProductsModule,
    NgxPermissionsModule
  ],
  declarations: [CampaignIndexComponent, CreateOrEditPromotionComponent, CreateOrEditCampaignComponent, PromotionIndexComponent]
})
export class CampaignModule { }
