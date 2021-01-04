import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoMainComponents, CatalogoRoutingModule } from './catalogo-routing.module';



@NgModule({
  declarations: [CatalogoMainComponents],
  imports: [
    CommonModule,
    CatalogoRoutingModule
  ]
})
export class CatalogoModule { }
