import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {  AdminSystemRoutingModule, ADRolesMainComponents, ADUsersMainComponents, ADPaisesMainComponents, ADLocationsMainComponents } from './administracion-sistema-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MomentModule } from 'ngx-moment';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrEditComponent } from './usuarios/create-or-edit/create-or-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RolesComponent } from './roles/roles.component';
import { CreateOrEditRolesComponent } from './roles/create-or-edit-roles/create-or-edit-roles.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PaisesComponent } from './paises/paises.component';
import { CreateOrEditCountryComponent } from './paises/create-or-edit-country/create-or-edit-country.component';
import { LocacionesComponent } from './locaciones/locaciones.component';
import { CreateOrEditLocationComponent } from './locaciones/create-or-edit-location/create-or-edit-location.component';
import { ConvertsModule } from '../../Modulos/converts/converts.module';
// import { ConvertObjectToArrayPipe } from '../../pipes/convert-object-to-array.pipe';



@NgModule({
  declarations: [UsuariosComponent,ADUsersMainComponents,ADRolesMainComponents,CreateOrEditComponent, RolesComponent, CreateOrEditRolesComponent, PaisesComponent, ADPaisesMainComponents,CreateOrEditCountryComponent, LocacionesComponent, CreateOrEditLocationComponent,ADLocationsMainComponents],
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
    ConvertsModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderSearchModule,
    MatPaginatorModule,
    MatSnackBarModule,
    DragDropModule,
    FormsModule,
  ],

  entryComponents: [
    CreateOrEditCountryComponent,
  ]
})
export class AdministracionSistemaModule { }
