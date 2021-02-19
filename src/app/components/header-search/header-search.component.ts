import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StandartSearchService } from '../../services/standart-search.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {

  @Input() with_filter:boolean;
  @Output() isload:EventEmitter<boolean> = new EventEmitter();
  @Output() products:EventEmitter<any> = new EventEmitter();
  productSearch:string;
  constructor(private s_standart:StandartSearchService) { }
  @Input() pageSize= 10;
  @Input() selected_state = "all";
  @Input() min=null;
  @Input() max=null;
  @Input() url="";
  @Input() placeholder = "Escriba el nombre del producto";
  @Input() onTabs:boolean = true;
  ngOnInit(): void {
    this.searchBar()
  }

  searchBar(){
    this.isload.emit(true);
    // console.log(this.pageEvent);
    this.gotoTop();
    this.s_standart
      .search(this.productSearch, this.pageSize, this.selected_state,this.min,this.max,this.url)
      .subscribe((response: any) => {
        console.log(response);
        // this.isload = false;
        this.isload.emit(false);
        this.products.emit(response)
        // this.products = response.publications.data;
        // this.length = response.publications.total;
        // this.pageSize = response.publications.per_page;
        // this.pageCurrent = response.publications.current_page;
        // if(this.products.length < 1){
        //   this.hasData = false;
        // }
        // else this.hasData =true;
      },err=>{
        // this.isload =false;
        this.isload.emit(false);

      });
  }

  gotoTop() {
    const main =document.getElementsByClassName("app-body")
    main[0].scrollTop = 0;
  }
}
