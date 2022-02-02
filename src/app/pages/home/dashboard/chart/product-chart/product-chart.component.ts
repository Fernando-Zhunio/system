import { Component, Input, OnInit } from '@angular/core';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { ItopDashboard, IstatisticableProduct } from './../../../../../interfaces/idashboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManagerChartTop } from '../../../../../class/manager-chart-top';
import { EKeyDashboard, EtypeGraph } from '../../../../../enums/EkeyDashboard.enum';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent extends ManagerChartTop<IstatisticableProduct> implements OnInit {

  constructor( spinner: NgxSpinnerService, public s_standard: StandartSearchService) {
    super();
    this.spinner = spinner;
  }
  @Input() dates: {first_date: any[], last_date: any[]};
  key: EKeyDashboard = EKeyDashboard.product_sales;
  // keyCurrent: EkeyDashboard = EkeyDashboard.product_sales;
  idSpinner = 'loading-chart-product';

  ngOnInit(): void {
    this.createChart('chart-product', EtypeGraph.bar);
  }

  assignData(data: ItopDashboard<IstatisticableProduct>[]): void {
    this.chart.data.datasets = [];
    this.chart.data.datasets.push({
      label: 'Grafico',
      data: data.map((item: any) => item._total),
      backgroundColor: data.map(i => this.ramdonColor()),
      borderColor: data.map(i => this.ramdonColor()),
    });
    // this.chart.data.labels = data.map(item => item.statisticable.name);
    this.chart.data.labels = data.map(item => item.statisticable.code + ' - ' + item.statisticable.name.split(' ')[0]);
    this.chart.update();
    this.spinner.hide(this.idSpinner);
  }

   //#region Chart Product
  //  createChart(): void {
  //   const _chart = document.getElementById('chart-product') as any;
  //   const ctx = _chart.getContext('2d') as any;
  //   console.log(ctx);
  //   const dataChart: ChartConfiguration = {
  //     type: 'bar',
  //     data: {
  //       labels: ['espere ..', 'espere ..', 'espere ..', 'espere ..', 'espere ..'],
  //       datasets: [
  //         {
  //           label: 'Ventas',
  //           data: [0, 0, 0, 0, 0],
  //           // backgroundColor: 'rgba(0,200,83,0.5)',
  //           borderColor: 'rgba(0,200,83,0.5)',
  //           borderWidth: 2,
  //           backgroundColor: ['rgba(0,200,83,0.5)', 'rgba(105,240,174,0.5)', 'rgba(255,229,0,0.5)', 'rgba(255,153,0,0.5)', 'rgba(255,0,0,0.5)'] 
  //         }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //   }};
  //   this.chart = new Chart(ctx as any,  dataChart);
  //   this.updateChart();
  // }

  // updateChart(event: MatRadioChange = null): void {
  //   this.spinner.show('isload-chart-product');

  //   const date = this.dates;
  //   this.s_stardart.index(`dashboard/stats/sum?start_date=${date.first_date[0]}&end_date=${date.first_date[1]}&key=product-sales-count&limit=5${event ? '&order=' + event.value : ''}`).subscribe((res) => {
  //     const data = res.data.data as ItopDashboard<IstatisticableProduct>[];
  //     this.chart.data.datasets[0].data = [];
  //     this.chart.data.datasets[0].data =  data.map(item => item._total);
  //     this.chart.data.labels = data.map(item => item.statisticable.code + ' - ' + item.statisticable.name.split(' ')[0]);
  //     this.chart.update();
  //     this.spinner.hide('isload-chart-product');
  //   });
  // }

  //#endregion Chart Product

}
