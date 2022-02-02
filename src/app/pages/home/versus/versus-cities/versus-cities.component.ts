import { Component, OnInit } from '@angular/core';
import AirDatepicker from 'air-datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { VersusChart } from '../../../../class/versus-chart';
import { EKeyDashboard } from '../../../../enums/EkeyDashboard.enum';
import { Icity } from '../../../../interfaces/iml-info';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-versus-cities',
  templateUrl: './versus-cities.component.html',
  styleUrls: ['./versus-cities.component.css']
})
export class VersusCitiesComponent  extends VersusChart<Icity> implements OnInit {

  constructor(spinner: NgxSpinnerService,  s_standart: StandartSearchService) {
    super(spinner, s_standart);
  }
  url = 'dashboard/versus/countries/1/cities';
  urlDashboard: string = 'dashboard/stats/graph';
  key: string = EKeyDashboard.city_sales;

  ngOnInit(): void {
    this.airDate = new AirDatepicker('#input-date-cities', this.optionsDate as any);
    this.loadDateLocalStorage();
    this.getData();
    this.create_chart('chart-versus-cities', 'line');
  }

}
