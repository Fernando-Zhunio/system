import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditPriceGroupComponent } from './create-or-edit-price-group/create-or-edit-price-group.component';
import { PricesGroupIndexComponent } from './prices-group-index/prices-group-index.component';


const permisos = {
  prices_group: {
    index: ['super-admin', 'admin.prices.groups.index'],
    show: ['super-admin', 'admin.prices.groups.show'],
    create: ['super-admin', 'admin.prices.groups.create'],
    edit: ['super-admin', 'admin.prices.groups.edit'],
    delete: ['super-admin', 'admin.prices.groups.destroy'],
  },
};

const routes: Routes = [
  {
    path: 'groups',
    children: [
      {
        path: '',
        component: PricesGroupIndexComponent,
        data: {
          permissions: {
            only: permisos.prices_group.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditPriceGroupComponent,
        data: {
          permissions: {
            only: permisos.prices_group.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: ':price_group_id/edit',
        component: CreateOrEditPriceGroupComponent,
        data: {
          permissions: {
            only: permisos.prices_group.create,
          },
          isEdit: true
        },
        canActivate: [NgxPermissionsGuard],
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricesRoutingModule { }
