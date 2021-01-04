import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule {}
