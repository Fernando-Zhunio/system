import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CTemplateSearch } from '../../class/ctemplate-search';
import { HeaderSearchComponent } from './../header-search/header-search.component';

@Component({
  selector: 'app-template-for-search-columns',
  templateUrl: './template-for-search-columns.component.html',
  styleUrls: ['./template-for-search-columns.component.css']
})
export class TemplateForSearchColumnsComponent extends CTemplateSearch<any[]> implements OnInit {

  constructor() {
    super();
  }
  @ViewChild(HeaderSearchComponent) override headerComponent:HeaderSearchComponent;

  @Output() productEmit = new EventEmitter<any>();
  @Input() url:string;

  override isLoading: boolean = false;
  // products:any[];
  ngOnInit(): void {
  }


  override loadData($event): void {
    this.paginator = $event.data;
   this.productEmit.emit($event.data.data);
    this.products = this.paginator.data;
  }
}
