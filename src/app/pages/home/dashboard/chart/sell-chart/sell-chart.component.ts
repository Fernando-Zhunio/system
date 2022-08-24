import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { IcompareGraph, Idates } from '../../../../../interfaces/idashboard';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-sell-chart',
  templateUrl: './sell-chart.component.html',
  styleUrls: ['./sell-chart.component.css']
})
export class SellChartComponent implements OnInit {

  constructor(public s_standard: StandartSearchService) { }
  isLoading = true;
  chart: Chart;
  period: 'day' | 'week' | 'month' = 'day';
  key: 'sales' | 'sales-count' = 'sales';

  updateOptions: any;

  options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Actual', 'Anterior']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Actual', 'Anterior']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Actual',
        type: 'line',
        areaStyle: { color: '#009688' },
        data: [0]
      },
      {
        name: 'Anterior',
        type: 'line',
        areaStyle: { color: '#6a7985' },
        data: [0]
      },
    ]
  };

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.createChart();
  }



  public createChart(): void {
    this.updateChart();
  }


  public updateChart(event: MatButtonToggleChange | null = null, type = 'key'): void {
    this.isLoading = true;
    // this.spinner.show('loading-chart-sell');

    if (event) {
      if (type === 'key') {
        this.key = event.value;
      } else if (type === 'period') {
        this.period = event.value;
      }
    }

    this.getQueryChart()
      .subscribe((res) => {
        console.log(res.data);
        const data = res.data as { dates: Idates, previous_period_stats: IcompareGraph[], selected_period_stats: IcompareGraph[] };
        this.updateOptions = {
          series: [{
            name: 'Actual',
            type: 'line',
            areaStyle: { normal: {} },
            data: data.selected_period_stats.map(item => item.total)
          },
          {
            name: 'Anterior',
            type: 'line',
            areaStyle: { normal: {} },
            data: data.previous_period_stats.map(item => item.total)
          }],
          xAxis: [{
            data: data.selected_period_stats.map(item => moment(item.date).format('MMM Do YY'))
          }]
        };

        this.isLoading = false;
      });
  }

  public getQueryChart(): Observable<any> {
    let params = new HttpParams();
    params = params.append('key', this.key);
    params = params.append('limit', '5');
    params = params.append('compare_previous_period', '1');
    params = params.append('period', this.period);
    return this.s_standard.getWithHttpParams(`dashboard/stats/graph`, params);
  }
}
