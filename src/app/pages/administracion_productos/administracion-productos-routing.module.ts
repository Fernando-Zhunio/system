import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriasCreateOrEditComponent } from './categorias/categorias-create-or-edit/categorias-create-or-edit.component';
// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  template: '<router-outlet></router-outlet>',
  
})
export class AdminProductsMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:AdminProductsMainComponents,
    children: [
      {
        path: 'categorias',
        loadChildren:()=>import('./categorias/categorias.module').then(m => m.CategoriasModule)
      },
      {
        path: 'marcas',
        loadChildren:()=>import('./marcas/marcas.module').then(m => m.MarcasModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./productos/producto.module').then(m => m.ProductoModule)
      },
      {
        path: 'prefijos',
        loadChildren: () => import('./prefijo/prefijo.module').then(m => m.PrefijoModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductRoutingModule {}
