import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OkLoginComponent } from './components/ok-login/ok-login.component';
// import { RedirectToComponent } from './components/redirect-to/redirect-to.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthReverseGuard } from './guards/auth-reverse.guard';
import { AuthGuard } from './guards/auth.guard';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
// import { LoginComponent } from './modules/authenticate/pages/login/login.component';
// import { RegisterComponent } from './views/register/register.component';

// import { FormRecuperationPasswordComponent } from './views/form-recuperation-password/form-recuperation-password.component';
// import { RecuperatePasswordGuard } from './guards/recuperate-password.guard';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { P403Component } from './views/error/p403/p403.component';
import { MainResolver } from './guards/resolvers/main.resolver';
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
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page',
  //     guard: 'guest'
  //   },
  //   canActivate: [AuthReverseGuard]
  // },
  // {
  //   path: 'recuperation-password',
  //   component: FormRecuperationPasswordComponent,
  //   resolve: { user: RecuperatePasswordGuard },
  //   data: {
  //     title: 'Recuperation password Page',
  //     guard: 'guest'
  //   },
  // },
  // {
  //   path: 'auth',
  // }

  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page',
  //     guard: 'guest'
  //   },
  //   canActivate: [AuthReverseGuard]
  // },
  // {
  //   path: 'redirect-to',
  //   component: RedirectToComponent,
  //   data: {
  //     title: 'pageRedirect',
  //     guard: 'guest'
  //   },
  // },
  {
    path: 'sesion-ml',
    component: OkLoginComponent,
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authenticate/authenticate.module').then(m => m.AuthenticateModule),
    canActivate: [AuthReverseGuard],
    data: {
      title: 'pageRedirect',
      guard: 'guest'
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    resolve: {res: MainResolver},
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'catalogo',
        loadChildren: () => import('./modules/catalogo/catalogo.module').then(m => m.CatalogoModule),
      },
      {
        path: 'admin-products',
        loadChildren: () => import('./modules/administracion_productos/administracion-productos.module').then(m => m.AdministracionProductosModule),
      },
      // {
      //   path: 'importaciones',
      //   loadChildren: () => import('./modules/Importaciones/importaciones.module').then(m => m.ImportacionesModule)
      // },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: 'information-general',
        loadChildren: () => import('./modules/information-user/information-user.module').then(m => m.InformationUserModule)
      },
      {
        path: 'administracion-sistema',
        loadChildren: () => import('./modules/administracion-sistema/administracion-sistema.module').then(m => m.AdministracionSistemaModule)
      },
      {
        path: 'recursos-humanos',
        loadChildren: () => import('./modules/rrhh/rrhh.module').then(m => m.RrhhModule),
      },
      {
        path: 'chats',
        loadChildren: () => import('./modules/chats/chats.module').then(m => m.ChatsModule),
      },
      {
        path: 'system-orders',
        loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule),
      },
      // {
      //   path: 'system-orders',
      //   loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule),
      // },

      // {
      //   path: 'icons',
      //   loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      // },

      // {
      //   path: 'charts',
      //   loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      // },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      // },
      // {
      //   path: 'theme',
      //   loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      // }
      { path: 'system/404', component: P404Component },
      { path: 'system-error/403', component: P403Component },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoadingBarModule],
  exports: [RouterModule, LoadingBarModule]
})
export class AppRoutingModule { }
