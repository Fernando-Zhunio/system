import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CTemplateSearch } from '../../class/ctemplate-search';
import { StandartSearchService } from '../../services/standart-search.service';
// import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.css']
})
export class SearchTemplateComponent<T> extends CTemplateSearch<T> implements OnInit {

  constructor(private standardService: StandartSearchService, private snackBar: MatSnackBar) {
    super();
  }
  @Input() filter_data: object = {};
  @Input() placeholder: string = 'Buscador';
  @Input() url$: string;
  @Input() init: boolean = true;
  @Input() active_filters_menu: boolean = false;
  @Input() key_paginator: string = null;
  @Input() columns = 4;
  @Output() isloading = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<any>();
  

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
    this.isloading.emit(this.isload);
  }

}
