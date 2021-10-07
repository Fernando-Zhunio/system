import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupProductsComponent } from '../reportes/group-products/group-products.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditGroupProductsComponent } from '../reportes/group-products/create-or-edit-group-products/create-or-edit-group-products.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CreateOrEditComponent } from './usuarios/create-or-edit/create-or-edit.component';
import { RolesComponent } from './roles/roles.component';
import { CreateOrEditRolesComponent } from './roles/create-or-edit-roles/create-or-edit-roles.component';
import { IpermissionStandart } from '../../interfaces/ipermission-standart';
import { PaisesComponent } from './paises/paises.component';
import { LocacionesComponent } from './locaciones/locaciones.component';
import { CreateOrEditLocationComponent } from './locaciones/create-or-edit-location/create-or-edit-location.component';
import { PersonasComponent } from './personas/personas.component';
import { CreateOrEditPersonComponent } from './personas/create-or-edit-person/create-or-edit-person.component';
import { MercadoLibreAdminComponent } from './mercado-libre-admin/mercado-libre-admin.component';
import { MercadoLibreCreateOrEditComponent } from './mercado-libre-admin/mercado-libre-create-or-edit/mercado-libre-create-or-edit.component';
import { FacebookAdsManagerComponent } from './facebook-ads-manager/facebook-ads-manager.component';
import { VtexWarehousesComponent } from './vtex-site/vtex-warehouses/vtex-warehouses.component';
import { CreateOrEditVtexWarehousesComponent } from './vtex-site/vtex-warehouses/create-or-edit-vtex-warehouses/create-or-edit-vtex-warehouses.component';
import { VtexSitesComponent } from './vtex-site/vtex-sites.component';
import { CreateOrEditVtexSiteComponent } from './vtex-site/create-or-edit-vtex-site/create-or-edit-vtex-site.component';
// import { ComprasAutomaticasComponent } from "./compras-automaticas/compras-automaticas.component";
// import { IpermissionStandart } from "src/app/interfaces/ipermission-standart";

@Component({
  selector: 'app-as-users',
  template: '<router-outlet></router-outlet>',
})
export class ADUsersMainComponents {}

@Component({
  selector: 'app-as-roles',
  template: '<router-outlet></router-outlet>',
})
export class ADRolesMainComponents {}

@Component({
  selector: 'app-as-paises',
  template: '<router-outlet></router-outlet>',
})
export class ADPaisesMainComponents {}

@Component({
  selector: 'app-as-locaciones',
  template: '<router-outlet></router-outlet>',
})
export class ADLocationsMainComponents {}

@Component({
  selector: 'app-as-personas',
  template: '<router-outlet></router-outlet>',
})
export class ADPersonasMainComponents {}

@Component({
  selector: 'app-as-mercado-libre-account',
  template: '<router-outlet></router-outlet>',
})
export class ADMercadoLibreAdminMainComponents {}

@Component({
  selector: 'app-as-facebook-ads-manager',
  template: '<router-outlet></router-outlet>',
})
export class ADFacebookAdsManagerMainComponents {}

@Component({
  selector: 'app-vtex-sites',
  template: '<router-outlet></router-outlet>',
})
export class ADVtexSitesMainComponents {}
@Component({
  selector: 'app-vtex-warehouses',
  template: '<router-outlet></router-outlet>',
})
export class ADVtexWarehousesMainComponents {}

const permission_module_AD = {
  usuarios: {
    index: ['super-admin', 'admin.users.index'],
    show: ['super-admin', 'admin.roles.show'],
    create: ['super-admin', 'admin.users.create'],
    edit: ['super-admin', 'admin.users.edit'],
    delete: ['super-admin', 'admin.users.destroy'],
  },

  roles: {
    index: ['super-admin', 'admin.roles.index'],
    show: ['super-admin', 'admin.roles.show'],
    create: ['super-admin', 'admin.roles.create'],
    edit: ['super-admin', 'admin.roles.edit'],
    delete: ['super-admin', 'admin.roles.destroy'],
  },

  paises: {
    index: ['super-admin', 'admin.countries.index'],
    show: ['super-admin', 'admin.countries.show'],
    create: ['super-admin', 'admin.countries.create'],
    edit: ['super-admin', 'admin.countries.edit'],
    delete: ['super-admin', 'admin.countries.destroy'],
  },

  location: {
    index: ['super-admin', 'admin.locations.index'],
    show: ['super-admin', 'admin.locations.shiw'],
    create: ['super-admin', 'admin.locations.create'],
    edit: ['super-admin', 'admin.locations.edit'],
    delete: ['super-admin', 'admin.locations.destroy'],
  },

  personas: {
    index: ['super-admin', 'admin.peoples.index'],
    show: ['super-admin', 'admin.peoples.show'],
    create: ['super-admin', 'admin.peoples.create'],
    edit: ['super-admin', 'admin.peoples.edit'],
    delete: ['super-admin', 'admin.peoples.destroy'],
  },

  mercado_libre: {
    index: ['super-admin', 'ml.accounts.index'],
    show: ['super-admin', 'ml.accounts.show'],
    create: ['super-admin', 'ml.accounts.create'],
    edit: ['super-admin', 'ml.accounts.edit'],
    delete: ['super-admin', 'ml.accounts.destroy'],
  },

  facebook_ads_manager: {
    index: ['super-admin', 'admin.facebook-ads.ads.index'],
    show: ['super-admin', 'admin.facebook-ads.ads.show'],
    create: ['super-admin', 'admin.facebook-ads.ads.create'],
    edit: ['super-admin', 'admin.facebook-ads.ads.edit'],
    delete: ['super-admin', 'admin.facebook-ads.ads.destroy'],
  },

  vtex_warehouses: {
    index: ['super-admin', 'admin.vtex.warehouses.index'],
    show: ['super-admin', 'admin.vtex.warehouses.show'],
    create: ['super-admin', 'admin.vtex.warehouses.create'],
    edit: ['super-admin', 'admin.vtex.warehouses.edit'],
    delete: ['super-admin', 'admin.vtex.warehouses.destroy'],
  },
  vtex_sites: {
    index: ['super-admin', 'admin.vtex.sites.index'],
    show: ['super-admin', 'admin.vtex.sites.show'],
    create: ['super-admin', 'admin.vtex.sites.create'],
    edit: ['super-admin', 'admin.vtex.sites.edit'],
    delete: ['super-admin', 'admin.vtex.sites.destroy'],
  },
};

// export const permission_usuarios_AD:IpermissionStandart = permission_module_AD.usuarios;
// export const PERMISSION_ROLES_AD:IpermissionStandart = permission_module_AD.roles;

const routes: Routes = [
  // usuarios
  {
    path: 'usuarios',
    component: ADUsersMainComponents,
    children: [
      {
        path: '',
        component: UsuariosComponent,
        data: {
          permissions: {
            only: permission_module_AD.usuarios.index,
            all: permission_module_AD.usuarios,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.usuarios.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.usuarios.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.usuarios.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  // personas
  {
    path: 'personas',
    component: ADPersonasMainComponents,
    children: [
      {
        path: '',
        component: PersonasComponent,

        data: {
          permissions: {
            only: permission_module_AD.personas.index,
            all: permission_module_AD.personas,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditPersonComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.personas.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditPersonComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.personas.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.personas.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  // roles
  {
    path: 'roles',
    component: ADRolesMainComponents,
    children: [
      {
        path: '',
        component: RolesComponent,
        data: {
          permissions: {
            all: permission_module_AD.roles,
            only: permission_module_AD.roles.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditRolesComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.roles.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditRolesComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.roles.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.roles.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },

  // paises
  {
    path: 'paises',
    component: ADPaisesMainComponents,
    children: [
      {
        path: '',
        component: PaisesComponent,
        data: {
          permissions: {
            only: permission_module_AD.paises.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditRolesComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.paises.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditRolesComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.paises.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.paises.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },

  // locaciones
  {
    path: 'locaciones',
    component: ADLocationsMainComponents,
    children: [
      {
        path: '',
        component: LocacionesComponent,
        data: {
          permissions: {
            only: permission_module_AD.location.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditLocationComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.location.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditLocationComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.location.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.location.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },

  // mercado libre admin
  {
    path: 'mercado-libre/cuentas',
    component: ADMercadoLibreAdminMainComponents,
    children: [
      {
        path: '',
        component: MercadoLibreAdminComponent,
        data: {
          permissions: {
            all: permission_module_AD.mercado_libre,
            only: permission_module_AD.mercado_libre.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: MercadoLibreCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.mercado_libre.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },

      {
        path: 'edit/:id',
        component: MercadoLibreCreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.mercado_libre.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.mercado_libre.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },

  // Facebook ads manager
  {
    path: 'facebook-ads-manager',
    component: ADFacebookAdsManagerMainComponents,
    children: [
      {
        path: '',
        component: FacebookAdsManagerComponent,
        data: {
          permissions: {
            all: permission_module_AD.facebook_ads_manager,
            only: permission_module_AD.facebook_ads_manager.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: MercadoLibreCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.facebook_ads_manager.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },

      {
        path: 'edit/:id',
        component: MercadoLibreCreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.facebook_ads_manager.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.facebook_ads_manager.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },

  // Vtex Sites
  {
    path: 'vtex-sites',
    component: ADVtexSitesMainComponents,
    children: [
      {
        path: '',
        component: VtexSitesComponent,
        data: {
          permissions: {
            all: permission_module_AD.vtex_sites,
            only: permission_module_AD.vtex_sites.index,
          },
        },
        canActivate: [NgxPermissionsGuard]
      },
      {
        path: 'create',
        component: CreateOrEditVtexSiteComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.vtex_sites.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },

      {
        path: 'edit/:id',
        component: CreateOrEditVtexSiteComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.vtex_sites.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
       // Vtex Warehouse
       {
        path: ':id/vtex-warehouses',
        component: ADVtexWarehousesMainComponents,
        children: [
          {
            path: '',
            component: VtexWarehousesComponent,
            data: {
              permissions: {
                all: permission_module_AD.vtex_warehouses,
                only: permission_module_AD.vtex_warehouses.index,
              },
            },
            canActivate: [NgxPermissionsGuard],
          },
          {
            path: 'create',
            component: CreateOrEditVtexWarehousesComponent,
            data: {
              isEdit: false,
              permissions: {
                only: permission_module_AD.vtex_warehouses.create,
              },
            },
            canActivate: [NgxPermissionsGuard],
          },
          {
            path: 'edit/:id',
            component: CreateOrEditVtexWarehousesComponent,
            data: {
              isEdit: true,
              permissions: {
                only: permission_module_AD.vtex_warehouses.edit,
              },
            },
            canActivate: [NgxPermissionsGuard],
          },
        ],
        data: {
          permissions: {
            only: permission_module_AD.vtex_warehouses.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.vtex_sites.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSystemRoutingModule {}
