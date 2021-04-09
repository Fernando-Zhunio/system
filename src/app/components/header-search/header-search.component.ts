import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { StandartSearchService } from '../../services/standart-search.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {


  @Output() isload:EventEmitter<boolean> = new EventEmitter();
  @Output() products:EventEmitter<any> = new EventEmitter();
  @Input() url="";
  @Input() placeholder = "Escriba el nombre del producto";
  @Input() filter_data={};
  @Input() isSticky:boolean = true;
  @Input() init:boolean = true;
  productSearch:string="";
  suscription:Subscription;

  constructor(private s_standart:StandartSearchService) { }

  ngOnInit(): void {
    if(this.init)this.searchBar();
  }

  searchBar($event={pageIndex: 0,pageSize: 15,previousPageIndex: 0}){
    this.isload.emit(true);

    // console.log(this.pageEvent);
    if(this.suscription){
      this.suscription.unsubscribe();
    }
    this.gotoTop();
    this.suscription = this.s_standart
      // .search(this.productSearch, this.pageSize, this.selected_state,this.min,this.max,this.url)
      // .search2(this.url,{pageSize:$event.pageSize,search:this.productSearch,page:$event.pageIndex+1,min:this.min,max:this.max,state:this.selected_state})
      .search2(this.url,{pageSize:$event.pageSize,search:this.productSearch,page:$event.pageIndex+1,...this.filter_data})
      .subscribe((response: any) => {
        // console.log(response);
        this.isload.emit(false);
        this.products.emit(response)
      },err=>{
        this.isload.emit(false);
      });
  }

  ngOnDestroy(): void {
    if(this.suscription)
    this.suscription.unsubscribe();
  }

  gotoTop() {
    const main =document.getElementsByClassName("app-body")
    main[0].scrollTop = 0;
  }

   paste() {
    if(navigator.clipboard){
    navigator.clipboard.readText().then(res=>{
      this.productSearch = res;
    });
    }
    else{
      SwalService.swalToast('Necesitas proporcionar permisos de portapapeles a esta pagina','warning')
      // navigator.permissions.query({name:'microphone'}).then(function(result) {
      //   if (result.state === 'granted') {
      //     alert('granted')

      //   } else if (result.state === 'prompt') {
      //     alert('prompt')
      //   }
      //   // Don't do anything if the permission was denied.
      // });
    }
  }
}
