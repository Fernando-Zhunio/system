import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { OrganizationChartSystemComponent } from './organization-chart/organization-chart.component';
import { InConstructionComponent } from '../../views/in-construction/in-construction.component';

@Component({
  selector: 'app-importaciones',
  template: '<router-outlet></router-outlet>',
})
export class InformationUserMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:InformationUserMainComponents,
    children: [
      {
        path: 'organizacion',
        component:OrganizationChartSystemComponent,
        // component:InConstructionComponent,
      },
      // {
      //   path:'import/create',
      //   component:CreateImportComponent,
      //   data:{state:"create"}
      // },

      // {
      //   path:'import/edit/:id',
      //   component:EditImportComponent,
      //   data:{state:"edit"}
      // },
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
export class InformationUserRoutingModule {}
