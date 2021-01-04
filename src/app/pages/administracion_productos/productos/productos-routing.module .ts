import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateOrEditComponent } from './product-create-or-edit/product-create-or-edit.component';
import { ProductosMainComponent } from './productos-main.component';


import { ProductosComponent } from './productos.component';

const routes: Routes = [
  {
    path: '',
    component:ProductosMainComponent,
    children: [
      {
        path: '',
        component: ProductosComponent,
      },
      {
        path: 'create',
        component: ProductCreateOrEditComponent,
        data:{isEdit:false}
      },
      {
        path: 'edit/:id',
        component: ProductCreateOrEditComponent,
        data:{isEdit:true}
      },

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule {}
