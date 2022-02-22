import { Component, Input, OnInit } from '@angular/core';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { ItopDashboard, IstatisticableProduct } from './../../../../../interfaces/idashboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManagerChartTop } from '../../../../../class/manager-chart-top';
import { EKeyDashboard, EtypeGraph } from '../../../../../enums/EkeyDashboard.enum';
// import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent extends ManagerChartTop<IstatisticableProduct> implements OnInit {
  // options: EChartsOption = {
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'cross',
  //       label: {
  //         backgroundColor: '#6a7985'
  //       }
  //     }
  //   },
  //   legend: {
  //     data: ['Actual', 'Anterior']
  //   },
  //   grid: {
  //     left: '3%',
  //     right: '4%',
  //     bottom: '3%',
  //     containLabel: true
  //   },
  //   xAxis: [
  //     {
  //       type: 'category',
  //       boundaryGap: false,
  //       data: ['Actual', 'Anterior']
  //     }
  //   ],
  //   yAxis: [
  //     {
  //       type: 'value'
  //     }
  //   ],
  //   series: [
  //     {
  //       name: 'Actual',
  //       type: 'bar',
  //       // stack: 'counts',
  //       data: [1,1]
  //     }
  //   ]
  // };

  options: any = {
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Matcha Latte'],
        [57.1, 78254, 'Milk Tea'],
        [74.4, 41032, 'Cheese Cocoa'],
        [50.1, 12755, 'Cheese Brownie'],
        [89.7, 20145, 'Matcha Cocoa'],
        [68.1, 79146, 'Tea'],
        [19.6, 91852, 'Orange Juice'],
        [10.6, 101852, 'Lemon Juice'],
        [32.7, 20112, 'Walnut Brownie']
      ]
    },
    grid: { containLabel: true },
    xAxis: { name: 'amount' },
    yAxis: { type: 'category' },
    // visualMap: {
    //   orient: 'horizontal',
    //   left: 'center',
    //   min: 10,
    //   max: 100,
    //   text: ['High Score', 'Low Score'],
    //   // Map the score column to color
    //   dimension: 0,
    //   inRange: {
    //     color: ['#65B581', '#FFCE34', '#FD665F']
    //   }
    // },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
        }
      }
    ]
  }

  constructor(spinner: NgxSpinnerService, public s_standard: StandartSearchService) {
    super();
    this.spinner = spinner;
  }
  @Input() dates: { first_date: any[], last_date: any[] };
  key: EKeyDashboard = EKeyDashboard.product_sales;
  // keyCurrent: EkeyDashboard = EkeyDashboard.product_sales;
  idSpinner = 'loading-chart-product';

  ngOnInit(): void {
    this.createChart('chart-product', EtypeGraph.bar);
  }

  assignData(data: ItopDashboard<IstatisticableProduct>[]): void {
    this.updateOptions = {
      dataset: {
        source: [
          ['product', 'quantity'],
          ...data.map((item) => [item.statisticable.code, item._total])
        ]
      },
      series: {
        seriesLayoutBy: 'column',
        type: 'bar',
        itemStyle: {
          color: (param) => {
            console.log({ param });
            return this.randomColor();
          }
        },
        encode: {
          x: 'quantity',
          y: 'product',
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace'
        }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {
          show: true,
          fontSize: 14,
          rich: {
            flag: {
              fontSize: 25,
              padding: 5
            }
          }
        },
      },
      xAxis: { name: 'quantity' },

    };
    // this.chart.data.datasets = [];
    // this.chart.data.datasets.push({
    //   label: 'Grafico',
    //   data: data.map((item: any) => item._total),
    //   backgroundColor: data.map(i => this.ramdonColor()),
    //   borderColor: data.map(i => this.ramdonColor()),
    // });
    // this.chart.data.labels = data.map(item => item.statisticable.code + ' - ' + item.statisticable.name.split(' ')[0]);
    // this.chart.update();
    // this.spinner.hide(this.idSpinner);

  }

}
