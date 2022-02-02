import { Component, OnInit } from '@angular/core';
import AirDatepicker from 'air-datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { EKeyDashboard } from '../../../../enums/EkeyDashboard.enum';
import { Icategory } from '../../../../interfaces/icategory';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { VersusChart } from '../../../../class/versus-chart';

@Component({
  selector: 'app-versus-categorias',
  templateUrl: './versus-categorias.component.html',
  styleUrls: ['./versus-categorias.component.css']
})
export class VersusCategoriasComponent extends VersusChart<Icategory> implements OnInit {

  constructor( spinner: NgxSpinnerService,  s_standart: StandartSearchService) {
    super(spinner, s_standart);
  }
  url = 'dashboard/versus/categories';
  urlDashboard: string = 'dashboard/stats/graph';
  key: string = EKeyDashboard.category_sales;

  ngOnInit(): void {
    this.airDate = new AirDatepicker('#input-date-categories', this.optionsDate as any);
    this.loadDateLocalStorage();
    this.getData();
    this.create_chart('chart-versus-categories', 'line');
  }
}
