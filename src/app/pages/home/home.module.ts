import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { MomentModule } from 'ngx-moment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SellChartComponent } from './dashboard/chart/sell-chart/sell-chart.component';
import { MatRadioModule } from '@angular/material/radio';
import { ProductChartComponent } from './dashboard/chart/product-chart/product-chart.component';
import { CategoryChartComponent } from './dashboard/chart/category-chart/category-chart.component';
import { IndexComponent } from './versus/index/index.component';
import { SelectDatesDashboardComponent } from './dashboard/modals/select-dates-dashboard/select-dates-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LocalesChartComponent } from './dashboard/chart/locales-chart/locales-chart.component';
import { MarkdownModule } from '../../Modulos/Markdown/markdown/markdown.module';
import { ProfileComponent } from './profile/profile.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StoresComponent } from './stores/stores.component';
import { ModificateStoresComponent } from './stores/modificate-stores/modificate-stores.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxBarSearchModule } from '../../../../projects/ngx-bar-search/src/public-api';
import { environment } from '../../../environments/environment';
// import * as echarts from 'echarts';
export function chartModule(): any {
  return import('echarts');
}
@NgModule({
    declarations: [ModificateStoresComponent, StoresComponent, IndexComponent, InicioComponent, DashboardComponent, SellChartComponent, ProductChartComponent, CategoryChartComponent, SelectDatesDashboardComponent, LocalesChartComponent, ProfileComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        FormsModule,
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
        MatCardModule,
        NgxSpinnerModule,
        MatTableModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDialogModule,
        MatBadgeModule,
        MatButtonToggleModule,
        MarkdownModule,
        NgxPermissionsModule,
        NgxEchartsModule.forRoot({
            echarts: chartModule
        }),
        NgxBarSearchModule.forRoot({serverUrl: environment.server})
    ]
})
export class HomeModule { }
