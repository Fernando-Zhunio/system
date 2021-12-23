import { Component, OnInit } from '@angular/core';
import AirDatepicker from 'air-datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { VersusChart } from '../../../../class/versus-chart';
import { EkeyDashboard } from '../../../../enums/EkeyDashboard.enum';
import { Ilocation } from '../../../../interfaces/ilocation';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-versus-locales',
  templateUrl: './versus-locales.component.html',
  styleUrls: ['./versus-locales.component.css']
})
export class VersusLocalesComponent extends VersusChart<Ilocation> implements OnInit {

  constructor( spinner: NgxSpinnerService,  s_standart: StandartSearchService) {
    super(spinner, s_standart);
  }
  url = 'dashboard/versus/locations';
  urlDashboard: string = 'dashboard/stats/graph';
  key: string = EkeyDashboard.location_sales;

  ngOnInit(): void {
    this.airDate = new AirDatepicker('#input-date-locations', this.optionsDate as any);
    this.loadDateLocalStorage();
    this.getData();
    this.create_chart('chart-versus-locations', 'line');
  }

}
