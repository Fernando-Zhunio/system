import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { CreateOrEditPublicacionComponent } from './publicaciones/create-or-edit-publicacion/create-or-edit-publicacion.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ShowPublicationComponent } from './publicaciones/show-publication/show-publication.component';

@Component({
  selector: 'app-catalogo',
  template: '<router-outlet></router-outlet>',
})
export class CatalogoMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:CatalogoMainComponents,
    children: [
      {
        path: 'mercado-libre',
        // component:MarcasMainComponents,
        loadChildren: () => import('./mercado-libre/mercado-libre.module').then(m => m.MercadoLibreModule)
      }, 
      {
        path: 'buscar_productos',
        // component:MarcasMainComponents,
        loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      }, 
      {
        path: 'publicaciones',
        component:PublicacionesComponent,
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
      {
        path: 'publicaciones/create',
        component:CreateOrEditPublicacionComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ["super-admin", "catalogs.publications.create"],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
      {
        path: 'publicaciones/edit/:id',
        component:CreateOrEditPublicacionComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ["super-admin", "catalogs.publications.edit"],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
      {
        path: 'publicaciones/show/:id',
        component:ShowPublicationComponent,
        data: {
          permissions: {
            only: ["super-admin", "catalogs.publications.show"],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule {}
