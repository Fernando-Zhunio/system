import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users.routing';
import { UsersIndexComponent } from './pages/index-users-user/users-index.component';
import { CreateOrEditUserComponent } from './pages/create-or-edit-user/create-or-edit-user.component';
// import { SearchesModule } from '../../../Modulos/searches/searches.module';
// import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatTableModule } from '@angular/material/table';
import { MomentModule } from 'ngx-moment';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchProductsDialogModule } from '../../../shared/search-products-dialog/search-products-dialog.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchPersonDialogComponent } from './components/search-person-dialog/search-person-dialog.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatChipsModule } from '@angular/material/chips';
import { SearchTemplateTableComponent } from '../../../Modulos/search-template/search-template-table/search-template-table.component';
import { JoinPipe } from '../../../shared/pipes/join.pipe';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    // SearchesModule,
    // SearchTemplateModule,
    MatTableModule,
    MomentModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    SearchProductsDialogModule,
    MatButtonModule,
    NgxPermissionsModule,
    MatChipsModule,
    SearchTemplateTableComponent,
    JoinPipe
  ],
  declarations: [UsersIndexComponent, CreateOrEditUserComponent, SearchPersonDialogComponent]
})
export class UsersModule { }
