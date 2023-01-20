import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publication } from '../../../../interfaces/ipublication';
import { MercadoLibreService } from '../../../../services/mercado-libre.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { InfoViewComponent } from '../info-view/info-view.component';
import { SwiperOptions } from 'swiper';
import { IpermissionStandart } from '../../../../interfaces/ipermission-standart';
import { Subscription } from 'rxjs';
import { RepublicarCuentasModalComponent } from '../../../../components/modals/republicar-cuentas-modal/republicar-cuentas-modal.component';
import { STATES_PUBLICATION } from '../../../../Objects/ObjectMatchs';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
})
export class PublicationComponent {
  constructor(private s_standart: StandartSearchService, private s_mercado_libre: MercadoLibreService, private dialog: MatDialog, private snack_bar: MatSnackBar) {}

  isLoader: boolean = false;
  suscription_ml: Subscription;
  matchs_state = STATES_PUBLICATION;
  @Input() permission_page: IpermissionStandart;
  @Input() publication: Publication;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  public config: SwiperOptions = {
    direction: 'horizontal',
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      601: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      950: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1350: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1500: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1750: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1900: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
    scrollbar: false,
    pagination: false,
  };

  openDescription(): void {
    this.dialog.open(InfoViewComponent, {
      data: {
        name: this.publication.name,
        title: 'Descripción',
        info: this.publication.description,
      },
    });
  }



  deletePublication(idPublication): void {
    SwalService.swalConfirmation('Eliminar publicación', 'Esta seguro de eliminar esta publicación?', 'warning').then((result) => {
      if (result.isConfirmed) {
        const snack = this.snack_bar.open('Eliminando espere ...');
        this.isLoader = true;
          this.s_standart.methodDelete('catalogs/publications/' + idPublication).subscribe(
          res => {
            snack.dismiss();
            this.isLoader = false;
            if (res.success) {
              this.delete.emit(res.data);
              this.snack_bar.open('Eliminado con éxito', 'OK', {duration: 2000});
            } else {
              this.snack_bar.open('Error al eliminar', 'Error', {duration: 2000});
            }
          }, err => {
            console.error(err);
            this.snack_bar.open('Error al eliminar', 'Error', {duration: 2000});
            this.isLoader = false;
            snack.dismiss();
          }
        );
      }
    });
  }

  executeMenu(type, id ): void {
    if (this.suscription_ml) { this.suscription_ml.unsubscribe(); }
    if (type === 'relist') {
      this.dialog.open(RepublicarCuentasModalComponent, {data: {id: this.publication.id}, disableClose: true});
    } else {
      this.suscription_ml = this.s_mercado_libre.publcationMlStatusUpdate(id, type).subscribe((res) => {
        if (res.success) {
          this.publication = res.data;
        }
      });
    }
  }

  deleteError(id: number): void {
    const indexError = this.publication.errors.findIndex((error) => error.id === id);
    if (indexError != -1) this.publication.errors.splice(indexError, 1);
  }
}
