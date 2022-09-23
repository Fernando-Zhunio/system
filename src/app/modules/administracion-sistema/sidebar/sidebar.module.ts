import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarIndexComponent } from './sidebar-index/sidebar-index.component';
import { CreateOrEditSidebarComponent } from './create-or-edit-sidebar/create-or-edit-sidebar.component';
import { SidebarRoutingModule } from './sidebar.routing';
import { MatCardModule } from '@angular/material/card';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { IndexWithMatTableModule } from '../../../Modulos/index-with-mat-table/index-with-mat-table.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { SearchesModule } from './../../../Modulos/searches/searches.module';

@NgModule({
  declarations: [SidebarIndexComponent, CreateOrEditSidebarComponent],
  imports: [
CommonModule,
    SidebarRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    IndexWithMatTableModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    SearchesModule
  ]
})
export class SidebarModule { }
