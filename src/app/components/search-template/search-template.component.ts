import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CTemplateSearch } from '../../class/ctemplate-search';

/**
 * @selector menu-bar menuBar
 * @selector filter-menu filterMenu
 */
@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.css']
})
export class SearchTemplateComponent extends CTemplateSearch<any> implements OnInit {

  constructor() {
    super();
  }
  @Input() filter_data: object = {};
  @Input() placeholder: string = 'Buscador';
  @Input() url$: string;
  @Input() title = 'Pagina Novisolutions';
  @Input() init: boolean = true;
  @Input() active_filters_menu: boolean = false;
  @Input() key_paginator: string = null;
  @Input() columns = 4;
  @Input() withCardColumns: boolean = true;
  @Output() _isLoading = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<any[]>();

  ngOnInit(): void {
// console.log(this.filter_data);
  }

  loadData($event) {
    if (this.key_paginator) {
      this.paginator = $event.data[this.key_paginator];
      this.products = this.paginator.data;
      this.data.emit($event.data);
      return;
    }
    this.paginator = $event.data;
    this.products = this.paginator.data;
    this.data.emit(this.products);
  }

  hasIsLoading(): void {
    this._isLoading.emit(this.isLoading);
  }

}
