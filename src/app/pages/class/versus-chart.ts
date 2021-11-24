import AirDatepicker from 'air-datepicker';
import { Chart, ChartTypeRegistry, ScatterDataPoint, BubbleDataPoint, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { IcompareGraph, Idates } from '../../interfaces/idashboard';
import { SharedService } from '../../services/shared/shared.service';
import { StandartSearchService } from '../../services/standart-search.service';
import { IversusChart } from './../../interfaces/iversus-chart';
import localeEs from 'air-datepicker/locale/es';
import { EkeyDashboard } from '../../enums/EkeyDashboard.enum';

moment.locale('es');
Chart.register(...registerables);
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
export class VersusChart<DATA> implements IversusChart {
    chart: Chart<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>;
    isLoading: boolean;
    isVersus: boolean;
    data: Map<number, DATA> = new Map<number, DATA>();
    dataSelect: Map<number, DATA> = new Map<number, DATA>();
    dateRange: { first_date: any[]; last_date: any[]; };
    searchText: string = '';
    options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    url: string = null;
    optionsDate = {
        locale: localeEs,
        dateFormat: 'yyyy MMMM dd',
        range: true,
        multipleDatesSeparator: ' A ',
        buttons: [
          {
            content() { return 'Aplicar'; },
            onClick: (dp) => {
                this.dateRange.first_date = this.airDate.selectedDates;
              this.exucute_versus();
            },
          },
        ]
      };
      key: string = null;
      urlDashboard: string = null;
    constructor(public spinner: NgxSpinnerService, public s_standart: StandartSearchService) { }

    airDate: AirDatepicker;
    ngOnInit(): void {
      this.airDate = new AirDatepicker('#input-date-categories', this.optionsDate as any);
      this.loadDateLocalStorage();
      this.getData();
      this.create_chart('chart-versus-categories', 'line');
    }
    getData(page = null): void {
        const url = `${this.url}?search=${this.searchText}`;
        this.isLoading = true;
        this.spinner.show('isload');
        this.s_standart.index(url).subscribe(res => {
            console.log(res);
            this.data = new Map<number, DATA>(res.data.data.map((x) => [x.id, x]));
            this.isLoading = false;
            this.spinner.hide('isload');
        });
    }

    create_chart(id, type, datasets = [], options = null): void {
        const _options = options || this.options;
        const canvas = <HTMLCanvasElement>document.getElementById(id);
        const ctx = canvas.getContext('2d');
        const _data = {
            type: type,
            data: {
                datasets: datasets,
            },
            options: _options,
        };
        this.chart = new Chart(ctx, _data as any);
    }



    exucute_versus(): void {
        this.isVersus = true;
        const date = this.getDate();
        const request = [];
        const keys = [];
        this.dataSelect.forEach((key, value) => {
            console.log(key, value);
            keys.push(value);
            request.push(this.s_standart.index(`${this.urlDashboard}?key=${this.key}&model_id=${value}&start_date=${date.first_date[0]}&end_date=${date.first_date[1]}`));
        });
        forkJoin(request).subscribe((res: { data: { dates: Idates, previous_period_stats?: IcompareGraph[], selected_period_stats: IcompareGraph[], model_id: number } }[]) => {
            console.log(res);
            this.chart.data.datasets = [];
            let count = 0;
            console.log(keys);
            res.forEach((item) => {
                const data = item.data;
                const _data = data.selected_period_stats.map(item1 => item1.total);
                console.log(_data);
                this.chart.data.datasets.push(
                    { data: _data, label: this.dataSelect.get(keys[count])['name'] as any, borderColor: this.ramdonColor(), borderWidth: 2, backgroundColor: this.ramdonColor() }
                );
                count++;
            });
            this.chart.data.labels = res[0].data.selected_period_stats.map(item => moment(item.date).format('MMM Do YY'));
            this.chart.update();
        });
    }

    addDatatSelect(key): void {
        const value = Object.assign({}, this.data.get(key));
        this.dataSelect.set(key, value);
    }

    removeDataSelect(key): void {
        this.dataSelect.delete(key);
    }

    loadDateLocalStorage(): void {
        const date = JSON.parse(localStorage.getItem('dates_all'));
        let datesAll = null;
        if (date == null) {

            datesAll = { first_date: [new Date(moment(new Date()).subtract(7, 'days').format()), new Date()], last_date: [new Date(moment(new Date()).subtract(14, 'days').format()), new Date(moment(new Date()).subtract(7, 'days').format())] };
            localStorage.setItem('dates_all', JSON.stringify(datesAll));
        } else {
            datesAll = { first_date: date.first_date, last_date: date.last_date };
        }
        try {
            this.dateRange = datesAll;
        } catch (e) {
            datesAll = { first_date: [new Date(moment(new Date()).subtract(7, 'days').format()), new Date()], last_date: [new Date(moment(new Date()).subtract(14, 'days').format()), new Date(moment(new Date()).subtract(7, 'days').format())] };
            localStorage.setItem('dates_all', JSON.stringify(datesAll));
            this.dateRange = datesAll;
        }
    }

    getDate(): { first_date: any[], last_date: any[] } {
        const first_date = [SharedService.convertDateForLaravelOfDataPicker(this.dateRange.first_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dateRange.first_date[1])];
        const last_date = [SharedService.convertDateForLaravelOfDataPicker(this.dateRange.last_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dateRange.last_date[1])];
        return { first_date, last_date };
    }

    ramdonColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}
