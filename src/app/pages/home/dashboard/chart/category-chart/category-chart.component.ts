import { Component, Input, OnInit } from '@angular/core';
import { ManagerChartTop } from '../../../../../class/manager-chart-top';
import { NgxSpinnerService } from 'ngx-spinner';
import { IsellForCategories, ItopDashboard } from '../../../../../interfaces/idashboard';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { EKeyDashboard } from '../../../../../enums/EkeyDashboard.enum';

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

  override options: any = {
    legend: {
      top: 'bottom'
    },

    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ],
      }
    ]
  };

  // @Input() s_standard: StandartSearchService;
  @Input() override dates: { first_date: any[], last_date: any[] };
  key: EKeyDashboard = EKeyDashboard.category_sales;
  idSpinner = 'isload-chart-category';

  ngOnInit(): void {
    this.createChart();
  }

  assignData(data: ItopDashboard<IsellForCategories>[]): void {

    this.updateOptions = {
      series: [
        {
          label: {
            formatter: '{c} - {b}   {{d}%}  ',
          },
          data: data.map((item) => {
            return { value: item._total, name: item.statisticable.name };
          })
        }
      ]
    };
  }

}
