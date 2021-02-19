import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoViewComponent } from '../../../components/modals/info-view/info-view.component';
import { CatalogoService } from '../../../services/catalogo.service';
import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
  animations: [trigger('fade', [
    transition(
      ':leave', [
        style({ transform: 'scale(0)',opacity:'0' }),
        animate(400)
      ]
    )])],
})
export class PublicacionesComponent implements OnInit {

  @ViewChild("paginator") paginator: MatPaginator;
  permission_show =['super-admin','catalogs.publications.show'];
  permission_create =['super-admin','catalogs.publications.create'];
  permission_edit =['super-admin','catalogs.publications.edit'];
  permission_destroy =['super-admin','catalogs.publications.destroy'];
  isLoader:boolean = false;
  selected_state:string = 'all';
  price_min:number = null;
  price_max:number = null;
  hasData:boolean =true;
  pageCurrent: number = 1;
  productSearch:string=null;
  products=[];
  menu=[];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;
  isload:boolean = true;
  aux_page_next:number;

  // selected_state: string = "all";
  constructor(private snack_bar:MatSnackBar, private s_standart:StandartSearchService, public dialog: MatDialog,private s_catalogo: CatalogoService,private s_mercado_libre:MercadoLibreService) { }

  ngOnInit(): void {

    
    this.gotoTop();
    this.searchBar();
    // return permissions;
  }

  searchBar():void{
    // const pageSize = this.paginator.pageSize;
    this.isload =true;
    console.log(this.pageEvent);
    this.gotoTop();
    this.s_standart
      .search(this.productSearch, this.pageSize, this.selected_state,this.price_min,this.price_max,'catalogs/publications')
      .subscribe((response: any) => {
        console.log(response);
        this.isload = false;
        this.products = response.publications.data;
        this.length = response.publications.total;
        this.pageSize = response.publications.per_page;
        this.pageCurrent = response.publications.current_page;
        if(this.products.length < 1){
          this.hasData = false;
        }
        else this.hasData =true;
      },err=>{
        console.log(err);
        this.isload =false;
      });
  }

  gotoTop() {
    const main =document.getElementsByClassName("app-body")
    main[0].scrollTop = 0;
  }

  changedPaginator($event):void{
    this.pageSize = $event.pageSize;
    this.isload = true;
    console.log($event);
    if ($event.pageIndex != this.aux_page_next) {
      this.gotoTop();
      this.aux_page_next = $event.pageIndex;
    }
    this.s_standart
      .nextPageSearch(
        $event.pageIndex + 1,
        this.productSearch,
        $event.pageSize,
        this.selected_state,
        this.price_min,
        this.price_max,
        'catalogs/publications'
      )
      .subscribe((response: any) => {
        console.log(response);
        this.isload = false;
        this.products = response.publications.data;
        this.length = response.publications.total;
        this.pageSize = response.publications.per_page;
        this.pageCurrent = response.publications.current_page;
        if (this.products.length < 1) {
          this.hasData = false;
        } else this.hasData = true;
        
      },err=>{
        this.isload = false;
      });
  }

  EditPublication(idPublication):void{

  }

  deletePublication(idPublication,index):void{
    const snack = this.snack_bar.open('Eliminando espere ...')
    this.isLoader = true;
    this.s_catalogo.destroyPublications(idPublication).subscribe(
      res=>{
        snack.dismiss();
        this.isLoader = false;
        console.log(res);
        if(res.success){
          this.snack_bar.open('Eliminado con exito', 'OK', {duration:2000})
          this.products.splice(index,1);
          SwalService.swalToast('Eliminado con exito','success');
        }
      },err=>{
        console.log(err);
        this.isLoader = false;
        snack.dismiss();

      }
    )
  }

  goEdit(){

  }

  openDescription(index): void {
      this.dialog.open(InfoViewComponent, { 
      data: {name: this.products[index].name, title:"Descripcion",info:this.products[index].description},
    });
  }

  executeMenu(event ): void {
    console.log(event);
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      console.log(res);
      if (res.success) {
        const indice = this.products.findIndex((x) => x.id == event.id);
        this.products[indice] = res.ml;
      }
    });
  }

  destroyPublication(event):void{
    const index = this.products.findIndex(x=>x.id==event.id);
    if(index != -1){
      this.products.splice(index,1);
    }
  }
}
