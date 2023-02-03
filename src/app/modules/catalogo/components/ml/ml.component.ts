import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MercadoLibre, ImlMenu } from '../../../../interfaces/iml-info';
import { STATE_ML_INFO } from '../../../../Objects/ObjectMatchs';
import { MercadoLibreService } from '../../../../services/mercado-libre.service';
import { InfoViewComponent } from '../info-view/info-view.component';
import { SearchProductModalComponent } from '../../../../components/modals/search-product-modal/search-product-modal.component';
import { ModalRealistComponent } from './tools/modal-realist/modal-realist.component';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})
export class MlComponent {

  constructor(private s_mercado_libre: MercadoLibreService, public dialog: MatDialog, private snack_bar: MatSnackBar) { }

  ml_state = STATE_ML_INFO;
  @Input() ml: MercadoLibre;
  @Input() withName: boolean = false;
  ml_menu: ImlMenu | null = null;
  isLoadMenu: boolean = false;

  openDescription(): void {
     this.dialog.open(InfoViewComponent, {
      data: {name: this.ml.name, title: 'Descripcion', info: this.ml.description, isHtml: true},
    });
  }

  openMlMenu(): void {
    if (this.ml_menu) {return; }
    this.isLoadMenu = true;
    this.s_mercado_libre.getMenuML(this.ml.id).subscribe(res => {
      if ( res &&  res.success) {
        this.ml_menu = res.data;
        this.isLoadMenu = false;
      }
    }, err => {
      console.error(err);
      this.isLoadMenu = false;
    });
  }


  executeMenu(type, id): void {
    switch (type) {
      case 'assign':
          this.dialog.open(SearchProductModalComponent, {
            data: {ml: this.ml}
          }).beforeClosed().subscribe(res => {
            if (res) {
            const snack = this.snack_bar.open('Cambiando estado espere...')
              this.s_mercado_libre.assingProduct('catalogs/ml-products/' + this.ml.id + '/assign', {product_id: res.id_product}).subscribe(res => {
                snack.dismiss();
                if (res.success) {
                  this.snack_bar.open('Estado cambiado con éxito', 'Éxito', {duration: 2000});
                  this.ml = res.data;
                } else {
                  this.snack_bar.open('Ups! Ocurrió un error', 'Error', {duration: 2000});
                }
              }, err => {
                console.error(err);
                snack.dismiss();
                this.snack_bar.open('Ups! Ocurrió un error', 'Error', {duration: 2000});
              });
            }
          });
        break;
        case 'relist':
          this.dialog.open(ModalRealistComponent, {
            data:  this.ml,
            disableClose: true
          }).beforeClosed().
          subscribe(res => {
            if (res) {
              const snack = this.snack_bar.open('Cambiando estado espere...');
              // eslint-disable-next-line max-len
              this.s_mercado_libre.postRealistProduct(this.ml.id, res).subscribe( res1 => {
                snack.dismiss();
                if (res1 && res1.hasOwnProperty('success') && res1.success) {
                  this.snack_bar.open('Estado cambiado con exito', 'Exito', {duration: 2000});
                  this.ml = res1.data;
                } else {
                  this.snack_bar.open('Ups! Ocurrio un error', 'Error', {duration: 2000});
                }
              }, err => {
                console.error(err);
                snack.dismiss();
                this.snack_bar.open('Ups! Ocurrio un error', 'Error', {duration: 2000});
              });
            }
          });
          break;
      default:
        const snack = this.snack_bar.open('Cambiando estado espere...')
        this.s_mercado_libre.updateStatus(id, type).subscribe((res) => {
          snack.dismiss();
          if (res.success) {
            this.snack_bar.open('Estado cambiado con exito', 'Exito', {duration : 2000})
            this.ml = res.data.ml;
            this.ml_menu = res.data.menu;

          } else {
            this.snack_bar.open('Ups! Ocurrio un error', 'Error', {duration : 2000})

          }
        }, () => {
          snack.dismiss();
          this.snack_bar.open('Ups! Ocurrio un error', 'Error', {duration : 2000})
        });
        break;
    }
  }

  assignProducts(): void{

  }

}
