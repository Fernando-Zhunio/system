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

  @Input() placeholder: string = 'Buscador';
  @Input() url$: string;
  @Output() isloading = new EventEmitter<boolean>();

  @Output() data = new EventEmitter<any>();

  ngOnInit(): void {

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
