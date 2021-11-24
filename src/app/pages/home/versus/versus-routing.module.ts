import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
// import { Component } from '@angular/core';

// import { InicioComponent } from '../inicio/inicio.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { NgxPermissionsGuard } from 'ngx-permissions';
// import { IndexComponent } from './index/index.component';
import { VersusProductosComponent } from './versus-productos/versus-productos.component';
import { VersusCategoriasComponent } from './versus-categorias/versus-categorias.component';
// @Component({
//   selector: 'app-versus_main',
//   template: '<router-outlet></router-outlet>',
// })
// export class VersusMainComponents  {
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
  // {
  //       path: '',
  //       component: IndexComponent,
  // },
  {
    path: 'products',
    component: VersusProductosComponent
  },
  {
    path: 'categories',
    component: VersusCategoriasComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class VersusRoutingModule {}
