import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  ngOnInit(): void {
  }

}
