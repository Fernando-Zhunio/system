import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { MarcasCreateOrEditComponent } from './marcas-create-or-edit/marcas-create-or-edit.component';
import { MarcasComponent } from './marcas.component';

@Component({
  selector: 'app-marcas',
  template: '<router-outlet></router-outlet>',
  
})
export class MarcasMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:MarcasMainComponents,
    children: [
      {
        path: '',
        component: MarcasComponent,
      },
      {
        path: 'create',
        component: MarcasCreateOrEditComponent,
        data:{isEdit:false}
      },
      {
        path: 'edit/:id',
        component: MarcasCreateOrEditComponent,
        data:{isEdit:true}
      },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasRoutingModule {}
