import { NgxSearchBarPaginatorComponent } from './../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MercadoLibreRoutingModule } from './mercado-libre-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import {MatChipsModule} from '@angular/material/chips';
// import { BsDropdownModule } from "ngx-bootstrap/dropdown";
// import {MatMenuModule} from '@angular/material/menu';
// import { MomentModule } from 'ngx-moment';
// import { NgxPaginationModule } from 'ngx-pagination';
// import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
// import {MatTabsModule} from '@angular/material/tabs';
// import { MlModule } from '../../../../Modulos/ml/ml.module';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import { HeaderSearchModule } from '../../../../Modulos/header-search/header-search.module';
// import { SearchTemplateModule } from '../../../../Modulos/search-template/search-template.module';
import { IndexMercadoLibreComponent } from './pages/index-mercado-libre/index-mercado-libre.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [IndexMercadoLibreComponent],
  imports: [
    CommonModule,
    MercadoLibreRoutingModule,
    // FormsModule,
    ReactiveFormsModule,
    // BsDropdownModule,
    MatFormFieldModule,
    // MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    // MatMenuModule,
    // MomentModule,
    // NgxPaginationModule,
    // MatPaginatorModule,
    // NgxSkeletonLoaderModule,
    MatSelectModule,
    // MatTabsModule,
    // MlModule,
    // MatSnackBarModule,
    // MatToolbarModule,
    // HeaderSearchModule,
    // SearchTemplateModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    NgxSearchBarPaginatorComponent,
    MatTableModule,
    NgOptimizedImage,
  ]
})
export class MercadoLibreModule { }
