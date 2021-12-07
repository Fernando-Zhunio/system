import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
// import { IndexComponent } from './versus/index/index.component';

// @Component({
//   selector: 'app-home_main',
//   template: '<router-outlet></router-outlet>',
// })
// // tslint:disable-next-line: component-class-suffix
// export class HomeMainComponents  {
// }

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
        path: 'inicio',
        component: InicioComponent,
  },
  {
        path: 'dashboard',
        children: [
          {
            path: '',
            component: DashboardComponent,
          },
          {
            path: 'versus',
            loadChildren: () => import('./versus/versus.module').then(m => m.VersusModule),
            // canActivate: [NgxPermissionsGuard],
          }
        ],
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'dashboard'],
          },
        },
        canActivate: [NgxPermissionsGuard],
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
