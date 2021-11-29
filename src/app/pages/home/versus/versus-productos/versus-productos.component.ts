import { Component, OnInit } from '@angular/core';
import AirDatepicker from 'air-datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Iproduct2 } from '../../../../interfaces/iproducts';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { EkeyDashboard } from '../../../../enums/EkeyDashboard.enum';
import { VersusChart } from '../../../../class/versus-chart';

@Component({
  selector: 'app-versus-productos',
  templateUrl: './versus-productos.component.html',
  styleUrls: ['./versus-productos.component.css']
})
export class VersusProductosComponent extends VersusChart<Iproduct2> implements OnInit {

  constructor( spinner: NgxSpinnerService,  s_standart: StandartSearchService) {
    super(spinner, s_standart);
  }
  url = 'catalogs/products';
  urlDashboard: string = 'dashboard/stats/graph';
  key: string = EkeyDashboard.product_sales;

  ngOnInit(): void {
    this.airDate = new AirDatepicker('#input-date-products', this.optionsDate as any);
    this.loadDateLocalStorage();
    this.getData();
    this.create_chart('chart-versus-products', 'line');
  }

  // constructor(private s_standart: StandartSearchService, private spinner: NgxSpinnerService) { }
  // products: Map<number, Iproduct2> = new Map<number, Iproduct2>();
  // productsSelect: Map<number, Iproduct2> = new Map<number, Iproduct2>();
  // searchText: string = '';
  // isload: boolean = false;
  // chart: Chart;
  // isVersus: boolean = false;
  // airDate: AirDatepicker;
  // dateRangeStart: { start_date: string, end_date: string } = { start_date: moment().subtract(7, 'days').format(), end_date: moment().format() };
  // options = {
  //   locale: localeEs,
  //   dateFormat: 'yyyy MMMM dd',
  //   range: true,
  //   multipleDatesSeparator: ' A ',
  //   buttons: [
  //     {
  //       content() { return 'Aplicar'; },
  //       onClick: (dp) => {
  //         this.goVersus();
  //       },
  //     },
  //     'today', 'clear'
  //   ]
  // };
  // ngOnInit(): void {
  //   this.airDate = new AirDatepicker('#input-date', this.options as any);
  //   this.getProducts();
  //   this.createChartVersus();
  //   this.loadDateLocalStorage();
  // }

  // getProducts(page= null): void {
  //   const url = `catalogs/products?search=${this.searchText}`;
  //   this.isload = true;
  //   this.spinner.show('isload');
  //   this.s_standart.index(url).subscribe(res => {
  //     console.log(res);
  //     this.products = new Map <number, Iproduct2>(res.data.data.map((x) => [x.id, x]));
  //     this.isload = false;
  //     this.spinner.hide('isload');
  //   });
  // }

  captureImagenProduct(key): string {
    if (this.data.get(key)?.prestashop_products?.length > 0) {
      return this.data.get(key).prestashop_products[0].image;
    }
    if (this.data.get(key).ml_infos?.length > 0) {
      return this.data.get(key).ml_infos[0].image;
    }
    return 'assets/img/img_default_null.jpg';
  }

  captureImagenProductSelect(key): string {
    if (this.dataSelect.get(key)?.prestashop_products?.length > 0) {
      return this.dataSelect.get(key).prestashop_products[0].image;
    }
    if (this.dataSelect.get(key).ml_infos?.length > 0) {
      return this.dataSelect.get(key).ml_infos[0].image;
    }
    return 'assets/img/img_default_null.jpg';
  }

  // addProductSelect(key): void {
  //   const value = Object.assign({}, this.products.get(key));
  //   this.productsSelect.set(key, value);
  // }

  // removeProductSelect(key): void {
  //   this.productsSelect.delete(key);
  // }

  // createChartVersus(): void {
  //   const canvas = <HTMLCanvasElement> document.getElementById('chart-versus');
  //   const ctx = canvas.getContext('2d');
  //   const data =  {
  //     type: 'line',
  //     data: {
  //       datasets: [],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           position: 'top',
  //         },
  //       },
  //     },
  //   };
  //   this.chart =  new Chart(ctx, data as any);
  // }

  // goVersus(): void {
  //   this.isVersus = true;
  //   const date = this.getDate();
  //   console.log(this.productsSelect);
  //   const request = [];
  //   this.productsSelect.forEach((key, value) => {
  //     console.log(key, value);
  //     request.push( this.s_standart.index(`dashboard/stats/graph?key=product-sales-count&model_id=${value}&start_date=${date.start_date}&end_date=${date.end_date}`))
  //   });
  //   forkJoin(request).subscribe((res: {data: {dates: Idates, previous_period_stats?: IcompareGraph[], selected_period_stats: IcompareGraph[], model_id: number} }[]) => {
  //     // console.log(res);
  //     this.chart.data.datasets = [];
  //     res.forEach((item) => {
  //       const data = item.data;
  //       // as { dates: Idates, previous_period_stats?: IcompareGraph[], selected_period_stats: IcompareGraph[], model_id: number };
  //       const _data = data.selected_period_stats.map(item1 => item1.total);
  //       console.log(_data);
  //       this.chart.data.datasets.push(
  //         { data: _data, label: this.productsSelect.get(data.model_id).name, borderColor: this.ramdonColor(), borderWidth: 2, backgroundColor: this.ramdonColor() }
  //         );
  //       });
  //     this.chart.data.labels = res[0].data.selected_period_stats.map(item => moment(item.date).format('MMM Do YY'));
  //     this.chart.update();
  //   });
  // }

  // getDate(): { start_date: string, end_date: string } {
  //   const start_date = SharedService.convertDateForLaravelOfDataPicker(this.airDate.selectedDates[0] || new Date());
  //   const end_date = SharedService.convertDateForLaravelOfDataPicker(this.airDate.selectedDates[1] || new Date());
  //   localStorage.setItem('dates', JSON.stringify({ start_date: this.airDate.selectedDates[0], end_date: this.airDate.selectedDates[1] }));
  //   return { start_date, end_date };
  // }

  // ramdonColor(): string {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     return color;
  //   }

  // loadDateLocalStorage(): void {
  //   const date = JSON.parse(localStorage.getItem('dates'));
  //   let _dates = null;
  //   if (date && date.hasOwnProperty('start_date') && date.hasOwnProperty('end_date')) {
  //     const date_json = date;
  //     // this.airDate.update({startDate: date_json.start_date, endDate: date_json.end_date});
  //     this.airDate.selectDate([date_json.start_date, date_json.end_date]);

  //   } else {
  //      _dates = { start_date: moment().subtract(7, 'days').format(), end_date: moment().format() };
  //     localStorage.setItem('dates', JSON.stringify(_dates));
  //     this.airDate.selectDate([_dates.start_date, _dates.end_date]);
  //   }
  //   this.dateRangeStart.start_date = _dates.start_date;
  //   this.dateRangeStart.end_date = _dates.end_date;

  // }

}
