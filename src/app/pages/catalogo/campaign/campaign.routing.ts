import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionCampaigns } from '../../../class/permissions-modules';
import { CampaignIndexComponent } from './pages/campaign-index/campaign-index.component';
import { CreateOrEditCampaignComponent } from './pages/create-or-edit-campaign/create-or-edit-campaign.component';
import { CreateOrEditPromotionComponent } from './pages/create-or-edit-promotion/create-or-edit-promotion.component';
import { PromotionIndexComponent } from './pages/promotion-index/promotion-index.component';

const permission_module = PermissionCampaigns;
const routes: Routes = [
  {
    path: '',
    component: CampaignIndexComponent,
    data: {
      permissions: {
        only: permission_module.index
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: CreateOrEditCampaignComponent,
    data: {
      permissions: {
        only: permission_module.create
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
        only: permission_module.edit
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
        only: permission_module.index
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':campaign_id/promotions/create',
    component: CreateOrEditPromotionComponent,
    data: {
      permissions: {
        only: permission_module.create
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
        only: permission_module.create
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
