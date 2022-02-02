import { HttpParams } from '@angular/common/http';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Chart, ChartConfiguration } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { EKeyDashboard, EtypeGraph } from '../enums/EkeyDashboard.enum';
import { ItopDashboard } from '../interfaces/idashboard';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

export abstract class ManagerChartTop<T> {
  chart: Chart;
  abstract s_standard: StandartSearchService;
  dates: any;
  spinner: NgxSpinnerService;
  abstract idSpinner: string;
  options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      yAxes: [{ pointLabels: { fontFamily: 'Montserrat, Roboto, sans-serif' } }],
      xAxes: [
        {
          ticks: {
            fontFamily: 'Red Hat Display, Roboto, sans-serif',
          }
        }
      ]
    }
  };
  moreParams: object = null;
  private _limit = 5;


  set limit(value: number) {
    if (value > 15) {
      SwalService.swalFire({ title: 'Error', text: 'El limite máximo es 15', icon: 'error' });
      return;
    }
    this._limit = value;
  }

  get limit() { return this._limit; }
  public abstract key: EKeyDashboard;

  createChart(idName, typeChart: EtypeGraph | any, datasets = []): void {
    const _chart = document.getElementById(idName) as any;
    const ctx = _chart.getContext('2d') as any;
    const dataChart: ChartConfiguration = {
      type: typeChart,
      data: {
        labels: ['espere ..', 'espere ..', 'espere ..', 'espere ..', 'espere ..'],
        datasets: [
          {
            label: 'Gráfico',
            data: [1, 1, 1, 1, 1],
            borderColor: 'rgba(0,200,83,0.5)',
            borderWidth: 2,
            backgroundColor: ['rgba(0,200,83,0.5)', 'rgba(105,240,174,0.5)', 'rgba(255,229,0,0.5)', 'rgba(255,153,0,0.5)', 'rgba(255,0,0,0.5)']
          }
        ]
      },
      options: this.options
    };
    this.chart = new Chart(ctx as any, dataChart);
    this.updateChart();
  }

  updateChart(event: MatButtonToggleChange = null): void {
    this.spinner.show(this.idSpinner);
    if (event) {
      this.key = event.value;
    }
    // const date = this.dates;
    // if (this.changedOptions(arg1)) { return; }
    // this.s_stardart.index(`dashboard/stats/sum?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=product-sales-count&limit=5${event ? '&order=' + event.value : ''}`)
    this.getQueryChart()
      .subscribe((res) => {
        const data = res.data.data as ItopDashboard<T>[];
        this.assignData(data);
      });
  }

  assignData(data: ItopDashboard<T>[]): void {
  }

  // changeKey(value: any): void {
  //   this.key[value] = value;
  //   this.key[this.key.current_key] = false;
  //   this.key.current_key = value;
  // }

  // changedOptions(arg1) {
  //   let isInvalid = false;
  //   if (arg1?.type == 'key') { if (arg1.value == this.key.current_key) { isInvalid = true; } this.changeKey(arg1.value); }
  //   return isInvalid;
  // }

  public getQueryChart(moreParams: any = this.moreParams): Observable<any> {
    let params = new HttpParams();
    // params = params.append('start_date', this.dates.first_date[0]);
    // params = params.append('end_date', this.dates.first_date[1]);
    params = params.append('key', this.key);
    params = params.append('limit', this._limit.toString());
    // params = params.append('compare_previous_period', '1');
    if (moreParams) {
      for (const key in moreParams) {
        if (moreParams.hasOwnProperty(key)) {
          params = params.append(key, moreParams[key]);
        }
      }
    }
    return this.s_standard.getWithHttpParams(`dashboard/stats/sum`, params);
  }

  public ramdonColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color + '7d';
  }


}
