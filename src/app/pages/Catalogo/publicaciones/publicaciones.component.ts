import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { InfoViewComponent } from '../../../components/modals/info-view/info-view.component';
import { Ipagination } from '../../../interfaces/ipagination';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { Ipublication } from '../../../interfaces/ipublication';
import { CatalogoService } from '../../../services/catalogo.service';
import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { SharedService } from '../../../services/shared/shared.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';
// import SwiperCore from 'swiper/core';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
  animations: [
    trigger('fade', [
      transition(':leave', [
        style({ transform: 'scale(0)', opacity: '0' }),
        animate(400),
      ]),
    ]),
  ],
})
export class PublicacionesComponent implements OnInit, OnDestroy {
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  isLoader: boolean = false;
  selected_state: string = 'all';
  price_min: number = null;
  price_max: number = null;
  hasData: boolean = true;
  pageCurrent: number = 1;
  productSearch: string = null;
  products = [];
  menu = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25];
  pageEvent: PageEvent;
  isload: boolean = true;
  aux_page_next: number;
  suscrition_api: Subscription;
  permission_page: IpermissionStandart;
  constructor(
    private actived_router: ActivatedRoute,
    private snack_bar: MatSnackBar,
    // private s_standart: StandartSearchService,
    private s_shared: SharedService,
    public dialog: MatDialog,
    private s_catalogo: CatalogoService,
    private s_mercado_libre: MercadoLibreService,
    private router: Router
  ) {}
    //#region FILTER DATA
    min: string;
    max: string;
    state_binding: string;
    //#endregion

    paginator: Ipagination<Ipublication>;
    states: {name: string, slug: string}[] = [{name: 'Publicado', slug: 'published'}, {name: 'Despublicado', slug: 'unpublished'}, {name: 'Incompleto', slug: 'incomplete'}, {name: 'En cola', slug: 'queue'}, {name: 'Procesando', slug: 'processing'}, {name: 'Actualizando', slug: 'updating'}, {name: 'Parciales procesados', slug: 'partially_processed'}, {name: 'Eliminados', slug: 'deleting_unselected_item'}, {name: 'Con errores', slug: 'error'}, ]

    //#region  filter
    filter_state: string = '0';

    //#endregion
  ngOnInit(): void {
    this.actived_router.data.subscribe((res) => {
      this.permission_page = res.permissions.all;
    });
     this.s_shared.echo.private('catalogs.publications').listen('.publication', this.listener.bind(this));
  }

  listener(e): void {
    if (e.event === 'updated') {
      const indexPublication = this.products.findIndex((item) => item.id === e.publication.id);
      if (indexPublication !== -1) {
        this.products[indexPublication] = e.publication;
      }
    } else if (e.event === 'deleted') {
      const indexPublication = this.products.findIndex((item) => item.id === e.publication.id);
      if (indexPublication !== -1) {
        this.products.splice(indexPublication, 1);
      }
    } else {
      this.products.unshift(e.publication);
    }
  }

  ngOnDestroy(): void {
    this.s_shared.echo.leave('catalogs.publications');
  }

  goNewPublication(): void {
    this.router.navigate(['/catalogo/publicaciones/create']);
  }

  deletePublication(idPublication, index): void {
    const snack = this.snack_bar.open('Eliminando espere ...');
    this.isLoader = true;
    this.s_catalogo.destroyPublications(idPublication).subscribe(
      (res) => {
        snack.dismiss();
        this.isLoader = false;
        if (res.success) {
          this.snack_bar.open('Eliminado con exito', 'OK', { duration: 2000 });
          this.products.splice(index, 1);
          SwalService.swalToast('Eliminado con exito', 'success');
        }
      },
      (err) => {
        console.log(err);
        this.isLoader = false;
        snack.dismiss();
      }
    );
  }

  publicationFor(index, item): void {
    return item.id;
  }

  openDescription(index): void {
    this.dialog.open(InfoViewComponent, {
      data: {
        name: this.products[index].name,
        title: 'Descripción',
        info: this.products[index].description,
      },
    });
  }

  executeMenu(event): void {
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      if (res.success) {
        const indice = this.products.findIndex((x) => x.id == event.id);
        this.products[indice] = res.ml;
      }
    });
  }

  loadData($event): void {
    this.paginator = $event.data;
    this.products = this.paginator.data;
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  destroyPublication(event): void {
    const index = this.products.findIndex((x) => x.id == event.id);
    if (index != -1) {
      this.products.splice(index, 1);
    }
  }

  applyFilter() {
    this.headerComponent.searchBar();
  }

}
