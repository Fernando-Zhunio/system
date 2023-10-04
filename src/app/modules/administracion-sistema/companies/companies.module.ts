import { CreateOrEditCompanyComponent } from './pages/create-or-edit-company/create-or-edit-company.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexCompaniesComponent } from './pages/index-companies/index-companies.component';
import { CompaniesRoutingModule } from './companies.routing';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IndexDepartmentsComponent } from './pages/index-departments/index-departments.component';
import { CreateOrEditDepartmentComponent } from './pages/create-or-edit-department/create-or-edit-department.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { IndexPositionsComponent } from './pages/index-positions/index-positions.component';
import { DialogCreateOrEditPositionComponent } from './components/dialog-create-or-edit-position/dialog-create-or-edit-position.component';
import { NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    NgxSearchBarModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTreeModule,
    MatRadioModule
  ],
  declarations: [
    IndexCompaniesComponent,
    CreateOrEditCompanyComponent,
    IndexDepartmentsComponent,
    CreateOrEditDepartmentComponent,
    IndexPositionsComponent,
    DialogCreateOrEditPositionComponent,
  ]
})
export class CompaniesModule { }
