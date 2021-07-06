import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { OkLoginComponent } from './components/ok-login/ok-login.component';
import { RedirectToComponent } from './components/redirect-to/redirect-to.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthReverseGuard } from './guards/auth-reverse.guard';
import { AuthGuard } from './guards/auth.guard';
import { CapturePasswordComponent } from './pages/authenticate/capture-password/capture-password.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { InConstructionComponent } from './views/in-construction/in-construction.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

// @Component({
//   selector: 'app-authentication',
//   template: '<router-outlet></router-outlet>',
// })
// export class AutheticationMainDefaultComponents  {
// }


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/inicio',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'section-construction',
    component: InConstructionComponent,
    data: {
      title: 'Seccion en construccion'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
    canActivate:[AuthReverseGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
    canActivate:[AuthReverseGuard]
  },
  {
    path: 'redirect-to',
    component: RedirectToComponent,
    data: {
      title: 'pageRedirect'
    },
    // canActivate:[AuthGuard]
  },
  {
    path:'sesion-ml',
    component:OkLoginComponent,

    // canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'authetication',
    loadChildren: () => import('./pages/authenticate/authenticate.module').then(m => m.AuthenticateModule),
    canActivate:[AuthReverseGuard]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate:[AuthGuard],
    children: [
      // {
      //   path: 'base',
      //   loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      // },
      // {
      //   path: 'buttons',
      //   loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      // },
      // {
      //   path: 'productos',
      //   loadChildren: () => import('./pages/administracion_productos/productos/producto.module').then(m => m.ProductoModule)
      // },
      // {
      //   path: 'categorias',
      //   loadChildren: () => import('./pages/administracion_productos/categorias/categorias.module').then(m => m.CategoriasModule)
      // },
      // {
      //   path: 'marcas',
      //   loadChildren: () => import('./pages/administracion_productos/marcas/marcas.module').then(m => m.MarcasModule)
      // },
      // {
      //   path: 'prefijos',
      //   loadChildren: () => import('./pages/administracion_productos/prefijo/prefijo.module').then(m => m.PrefijoModule)
      // },
      // {
      //   path: 'buscar_productos',
      //   loadChildren: () => import('./pages/catalogo/buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      // },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),

      },
      {
        path: 'catalogo',
        loadChildren: () => import('./pages/catalogo/catalogo.module').then(m => m.CatalogoModule),
      },
      {
        path: 'admin-products',
        loadChildren: () => import('./pages/administracion_productos/administracion-productos.module').then(m => m.AdministracionProductosModule),
      },
      {
        path: 'importaciones',
        loadChildren: () => import('./pages/Importaciones/importaciones.module').then(m => m.ImportacionesModule)
      },

      {
        path: 'reports',
        loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: 'information-general',
        loadChildren: () => import('./pages/information-user/information-user.module').then(m => m.InformationUserModule)
      },
      {
        path: 'administracion-sistema',
        loadChildren: () => import('./pages/administracion-sistema/administracion-sistema.module').then(m => m.AdministracionSistemaModule)
      },

      // mercado-libre
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
