import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrEditPriceComponent } from './create-or-edit-price/create-or-edit-price.component';
import { PricesIndexComponent } from './prices-index/prices-index.component';



const permission_module = {
  publicaciones: {
    index: ['super-admin', 'catalogs.publications.index'],
    show: ['super-admin', 'catalogs.publications.show'],
    create: ['super-admin', 'catalogs.publications.create'],
    edit: ['super-admin', 'catalogs.publications.edit'],
    delete: ['super-admin', 'catalogs.publications.destroy']
  },
};

const routes: Routes = [
  {
    path: 'prices',
    component: PricesIndexComponent
  },
  {
    path: ':product_id/prices/create',
    component: CreateOrEditPriceComponent,
    data: {
      isEdit: false
    }
  },
  {
    path: ':product_id/prices/edit',
    component: CreateOrEditPriceComponent,
    data: {
      // permission: permission_module.publicaciones.edit,
      isEdit: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PricesRoutingModule {}
