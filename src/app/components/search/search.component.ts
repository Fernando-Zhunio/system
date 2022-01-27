import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StandartSearchService } from '../../services/standart-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private s_standart: StandartSearchService) { }

  @Input() classes: string = '';
  @Input() placeholder: string = 'Buscador';
  @Input() url: string;
  @Output() data = new EventEmitter<any>();
  isLoading: boolean = false;
  length: number = 0;
  paginator: PageEvent;
  
  ngOnInit(): void {
  }

  search(textSearch: string): void {
    this.isLoading = true;
    const params = {
      page: this.paginator.pageIndex + 1,
      per_page: this.paginator.pageSize,
      search: textSearch
    };
    this.s_standart.search2(this.url, params).subscribe(
      (response) => {
        this.isLoading = false;
        this.data.emit(response);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

}
