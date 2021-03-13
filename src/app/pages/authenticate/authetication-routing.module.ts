import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { CapturePasswordComponent } from './capture-password/capture-password.component';

@Component({
  selector: 'app-authetication',
  template: '<router-outlet></router-outlet>',
})
export class AutheticationMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:AutheticationMainComponents,
    children: [
      {
        path: 'capturar-password',
        component:CapturePasswordComponent,
      },
      // {
      //   path: 'buscar_productos',
      //   loadChildren: () => import('../Catalogo/buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      // },
      // {
      //   path: 'publicaciones',
      //   component:PublicacionesComponent,
      // },
      // {
      //   path: 'publicaciones/create',
      //   component:CreateOrEditPublicacionComponent,
      //   data: {
      //     isEdit: false,
      //     permissions: {
      //       only: ["super-admin", "catalogs.publications.create"],
      //     },
      //   },
      //   canActivate: [NgxPermissionsGuard],
      // },
      // {
      //   path: 'publicaciones/edit/:id',
      //   component:CreateOrEditPublicacionComponent,
      //   data: {
      //     isEdit: true,
      //     permissions: {
      //       only: ["super-admin", "catalogs.publications.edit"],
      //     },
      //   },
      //   canActivate: [NgxPermissionsGuard],
      // },
      // {
      //   path: 'publicaciones/show/:id',
      //   component:ShowPublicationComponent,
      //   data: {
      //     permissions: {
      //       only: ["super-admin", "catalogs.publications.show"],
      //     },
      //   },
      //   canActivate: [NgxPermissionsGuard],
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutheticationRoutingModule {}
