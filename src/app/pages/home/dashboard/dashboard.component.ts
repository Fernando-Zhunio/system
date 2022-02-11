import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {  LinearScale, LineController, LineElement, PointElement, registerables, Title } from 'chart.js';
import Chart from 'chart.js/auto';
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import { StandartSearchService } from '../../../services/standart-search.service';
import { IheaderDashboard, IsalesHeader, ISeller, IsellForCity, IstatisticableLocation, IstatisticableProduct, ItopDashboard } from '../../../interfaces/idashboard';
import * as moment from 'moment';
import { PageEvent } from '@angular/material/paginator';
import { SellChartComponent } from './chart/sell-chart/sell-chart.component';
import { ProductChartComponent } from './chart/product-chart/product-chart.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IndexComponent } from '../versus/index/index.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectDatesDashboardComponent } from './modals/select-dates-dashboard/select-dates-dashboard.component';
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LocalesChartComponent } from './chart/locales-chart/locales-chart.component';
import { CategoryChartComponent } from './chart/category-chart/category-chart.component';
import { Store } from '@ngrx/store';
import { selectPreference } from '../../../redux/state/state.selectors';
import { IDatesDashboard } from '../../../interfaces/idates-dashboard';
import { EKeyDashboard } from '../../../enums/EkeyDashboard.enum';
moment.locale('es');
Chart.register(...registerables);
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
interface IsellCity {
  // id: number;
  name: string;
  total: number;
}
interface IsellerTable {
  // id: number;
  name: string;
  total: number;
  alias: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private store: Store, public s_standard: StandartSearchService, private bottomSheet: MatBottomSheet, private dialogDates: MatDialog) {
  }
  @ViewChild('chartSell', { static: true }) chartSellChart: SellChartComponent;
  @ViewChild('chartProduct', { static: true }) chartProductChart: ProductChartComponent;
  @ViewChild('chartLocales', { static: true }) chartLocales: LocalesChartComponent;
  @ViewChild('chartCategory', { static: true }) chartCategory: CategoryChartComponent;

  chartVentas: Chart = null;
  chartSellForCategories: Chart = null;
  dateRange: IDatesDashboard = null;
  formDate: FormGroup = new FormGroup({
    star_date: new FormControl(new Date()),
    end_date: new FormControl(new Date()),
  });
  displayedColumnsLocal: string[] = [
    'company',
    'name',
    'total',
  ];
  ELEMENT_DATA_LOCAL: IsellCity[] = [];
  dataSourceLocal = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA_LOCAL);

  displayedColumnsCity: string[] = [
    'name',
    'avg',
    'total',
  ];
  ELEMENT_DATA_CITY: IsellCity[] = [];
  dataSourceCity = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA_CITY);
  paginator: PageEvent = new PageEvent();

  displayedColumnsSeller: string[] = [
    'name',
    'alias',
    'total',
  ];

  ELEMENT_DATA_SELLER: IsellerTable[] = [];
  dataSourceSeller = new MatTableDataSource<IsellerTable>(this.ELEMENT_DATA_SELLER);
  paginatorSeller: PageEvent = new PageEvent();
  airDate: AirDatepicker = null;
  airDatePreview: AirDatepicker = null;
  total_sell: IsalesHeader;
  value_middle: IsalesHeader;
  invoice_total: IsalesHeader;
  products_sold_count: IsalesHeader;
  readonly keyDashboardDates: string = 'dashboard_dates';
  isLoadingHeader: boolean = false;
  options = {
    locale: localeEs,
    dateFormat: 'yyyy MMMM dd',
    range: true,
    multipleDatesSeparator: ' A ',
  };
  notFirstCall: number = 0;
  unSubscriptedStorePreference: Subscription = null;

  ngOnInit(): void {
    this.unSubscriptedStorePreference =  this.store.select(selectPreference).subscribe(preferences => {
      console.log(preferences && preferences.hasOwnProperty(this.keyDashboardDates) && typeof preferences[this.keyDashboardDates] === 'object' && preferences[this.keyDashboardDates] !== null)
      if (preferences && typeof preferences === 'object' && preferences.hasOwnProperty(this.keyDashboardDates) && typeof preferences[this.keyDashboardDates] === 'object' && preferences[this.keyDashboardDates] !== null) {
        console.log(preferences);
        this.dateRange = preferences[this.keyDashboardDates];
        if (this.notFirstCall > 1) {
        this.getDateHeader();
        this.chartProductChart.updateChart();
        this.chartSellChart.updateChart();
        this.chartLocales.updateChart();
        this.chartCategory.updateChart();
        this.updateTableForLocales();
        this.updateChartTableForCity();
        this.updateTableForSellers();
        return;
        }
      }
      this.notFirstCall++;
    });
    // this.loadDate();
    this.getDateHeader();
    this.updateTableForLocales();
    this.updateChartTableForCity();
    this.updateTableForSellers();
  }

  ngOnDestroy(): void {
    if (this.unSubscriptedStorePreference) {
      this.unSubscriptedStorePreference.unsubscribe();
    }
  }

  getDateHeader(): void {
    // const date = this.getDate();
    this.isLoadingHeader = true;
    this.s_standard.index(`dashboard/stats/basic-metrics?start_date`).subscribe(
      (response) => {
        this.assignHeaderDate(response.data);
        this.isLoadingHeader = false;
      }, err => { console.log(err); this.isLoadingHeader = false; });
  }

  assignHeaderDate(data: IheaderDashboard): void {
    this.total_sell = data.sales_total;
    this.value_middle = data.sales_average;
    this.invoice_total = data.sales_count;
    this.products_sold_count = data.products_sold_count;
  }

  openSelectVersus(): void {
    this.bottomSheet.open(IndexComponent);
  }

  openDialogDates(): void {
    this.dialogDates.open(SelectDatesDashboardComponent, { panelClass: 'rounded-fz' });
  }


  //#region Table for City
  updateChartTableForCity(): void {
    // const date = this.getDate();
    this.s_standard.index(`dashboard/stats/sales-by-Cities`)

      .subscribe((res) => {
        const data = res.data as IsellForCity[];
        this.changedTableForCity(data);
      });
  }

  changedTableForCity(data: IsellForCity[]): void {
    const _data = data.map(item => {
      return {
        id: item.city.id,
        name: item.city.name,
        avg: item.avg,
        total: item.total,
      };
    });
    const row: IsellCity[] = _data as IsellCity[];
    this.ELEMENT_DATA_CITY = row;
    this.dataSourceCity = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA_CITY);
  }

  //#endregion Table for City

  //#region Table for Locales
  updateTableForLocales(page: PageEvent = null): void {
    // const date = this.getDate();
    // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=location-sales&limit=10`, page?.pageIndex + 1 || 1)
    this.suscribeForTop(EKeyDashboard.location_sales, null, 'desc', 15, page?.pageIndex + 1 || 1)
      .subscribe((res) => {
        this.changedTableForLocales(res.data.data as ItopDashboard<IstatisticableLocation>[]);
        this.paginator.length = res.data.total;
        this.paginator.pageSize = res.data.per_page;
        this.paginator.pageIndex = res.data.current_page - 1;
      });
  }

  changedTableForLocales(data: ItopDashboard<IstatisticableLocation>[]): void {
    const _data = data.map(item => {
      return {
        company: item.statisticable.company.name,
        name: item.statisticable.name,
        total: item._total,
      };
    });
    const row = _data as any;
    this.ELEMENT_DATA_LOCAL = row;
    this.dataSourceLocal = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA_LOCAL);
  }
  //#endregion Table for Locales


  //#region Table for Seller
  updateTableForSellers(page: PageEvent = null, key: EKeyDashboard = EKeyDashboard.seller_sales): void {
    // const date = this.getDate();
    // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=seller-sales&limit=10`, page?.pageIndex + 1 || 1)
    this.suscribeForTop(key, null, 'desc', 15, page?.pageIndex + 1 || 1)
      .subscribe((res) => {
        this.changedTableForSellers(res.data.data as ItopDashboard<ISeller>[]);
        this.paginatorSeller.length = res.data.total;
        this.paginatorSeller.pageSize = res.data.per_page;
        this.paginatorSeller.pageIndex = res.data.current_page - 1;
      });
  }

  changedTableForSellers(data: ItopDashboard<ISeller>[]): void {
    const _data = data.map(item => {
      return {
        name: item.statisticable.first_name.concat(' ', item.statisticable.last_name),
        alias: item.statisticable.nickname,
        total: item._total,
      };
    });
    const row = _data as any;
    this.ELEMENT_DATA_SELLER = row;
    this.dataSourceSeller = new MatTableDataSource<IsellerTable>(this.ELEMENT_DATA_SELLER);
  }
  //#endregion Table for Seller


  suscribeForTop(key: EKeyDashboard, model_id = null, order: 'asc' | 'desc' = 'desc', limit: number = 7, page = 0): Observable<any> {
    // const date = this.getDate();
    let params = new HttpParams();
    // if (hasDate) {
    //   params = params.append('start_date', date.first_date[0]);
    //   params = params.append('end_date', date.first_date[1]);
    // }
    params = params.append('key', key);
    params = params.append('order', order);
    params = params.append('limit', limit.toString());
    if (model_id) {
      params = params.append('model_id', model_id.toString());
    }
    if (page) {
      params = params.append('page', page.toString());
    }
    return this.s_standard.getWithHttpParams(`dashboard/stats/sum`, params);
  }

  // getUrlAndQueryStringForCompare(key: EkeyDashboard, period: 'day' | 'week' | 'month' = 'day', model_id = null, compare_previous_period: boolean = false): string {
  //   const date = this.getDate();
  //   return `dashboard/stats/top?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}`;
  // }

}
