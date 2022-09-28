import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MercadoLibreIndexComponent } from './pages/mercado-libre-index/mercado-libre-index.component';

const routes: Routes = [
  {
    path: '',
    component: MercadoLibreIndexComponent,
    data: { name: 'mercado_libre' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadoLibreRoutingModule { }
