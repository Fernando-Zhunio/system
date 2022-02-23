import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarProductosComponent } from './buscar-productos.component';



const permission_module = {
  buscar_producto: {
    index: ['super-admin', 'catalogs.products.index'],
    show: ['super-admin', 'catalogs.products.show'],
    create: ['super-admin', 'catalogs.products.create'],
    edit: ['super-admin', 'catalogs.products.edit'],
    delete: ['super-admin', 'catalogs.products.destroy']
  },
}
const routes: Routes = [
  {
    path: '',
    component: BuscarProductosComponent,
    data: {
      name:'buscar_productos',
      reuse: true,
      permissions: {
        only: ['super-admin', permission_module.buscar_producto.index],
        all: permission_module.buscar_producto
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
