import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PERMISSION_CAMPAIGNS, PERMISSIONS_PROMOTIONS } from '../../../../class/permissions-modules';
import { CampaignIndexComponent } from './pages/campaign-index/campaign-index.component';
import { CreateOrEditCampaignComponent } from './pages/create-or-edit-campaign/create-or-edit-campaign.component';
import { CreateOrEditPromotionComponent } from './pages/create-or-edit-promotion/create-or-edit-promotion.component';
import { PromotionIndexComponent } from './pages/promotion-index/promotion-index.component';

const permissions_campaigns = PERMISSION_CAMPAIGNS;
// const permissions_PROMOTIONS = PERMISSION_PROMOTIONS;
const routes: Routes = [
  {
    path: '',
    component: CampaignIndexComponent,
    data: {
      permissions: {
        only: permissions_campaigns.index
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: CreateOrEditCampaignComponent,
    data: {
      permissions: {
        only: permissions_campaigns.create
      },
      isEdit: false
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':id/edit',
    component: CreateOrEditCampaignComponent,
    data: {
      permissions: {
        only: permissions_campaigns.edit
      },
      isEdit: true
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':campaign_id/promotions',
    component: PromotionIndexComponent,
    data: {
      permissions: {
        only: PERMISSIONS_PROMOTIONS.index
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':campaign_id/promotions/create',
    component: CreateOrEditPromotionComponent,
    data: {
      permissions: {
        only: PERMISSIONS_PROMOTIONS.create
      },
      isEdit: false
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':campaign_id/promotions/:id/edit',
    component: CreateOrEditPromotionComponent,
    data: {
      permissions: {
        only: PERMISSIONS_PROMOTIONS.edit
      },
      isEdit: true
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
