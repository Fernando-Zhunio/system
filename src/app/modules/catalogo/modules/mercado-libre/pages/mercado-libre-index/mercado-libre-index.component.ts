import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Echo from 'laravel-echo';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
import { EchoManager } from '../../../../../../class/echo-manager';
import { HeaderSearchComponent } from '../../../../../../components/header-search/header-search.component';
import { ImlInfo } from '../../../../../../interfaces/iml-info';
import { MercadoLibreService } from '../../../../../../services/mercado-libre.service';
import { CONST_ECHO_ML_ITEMS_CHANNEL_PRIVATE } from '../../../../../../shared/objects/constants';

@Component({
  selector: 'app-mercado-libre',
  templateUrl: './mercado-libre-index.component.html',
  styleUrls: ['./mercado-libre-index.component.css'],
  animations: animation_conditional
})
export class MercadoLibreIndexComponent implements OnInit, OnDestroy {
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
  ) { }

  mlInfos: ImlInfo[] = [];

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

  listener(e: { event: string, item: ImlInfo }): void {

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
