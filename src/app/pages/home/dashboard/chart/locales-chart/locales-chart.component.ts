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

  @Input() dates: { first_date: any[], last_date: any[] };
  key: EKeyDashboard = EKeyDashboard.location_sales;
  idSpinner = 'loading-chart-location';
  options = {
    responsive: true,
    maintainAspectRatio: false,
    display: true,
    plugins: {
      datalabels: {
        display: true,
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          color: 'red',
          weight: 'bold',
        }
      },
      doughnutlabel: {
        labels: [{
          text: '550',
          font: {
            size: 20,
            weight: 'bold'
          }
        }, {
          text: 'total'
        }]
      }
    }
  };
  ngOnInit(): void {
    this.createChart('chart-locations', EtypeGraph.doughnut);
  }

  assignData(data: ItopDashboard<IstatisticableLocation>[]): void {
    this.chart.data.datasets = [];
    this.chart.data.datasets.push({
      data: data.map((item: any) => item._total),
      backgroundColor: data.map(i => this.ramdonColor()),
      borderColor: data.map(i => this.ramdonColor()),
    });
    this.chart.data.labels = data.map(item => item.statisticable.name);
    this.chart.update();
    this.spinner.hide(this.idSpinner);
  }

}
