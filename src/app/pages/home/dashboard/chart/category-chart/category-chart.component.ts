import { Component, Input, OnInit } from '@angular/core';
import { ManagerChartTop } from '../../../../../class/manager-chart-top';
import { NgxSpinnerService } from 'ngx-spinner';
import { IsellForCategories, ItopDashboard } from '../../../../../interfaces/idashboard';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { EKeyDashboard, EtypeGraph } from '../../../../../enums/EkeyDashboard.enum';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.css']
})
export class CategoryChartComponent extends ManagerChartTop<IsellForCategories> implements OnInit {

  constructor(spinner: NgxSpinnerService, public s_standard: StandartSearchService) {
    super();
    this.spinner = spinner;
  }

  // @Input() s_standard: StandartSearchService;
  @Input() dates: { first_date: any[], last_date: any[] };
  key: EKeyDashboard = EKeyDashboard.category_sales;
  idSpinner = 'isload-chart-category';

  ngOnInit(): void {
    this.createChart('chart-categories', EtypeGraph.polarArea);
  }

  assignData(data: ItopDashboard<IsellForCategories>[]): void {
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
