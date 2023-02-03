import { NgxSearchBarPaginatorComponent } from './../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexCampaignsComponent } from './pages/index-campaigns/index-campaigns.component';
import { CampaignRoutingModule } from './campaign.routing';
import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditCampaignComponent } from './components/create-or-edit-campaign/create-or-edit-campaign.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslatefzModule } from '../../../../Modulos/translatefz/translatefz.module';
import { IndexPromotionsComponent } from './pages/index-promotions/index-promotions.component';
import { CreateOrEditPromotionComponent } from './pages/create-or-edit-promotion/create-or-edit-promotion.component';
// import { SearchProductsModule } from '../../../../shared/search-products/search-products.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatTableModule } from '@angular/material/table';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { DetailsPromotionComponent } from './components/details-promotion/details-promotion.component';
import { MatListModule } from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FilePondModule } from 'ngx-filepond';
// import {MatRippleModule} from '@angular/material/core';
// import { SearchTemplateTableComponent } from '../../../../Modulos/search-template/search-template-table/search-template-table.component';
import {MatBadgeModule} from '@angular/material/badge';
// import { SearchProductsDialogModule } from '../../../../shared/standalone-components/simple-search/simple-search.module';
import { CreateHostDirective } from '../../../../shared/directives/create-host.directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // FormsModule,
    CampaignRoutingModule,
    MatCardModule,
    // MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    TranslatefzModule,
    // SearchProductsModule,
    NgxPermissionsModule,
    MatTableModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressBarModule,
    FilePondModule,
    // MatRippleModule,
    // SearchTemplateTableComponent,
    MatBadgeModule,
    NgxSearchBarPaginatorComponent,
    MatTooltipModule,
    MatDialogModule,
    // SearchProductsDialogModule,
    CreateHostDirective
  ],
  declarations: [
    DetailsPromotionComponent, 
    IndexCampaignsComponent, 
    CreateOrEditPromotionComponent, 
    CreateOrEditCampaignComponent, 
    IndexPromotionsComponent]
})
export class CampaignModule { }
