import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexMercadoLibreComponent } from './pages/index-mercado-libre/index-mercado-libre.component';

const routes: Routes = [
  {
    path: '',
    component: IndexMercadoLibreComponent,
    data: { name: 'mercado_libre' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadoLibreRoutingModule { }
