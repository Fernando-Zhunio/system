import { Component, Input, OnInit } from '@angular/core';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { Chart, ChartConfiguration } from 'chart.js';
import { ItopDashboard, IstatisticableProduct } from './../../../../../interfaces/idashboard';
import { MatRadioChange } from '@angular/material/radio';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }
  @Input() s_stardart: StandartSearchService;
  @Input() dates;
  chart: Chart;
  for: 'asc'|'desc' = 'desc';

  ngOnInit(): void {
    this.createChart();
  }

   //#region Chart Product
   createChart(): void {
    const _chart = document.getElementById('chart-product') as any;
    const ctx = _chart.getContext('2d') as any;
    console.log(ctx);
    const dataChart: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['espere ..', 'espere ..', 'espere ..', 'espere ..', 'espere ..'],
        datasets: [
          {
            label: 'Ventas',
            data: [0, 0, 0, 0, 0],
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
    this.chart = new Chart(ctx as any,  dataChart);
    this.updateChart();
  }

  updateChart(event: MatRadioChange = null): void {
    this.spinner.show('isload-chart-product');

    const date = this.dates;
    this.s_stardart.index(`dashboard/stats/sum?start_date=${date.start_date}&end_date=${date.end_date}&key=product-sales-count&limit=5${event ? '&order=' + event.value : ''}`).subscribe((res) => {
      const data = res.data.data as ItopDashboard<IstatisticableProduct>[];
      this.chart.data.datasets[0].data = [];
      this.chart.data.datasets[0].data =  data.map(item => item._total);
      this.chart.data.labels = data.map(item => item.statisticable.code + ' - ' + item.statisticable.name.split(' ')[0]);
      this.chart.update();
      this.spinner.hide('isload-chart-product');

    });
  }

  //#endregion Chart Product

}
