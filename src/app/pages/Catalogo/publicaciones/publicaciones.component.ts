import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgxPermissionsService } from 'ngx-permissions';
import { MenuItems } from '../../../clases/menu-items';
import { InfoViewComponent } from '../../../components/modals/info-view/info-view.component';
import { CatalogoService } from '../../../services/catalogo.service';
import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  @ViewChild("paginator") paginator: MatPaginator;
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
  // selected_state: string = "all";
  constructor(public dialog: MatDialog,private s_standartSearch:StandartSearchService, private s_permissionsService: NgxPermissionsService,private s_catalogo: CatalogoService,private s_mercado_libre:MercadoLibreService) { }

  ngOnInit(): void {
    const perm = ["ADMIN","catalogs.publications.edit","catalogs.products.ml.relist"];
    this.s_permissionsService.loadPermissions(perm);
    const menu_small = new MenuItems(this.s_permissionsService).getMenuItemAll();
    const count = menu_small.length;
    for (let i = 0; i < count; i++) {
      this.s_permissionsService.hasPermission(menu_small[i].slug).then(res=>{
            if(res){
              this.menu.push(menu_small[i]);
              console.log(this.menu);
            }
            else {
              console.log(false);
            }
        })
    }
    this.s_catalogo.index_publications(1).subscribe(
      res=>{
        console.log(res);
        this.products = res.publications.data
      }
    )
    // return permissions;
  }

  searchBar():void{
    const pageSize = this.paginator.pageSize;
    console.log(this.pageEvent);
    this.gotoTop();
    this.s_standartSearch
      .search(this.productSearch, pageSize, this.selected_state,this.price_min,this.price_max,'catalogs/publications')
      .subscribe((response: any) => {
        console.log(response);
        this.products = response.publications.data;
        this.length = response.publications.total;
        this.pageSize = response.publications.per_page;
        this.pageCurrent = response.publications.current_page;
        if(this.products.length < 1){
          this.hasData = false;
        }
        else this.hasData =true;
      });
  }

  gotoTop() {
    const main =document.getElementsByClassName("app-body")
    main[0].scrollTop = 0;
  }

  changedPaginator(event):void{

  }

  EditPublication(idPublication):void{

  }

  deletePublication(idPublication,index):void{
    this.s_catalogo.destroyPublications(idPublication).subscribe(
      res=>{
        console.log(res);
        if(res.success){
          this.products.splice(index,1);
          SwalService.swalToast('Eliminado con exito','success');
        }
      }
    )
  }

  openDescription(index): void {
      this.dialog.open(InfoViewComponent, { 
      data: {name: this.products[index].name, title:"Descripcion",info:this.products[index].description},
      
    });
  }

  executeMenu(event ): void {
    console.log(event);
    
    // active,paused,closed,deleted,relist_forever_on,relist_forever_off
    // switch (type) {
    //   case "active":
    //     break;
    //   case "paused":
    //     break;
    //   case "closed":
    //     break;
    //   case "deleted":
    //     break;
    //   case "relist_forever_on":
    //     break;
    //   case "relist_forever_off":
    //     break;

    //   default:
    //     break;
    // }
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      console.log(res);
      if (res.success) {
        const indice = this.products.findIndex((x) => x.id == event.id);
        this.products[indice] = res.ml;
      }
    });
  }
}
