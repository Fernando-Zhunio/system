import { Component, OnInit } from '@angular/core';
import { NgxSearchBarComponent } from '../ngx-search-bar/ngx-search-bar.component';

@Component({
  selector: 'app-ngx-search-bar-buttons-set',
  templateUrl: './ngx-search-bar-buttons-set.component.html',
  styleUrls: ['./ngx-search-bar-buttons-set.component.scss']
})
export class NgxSearchBarButtonsSetComponent implements OnInit {

  constructor(private ngxSearchBar: NgxSearchBarComponent) { }

  ngOnInit() {
    console.log(this.ngxSearchBar);
  }

}
