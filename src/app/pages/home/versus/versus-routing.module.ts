import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VersusProductosComponent } from './versus-productos/versus-productos.component';
import { VersusCategoriasComponent } from './versus-categorias/versus-categorias.component';
import { VersusLocalesComponent } from './versus-locales/versus-locales.component';
import { VersusCitiesComponent } from './versus-cities/versus-cities.component';

const routes: Routes = [

  {
    path: 'products',
    component: VersusProductosComponent
  },
  {
    path: 'categories',
    component: VersusCategoriasComponent
  },
  {
    path: 'locations',
    component: VersusLocalesComponent
  },
  {
    path: 'cities',
    component: VersusCitiesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class VersusRoutingModule {}
