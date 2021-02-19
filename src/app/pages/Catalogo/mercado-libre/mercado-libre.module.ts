import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoLibreMainComponents, MercadoLibreRoutingModule } from './mercado-libre-routing.module';
import { MercadoLibreComponent } from './mercado-libre.component';
import { FormsModule } from '@angular/forms';
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
// import { TranslateModule } from '@ngx-translate/core';
import {MatPaginatorModule} from '@angular/material/paginator';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MlModule } from '../../../Modulos/ml/ml.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MlComponent } from '../../../components/ml/ml.component';



@NgModule({
  declarations: [MercadoLibreComponent,MercadoLibreMainComponents],
  imports: [
    CommonModule,
    MercadoLibreRoutingModule,
    FormsModule,
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
    // TranslateModule

  ]
})
export class MercadoLibreModule { }
