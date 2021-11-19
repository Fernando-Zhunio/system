import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Chart, ChartConfiguration } from 'chart.js';
import * as moment from 'moment';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { IcompareGraph, Idates } from '../../../../../interfaces/idashboard';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-sell-chart',
  templateUrl: './sell-chart.component.html',
  styleUrls: ['./sell-chart.component.css']
})
export class SellChartComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }
  @Input() s_stardart: StandartSearchService;
  @Input() dates;
  chart: Chart;
  for: 'day' | 'week' | 'month' | 'year' = 'day';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.createChart();
  }

  //#region Chart Ventas
  createChart(): void {
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
      }
    };
    this.chart = new Chart(ctx as any, dataChart);
    this.updateChart();
  }
  public updateChart(event: MatRadioChange = null): void {
    this.isLoading = true;
    this.spinner.show('isload-chart-sell');
    const date = this.dates;
    this.s_stardart.index(`dashboard/stats/graph?start_date=${date.start_date}&end_date=${date.end_date}&key=sales&limit=5&compare_previous_period=1${event ? '&period=' + event.value : ''}`).subscribe((res) => {
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
  //#endregion Chart Ventas
}
