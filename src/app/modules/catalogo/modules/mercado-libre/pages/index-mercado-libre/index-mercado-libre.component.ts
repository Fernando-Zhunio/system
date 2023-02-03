import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import Echo from 'laravel-echo';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
import { EchoManager } from '../../../../../../class/echo-manager';
// import { HeaderSearchComponent } from '../../../../../../components/header-search/header-search.component';
// import { MercadoLibreService } from '../../../../../../services/mercado-libre.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { zoomImage } from '../../../../../../shared/class/tools';
import { CONST_ECHO_ML_ITEMS_CHANNEL_PRIVATE } from '../../../../../../shared/objects/constants';
import { MercadoLibre } from '../../interfaces-and-types/mercado-libre';
// import { MercadoLibre } from '../../interfaces-and-types/mercado-libre';

@Component({
  selector: 'app-mercado-libre',
  templateUrl: './index-mercado-libre.component.html',
  styleUrls: ['./index-mercado-libre.component.css'],
  animations: animation_conditional
})
export class IndexMercadoLibreComponent extends MatTableHelper implements OnInit, OnDestroy {
  protected columnsToDisplay = ['id', 'image', 'name', 'price', 'status', 'stock', 'type', 'start_time', 'stop_time', 'expiration_time', 'actions'];
  protected url = 'catalogs/ml-products';
  @ViewChild(MatTable) protected table: MatTable<any>;
  // protected mhs: MethodsHttpService;
  // @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  // price_min: number | null = null;
  // price_max: number | null = null;
  // aux_page_next = 0;
  // hasData: boolean = true;
  // isLoading: boolean = false; 

  // filters = {
  //   min: null,
  //   max: null,
  //   state: null
  // }
  echo: Echo;

  formFilters = new FormGroup({
    min: new FormControl(null),
    max: new FormControl(null),
    state: new FormControl(null)
  })
  isLoadingMenu: boolean;
  mlMenu: any;
  constructor(
    protected mhs: MethodsHttpService,
    // private s_mercado_libre: MercadoLibreService,
  ) {
    super();
  }

  // mercadoLibreItems: MercadoLibre[] = [];

  ngOnInit(): void {
    this.echo = new EchoManager().get();
    this.echo.private(this.getChannelMl()).listen('.item', this.listener.bind(this));
  }

  ngOnDestroy(): void {
    this.echo.leave(this.getChannelMl());
  }

  getChannelMl(): string {
    return CONST_ECHO_ML_ITEMS_CHANNEL_PRIVATE;
  }

  openMlMenu(id: number): void {
    if (this.mlMenu) { return; }
    this.isLoadingMenu = true;
    this.mhs.methodGet('catalogs/ml-products/' + id + '/menu').subscribe(
      {
        next: res => {
          if (res?.success) {
            this.mlMenu = res.data;
            this.isLoadingMenu = false;
          }
        }, error: err => {
          console.error(err);
          this.isLoadingMenu = false;
        }
      }
    );
  }

  listener(e: { event: string, item: MercadoLibre }): void {
    if (e.event == 'updated') {
      this.updateItemInTable(e.item.id, e.item);
      // const indexPublication = this.dataSource.findIndex((item) => item.id === e.item.id);
      // if (indexPublication !== -1) {
      //   this.dataSource[indexPublication] = e.item;
      // }
    } else if (e.event === 'deleted') {
      // const indexPublication = this.dataSource.findIndex((item) => item.id === e.item.id);
      // if (indexPublication !== -1) {
      //   this.mercadoLibreItems.splice(indexPublication, 1);
      // }
      this.deleteItemInTable(e.item.id);
    }
  }

  executeMenu(id, type): void {
    this.mhs.methodPut(`catalogs/ml-products/${id}/status`, type).subscribe((res) => {
      if (res?.success) {
        const indice = this.dataSource.findIndex((x) => x.id == id);
        this.dataSource[indice] = res['ml'];
      }
    });
  }

  zoom(event): void {
    const target = event.target;
    zoomImage(target);
  }



  // loadData($event): void {
  //   // this.paginator = $event.data;
  //   // this.mlInfos = this.paginator.data;
  //   this.mercadoLibreItems = $event
  //     ;
  // }

  // changePaginator(event): void {
  //   this.headerComponent.searchBar(event);
  // }

  // applyFilter() {
  //   this.headerComponent.searchBar();
  // }
}
