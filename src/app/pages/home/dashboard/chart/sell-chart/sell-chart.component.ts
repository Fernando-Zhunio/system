import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { Chart, ChartConfiguration } from 'chart.js';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IcompareGraph, Idates } from '../../../../../interfaces/idashboard';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-sell-chart',
  templateUrl: './sell-chart.component.html',
  styleUrls: ['./sell-chart.component.css']
})
export class SellChartComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, public s_standard: StandartSearchService) { }
  // @Input() s_standard: StandartSearchService;
  // @Input() dates: IDatesDashboard;
  chart: Chart;
  // period: { day: boolean, week: boolean, month: boolean, current_period: 'day'|'week'|'month' } = { day: true, week: false, month: false, current_period: 'day' };
  // key: { sales: boolean, 'sales-count': boolean, current_key: 'sales'|'sales-count' } = { sales: true, 'sales-count': false, current_key: 'sales' };
  isLoading: boolean = false;
  period: 'day'| 'week' | 'month' = 'day';
  key: 'sales' | 'sales-count' = 'sales';
  // key: EkeyDashboard = EkeyDashboard.sales;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.createChart();
  }


  public createChart(): void {
    const _chart = document.getElementById('chart-sells') as any;
    const ctx = _chart.getContext('2d') as any;
    const dataChart: ChartConfiguration = {
      type: 'line',
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
        // onClick: (e: any) => {
        //   const activePoints = this.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
        //   const [{index}] = activePoints;
        //   console.log(activePoints);
        //   console.log(this.chart.data.datasets[0].data[index]);
        // }
      }
    };
    this.chart = new Chart(ctx as any, dataChart);
    this.updateChart();
  }


  public updateChart(event: MatButtonToggleChange = null, type = 'key'): void {
    this.isLoading = true;
    this.spinner.show('loading-chart-sell');
    
    if (event) {
      if (type === 'key') {
        this.key = event.value;
      } else if (type === 'period') {
        this.period = event.value;
      }
    }

    this.getQueryChart()
    .subscribe((res) => {
      const data = res.data as { dates: Idates, previous_period_stats: IcompareGraph[], selected_period_stats: IcompareGraph[] };
      this.chart.data.datasets[0].data = [];
      this.chart.data.datasets = [
        { data: data.previous_period_stats.map(item => item.total), label: 'Anteriores', borderColor: 'rgba(235,28,28,0.2)', borderWidth: 2, backgroundColor: 'rgba(235,28,28,0.2)' },
        { data: data.selected_period_stats.map(item => item.total), label: 'Actuales', borderColor: 'rgba(0,200,83,0.5)', borderWidth: 2, backgroundColor: 'rgba(0,200,83,0.5)' }
      ];
      this.chart.data.labels = data.selected_period_stats.map(item => moment(item.date).format('MMM Do YY'));
      this.chart.update();
      this.isLoading = false;
      this.spinner.hide('loading-chart-sell');
    });
  }

  // changedOptions(arg1) {
  //   let isInvalid = false;
  //   if (arg1?.type == 'period') {if (arg1.value == this.period.current_period) {isInvalid = true; } this.changePeriod(arg1.value);  }
  //   if (arg1?.type == 'key') { if (arg1.value == this.key.current_key) {isInvalid = true; } this.changeKey(arg1.value);  }
  //   return isInvalid;
  // }

  public getQueryChart(): Observable<any> {
    let params = new HttpParams();
    // params = params.append('start_date', this.dates.first_date[0]);
    // params = params.append('end_date', this.dates.first_date[1]);
    params = params.append('key', this.key);
    params = params.append('limit', '5');
    params = params.append('compare_previous_period', '1');
    params = params.append('period', this.period);
    return this.s_standard.getWithHttpParams(`dashboard/stats/graph`, params);
  }

  // selectPeriod(event): void {
  //   console.log(event)
  // }
}
