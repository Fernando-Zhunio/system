import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const permission_module_AD = {

 

  // facebook_ads_manager: {
  //   index: ['super-admin', 'admin.facebook-ads.ads.index'],
  //   show: ['super-admin', 'admin.facebook-ads.ads.show'],
  //   create: ['super-admin', 'admin.facebook-ads.ads.create'],
  //   edit: ['super-admin', 'admin.facebook-ads.ads.edit'],
  //   delete: ['super-admin', 'admin.facebook-ads.ads.destroy'],
  // },


// };


const routes: Routes = [
  // usuarios
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/users.module').then(m => m.UsersModule),
  },
  // personas
  {
    path: 'people',
    loadChildren: () => import('./people/people.module').then(m => m.PeopleModule),
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
  },
  // paises
  {
    path: 'paises',
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
  },
  // locaciones
  {
    path: 'locations',
    loadChildren: () =>
      import('./locaciones/location.module').then((m) => m.LocationModule),
  },
  // workspaces
  {
    path: 'workspaces-orders',
    loadChildren: () =>
      import('./workspaces-orders/workspaces-orders.module').then((m) => m.WorkspacesOrdersModule),
  },
  
  // mercado libre admin
  {
    path: 'mercado-libre/accounts',
    loadChildren: () => import('./mercado-libre-admin/mercado-libre-admin.module').then((m) => m.MercadoLibreAdminModule)
  },

  // Facebook ads manager
  // {
  //   path: 'facebook-ads-manager',
  //   children: [
  //     {
  //       path: '',
  //       component: FacebookAdsManagerComponent,
  //       data: {
  //         permissions: {
  //           all: permission_module_AD.facebook_ads_manager,
  //           only: permission_module_AD.facebook_ads_manager.index,
  //         },
  //       },
  //       canActivate: [NgxPermissionsGuard],
  //     },
  //     {
  //       path: 'create',
  //       component: MercadoLibreCreateOrEditComponent,
  //       data: {
  //         isEdit: false,
  //         permissions: {
  //           only: permission_module_AD.facebook_ads_manager.create,
  //         },
  //       },
  //       canActivate: [NgxPermissionsGuard],
  //     },

  //     {
  //       path: 'edit/:id',
  //       component: MercadoLibreCreateOrEditComponent,
  //       data: {
  //         isEdit: true,
  //         permissions: {
  //           only: permission_module_AD.facebook_ads_manager.edit,
  //         },
  //       },
  //       canActivate: [NgxPermissionsGuard],
  //     },
  //   ],
  //   data: {
  //     permissions: {
  //       only: permission_module_AD.facebook_ads_manager.index,
  //     },
  //   },
  //   canActivate: [NgxPermissionsGuard],
  // },

  // Vtex Sites
  {
    path: 'vtex-sites',
    loadChildren: () => import('./vtex-sites/vtex-sites.module').then(m => m.VtexSitesModule),
  },
  // companies
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule),
  },
  // newsletters
  {
    path: 'newsletter',
    loadChildren: () => import('./newsletters/newsletters.module').then(m => m.NewLettersModule),
  },
  {
    path: 'chatbot',
    loadChildren: () =>
      import('./chat-bots/chat-bots.module').then((m) => m.ChatBotsModule),
  },
  {
    path: 'prices',
    loadChildren: () =>
      import('./prices/prices.module').then((m) => m.PricesModule),
  },
  {
    path: 'webhooks',
    loadChildren: () =>
      import('./webhooks/webhooks.module').then((m) => m.WebhooksModule),
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('./permissions/permissions.module').then((m) => m.PermissionsModule),
  },
  {
    path: 'version-app',
    loadChildren: () =>
      import('./version/version.module').then((m) => m.VersionModule),
  },
  {
    path: 'sidebar',
    loadChildren: () =>
      import('./sidebar/sidebar.module').then((m) => m.SidebarModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSystemRoutingModule { }
