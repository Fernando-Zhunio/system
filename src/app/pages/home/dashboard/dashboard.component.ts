import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, LinearScale, LineController, LineElement, PointElement, registerables, Title } from 'chart.js';
import Chart from 'chart.js/auto';
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import { StandartSearchService } from '../../../services/standart-search.service';
import { IheaderDashboard, IsalesHeader, ISeller, IsellForCategories, IsellForCity, IstatisticableLocation, IstatisticableProduct, ItopDashboard } from '../../../interfaces/idashboard';
import { SharedService } from '../../../services/shared/shared.service';
import * as moment from 'moment';
import { PageEvent } from '@angular/material/paginator';
import { SellChartComponent } from './chart/sell-chart/sell-chart.component';
import { ProductChartComponent } from './chart/product-chart/product-chart.component';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IndexComponent } from '../versus/index/index.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectDatesDashboardComponent } from './modals/select-dates-dashboard/select-dates-dashboard.component';
import { EkeyDashboard } from '../../../enums/EkeyDashboard.enum';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalesChartComponent } from './chart/locales-chart/locales-chart.component';
import { CategoryChartComponent } from './chart/category-chart/category-chart.component';
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
export class DashboardComponent implements OnInit {
  constructor(public s_stardart: StandartSearchService, private router: Router, private bottomSheet: MatBottomSheet, private dialogDates: MatDialog) {
  }
  @ViewChild('chartSell', { static: true }) chartSellChart: SellChartComponent;
  @ViewChild('chartProduct', { static: true }) chartProductChart: ProductChartComponent;
  @ViewChild('chartLocales', { static: true }) chartLocales: LocalesChartComponent;
  @ViewChild('chartCategory', { static: true }) chartCategory: CategoryChartComponent;

  // chartProduct: Chart = null;
  // chartLocales: Chart = null;
  chartVentas: Chart = null;
  chartSellForCategories: Chart = null;
  dateRange: { first_date: any[], last_date: any[] } = { first_date: [], last_date: [] };
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
  options = {
    locale: localeEs,
    dateFormat: 'yyyy MMMM dd',
    range: true,
    multipleDatesSeparator: ' A ',
  };

  ngOnInit(): void {
    this.loadDateLocalStorage();
    this.getDateHeader();
    // this.createChartLocales();
    // this.createChartSellOfCategories();
    this.updateTableForLocales();
    this.updateChartTableForCity();
    this.updateTableForSellers();
  }

  getDateHeader(): void {
    const date = this.getDate();
    this.s_stardart.index(`dashboard/stats/basic-metrics?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}`).subscribe(
      (response) => {
        this.assignHeaderDate(response.data);

      }, err => { console.log(err); });
  }

  getDate(): { first_date: any[], last_date: any[] } {
    const first_date = [SharedService.convertDateForLaravelOfDataPicker(this.dateRange.first_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dateRange.first_date[1])];
    const last_date = [SharedService.convertDateForLaravelOfDataPicker(this.dateRange.last_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dateRange.last_date[1])];
    return { first_date, last_date };
  }

  loadDateLocalStorage(): void {
   
    // if (date == null || date.hasOwnProperty('first_date') === false || date.hasOwnProperty('last_date') === false ) {
    //   datesAll = { first_date: [new Date(moment(new Date()).subtract(7, 'days').format()), new Date()], last_date: [new Date(moment(new Date()).subtract(14, 'days').format()), new Date(moment(new Date()).subtract(7, 'days').format())] };
    //   localStorage.setItem('dates_all', JSON.stringify(datesAll));
    // } else {
    //   }
    let datesAll = null;
      try {
        // const date = JSON.parse(localStorage.getItem('dates_all'));
      const date = JSON.parse(localStorage.getItem('dates_all'));
      const first_date = [];
       first_date[0] = this.isValidDate(date?.first_date[0]) ? date.first_date[0] : new Date(moment(new Date()).subtract(7, 'days').format());
       first_date[1] = this.isValidDate(date?.first_date[1]) ? date.first_date[1] : new Date();

      const last_date = [];
      last_date[0] = this.isValidDate(date?.last_date[0]) ? date.last_date[0] : new Date(moment(new Date()).subtract(14, 'days').format());
      last_date[1] = this.isValidDate(date?.last_date[1]) ? date.last_date[1] : new Date(moment(new Date()).subtract(7, 'days').format());

      datesAll = { first_date: first_date, last_date: last_date };
      localStorage.setItem('dates_all', JSON.stringify(datesAll));
      this.dateRange = datesAll;
      console.log(this.dateRange);
    } catch (e) {
      console.log(e);
      datesAll = { first_date: [new Date(moment(new Date()).subtract(7, 'days').format()), new Date()], last_date: [new Date(moment(new Date()).subtract(14, 'days').format()), new Date(moment(new Date()).subtract(7, 'days').format())] };
      localStorage.setItem('dates_all', JSON.stringify(datesAll));
      this.dateRange = datesAll;
    }
  }

  isValidDate(date: Date): boolean {
    return moment(new Date(date)).isValid();
  }

  assignHeaderDate(data: IheaderDashboard): void {
    // console.log(data);
    this.total_sell = data.sales_total;
    this.value_middle = data.sales_average;
    this.invoice_total = data.sales_count;
    this.products_sold_count = data.products_sold_count;
  }

  //#region Chart Locales
  // createChartLocales(): void {
  //   const _chart = document.getElementById('chart-locations') as any;
  //   const ctx = _chart.getContext('2d') as any;
  //   const dataChart: ChartConfiguration = {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['espere ..', 'espere ..', 'espere ..', 'espere ..', 'espere ..'],
  //       datasets: [
  //         {
  //           label: 'Ventas',
  //           data: [1, 1, 1, 1, 1],
  //           // backgroundColor: 'rgba(0,200,83,0.5)',
  //           borderColor: 'rgba(0,200,83,0.5)',
  //           borderWidth: 2,
  //           backgroundColor: ['rgba(0,200,83,0.5)', 'rgba(105,240,174,0.5)', 'rgba(255,229,0,0.5)', 'rgba(255,153,0,0.5)', 'rgba(255,0,0,0.5)']
  //         }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //     }
  //   };
  //   this.chartLocales = new Chart(ctx as any, dataChart);
  //   this.updateChartLocales();
  // }

  // updateChartLocales(key: EkeyDashboard = EkeyDashboard.location_sales): void {
  //   const date = this.getDate();
  //   // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=location-sales&limit=5`)
  //   this.suscribeForTop(key)
  //   .subscribe((res) => {
  //     // console.log(res);
  //     const data = res.data.data as ItopDashboard<IstatisticableLocation>[];
  //     this.chartLocales.data.datasets[0].data = [];
  //     this.chartLocales.data.datasets[0].data = data.map(item => item._total);
  //     this.chartLocales.data.labels = data.map(item => item.statisticable.name);
  //     this.chartLocales.update();

  //   });
  // }

  //#endregion Chart Locales

  openSelectVersus(): void {
    this.bottomSheet.open(IndexComponent);
  }

  openDialogDates(): void {
    const dialogRef = this.dialogDates.open(SelectDatesDashboardComponent);
    dialogRef.beforeClosed().subscribe(result => {
      if (result) {
        this.dateRange = result;
        this.getDateHeader();

        this.chartLocales.dates = this.getDate();
        this.chartLocales.updateChart();

        this.chartProductChart.dates = this.getDate();
        this.chartProductChart.updateChart();

        this.chartSellChart.dates = this.getDate();
        this.chartSellChart.updateChart();

        this.chartCategory.dates = this.getDate();
        this.chartCategory.updateChart();

        this.updateTableForLocales();
        this.updateChartTableForCity();
        // this.updateChartSellForCategories();
        this.updateTableForSellers();
      }
    });
  }

  //#region Chart Sell of Categories
  createChartSellOfCategories(): void {
    const _chart = document.getElementById('chart-for-categories') as any;
    const ctx = _chart.getContext('2d') as any;
    const dataChart: ChartConfiguration = {
      type: 'polarArea',
      data: {
        labels: ['espere ..', 'espere ..', 'espere ..', 'espere ..', 'espere ..'],
        datasets: [
          {
            label: 'Ventas',
            data: [1, 1, 1, 1, 1],
            borderColor: 'rgba(0,200,83,0.5)',
            borderWidth: 2,
            backgroundColor: ['rgba(0,200,83,0.5)', 'rgba(105,240,174,0.5)', 'rgba(255,229,0,0.5)', 'rgba(255,153,0,0.5)', 'rgba(255,0,0,0.5)']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    };
    this.chartSellForCategories = new Chart(ctx as any, dataChart);
    this.updateChartSellForCategories();
  }

  updateChartSellForCategories(key: EkeyDashboard = EkeyDashboard.category_sales): void {
    const date = this.getDate();
    // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=category-sales&limit=5`)
    this.suscribeForTop(key)
    .subscribe((res) => {
      const data = res.data.data as ItopDashboard<IsellForCategories>[];
      this.chartSellForCategories.data.labels = data.map(item => item.statisticable.name);
      this.chartSellForCategories.data.datasets[0].data = data.map(item => item.total);
      this.chartSellForCategories.update();
    });
  }
  //#endregion Chart Sell of Categories

  //#region Table for City
  updateChartTableForCity(): void {
    const date = this.getDate();
    this.s_stardart.index(`dashboard/stats/sales-by-Cities?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}`)

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
    const date = this.getDate();
    // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=location-sales&limit=10`, page?.pageIndex + 1 || 1)
    this.suscribeForTop(EkeyDashboard.location_sales, null, 'desc', 15, page?.pageIndex + 1 || 1)
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
  updateTableForSellers(page: PageEvent = null, key: EkeyDashboard = EkeyDashboard.seller_sales): void {
    const date = this.getDate();
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


  suscribeForTop(key: EkeyDashboard, model_id = null, order: 'asc'| 'desc' = 'desc', limit: number = 7, page = 0): Observable<any> {
    const date = this.getDate();
    let params = new HttpParams();
    params = params.append('start_date', date.first_date[0]);
    params = params.append('end_date', date.first_date[1]);
    params = params.append('key', key);
    params = params.append('order', order);
    params = params.append('limit', limit.toString());
    if (model_id) {
     params = params.append('model_id', model_id.toString());
    }
    if (page) {
      params = params.append('page', page.toString());
    }
    console.log(params);
    return this.s_stardart.getWithHttpParams(`dashboard/stats/sum`, params);
  }

  getUrlAndQueryStringForCompare(key: EkeyDashboard, period: 'day'|'week'|'month' = 'day', model_id = null, compare_previous_period: boolean = false): string {
    const date = this.getDate();
    return `dashboard/stats/top?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}`;
  }

}
