import { NgxSearchBarFilterValue } from './../../interfaces/structures';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { empty } from '../../utils/empty';
import { DATA_FOR_SEARCH_BAR, NgxSearchBarProvider } from '../../utils/DATA_FOR_SEARCH_BAR';
import { NgxSearchBarComponent } from '../ngx-search-bar/ngx-search-bar.component';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-search-bar-form-filter',
  templateUrl: './ngx-search-bar-form-filter.component.html',
  styleUrls: ['./ngx-search-bar-form-filter.component.scss']
})
export class NgxSearchBarFormFilterComponent implements OnInit {

  @Input() filters: FormGroup
  @Input() title: string;
  @Input() withParamsClean: boolean = false;
  buttonsFilters: Map<string, any> = new Map();
  
  constructor(protected location: Location, private ngxSearchBar: NgxSearchBarComponent, @Inject(DATA_FOR_SEARCH_BAR) private dataInject: NgxSearchBarProvider,) { 
    
  }
  @Input() customBtnApplyFilter: any = this.dataInject?.OPTIONS?.customBtnApplyFilter || { text: 'Aplicar Filtros', class: '', color: 'accent', icon: 'done' };

  ngOnInit() {}

  applyFilters() {
    if(this.filters)
    this.ngxSearchBar.filters = this.filterVerified();
    console.log(this.filterVerified())
    this.ngxSearchBar.search();
  }

  removeQueryParam(key: string) {
    this.buttonsFilters.delete(key);
    this.filters[key] = null;
    this.ngxSearchBar.search();
  }

  filterVerified(): { [key: string]: NgxSearchBarFilterValue } {
    const filtersOverride: { [key: string]: NgxSearchBarFilterValue } = {};
    const filters = this.filters.value;
    this.buttonsFilters.clear();
    for (const key in filters) {
      if (!empty(filters[key])) {
        this.buttonsFilters.set(key, this.getStructureForTemplate(filters[key]));
        filtersOverride[key] = filters[key];
        console.log({filters: filters[key]})
      }
    }
    return this.withParamsClean ? filtersOverride : Object.keys(filters)
      .reduce((acc: { [key: string]: NgxSearchBarFilterValue }, curr) => {
        acc[curr] = filters[curr]
        return acc;
      }, {});
  }

  getStructureForTemplate(struct: { friendlyName: string, value: NgxSearchBarFilterValue, castValue?: () => (string | [any, string][]) | null; }): { friendlyName: string, value: string | [any, string][] | null } {
    console.log(struct)
    return {
      friendlyName: struct.friendlyName,
      value: struct.castValue ? struct.castValue() : ''
    }
  }

  // setFilterFromUrl(): void {
  //   const params = this.getQueryParamsFromUrl();
  //   if (!params) return;
  //   try {
  //     Object.keys(this.filters).forEach((key) => {
  //       if (!params.hasOwnProperty(key)) {
  //         return;
  //       }
  //       // si es un array
  //       if (params[key].match(/(^\[.+(\])$)|true|false/)) {
  //         this.filters[key].value = JSON.parse(params[key]);
  //         return;
  //       }
  //       // si es un numero
  //       if (!isNaN(params[key])) {
  //         this.filters[key].value = Number.parseFloat(params[key]);
  //         return;
  //       }
  //       this.filters[key].value = params[key];
  //     })
  //   } catch (error) {
  //     console.log('Url mal formada');
  //   }
  // }

}
