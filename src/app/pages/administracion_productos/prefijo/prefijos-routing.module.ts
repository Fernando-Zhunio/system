import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { PrefijoComponent } from './prefijo.component';
import { PrefijosCreateOrEditComponent } from './prefijos-create-or-edit/prefijos-create-or-edit.component';

@Component({
  selector: 'app-prefijos',
  template: '<router-outlet></router-outlet>',
  
})
export class PrefijoMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:PrefijoMainComponents,
    children: [
      {
        path: '',
        component: PrefijoComponent,
      },
      {
        path: 'create',
        component: PrefijosCreateOrEditComponent,
        // data:{isEdit:false}
        data: {
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.prefix.create"],
          },
        },
      },
      {
        path: 'edit/:id',
        component: PrefijosCreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ["super-admin", "products-admin.prefix.edit"],
          },
        },
        // data:{isEdit:true}
      },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefijosRoutingModule {}
