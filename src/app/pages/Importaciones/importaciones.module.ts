import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportacionesRoutingModule } from './importaciones-routing.module';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ImportModule } from '../../Modulos/import/import.module';
import { CreateImportComponent } from './create-import/create-import.component';
import { EditImportComponent } from './edit-import/edit-import.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MlModule } from '../../Modulos/ml/ml.module';
import { InvoiceCreateOrEditComponent } from '../../components/invoice-create-or-edit/invoice-create-or-edit.component';
// import { OrgchartModule } from '@dabeng/ng-orgchart';


@NgModule({
  declarations: [ ProveedoresComponent, CreateImportComponent,InvoiceCreateOrEditComponent,EditImportComponent],
  imports: [
    CommonModule,
    ImportacionesRoutingModule,
    HeaderSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    ImportModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxFileDropModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MlModule,
    // OrgchartModule,

  ]
})
export class ImportacionesModule { }
