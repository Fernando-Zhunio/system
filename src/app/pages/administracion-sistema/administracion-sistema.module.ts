import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminSystemMainComponents, AdminSystemRoutingModule } from './administracion-sistema-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MomentModule } from 'ngx-moment';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrEditComponent } from './usuarios/create-or-edit/create-or-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [UsuariosComponent,AdminSystemMainComponents,CreateOrEditComponent],
  imports: [
    CommonModule,
    AdminSystemRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MomentModule,
    NgxPermissionsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderSearchModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ]
})
export class AdministracionSistemaModule { }
