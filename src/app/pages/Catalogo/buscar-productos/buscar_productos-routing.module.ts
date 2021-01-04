import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasComponent } from '../categorias/categorias.component';
// import { CategoriasCreateOrEditComponent } from '../categorias/categorias-create-or-edit/categorias-create-or-edit.component';
// import { CategoriasMainComponent } from './categorias-main.component';
// import { Component } from '@angular/core';
import { BuscarProductosComponent } from './buscar-productos.component';

// @Component({
//   selector: 'app-productos',
//   template: '<router-outlet></router-outlet>',
  
// })
// export class BuscarProductosMainComponents  {
// }


const routes: Routes = [
  {
    path: '',
    component:BuscarProductosComponent,
    // children: [
    //   {
    //     path: '',
    //     component: BuscarProductosComponent,
    //   },
    //   {
    //     path: 'create',
    //     component: CategoriasCreateOrEditComponent,
    //     data:{isEdit:false}
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: CategoriasCreateOrEditComponent,
    //     data:{isEdit:true}
    //   },

     
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarProductosRoutingModule {}
