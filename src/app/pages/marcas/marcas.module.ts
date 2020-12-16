import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasComponent } from './marcas.component';
import { MarcasRoutingModule, MarcasMainComponents } from './marcas-routing.module';
import { MarcasCreateOrEditComponent } from './marcas-create-or-edit/marcas-create-or-edit.component';



@NgModule({
  declarations: [MarcasComponent,MarcasCreateOrEditComponent, MarcasMainComponents],
  imports: [
    CommonModule,
    MarcasRoutingModule,
  ]
})
export class MarcasModule { }
