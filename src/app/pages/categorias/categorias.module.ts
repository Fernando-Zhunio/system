import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { CategoriasCreateOrEditComponent } from './categorias-create-or-edit/categorias-create-or-edit.component';
import { CategoriasRoutingModule,CategoriasMainComponents } from './categorias-routing.module ';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
// import { CategoriasMainComponent } from './categorias-main.component';



@NgModule({
  declarations: [CategoriasComponent, CategoriasCreateOrEditComponent,CategoriasMainComponents],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CategoriasModule { }
