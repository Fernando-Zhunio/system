import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
// import { ActivatedRoute, Router } from '@angular/router';
import Echo from 'laravel-echo';
// import { Subscription } from 'rxjs';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
import { EchoManager } from '../../../../../../class/echo-manager';
import { STATES_PUBLICATION } from '../../../../../../Objects/ObjectMatchs';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { CONST_ECHO_PUBLICATIONS_CHANNEL_PRIVATE } from '../../../../../../shared/objects/constants';
import { InfoViewComponent } from '../../../../components/info-view/info-view.component';
import { PERMISSIONS_PUBLICATIONS } from '../../permissions/publications.permissions';
// import { animation_conditional } from '../../../../animations/animate_leave_enter';
// import { EchoManager } from '../../../../class/echo-manager';
// import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
// import { InfoViewComponent } from '../../components/info-view/info-view.component';
// import { Ipagination } from '../../../../interfaces/ipagination';
// import { IpermissionStandart } from '../../../../interfaces/ipermission-standart';
// import { Publication } from '../../../../interfaces/ipublication';
// import { CatalogoService } from '../../../../services/catalogo.service';
// import { MercadoLibreService } from '../../../../services/mercado-libre.service';
// import { SwalService } from '../../../../services/swal.service';
// import { CONST_ECHO_PUBLICATIONS_CHANNEL_PRIVATE } from '../../../../shared/objects/constants';

@Component({
  selector: 'app-index-publications',
  templateUrl: './index-publications.component.html',
  styleUrls: ['./index-publications.component.css'],
  animations: animation_conditional,
})
export class IndexPublicationsComponent extends MatTableHelper implements OnInit, OnDestroy {
  protected columnsToDisplay: string[];
  protected url = 'catalogs/publications';
  formFilters = new FormGroup({
    state: new FormControl(''),
  })
  statuses  = STATES_PUBLICATION;
  @ViewChild(MatTable) protected table: MatTable<any>;
  // @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  // isLoader: boolean = false;
  // selected_state: string = 'all';
  // price_min: number | null = null;
  // price_max: number | null = null;
  // hasData: boolean = true;
  // pageCurrent: number = 1;
  productSearch: string | null = null;
  // products: any[] = [];
  // menu = [];
  // isLoading: boolean = true;
  // aux_page_next: number;
  // subscription_api: Subscription;
  permissions = PERMISSIONS_PUBLICATIONS
  // permission_page: IpermissionStandart;
  constructor(
    // private actived_router: ActivatedRoute,
    // private snack_bar: MatSnackBar,
    public dialog: MatDialog,
    // private s_catalogo: CatalogoService,
    // private s_mercado_libre: MercadoLibreService,
    // private router: Router,

    protected mhs: MethodsHttpService,
  ) {
    super();
  }
    //#region FILTER DATA
    // min: string;
    // max: string;
    // state_binding: string;
    //#endregion

    // paginator: Ipagination<Publication>;
    states: {name: string, slug: string}[] = [{name: 'Publicado', slug: 'published'}, {name: 'Despublicado', slug: 'unpublished'}, {name: 'Incompleto', slug: 'incomplete'}, {name: 'En cola', slug: 'queue'}, {name: 'Procesando', slug: 'processing'}, {name: 'Actualizando', slug: 'updating'}, {name: 'Parciales procesados', slug: 'partially_processed'}, {name: 'Eliminados', slug: 'deleting_unselected_item'}, {name: 'Con errores', slug: 'error'}, ]

    //#region  filter
    // filter_state: string | null = null;
    echo: Echo;

    //#endregion
  ngOnInit(): void {
    this.echo = new EchoManager().get();
    this.echo.private(this.getChannelPublications()).listen('.publication', this.listener.bind(this));
  }

  listener(e): void {
    if (e.event === 'updated') {
      const indexPublication = this.dataSource.findIndex((item) => item.id === e.publication.id);
      if (indexPublication !== -1) {
        this.dataSource[indexPublication] = e.publication;
      }
    } else if (e.event === 'deleted') {
      const indexPublication = this.dataSource.findIndex((item) => item.id === e.publication.id);
      if (indexPublication !== -1) {
        this.dataSource.splice(indexPublication, 1);
      }
    } else {
      this.dataSource.unshift(e.publication);
    }
  }

  ngOnDestroy(): void {
    this.echo.leave(this.getChannelPublications());
  }

  getChannelPublications(): string {
    return CONST_ECHO_PUBLICATIONS_CHANNEL_PRIVATE;
  }

  // goNewPublication(): void {
  //   this.router.navigate(['/catalogo/publicaciones/create']);
  // }

  // deletePublication(idPublication, index): void {
  //   const snack = this.snack_bar.open('Eliminando espere ...');
  //   this.isLoader = true;
  //   this.s_catalogo.destroyPublications(idPublication).subscribe(
  //     (res) => {
  //       snack.dismiss();
  //       this.isLoader = false;
  //       if (res.success) {
  //         this.snack_bar.open('Eliminado con éxito', 'OK', { duration: 2000 });
  //         this.products.splice(index, 1);
  //         SwalService.swalToast('Eliminado con éxito', 'success');
  //       }
  //     },
  //     () => {
  //       this.isLoader = false;
  //       snack.dismiss();
  //     }
  //   );
  // }

  publicationFor(_index, item): void {
    return item.id;
  }

  // openDescription(id: number): void {

  // }

  openDescription(id): void {
    const publication = this.dataSource.find((item) => item.id === id);
    this.dialog.open(InfoViewComponent, {
      data: {
        name: publication.name,
        title: 'Descripción',
        info: publication.description,
      },
    });
  }

  executeMenu(id, type): void {
    this.mhs.methodPut(`catalogs/ml-products/${id}/status`, type).subscribe((res) => {
      if (res.success) {
        const indice = this.dataSource.findIndex((x) => x.id == id);
        this.dataSource[indice] = res['ml'];
      }
    });
  }

  // loadData($event): void {
  //   this.products = $event;
  // }

  // destroyPublication(event): void {
  //   const index = this.products.findIndex((x) => x.id == event.id);
  //   if (index != -1) {
  //     this.products.splice(index, 1);
  //   }
  // }

}
