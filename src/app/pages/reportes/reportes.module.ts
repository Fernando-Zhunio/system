import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupProductsComponent } from './group-products/group-products.component';
import { ReportesRoutingModule, ReportsMainComponents } from './reportes-routing.module';
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



@NgModule({
  declarations: [GroupProductsComponent, ReportsMainComponents, CreateOrEditGroupProductsComponent, DownloadStockComponent],
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

  ]
})
export class ReportesModule { }
