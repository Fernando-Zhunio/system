import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule, RrhhRequestMainComponents } from './requests-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateOrEditRequestComponent } from './create-or-edit-request/create-or-edit-request.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderSearchModule } from '../../../Modulos/header-search/header-search.module';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [RrhhRequestMainComponents, IndexComponent, CreateOrEditRequestComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MatIconModule,
    HeaderSearchModule,
    MatChipsModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDocViewerModule,
    MatMenuModule,
  ]
})
export class RequestsModule { }
