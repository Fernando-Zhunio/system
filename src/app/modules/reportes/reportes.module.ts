import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupProductsComponent } from './group-products/group-products.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { CreateOrEditGroupProductsComponent } from './group-products/create-or-edit-group-products/create-or-edit-group-products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatChipsModule } from '@angular/material/chips';
import { DownloadStockComponent } from './download-stock/download-stock.component';
import {MatListModule} from '@angular/material/list';
import { MomentModule } from 'ngx-moment';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SearchTemplateModule } from '../../Modulos/search-template/search-template.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IndexReportsComponent } from './index-reports/index-reports.component';
import { CreateOrEditReportComponent } from './create-or-edit-report/create-or-edit-report.component';



@NgModule({
  declarations: [GroupProductsComponent, IndexReportsComponent, CreateOrEditReportComponent, CreateOrEditGroupProductsComponent, DownloadStockComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxDocViewerModule,
    MatChipsModule,
    FormsModule,
    MatListModule,
    MomentModule,
    MatSlideToggleModule,

    SearchTemplateModule,
    MatTableModule,
    // ReportsRoutingModule,
    NgxPermissionsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class ReportesModule { }
