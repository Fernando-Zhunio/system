import { Inject, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRappiProductsComponent } from './index-rappi-products/index-rappi-products.component';

const routes: Routes = [
  {
    path: '',
    component: IndexRappiProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RappiProductsRoutingModule { }


