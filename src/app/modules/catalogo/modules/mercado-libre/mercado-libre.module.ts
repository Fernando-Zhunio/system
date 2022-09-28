import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoLibreRoutingModule } from './mercado-libre-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import {MatChipsModule} from '@angular/material/chips';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import {MatMenuModule} from '@angular/material/menu';
import { MomentModule } from 'ngx-moment';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MlModule } from '../../../../Modulos/ml/ml.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderSearchModule } from '../../../../Modulos/header-search/header-search.module';
import { SearchTemplateModule } from '../../../../Modulos/search-template/search-template.module';
import { MercadoLibreIndexComponent } from './pages/mercado-libre-index/mercado-libre-index.component';

@NgModule({
  declarations: [MercadoLibreIndexComponent],
  imports: [
    CommonModule,
    MercadoLibreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MomentModule,
    NgxPaginationModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MatSelectModule,
    MatTabsModule,
    MlModule,
    MatSnackBarModule,
    MatToolbarModule,
    HeaderSearchModule,
    SearchTemplateModule
  ]
})
export class MercadoLibreModule { }
