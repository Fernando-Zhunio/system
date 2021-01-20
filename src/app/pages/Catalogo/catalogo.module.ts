import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoMainComponents, CatalogoRoutingModule } from './catalogo-routing.module';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatMenuModule } from '@angular/material/menu';
import { CreateOrEditPublicacionComponent } from './publicaciones/create-or-edit-publicacion/create-or-edit-publicacion.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MlComponent } from '../../components/ml/ml.component';
import { MomentModule } from 'ngx-moment';
import { MlModule } from '../../Modulos/ml/ml.module';



@NgModule({
  declarations: [CatalogoMainComponents, PublicacionesComponent, CreateOrEditPublicacionComponent],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    MatTabsModule,
    NgxFileDropModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: false, 
      rolesIsolate: false}),
    MatMenuModule,
    DragDropModule,
    MatAutocompleteModule,
    MatListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MlModule
    // MomentModule,
    
  ]
})
export class CatalogoModule { }
