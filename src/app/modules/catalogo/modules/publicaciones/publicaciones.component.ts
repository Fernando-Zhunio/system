import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Echo from 'laravel-echo';
import { Subscription } from 'rxjs';
import { animation_conditional } from '../../../../animations/animate_leave_enter';
import { EchoManager } from '../../../../class/echo-manager';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { InfoViewComponent } from '../../components/info-view/info-view.component';
import { Ipagination } from '../../../../interfaces/ipagination';
import { IpermissionStandart } from '../../../../interfaces/ipermission-standart';
import { Publication } from '../../../../interfaces/ipublication';
import { CatalogoService } from '../../../../services/catalogo.service';
import { MercadoLibreService } from '../../../../services/mercado-libre.service';
import { StorageService } from '../../../../services/storage.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
  animations: animation_conditional,
})
export class PublicacionesComponent implements OnInit, OnDestroy {
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  isLoader: boolean = false;
  selected_state: string = 'all';
  price_min: number | null = null;
  price_max: number | null = null;
  hasData: boolean = true;
  pageCurrent: number = 1;
  productSearch: string | null = null;
  products: any[] = [];
  menu = [];
  isLoading: boolean = true;
  aux_page_next: number;
  suscrition_api: Subscription;
  permission_page: IpermissionStandart;
  constructor(
    private actived_router: ActivatedRoute,
    private snack_bar: MatSnackBar,
    public dialog: MatDialog,
    private s_catalogo: CatalogoService,
    private s_mercado_libre: MercadoLibreService,
    private router: Router,
    private s_storage: StorageService,
  ) {}
    //#region FILTER DATA
    min: string;
    max: string;
    state_binding: string;
    //#endregion

    paginator: Ipagination<Publication>;
    states: {name: string, slug: string}[] = [{name: 'Publicado', slug: 'published'}, {name: 'Despublicado', slug: 'unpublished'}, {name: 'Incompleto', slug: 'incomplete'}, {name: 'En cola', slug: 'queue'}, {name: 'Procesando', slug: 'processing'}, {name: 'Actualizando', slug: 'updating'}, {name: 'Parciales procesados', slug: 'partially_processed'}, {name: 'Eliminados', slug: 'deleting_unselected_item'}, {name: 'Con errores', slug: 'error'}, ]

    //#region  filter
    filter_state: string | null = null;
    echo: Echo;

    //#endregion
  ngOnInit(): void {
    this.actived_router.data.subscribe((res: any) => {
      this.permission_page = res.permissions.all;
    });
    this.echo = new EchoManager(this.s_storage).echo;
    this.echo.private('catalogs.publications').listen('.publication', this.listener.bind(this));
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
    this.echo.leave('catalogs.publications');
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
      () => {
        this.isLoader = false;
        snack.dismiss();
      }
    );
  }

  publicationFor(_index, item): void {
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
    this.products = $event;
  }

  destroyPublication(event): void {
    const index = this.products.findIndex((x) => x.id == event.id);
    if (index != -1) {
      this.products.splice(index, 1);
    }
  }

}
