import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
// import { Component } from '@angular/core';
// import { PublicacionesComponent } from '../Catalogo/publicaciones/publicaciones.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CreateImportComponent } from './create-import/create-import.component';
import { EditImportComponent } from './edit-import/edit-import.component';
import { InConstructionComponent } from '../../views/in-construction/in-construction.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'index',
        component: ProveedoresComponent,
      },

      {
        path: 'create',
        component: CreateImportComponent,
        data: {state: 'create'}
      },

      {
        path: 'edit/:id',
        component: EditImportComponent,
        data: {state: 'edit'}
      },

      {
        path: 'codificar-importaciones',
        component: InConstructionComponent,
      },

      {
        path: 'precios-promociones',
        component: InConstructionComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportacionesRoutingModule {}
