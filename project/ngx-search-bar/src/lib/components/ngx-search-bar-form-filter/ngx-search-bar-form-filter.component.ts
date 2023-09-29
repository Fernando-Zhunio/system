// import { NgxSearchBarFilterValue } from './../../interfaces/structures';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { empty } from '../../utils/empty';
import { NGX_SEARCH_BAR_DATA, NgxSearchBarProvider } from '../../utils/DATA_FOR_SEARCH_BAR';
import { NgxSearchBarComponent } from '../ngx-search-bar/ngx-search-bar.component';
import { Location } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-search-bar-form-filter',
  templateUrl: './ngx-search-bar-form-filter.component.html',
  styleUrls: ['./ngx-search-bar-form-filter.component.scss'],
  animations: [ 
    trigger('openOrCloseFilter', [
      transition(':enter', [
        style({  transform:'translateY(-50px)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform:'translateY(-50px)', opacity: 0, background: 'inherit' }))
      ])
    ])
  ]
})
export class NgxSearchBarFormFilterComponent  {

  @ViewChild('dropDownFilter', {static: false}) dropDownFilterElement: ElementRef;
  @Input() filters: FormGroup
  private filtersSend: { [key: string]: any } | null = null;
  @Input() classPanel: string;
  classPosition: string = ''
  isOpenFilter = false;
  @Input() withParamsClean: boolean = false;
  @Input() customBtnApplyFilter: {text?: string, class?: string, color?: string, icon?: string} | null = null;
  numberFilter = 0;
  buttonsFilters: Map<string, any> = new Map();

  constructor(
    protected location: Location, 
    private ngxSearchBar: NgxSearchBarComponent, 
    @Inject(NGX_SEARCH_BAR_DATA) public dataInject: NgxSearchBarProvider,) {
      if (!this.customBtnApplyFilter) {
        this.customBtnApplyFilter = this.dataInject?.OPTIONS?.customBtnApplyFilter || { text: 'Aplicar Filtros', class: '', color: 'accent', icon: 'done' }
      }
  }

  applyFilters() {
    this.filtersSend = this.filterVerified();
    // this.numberFilter = this.filtersSend ? Object.keys(this.filtersSend).length : 0;
    console.log({filtersSend: this.filtersSend})
    this.isOpenFilter = false;
    this.ngxSearchBar.search();
  }

  getFilter(): { [key: string]: any } | null {
    return this.filtersSend;
  }

  removeQueryParam(key: string) {
    this.filters.get(key)?.setValue(null);
    this.ngxSearchBar.search();
  }

  calculePosition() {
    const containerFilter = ((this.dropDownFilterElement as ElementRef).nativeElement as HTMLElement)
    const btn = document.querySelector('.nsb-content-input-search') as HTMLElement;
    const dropdownRect = btn.getBoundingClientRect();
    const spaceAbove = dropdownRect.top;
    const spaceBelow = window.innerHeight - dropdownRect.bottom;

    const height = btn?.['offsetHeight'] || 44;
    console.log({spaceAbove, spaceBelow})
    if (spaceBelow > spaceAbove) {
      // this.classPosition = 'nsb-panel-above';
      containerFilter.style.top = `${height}px`;
      containerFilter.style.bottom = 'auto';
      containerFilter.style.maxHeight = `${spaceBelow}px`;
    } else {
      containerFilter.style.top = 'auto';
      containerFilter.style.bottom = `${height}px`;
      // this.classPosition = 'nsb-panel-below';
      containerFilter.style.maxHeight = `${spaceAbove}px`;
    }
  }

  filterVerified(): { [key: string]: any } | null {
    const filters = this.filters.value;
    const filtersOverride = {};
    this.numberFilter = 0;
    for (const key in filters) {
      if (!empty(filters[key])) {
        this.numberFilter++;
        console.log({key})
        filtersOverride[key] = filters[key];
      }
    }
    this.filtersSend = this.withParamsClean ? filtersOverride : this.filters.value;
    return this.filtersSend
  }

  setFormFiltersValue(filters: { [key: string]:  any}) {
    console.log({filters})
    this.numberFilter = filters ? Object.keys(filters).length : 0;
    this.filters.patchValue(filters);
    const values = this.filters.value;
    Object.keys(values).forEach((key) => {
      if (empty(values[key])) {
        return;
      }
      this.buttonsFilters.set(key, this.filters.controls[key].value);
    })
  }

  getFormFilters(): FormGroup {
    console.log({filters: this.filters})
    return this.filters;
  }

  openFilter() {
    this.isOpenFilter = !this.isOpenFilter;
    if (this.isOpenFilter) {
      this.calculePosition();
    }
  }

}
