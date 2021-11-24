import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { Chart, ChartConfiguration } from 'chart.js';
import * as moment from 'moment';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { IcompareGraph, Idates } from '../../../../../interfaces/idashboard';
import { SharedService } from '../../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-sell-chart',
  templateUrl: './sell-chart.component.html',
  styleUrls: ['./sell-chart.component.css']
})
export class SellChartComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }
  @Input() s_stardart: StandartSearchService;
  @Input() dates: {first_date: any[], last_date: any[]};
  chart: Chart;
  for: 'day' | 'week' | 'month' | 'year' = 'day';
  isLoading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.createChart();
  }

  getDate(): { first_date: any[], last_date: any[] } {
    const first_date = [SharedService.convertDateForLaravelOfDataPicker(this.dates.first_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dates.first_date[1])];
    const last_date = [SharedService.convertDateForLaravelOfDataPicker(this.dates.last_date[0]), SharedService.convertDateForLaravelOfDataPicker(this.dates.last_date[1])];
    return { first_date, last_date };
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
        onClick: (e: any) => {
          const activePoints = this.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
          const [{index}] = activePoints;
          console.log(activePoints);
          console.log(this.chart.data.datasets[0].data[index]);
        }
      }
    };
    this.chart = new Chart(ctx as any, dataChart);
    this.updateChart();
  }
  public updateChart(event: MatRadioChange = null): void {
    this.isLoading = true;
    this.spinner.show('isload-chart-sell');
    const date = this.getDate();
    console.log(date);
    this.s_stardart.index(`dashboard/stats/graph?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=sales&limit=5&compare_previous_period=1${event ? '&period=' + event.value : ''}`).subscribe((res) => {
      console.log(res);
      const data = res.data as { dates: Idates, previous_period_stats: IcompareGraph[], selected_period_stats: IcompareGraph[] };
      this.chart.data.datasets[0].data = [];
      this.for = data.dates.period;
      this.chart.data.datasets = [
        { data: data.previous_period_stats.map(item => item.total), label: 'Anteriores', borderColor: 'rgba(235,28,28,0.2)', borderWidth: 2, backgroundColor: 'rgba(235,28,28,0.2)' },
        { data: data.selected_period_stats.map(item => item.total), label: 'Actuales', borderColor: 'rgba(0,200,83,0.5)', borderWidth: 2, backgroundColor: 'rgba(0,200,83,0.5)' }
      ];
      this.chart.data.labels = data.selected_period_stats.map(item => moment(item.date).format('MMM Do YY'));
      this.chart.update();
      this.isLoading = false;
      this.spinner.hide('isload-chart-sell');

    });
  }
}
