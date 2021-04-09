import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { PrefijoComponent } from '../../administracion_productos/prefijo/prefijo.component';
import { PrefijosCreateOrEditComponent } from '../../administracion_productos/prefijo/prefijos-create-or-edit/prefijos-create-or-edit.component';
import { MercadoLibreComponent } from './mercado-libre.component';

@Component({
  selector: 'app-mercado-libre',
  template: '<router-outlet></router-outlet>',

})
export class MercadoLibreMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:MercadoLibreMainComponents,
    data:{name: 'mercado_libre_main'},
    children: [
      {
        path: '',
        component: MercadoLibreComponent,
        data: {reuse:true,name: 'mercado_libre'},

      },
      // {
      //   path: 'create',
      //   component: PrefijosCreateOrEditComponent,
      //   data:{isEdit:false}
      // },
      // {
      //   path: 'edit/:id',
      //   component: PrefijosCreateOrEditComponent,
      //   data:{isEdit:true}
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadoLibreRoutingModule {}
