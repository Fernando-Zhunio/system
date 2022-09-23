import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { CreateOrEditPublicacionComponent } from './publicaciones/create-or-edit-publicacion/create-or-edit-publicacion.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ShowPublicationComponent } from './publicaciones/show-publication/show-publication.component';
import { MenuMultiPublicationComponent } from './publicaciones/menu-multi-publication/menu-multi-publication.component';
import { CreateOrEditMultipublicationComponent } from './publicaciones/create-or-edit-multipublication/create-or-edit-multipublication.component';


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
    path: 'mercado-libre',
    data: { name: 'mercado_libre_ll' },
    loadChildren: () => import('./mercado-libre/mercado-libre.module').then(m => m.MercadoLibreModule),
  },
  {
    path: 'buscar_productos',
    loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule),
  },
  {
    path: 'publicaciones',
    component: PublicacionesComponent,
    data: {
      name: 'publicaciones',
      permissions: {
        only: ['super-admin', permission_module.publicaciones.index],
        all: permission_module.publicaciones
      },

    },
  },
  {
    path: 'publicaciones/menu-multi-publicaciones',
    component: MenuMultiPublicationComponent,
    data: {
      isEdit: false,
      permissions: {
        only: ['super-admin', 'catalogs.publications.menu-multi'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'publicaciones/multi-publicaciones',
    component: CreateOrEditMultipublicationComponent,
    data: {
      isEdit: false,
      permissions: {
        only: ['super-admin', 'catalogs.publications.multi'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'publicaciones/edit/:id',
    component: CreateOrEditPublicacionComponent,
    data: {
      isEdit: true,
      permissions: {
        only: ['super-admin', 'catalogs.publications.edit'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'publicaciones/create',
    component: CreateOrEditPublicacionComponent,
    data: {
      isEdit: false,
      permissions: {
        only: ['super-admin', 'catalogs.publications.create'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'publicaciones/show/:id',
    component: ShowPublicationComponent,
    data: {
      permissions: {
        only: permission_module.publicaciones.show,
        all: permission_module.publicaciones
      },
    },
    canActivate: [NgxPermissionsGuard],
    // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./prices/prices.module').then(m => m.PricesModule),
  },
  {
    path: 'promotions',
    data: { name: 'promotions' },
    loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule),
  },
  {
    path: 'rappi',
    loadChildren: () => import('./rappi-products/rappi-products.module').then(m => m.RappiProductsModule),
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
