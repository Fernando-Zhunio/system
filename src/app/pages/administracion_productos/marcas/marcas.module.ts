import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasComponent } from './marcas.component';
import { MarcasRoutingModule, MarcasMainComponents } from './marcas-routing.module';
import { MarcasCreateOrEditComponent } from './marcas-create-or-edit/marcas-create-or-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [MarcasComponent,MarcasCreateOrEditComponent, MarcasMainComponents],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    NgxPermissionsModule,
  ]
})
export class MarcasModule { }
