// // import AirDatepicker from 'air-datepicker';
// import { Chart, ChartTypeRegistry, ScatterDataPoint, BubbleDataPoint, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
// import * as moment from 'moment';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { forkJoin } from 'rxjs';
// import { SharedService } from '../services/shared/shared.service';
// import { StandartSearchService } from '../services/standart-search.service';
// import { IversusChart } from '../interfaces/iversus-chart';
// import localeEs from 'air-datepicker/locale/es';

// moment.locale('es');
// Chart.register(...registerables);
// Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
// export class VersusChart<DATA> implements IversusChart {
//     chart: Chart<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>;
//     isLoading: boolean;
//     isVersus: boolean;
//     data: Map<number, DATA> = new Map<number, DATA>();
//     dataSelect: Map<number, DATA> = new Map<number, DATA>();
//     dateRange: { first_date: any[]; last_date: any[]; };
//     searchText: string = '';
//     options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//         },
//     };
//     url: string | null = null;
//     optionsDate = {
//         locale: localeEs,
//         dateFormat: 'yyyy MMMM dd',
//         range: true,
//         multipleDatesSeparator: ' A ',
//         buttons: [
//           {
//             content() { return 'Aplicar'; },
//             onClick: (_dp) => {
//                 this.dateRange.first_date = this.airDate.selectedDates;
//               this.execute_versus();
//             },
//           },
//         ]
//       };
//       key: string | null = null;
//       urlDashboard: string | null = null;
//     constructor(public spinner: NgxSpinnerService, public s_standart: StandartSearchService) { }

//     airDate: any;

//     getData(_page = null): void {
//         const url = `${this.url}?search=${this.searchText}`;
//         this.isLoading = true;
//         this.spinner.show('isload');
//         this.s_standart.index(url).subscribe(res => {
//             this.data = new Map<number, DATA>(res.data.data.map((x) => [x.id, x]));
//             this.isLoading = false;
//             this.spinner.hide('isload');
//         });
//     }

//     create_chart(id, type, datasets = [], options = null): void {
//         const _options = options || this.options;
//         const canvas = <HTMLCanvasElement>document.getElementById(id);
//         const ctx = canvas.getContext('2d')!;
//         const _data = {
//             type: type,
//             data: {
//                 datasets: datasets,
//             },
//             options: _options,
//         };
//         this.chart = new Chart(ctx, _data as any);
//     }



//     execute_versus(): void {
//         this.isVersus = true;
//         const date = this.getDate();
//         const request: any = [];
//         this.dataSelect.forEach((_key, value) => {
//             request.push(this.s_standart.index(`${this.urlDashboard}?key=${this.key}&model_id=${value}&start_date=${date.first_date[0]}&end_date=${date.first_date[1]}`));
//         });
//         forkJoin<any>(request).subscribe((res: any) => {
//             this.chart.data.datasets = [];

//             res.forEach((item) => {
//                 const data = item.data;
//                 const _data = data.selected_period_stats.map(item1 => item1.total);
//                 this.chart.data.datasets.push(
//                     { data: _data, label: this.dataSelect.get(data.model_id)!['name'] as any, borderColor: this.ramdonColor(), borderWidth: 2, backgroundColor: this.ramdonColor() }
//                 );

//             });
//             this.chart.data.labels = res[0].data.selected_period_stats.map(item => moment(item.date).format('MMM Do YY'));
//             this.chart.update();
//         });
//     }

//     addDataSelect(key): void {
//         const value = Object.assign({}, this.data.get(key));
//         this.dataSelect.set(key, value);
//     }

//     removeDataSelect(key): void {
//         this.dataSelect.delete(key);
//     }

//     loadDateLocalStorage(): void {
//         const date = JSON.parse(localStorage.getItem('dates_all')!);
//         let datesAll: any = null;
//         if (date == null) {

//             datesAll = { first_date: [new Date(moment(new Date()).subtract(7, 'days').format()), new Date()], last_date: [new Date(moment(new Date()).subtract(14, 'days').format()), new Date(moment(new Date()).subtract(7, 'days').format())] };
//             localStorage.setItem('dates_all', JSON.stringify(datesAll));
//         } else {
//             datesAll = { first_date: date.first_date, last_date: date.last_date };
//         }
//         try {
//             this.dateRange = datesAll;
//         } catch (e) {
//             datesAll = { first_date: [new Date(moment(new Date()).subtract(7, 'days').format()), new Date()], last_date: [new Date(moment(new Date()).subtract(14, 'days').format()), new Date(moment(new Date()).subtract(7, 'days').format())] };
//             localStorage.setItem('dates_all', JSON.stringify(datesAll));
//             this.dateRange = datesAll;
//         }
//     }

//     getDate(): { first_date: any[], last_date: any[] } {
//         const first_date = [SharedService.convertDateForLaravelOfDataPicker(this.dateRange.first_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dateRange.first_date[1])];
//         const last_date = [SharedService.convertDateForLaravelOfDataPicker(this.dateRange.last_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dateRange.last_date[1])];
//         return { first_date, last_date };
//     }

//     ramdonColor(): string {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     }
// }
