import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { MatBottomSheet } from '@angular/material/bottom-sheet';
// import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {  ChartConfiguration, LinearScale, LineController, LineElement, PointElement, registerables, Title } from 'chart.js';
import Chart from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { StorageService } from '../../../services/storage.service';
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';
import { Ichart, IcompareGraph, IheaderDashboard, IsalesHeader, IsellForCategories, IsellForCity, IstatisticableLocation, IstatisticableProduct, ItopDashboard } from '../../../interfaces/idashboard';
import { SharedService } from '../../../services/shared/shared.service';
import * as moment from 'moment';
import { Ipagination } from '../../../interfaces/ipagination';
import { PageEvent } from '@angular/material/paginator';
import { SellChartComponent } from './chart/sell-chart/sell-chart.component';
import { ProductChartComponent } from './chart/product-chart/product-chart.component';
// import { Color, Label } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
moment.locale('es');
Chart.register(...registerables);
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

// import { collect } from 'collect.js';
interface IsellCity {
  id: number;
  name: string;
  total: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public s_stardart: StandartSearchService) {
  }
  @ViewChild('chartSellChart', { static: true }) chartSellChart: SellChartComponent;
  @ViewChild('chartProductChart', { static: true }) chartProductChart: ProductChartComponent;

  chartProduct: Chart = null;
  chartLocales: Chart = null;
  chartVentas: Chart = null;
  chartSellForCategories: Chart = null;

  formDate: FormGroup = new FormGroup({
    star_date: new FormControl(new Date()),
    end_date: new FormControl(new Date()),
  });
  displayedColumnsLocal: string[] = [
    'id',
    'name',
    'total',
  ];
  ELEMENT_DATA_LOCAL: IsellCity[] = [
    { id: 1, name: 'Hydrogen', total: 1.0079 },
    { id: 2, name: 'Helium', total: 4.0026 },
    { id: 3, name: 'Lithium', total: 6.941 },
    { id: 4, name: 'Beryllium', total: 9.0122 },
    { id: 5, name: 'Boron', total: 10.811 },
    { id: 6, name: 'Carbon', total: 12.0107 },
    { id: 7, name: 'Nitrogen', total: 14.0067 },
    { id: 8, name: 'Oxygen', total: 15.9994 },
  ];
  dataSourceLocal = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA_LOCAL);


  // #region data for table city
  displayedColumnsCity: string[] = [
    'id',
    'name',
    'avg',
    'total',
  ];
  ELEMENT_DATA_CITY: IsellCity[] = [];
  dataSourceCity = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA_CITY);
  // #endregion data for table city

  paginator: PageEvent = new PageEvent();
  airDate: AirDatepicker = null;
  total_sell: IsalesHeader;
  value_middle: IsalesHeader;
  invoice_total: IsalesHeader;
  products_sold_count: IsalesHeader;
  options = {
    locale: localeEs,
    dateFormat: 'yyyy MMMM dd',
    range: true,
    multipleDatesSeparator: ' A ',
    buttons: [
      {
        content() { return 'Aplicar'; },
        onClick: (dp) => {
          this.getDateHeader();
          this.updateChartLocales();
          // this.updateChartProduct();
          this.chartProductChart.updateChart();
          this.chartSellChart.updateChart();
        },
      },
      'today', 'clear'
    ]
  };



  ngOnInit(): void {
    this.airDate = new AirDatepicker('#input-date', this.options as any);
    this.loadDateLocalStorage();
    this.getDateHeader();
    this.createChartLocales();
    this.createChartSellOfCategories();
    // this.getDataChartProducts();
    this.updateTableForLocales();
    this.updateChartTableForCity();
  }

  getDateHeader(): void {
    const date = this.getDate();
    if (date.start_date && date.end_date) {
      this.s_stardart.index(`dashboard/stats/basic-metrics?start_date=${date.start_date}&end_date=${date.end_date}`).subscribe(
        (response) => {
          console.log(response);
          this.assignHeaderDate(response.data);

        }, err => { console.log(err); });
    } else {
      SwalService.swalFire({ icon: 'error', title: 'Error', text: 'Seleccione un rango de fechas valido' });
    }
    console.log(date);
    return;
  }

  getDate(): { start_date: string, end_date: string } {
    // const start_date = SharedService.convertDateForLaravelOfDataPicker( this.airDate.selectedDates[0] || new Date());
    const start_date = SharedService.convertDateForLaravelOfDataPicker(this.airDate.selectedDates[0] || new Date());
    const end_date = SharedService.convertDateForLaravelOfDataPicker(this.airDate.selectedDates[1] || new Date());
    localStorage.setItem('dates', JSON.stringify({ start_date: this.airDate.selectedDates[0], end_date: this.airDate.selectedDates[1] }));
    return { start_date, end_date };
  }

  loadDateLocalStorage(): void {
    const date = localStorage.getItem('dates');
    if (date) {
      const date_json = JSON.parse(date);
      // this.airDate.update({startDate: date_json.start_date, endDate: date_json.end_date});
      this.airDate.selectDate([date_json.start_date, date_json.end_date]);

    } else {
      console.log('no hay fechas');
      const _dates = { start_date: moment().subtract(7, 'days').format(), end_date: moment().format() };
      localStorage.setItem('dates', JSON.stringify(_dates));
      this.airDate.selectDate([_dates.start_date, _dates.end_date]);
    }
  }



  assignHeaderDate(data: IheaderDashboard): void {
    console.log(data);
    this.total_sell = data.sales_total;
    this.value_middle = data.sales_average;
    this.invoice_total = data.sales_count;
    this.products_sold_count = data.products_sold_count;
  }

  //#region Chart Locales
  createChartLocales(): void {
    const _chart = document.getElementById('chart-locations') as any;
    const ctx = _chart.getContext('2d') as any;
    const dataChart: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['espere ..', 'espere ..', 'espere ..', 'espere ..', 'espere ..'],
        datasets: [
          {
            label: 'Ventas',
            data: [1, 1, 1, 1, 1],
            // backgroundColor: 'rgba(0,200,83,0.5)',
            borderColor: 'rgba(0,200,83,0.5)',
            borderWidth: 2,
            backgroundColor: ['rgba(0,200,83,0.5)', 'rgba(105,240,174,0.5)', 'rgba(255,229,0,0.5)', 'rgba(255,153,0,0.5)', 'rgba(255,0,0,0.5)'] 
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
    }};
    this.chartLocales = new Chart(ctx as any,  dataChart);
    this.updateChartLocales();
    // this.chartLocales = {
    //   isLegend: true,
    //   dataSet: [100],
    //   labels: ['Cargando'],
    //   option: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //       datalabels: {
    //         formatter: (value, ctx) => {
    //           const label = ctx.chart.data.labels[ctx.dataIndex];
    //           return label;
    //         },
    //       },
    //     }
    //   },
      // plugins: [pluginDataLabels],
    //   colors: [{ backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'] }],
    // };
    // const date = this.getDate();
    // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.start_date}&end_date=${date.end_date}&key=location-sales&limit=5`).subscribe((res) => {

    //   // console.log(res);
    //   const data = res.data.data as ItopDashboard<IstatisticableLocation>[];
    //   this.chartLocales.dataSet = [];
    //   this.chartLocales.dataSet = data.map(item => item.total);
    //   this.chartLocales.labels = data.map(item => item.statisticable.name);
    // });
  }

  updateChartLocales(): void {
     const date = this.getDate();
    this.s_stardart.index(`dashboard/stats/sum?start_date=${date.start_date}&end_date=${date.end_date}&key=location-sales&limit=5`).subscribe((res) => {

      // console.log(res);
      const data = res.data.data as ItopDashboard<IstatisticableLocation>[];
      this.chartLocales.data.datasets[0].data = [];
      this.chartLocales.data.datasets[0].data = data.map(item => item._total);
      this.chartLocales.data.labels = data.map(item => item.statisticable.name);
      this.chartLocales.update();

    });
  }

  //#endregion Chart Locales

  


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
    }};
    this.chartSellForCategories = new Chart(ctx as any,  dataChart);
    this.updateChartSellForCategories();
    // this.chartSellForCategories = {
    //   isLegend: true,
    //   option: {
    //     responsive: true,
    //     // scales: { xAxes: [{}], yAxes: [{}] },
    //     maintainAspectRatio: false,
    //   },
    //   labels: ['Cargando', 'Cargando', 'Cargando', 'Cargando', 'Cargando'],
    //   dataSet: [1, 1, 1, 1, 1]
    // };

    // const date = this.getDate();
    // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.start_date}&end_date=${date.end_date}&key=category-sales&limit=5`).subscribe((res) => {
    //   console.log(res);
    //   const data = res.data.data as ItopDashboard<IsellForCategories>[];
    //   // this.chartLocales.dataSet = [];
    //   // this.chartLocales.dataSet = data.map(item => item.total);
    //   // this.chartLocales.labels = data.map(item => item.statisticable.name);
    //   this.chartSellForCategories.labels = data.map(item => 'fer');
    //   this.chartSellForCategories.dataSet = data.map(item => item.total);
    // });
  }

  updateChartSellForCategories(): void {
     const date = this.getDate();
    this.s_stardart.index(`dashboard/stats/sum?start_date=${date.start_date}&end_date=${date.end_date}&key=category-sales&limit=5`).subscribe((res) => {
      console.log(res);
      const data = res.data.data as ItopDashboard<IsellForCategories>[];
      // this.chartLocales.dataSet = [];
      // this.chartLocales.dataSet = data.map(item => item.total);
      // this.chartLocales.labels = data.map(item => item.statisticable.name);
      this.chartSellForCategories.data.labels = data.map(item => item.statisticable.name);
      this.chartSellForCategories.data.datasets[0].data = data.map(item => item.total);
      this.chartSellForCategories.update();
    });
  }
  //#endregion Chart Sell of Categories

  //#region Table for City

 

  //#endregion Table for City

  //#region Table for Locales
  updateTableForLocales(page: PageEvent = null): void {
    const date = this.getDate();
    this.s_stardart.index(`dashboard/stats/sum?start_date=${date.start_date}&end_date=${date.end_date}&key=location-sales&limit=10`, page?.pageIndex + 1 || 1)
    .subscribe((res) => {
      // console.log(res);
      this.changedTableForLocales(res.data.data as ItopDashboard<IstatisticableLocation>[]);
      this.paginator.length = res.data.total;
      this.paginator.pageSize = res.data.per_page;
      this.paginator.pageIndex = res.data.current_page - 1;
    } );
  }

  changedTableForLocales(data: ItopDashboard<IstatisticableLocation>[]): void {
     const _data = data.map(item => {
      return {
        id: item.statisticable.id,
        name: item.statisticable.name,
        total: item._total,
      };
    });
    const row: IsellCity[] = _data as IsellCity[];
    this.ELEMENT_DATA_LOCAL = row;
    this.dataSourceLocal = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA_LOCAL);
  }
  //#endregion Table for Locales

  updateChartTableForCity(): void {
    const date = this.getDate();
    this.s_stardart.index(`dashboard/stats/sales-by-Cities?start_date=${date.start_date}&end_date=${date.end_date}`)
    .subscribe((res) => {
      console.log(res);
      const data = res.data as IsellForCity[];
      this.changedTableForCity(data);
    } );
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









}
