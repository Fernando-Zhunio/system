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

const permission_module = {
  buscar_producto:{
    index:["super-admin", "catalogs.products.index"],
    show:["super-admin", "catalogs.products.show"],
    create:["super-admin", "catalogs.products.create"],
    edit:["super-admin", "catalogs.products.edit"],
    delete:["super-admin", "catalogs.products.destroy"]
  },

}
const routes: Routes = [
  {
    path: '',
    component:BuscarProductosComponent,
    data: {
      // isEdit: false,
      name:'buscar_productos',
      reuse: true,
      permissions: {
        only: ["super-admin", permission_module.buscar_producto.index],
        all:permission_module.buscar_producto
      },
    },
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
