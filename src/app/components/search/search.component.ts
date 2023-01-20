import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MethodsHttpService } from '../../services/methods-http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  constructor(private methodsHttp: MethodsHttpService) {}


  @ViewChild("searchInput") searchInput: ElementRef;


  @Input() classes: string = '';
  @Input() title: string | null = null;
  @Input() placeholder: string = 'Buscador';
  @Input() url: string;
  @Input() init: boolean = true;
  @Input() styles: string = '';
  @Input() commentLoading: string = 'Cargando espere por favor...';
  @Output() data = new EventEmitter<any>();
  isLoading: boolean | undefined = false;
  paginator: PageEvent = new PageEvent();
  textSearch: string = '';
  ngOnInit(): void {
    this.paginator.length = 0;
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.init ? this.search() : this.isLoading = undefined;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 500);
  }

  search(pageEvent: any = null): void {
    this.isLoading = true;
    pageEvent = pageEvent ?? this.paginator;
    const params = {
      page: pageEvent.pageIndex + 1,
      pageSize: pageEvent.pageSize,
      search: this.textSearch
    };
    this.methodsHttp.methodGetPaginate<any>(this.url, params).subscribe(
      (response) => {
        this.isLoading = false;
        this.paginator.length = response.data.total;
        this.paginator.pageIndex = response.data.current_page - 1;
        this.paginator.pageSize = response.data.per_page;
        this.data.emit(response.data);
      },
      (error) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  searchText(): void {
    const params = {
      pageIndex: 0,
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
