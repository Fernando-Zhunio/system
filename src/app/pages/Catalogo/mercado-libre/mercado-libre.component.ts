import { Component, OnInit, ViewChild } from "@angular/core";
import { MercadoLibreService } from "../../../services/mercado-libre.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { StandartSearchService } from "../../../services/standart-search.service";
import { ImlInfo } from "../../../interfaces/iml-info";
import { Subscription } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { HeaderSearchComponent } from "../../../components/header-search/header-search.component";
import { Ipagination } from "../../../interfaces/ipagination";

@Component({
  selector: "app-mercado-libre",
  templateUrl: "./mercado-libre.component.html",
  styleUrls: ["./mercado-libre.component.css"],
})
export class MercadoLibreComponent implements OnInit {
  @ViewChild(HeaderSearchComponent) headerComponent:HeaderSearchComponent;

  // search_name: string = "";
  // isColumns: boolean = true;
  // pageCurrent: number = 1;
  // perPage: number = 10;
  // totalItem: number = 0;
  // productSearch: string = null;

  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [10, 15, 25, 100];
  // pageEvent: PageEvent;
  // selected_state: string = "all";
  // @ViewChild("paginator") paginator: MatPaginator;
  price_min: number = null;
  price_max: number = null;
  aux_page_next = 0;
  hasData: boolean = true;
  isload: boolean = false;
  // suscrition_api: Subscription;
  // form_filter: FormGroup = new FormGroup({
  //   // prefix_id: new FormControl(null),
  //   min: new FormControl(null),
  //   max: new FormControl(null),
  //   state: new FormControl('all'),
  //   // warehouse_ids: new FormControl(['all']),
  //   search: new FormControl(''),
  // });

  min:string = "";
  max:string = "";
  state:string = "all";
  constructor(
    private s_mercado_libre: MercadoLibreService,
    // private s_standart: StandartSearchService
  ) {}

  paginator:Ipagination<ImlInfo>;


  mlInfos:ImlInfo[] = [];

  ngOnInit(): void {}

  executeMenu(event): void {
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      if (res.success) {
        const indice = this.mlInfos.findIndex((x) => x.id == event.id);
        this.mlInfos[indice] = res.ml;
      }
    });
  }

  loadData($event):void{
    this.paginator = $event.data;
    this.mlInfos = this.paginator.data;
  }

  changePaginator(event):void{
    this.headerComponent.searchBar(event);
  }

  applyFilter(){
    this.headerComponent.searchBar();
  }
}
