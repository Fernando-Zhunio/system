import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManagerChartTop } from '../../../../../class/manager-chart-top';
import { EKeyDashboard, EtypeGraph } from '../../../../../enums/EkeyDashboard.enum';
import { IstatisticableLocation, ItopDashboard } from '../../../../../interfaces/idashboard';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-locales-chart',
  templateUrl: './locales-chart.component.html',
  styleUrls: ['./locales-chart.component.css']
})
export class LocalesChartComponent extends ManagerChartTop<IstatisticableLocation> implements OnInit {

  constructor(spinner: NgxSpinnerService, public s_standard: StandartSearchService) {
    super();
    this.spinner = spinner;
  }

  @Input() override dates: { first_date: any[], last_date: any[] };
  key: EKeyDashboard = EKeyDashboard.location_sales;
  idSpinner = 'loading-chart-location';
  override options: any = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: true,
      position: 'bottom',
      // orient: 'vertical',

    },
    series: [],
  };
  ngOnInit(): void {
    this.createChart('chart-locations', EtypeGraph.doughnut);
  }

  assignData(data: ItopDashboard<IstatisticableLocation>[]): void {
    this.updateOptions = {
      series: [{
        name: 'Locales',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        data: data.map((item) => {
          return { value: item._total, name: item.statisticable.name };
        })
      }],

    }
    // this.chart.data.datasets = [];
    // this.chart.data.datasets.push({
    //   data: data.map((item: any) => item._total),
    //   backgroundColor: data.map(i => this.ramdonColor()),
    //   borderColor: data.map(i => this.ramdonColor()),
    // });
    // this.chart.data.labels = data.map(item => item.statisticable.name);
    // this.chart.update();
    // this.spinner.hide(this.idSpinner);
  }

}
