import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CTemplateSearch } from '../../class/ctemplate-search';

@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.css']
})
export class SearchTemplateComponent<T> extends CTemplateSearch<T> implements OnInit {

  constructor() {
    super();
  }
  @Input() filter_data: object = {};
  @Input() placeholder: string = 'Buscador';
  @Input() url$: string;
  @Output() isloading = new EventEmitter<boolean>();
  @Input() active_filters_menu: boolean = false;
  @Output() data = new EventEmitter<any>();

  ngOnInit(): void {
console.log(this.filter_data);

  }

  loadData($event) {
    this.paginator = $event.data;
    this.products = this.paginator.data;
    this.data.emit(this.products);
  }

  hasIsLoading(): void {
    this.isloading.emit(this.isload);
  }

}
