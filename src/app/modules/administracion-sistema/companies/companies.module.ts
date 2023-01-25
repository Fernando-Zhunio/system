import { CreateOrEditCompanyComponent } from './pages/create-or-edit-company/create-or-edit-company.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexCompaniesComponent } from './pages/index-companies/index-companies.component';
import { CompaniesRoutingModule } from './companies.routing';
import { NgxSearchBarPaginatorComponent } from '../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    NgxSearchBarPaginatorComponent,
    MatChipsModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  declarations: [
    IndexCompaniesComponent,
    CreateOrEditCompanyComponent,
  ]
})
export class CompaniesModule { }
