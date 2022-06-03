import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocacionesComponent } from './locaciones.component';
import { LocationRouting } from './location.routing.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CreateOrEditLocationComponent } from './create-or-edit-location/create-or-edit-location.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    LocationRouting,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    SearchTemplateModule,
    NgxPermissionsModule,
    MatChipsModule,
  ],
  declarations: [
    LocacionesComponent,
    CreateOrEditLocationComponent
  ]
})
export class LocationModule { }
