import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias.component';
import { CategoriasCreateOrEditComponent } from './categorias-create-or-edit/categorias-create-or-edit.component';
// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  template: '<router-outlet></router-outlet>',
  
})
export class CategoriasMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:CategoriasMainComponents,
    children: [
      {
        path: '',
        component: CategoriasComponent,
      },
      {
        path: 'create',
        component: CategoriasCreateOrEditComponent,
        data:{isEdit:false}
      },
      {
        path: 'edit/:id',
        component: CategoriasCreateOrEditComponent,
        data:{isEdit:true}
      },

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule {}
