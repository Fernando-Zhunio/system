import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditPriceComponent } from '../prices/create-or-edit-price/create-or-edit-price.component';
import { CreateOrEditPromotionComponent } from './create-or-edit-promotion/create-or-edit-promotion.component';
import { PromotionsIndexComponent } from './promotions-index/promotions-index.component';


const routes: Routes = [
  {
    path: '',
    component: PromotionsIndexComponent,
    data: {
      name: 'promotions',
      reuse: true,
      permissions: {
        only: ['super-admin', 'catalogs.promotions.index'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: CreateOrEditPromotionComponent,
    data: {
      name: 'promotions.create',
      permissions: {
        only: ['super-admin', 'catalogs.promotions.create'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':promotion_id/edit',
    component: CreateOrEditPromotionComponent,
    data: {
      name: 'promotions.edit',
      isEdit: true,
      permissions: {
        only: ['super-admin', 'catalogs.promotions.edit'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PromotionsRoutingModule { }
