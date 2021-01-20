import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportacionesMainComponents, ImportacionesRoutingModule } from './importaciones-routing.module';
import { ProveedoresComponent } from './proveedores/proveedores.component';



@NgModule({
  declarations: [ImportacionesMainComponents, ProveedoresComponent],
  imports: [
    CommonModule,
    ImportacionesRoutingModule
  ]
})
export class ImportacionesModule { }
