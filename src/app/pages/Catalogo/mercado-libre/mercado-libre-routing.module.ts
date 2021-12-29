import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MercadoLibreComponent } from './mercado-libre.component';

const routes: Routes = [
  {
    path: '',
    component: MercadoLibreComponent,
    data: { reuse: true, name: 'mercado_libre' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadoLibreRoutingModule { }
