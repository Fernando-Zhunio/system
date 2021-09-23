import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Ipublication } from "../../interfaces/ipublication";
import { MercadoLibreService } from "../../services/mercado-libre.service";
import { StandartSearchService } from "../../services/standart-search.service";
import { InfoViewComponent } from "../modals/info-view/info-view.component";
import { SwiperOptions } from 'swiper';
import { IpermissionStandart } from "../../interfaces/ipermission-standart";
import { Subscription } from "rxjs";
import { RepublicarCuentasModalComponent } from "../modals/republicar-cuentas-modal/republicar-cuentas-modal.component";
import { STATES_PUBLICATION } from "../../Objects/ObjectMatchs";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit {
  constructor(private s_standart:StandartSearchService, private s_mercado_libre:MercadoLibreService, private dialog: MatDialog,private snack_bar:MatSnackBar) {}

  isLoader: boolean = false;
  suscription_ml:Subscription;
  matchs_state = STATES_PUBLICATION;
  // permission_show = ["super-admin", "catalogs.publications.show"];
  // permission_create = ["super-admin", "catalogs.publications.create"];
  // permission_edit = ["super-admin", "catalogs.publications.edit"];
  // permission_destroy = ["super-admin", "catalogs.publications.destroy"];
  @Input() permission_page:IpermissionStandart;
  @Input() publication:Ipublication;
  @Output() delete:EventEmitter<any> = new EventEmitter();
  public config: SwiperOptions = {
    // a11y: { enabled: true },
    direction: 'horizontal',
    // slidesPerView: 4,
    breakpoints : {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 5
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 5
      },
      // when window width is >= 640px
      600: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      800: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 10
      }

    },
    // keyboard: true,
    // mousewheel: true,
    scrollbar: true,
    // navigation: true,
    pagination: false
  };

  ngOnInit(): void {}

  openDescription(): void {
    this.dialog.open(InfoViewComponent, {
      data: {
        name: this.publication.name,
        title: "Descripcion",
        info: this.publication.description,
      },
    });
  }



  deletePublication(idPublication):void{
    const snack = this.snack_bar.open('Eliminando espere ...');
    this.isLoader = true;
    // this.s_catalogo.destroyPublications(idPublication).subscribe(
      this.s_standart.destory('catalogs/publications/' + idPublication).subscribe(
      res => {
        snack.dismiss();
        this.isLoader = false;
        if(res.success){
          this.delete.emit(res.data);
          this.snack_bar.open('Eliminado con exito', 'OK', {duration:2000})
        } else {
          this.snack_bar.open('Error al eliminar', 'Error', {duration:2000})
        }
      }, err => {
        console.log(err);
        this.snack_bar.open('Error al eliminar', 'Error', {duration:2000})
        this.isLoader = false;
        snack.dismiss();
      }
    )
  }

  executeMenu(type,id ): void {
    if (this.suscription_ml) { this.suscription_ml.unsubscribe(); }
    if (type === 'relist') {
      this.dialog.open(RepublicarCuentasModalComponent, {data: {id: this.publication.id},disableClose: true})
    } else {
      this.suscription_ml = this.s_mercado_libre.updateStatus(id, type).subscribe((res) => {
        if (res.success) {
          this.publication = res.ml;
        }
      });
    }
  }
}
