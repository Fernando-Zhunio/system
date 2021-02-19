import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupProductsComponent } from './group-products/group-products.component';
import { ReportesRoutingModule, ReportsMainComponents } from './reportes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { CreateOrEditGroupProductsComponent } from './group-products/create-or-edit-group-products/create-or-edit-group-products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxDocViewerModule } from 'ngx-doc-viewer';



@NgModule({
  declarations: [GroupProductsComponent,ReportsMainComponents, CreateOrEditGroupProductsComponent],
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
  ]
})
export class ReportesModule { }
