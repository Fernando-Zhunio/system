import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
// import { PublicacionesComponent } from '../Catalogo/publicaciones/publicaciones.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CreateImportComponent } from './create-import/create-import.component';
import { EditImportComponent } from './edit-import/edit-import.component';

@Component({
  selector: 'app-importaciones',
  template: '<router-outlet></router-outlet>',
})
export class ImportacionesMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:ImportacionesMainComponents,
    children: [
      {
        path: 'proveedores',
        component:ProveedoresComponent,    
      }, 
      {
        path:'import/create',
        component:CreateImportComponent,
        data:{state:"create"}
      },

      {
        path:'import/edit/:id',
        component:EditImportComponent,
        data:{state:"edit"}
      },
      // {
      //   path: 'buscar_productos',
      //   // component:MarcasMainComponents,
      //   loadChildren: () => import('../Catalogo/buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      // }, 
      // {
      //   path: 'publicaciones',
      //   component:PublicacionesComponent,
      //   // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      // },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportacionesRoutingModule {}
