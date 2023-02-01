import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxPermissionsGuard } from 'ngx-permissions';
// // import { RolesComponent } from './roles/roles.component';
// // import { CreateOrEditRolesComponent } from './roles/create-or-edit-roles/create-or-edit-roles.component';
// import { VtexWarehousesComponent } from './vtex-site/vtex-warehouses/vtex-warehouses.component';
// import { CreateOrEditVtexWarehousesComponent } from './vtex-site/pages/create-or-edit-vtex-warehouses/create-or-edit-vtex-warehouses.component';
// // import { VtexSitesComponent } from './vtex-site/vtex-sites.component';
// import { CreateOrEditVtexSiteComponent } from './vtex-site/pages/create-or-edit-vtex-site/create-or-edit-vtex-site.component';

// const permission_module_AD = {
  // roles: {
  //   index: ['super-admin', 'admin.roles.index'],
  //   show: ['super-admin', 'admin.roles.show'],
  //   create: ['super-admin', 'admin.roles.create'],
  //   edit: ['super-admin', 'admin.roles.edit'],
  //   delete: ['super-admin', 'admin.roles.destroy'],
  // },

 
  // cities: {
  //   index: ['super-admin', 'admin.countries.cities.index'],
  //   show: ['super-admin', 'admin.countries.cities.show'],
  //   create: ['super-admin', 'admin.countries.cities.create'],
  //   edit: ['super-admin', 'admin.countries.cities.edit'],
  //   delete: ['super-admin', 'admin.countries.cities.destroy'],
  // },

  // location: {
  //   index: ['super-admin', 'admin.locations.index'],
  //   show: ['super-admin', 'admin.locations.shiw'],
  //   create: ['super-admin', 'admin.locations.create'],
  //   edit: ['super-admin', 'admin.locations.edit'],
  //   delete: ['super-admin', 'admin.locations.destroy'],
  // },

  // personas: {
  //   index: ['super-admin', 'admin.people.index'],
  //   show: ['super-admin', 'admin.people.show'],
  //   create: ['super-admin', 'admin.people.create'],
  //   edit: ['super-admin', 'admin.people.edit'],
  //   delete: ['super-admin', 'admin.people.destroy'],
  // },

  // mercado_libre: {
  //   index: ['super-admin', 'ml.accounts.index'],
  //   show: ['super-admin', 'ml.accounts.show'],
  //   create: ['super-admin', 'ml.accounts.create'],
  //   edit: ['super-admin', 'ml.accounts.edit'],
  //   delete: ['super-admin', 'ml.accounts.destroy'],
  // },

  // facebook_ads_manager: {
  //   index: ['super-admin', 'admin.facebook-ads.ads.index'],
  //   show: ['super-admin', 'admin.facebook-ads.ads.show'],
  //   create: ['super-admin', 'admin.facebook-ads.ads.create'],
  //   edit: ['super-admin', 'admin.facebook-ads.ads.edit'],
  //   delete: ['super-admin', 'admin.facebook-ads.ads.destroy'],
  // },

  // vtex_warehouses: {
  //   index: ['super-admin', 'admin.vtex.warehouses.index'],
  //   show: ['super-admin', 'admin.vtex.warehouses.show'],
  //   create: ['super-admin', 'admin.vtex.warehouses.create'],
  //   edit: ['super-admin', 'admin.vtex.warehouses.edit'],
  //   delete: ['super-admin', 'admin.vtex.warehouses.destroy'],
  // },
  // vtex_sites: {
  //   index: ['super-admin', 'admin.vtex.sites.index'],
  //   show: ['super-admin', 'admin.vtex.sites.show'],
  //   create: ['super-admin', 'admin.vtex.sites.create'],
  //   edit: ['super-admin', 'admin.vtex.sites.edit'],
  //   delete: ['super-admin', 'admin.vtex.sites.destroy'],
  // },
  // companies: {
  //   index: ['super-admin', 'admin.companies.index'],
  //   show: ['super-admin', 'admin.companies.show'],
  //   create: ['super-admin', 'admin.companies.create'],
  //   edit: ['super-admin', 'admin.companies.edit'],
  //   delete: ['super-admin', 'admin.companies.destroy'],
  // },
  // permission: {
  //   index: ['super-admin', 'admin.permission.index'],
  // }
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
    // children: [
    //   {
    //     path: '',
    //     component: IndexCompanies,
    //     data: {
    //       permissions: {
    //         // only: permission_module_AD.companies.index,
    //       },
    //     },
    //     canActivate: [NgxPermissionsGuard],
    //   },
    //   {
    //     path: 'create',
    //     component: CreateOrEditCompanyComponent,
    //     data: {
    //       isEdit: false,
    //       permissions: {
    //         only: permission_module_AD.companies.create,
    //       },
    //     },
    //     canActivate: [NgxPermissionsGuard],
    //   },
    //   {
    //     path: ':id/edit',
    //     component: CreateOrEditCompanyComponent,
    //     data: {
    //       isEdit: true,
    //       permissions: {
    //         only: permission_module_AD.companies.edit,
    //       },
    //     },
    //     canActivate: [NgxPermissionsGuard],
    //   },
    //   {
    //     path: ':company_id/departments',
    //     children: [
    //       {
    //         path: '',
    //         component: DepartmentIndexComponent,
    //       },
    //       {
    //         path: 'create',
    //         component: CreateOrEditDepartmentComponent,
    //       },
    //       {
    //         path: ':department_id/edit',
    //         component: CreateOrEditDepartmentComponent,
    //         data: {
    //           isEdit: true,
    //           permissions: {
    //           },
    //         },
    //       },
    //       {
    //         path: ':department_id/positions',
    //         children: [
    //           {
    //             path: '',
    //             component: PositionsIndexComponent,
    //           },
    //           {
    //             path: 'create',
    //             component: CreateOrEditPositionComponent,
    //             data: {
    //               isEdit: false,
    //               permissions: {},
    //             },
    //           },
    //           {
    //             path: ':position_id/edit',
    //             component: CreateOrEditPositionComponent,
    //             data: {
    //               isEdit: true,
    //               permissions: {},
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
    // data: {
    //   permissions: {
    //     only: permission_module_AD.location.index,
    //   },
    // },
    // canActivate: [NgxPermissionsGuard],
  },
  // newsletters
  {
    path: 'newsletter',
    loadChildren: () => import('./newsletters/newsletters.module').then(m => m.NewLettersModule),
    // children: [
    //   { path: '', component: IndexComponent },
    //   {
    //     path: 'create',
    //     component: CreateOrEditNewsletterComponent,
    //     data: { isEdit: false },
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: CreateOrEditNewsletterComponent,
    //     data: { isEdit: true },
    //   },
    // ],
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
