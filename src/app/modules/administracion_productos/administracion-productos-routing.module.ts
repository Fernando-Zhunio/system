import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
      {
        path: 'categorias',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriasModule),
      },
      {
        path: 'marcas',
        loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule),
      },
      {
        path: 'productos',
        loadChildren: () => import('./products/producto.module').then(m => m.ProductoModule),
      },
      {
        path: 'prefijos',
        loadChildren: () => import('./prefixes/prefixes.module').then(m => m.PrefixesModule),
      },
      {
        path: 'vtex-products',
        loadChildren: () => import('./vtex-productos/vtex-productos.module').then(m => m.VtexProductosModule),
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductRoutingModule {}
