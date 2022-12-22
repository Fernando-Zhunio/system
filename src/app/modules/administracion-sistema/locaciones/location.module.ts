import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexLocationsPage } from './pages/index-locations/index-locations.page';
import { LocationRouting } from './location.routing.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CreateOrEditLocationComponent } from './pages/create-or-edit-location/create-or-edit-location.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { SearchTemplateTableComponent } from '../../../Modulos/search-template/search-template-table/search-template-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailLocationDialogComponent } from './components/detail-location-dialog/detail-location-dialog.component';
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
    // SearchTemplateModule,
    SearchTemplateTableComponent,
    NgxPermissionsModule,
    MatChipsModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
  ],
  declarations: [
    IndexLocationsPage,
    CreateOrEditLocationComponent,
    DetailLocationDialogComponent,
  ]
})
export class LocationModule { }
