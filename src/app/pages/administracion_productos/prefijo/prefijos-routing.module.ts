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
    data: {name: 'prefijos_main'},
    children: [
      {
        path: '',
        component: PrefijoComponent,
        data: {reuse:true,name:'prefijos'}

      },
      {
        path: 'create',
        component: PrefijosCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.prefixes.create"],
          },
        },
      },
      {
        path: 'edit/:id',
        component: PrefijosCreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ["super-admin", "products-admin.prefixes.edit"],
          },
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefijosRoutingModule {}
