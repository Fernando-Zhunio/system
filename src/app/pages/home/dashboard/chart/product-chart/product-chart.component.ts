import { Component, Input, OnInit } from '@angular/core';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { ItopDashboard, IstatisticableProduct } from './../../../../../interfaces/idashboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManagerChartTop } from '../../../../../class/manager-chart-top';
import { EKeyDashboard, EtypeGraph } from '../../../../../enums/EkeyDashboard.enum';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent extends ManagerChartTop<IstatisticableProduct> implements OnInit {
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
        type: 'bar',
        // stack: 'counts',
        data: [1,1]
      }
    ]
  };

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

}
