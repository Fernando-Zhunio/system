import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { StandartSearchService } from '../../../services/standart-search.service';
import { ImlInfo } from '../../../interfaces/iml-info';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Ipagination } from '../../../interfaces/ipagination';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-mercado-libre',
  templateUrl: './mercado-libre.component.html',
  styleUrls: ['./mercado-libre.component.css'],
})
export class MercadoLibreComponent implements OnInit, OnDestroy {
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  price_min: number = null;
  price_max: number = null;
  aux_page_next = 0;
  hasData: boolean = true;
  isload: boolean = false;

  min: string = '';
  max: string = '';
  state: string = 'all';
  constructor(
    private s_mercado_libre: MercadoLibreService,
    private s_shared: SharedService
    // private s_standart: StandartSearchService
  ) {}

  paginator: Ipagination<ImlInfo>;


  mlInfos: ImlInfo[] = [];

  ngOnInit(): void {
    this.s_shared.echo.private('catalogs.ml.items').listen('.item', this.listener.bind(this));
  }

  ngOnDestroy(): void {
    this.s_shared.echo.leave('catalogs.ml.items');
  }

  listener(e: {event: string, item: ImlInfo}): void {
    if (e.event === 'updated') {
      const indexPublication = this.mlInfos.findIndex((item) => item.id === e.item.id);
      if (indexPublication !== -1) {
        this.mlInfos[indexPublication] = e.item;
      }
    } else if (e.event === 'deleted') {
      const indexPublication = this.mlInfos.findIndex((item) => item.id === e.item.id);
      if (indexPublication !== -1) {
        this.mlInfos.splice(indexPublication, 1);
      }
    } else {
      this.mlInfos.unshift(e.item);
    }
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
    this.paginator = $event.data;
    this.mlInfos = this.paginator.data;
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  applyFilter() {
    this.headerComponent.searchBar();
  }
}
