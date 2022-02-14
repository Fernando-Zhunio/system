import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StandartSearchService } from '../../services/standart-search.service';
import { Ipagination } from './../../interfaces/ipagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private s_standart: StandartSearchService) { }

  @Input() classes: string = '';
  @Input() title: string = 'Buscador';
  @Input() placeholder: string = 'Buscador';
  @Input() url: string;
  @Input() init: boolean = true;
  @Output() data = new EventEmitter<any>();
  isLoading: boolean = false;
  // length: number = 0;
  paginator: PageEvent = new PageEvent();
  textSearch: string = '';
  ngOnInit(): void {
    this.paginator.length = 0;
    this.paginator.pageIndex = 1;
    this.paginator.pageSize = 10;
    if (this.init) {
      this.search();
    }
  }

  search(pageEvent: PageEvent = this.paginator): void {
    this.isLoading = true;
    const params = {
      page: pageEvent.pageIndex + 1,
      per_page: pageEvent.pageSize,
      search: this.textSearch
    };
    this.s_standart.search2(this.url, params).subscribe(
      (response: {success: boolean, data: Ipagination<any>}) => {
        this.isLoading = false;
        this.paginator.length = response.data.total;
        this.paginator.pageIndex = response.data.current_page - 1;
        this.paginator.pageSize = response.data.per_page;
        this.data.emit(response.data);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  searchText(): void {
    const params = {
      pageIndex: 1,
      pageSize: this.paginator.pageSize,
      length: 0
    };
    this.search(params);
  }

  changePaginator(event: PageEvent): void {
    this.paginator = event;
    this.search();
  }

}