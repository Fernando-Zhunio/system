import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-home_main',
  template: '<router-outlet></router-outlet>',
})
export class HomeMainComponents  {
}

const permission_module = {
  publicaciones:{
    index:["super-admin", "catalogs.publications.index"],
    show:["super-admin", "catalogs.publications.show"],
    create:["super-admin", "catalogs.publications.create"],
    edit:["super-admin", "catalogs.publications.edit"],
    delete:["super-admin", "catalogs.publications.destroy"]
  },
  // roles:{
  //   show:["super-admin", "admin.roles.index"],
  //   create:["super-admin", "admin.roles.create"],
  //   edit:["super-admin", "admin.roles.edit"],
  //   delete:["super-admin", "admin.roles.destroy"]
  // },
  // paises:{
  //   show:["super-admin", "admin.countries.index"],
  //   create:["super-admin", "admin.countries.create"],
  //   edit:["super-admin", "admin.countries.edit"],
  //   delete:["super-admin", "admin.countries.destroy"]
  // },
  // personas:{
  //   show:["super-admin", "admin.peoples.index"],
  //   create:["super-admin", "admin.peoples.create"],
  //   edit:["super-admin", "admin.peoples.edit"],
  //   delete:["super-admin", "admin.peoples.destroy"]
  // }
}

const routes: Routes = [
  {
        path: 'inicio',
        component:InicioComponent,
        // data: {name:'inicio',reuse:true},
  },
  {
        path: 'dashboard',
        component:DashboardComponent,
        data: {name:'dashboard',reuse:true},
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
