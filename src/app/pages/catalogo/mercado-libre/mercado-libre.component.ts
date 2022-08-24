import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { ImlInfo } from '../../../interfaces/iml-info';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { StorageService } from '../../../services/storage.service';
import Echo from 'laravel-echo';
import { EchoManager } from '../../../class/echo-manager';
import { animation_conditional } from '../../../animations/animate_leave_enter';

@Component({
  selector: 'app-mercado-libre',
  templateUrl: './mercado-libre.component.html',
  styleUrls: ['./mercado-libre.component.css'],
  animations: animation_conditional

})
export class MercadoLibreComponent implements OnInit, OnDestroy {
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  price_min: number | null = null;
  price_max: number | null = null;
  aux_page_next = 0;
  hasData: boolean = true;
  isLoading: boolean = false;

  filters = {
    min: null,
    max: null,
    state: null
  }
  echo: Echo;
  constructor(
    private s_mercado_libre: MercadoLibreService,
    private s_storage: StorageService,
  ) {}

  // paginator: Ipagination<ImlInfo>
  mlInfos: ImlInfo[] = [];

  ngOnInit(): void {
    this.echo = new EchoManager(this.s_storage).echo;
    this.echo.private('catalogs.ml.items').listen('.item', this.listener.bind(this));

  }

  ngOnDestroy(): void {
    this.echo.leave('catalogs.ml.items');
  }

  listener(e: {event: string, item: ImlInfo}): void {

    if (e.event == 'updated') {
      const indexPublication = this.mlInfos.findIndex((item) => item.id === e.item.id);
      if (indexPublication !== -1) {
        this.mlInfos[indexPublication] = e.item;
      }
    } else if (e.event === 'deleted') {
      const indexPublication = this.mlInfos.findIndex((item) => item.id === e.item.id);
      if (indexPublication !== -1) {
        this.mlInfos.splice(indexPublication, 1);
      }
    }/*  else if (e.event === 'created') {
      if(this.headerComponent?.filter_data.page == 1){
      this.mlInfos.unshift(e.item);
    } */
  }

  executeMenu(event): void {
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      if (res.success) {
        const indice = this.mlInfos.findIndex((x) => x.id == event.id);
        this.mlInfos[indice] = res.ml;
      }
    });
  }



  loadData($event): void {
    // this.paginator = $event.data;
    // this.mlInfos = this.paginator.data;
    this.mlInfos = $event
    ;
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  applyFilter() {
    this.headerComponent.searchBar();
  }
}
