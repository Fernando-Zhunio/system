import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule, HomeMainComponents} from './home-routing.module'
import { InicioComponent } from './inicio/inicio.component';
import { MomentModule } from 'ngx-moment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewForComponent } from './dashboard/SheetButton/view-for/view-for.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatChipsModule } from '@angular/material/chips';
import { CompareProductComponent } from './dashboard/modals/compare-product/compare-product.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CompareCompanyComponent } from './dashboard/compare-company/compare-company.component';


@NgModule({
  declarations: [CompareProductComponent, InicioComponent,HomeMainComponents, DashboardComponent, ViewForComponent, CompareCompanyComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MomentModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    HeaderSearchModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
  ],
  entryComponents:[CompareProductComponent]
})
export class HomeModule { }