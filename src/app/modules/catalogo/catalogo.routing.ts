import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PublicacionesComponent } from './modules/publicaciones/publicaciones.component';
// import { CreateOrEditPublicacionComponent } from './modules/publicaciones/create-or-edit-publicacion/create-or-edit-publicacion.component';
// import { NgxPermissionsGuard } from 'ngx-permissions';
// import { ShowPublicationComponent } from './modules/publicaciones/show-publication/show-publication.component';
// import { MenuMultiPublicationComponent } from './modules/publicaciones/menu-multi-publication/menu-multi-publication.component';
// import { CreateOrEditMultipublicationComponent } from './modules/publicaciones/create-or-edit-multipublication/create-or-edit-multipublication.component';


// const permission_module = {
//   publicaciones: {
//     index: ['super-admin', 'catalogs.publications.index'],
//     show: ['super-admin', 'catalogs.publications.show'],
//     create: ['super-admin', 'catalogs.publications.create'],
//     edit: ['super-admin', 'catalogs.publications.edit'],
//     delete: ['super-admin', 'catalogs.publications.destroy']
//   },
// };

const routes: Routes = [
  {
    path: 'mercado-libre',
    data: { name: 'mercado_libre_ll' },
    loadChildren: () => import('./modules/mercado-libre/mercado-libre.module').then(m => m.MercadoLibreModule),
  },
  {
    path: 'buscar_productos',
    loadChildren: () => import('./modules/buscar-productos/products.module').then(m => m.BuscarProductosModule),
  },
  {
    path: 'publications',
    loadChildren: () => import('./modules/publications/publications.module').then(m => m.PublicationsModule),
  },
  {
    path: 'imports',
    loadChildren: () => import('./modules/imports/imports.module').then(m => m.ImportsModule),
  },
  // {
  //   path: 'publicaciones/menu-multi-publicaciones',
  //   component: MenuMultiPublicationComponent,
  //   data: {
  //     isEdit: false,
  //     permissions: {
  //       only: ['super-admin', 'catalogs.publications.menu-multi'],
  //     },
  //   },
  //   canActivate: [NgxPermissionsGuard],
  // },
  // {
  //   path: 'publicaciones/multi-publicaciones',
  //   component: CreateOrEditMultipublicationComponent,
  //   data: {
  //     isEdit: false,
  //     permissions: {
  //       only: ['super-admin', 'catalogs.publications.multi'],
  //     },
  //   },
  //   canActivate: [NgxPermissionsGuard],
  // },
  // {
  //   path: 'publicaciones/edit/:id',
  //   component: CreateOrEditPublicacionComponent,
  //   data: {
  //     isEdit: true,
  //     permissions: {
  //       only: ['super-admin', 'catalogs.publications.edit'],
  //     },
  //   },
  //   canActivate: [NgxPermissionsGuard],
  // },
  // {
  //   path: 'publicaciones/create',
  //   component: CreateOrEditPublicacionComponent,
  //   data: {
  //     isEdit: false,
  //     permissions: {
  //       only: ['super-admin', 'catalogs.publications.create'],
  //     },
  //   },
  //   canActivate: [NgxPermissionsGuard],
  // },
  // {
  //   path: 'publicaciones/show/:id',
  //   component: ShowPublicationComponent,
  //   data: {
  //     permissions: {
  //       only: permission_module.publicaciones.show,
  //       all: permission_module.publicaciones
  //     },
  //   },
  //   canActivate: [NgxPermissionsGuard],
  // },
  {
    path: 'products',
    loadChildren: () => import('./modules/prices/prices.module').then(m => m.PricesModule),
  },
  {
    path: 'promotions',
    loadChildren: () => import('./modules/promotions/promotions.module').then(m => m.PromotionsModule),
  },
  {
    path: 'rappi',
    loadChildren: () => import('./modules/rappi-products/rappi-products.module').then(m => m.RappiProductsModule),
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
