import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { PermissionOrdersShippings } from '../../../../../class/permissions-modules';
import { IClientOrder } from '../../../../../interfaces/iclient-order';
import { IShippingAddress, IShippingOrder } from '../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';
import { ShippingOrderSectionComponent } from '../../../components/shipping-order-section/shipping-order-section.component';
import { HistoryStatusesComponent } from '../history-statuses/history-statuses.component';
import { SelectedViewServientregaPdfComponent } from '../selected-view-servientrega-pdf/selected-view-servientrega-pdf.component';
import { GenerateGuideServientregaComponent } from '../tools/generate-guide-servientrega/generate-guide-servientrega.component';
import { ModalAddProductsShippingComponent } from './modal-add-products-shipping/modal-add-products-shipping.component';

@Component({
  selector: 'app-shippings',
  templateUrl: './shippings.component.html',
  styleUrls: ['./shippings.component.scss']
})
export class ShippingsComponent implements OnInit {

  constructor(private btnSheet: MatBottomSheet, private dialog: MatDialog, private standard: StandartSearchService, protected _sanitizer: DomSanitizer) { }
  @Input() shippings: IShippingOrder[] = [];
  @Input() isCancelled: boolean;
  @Input() order_id: number;
  @Input() shipping_address: IShippingAddress;
  @Input() client: IClientOrder;
  @Output() change = new EventEmitter<string>();
  isOpenCv = false;
  encoded_pdf: any;

  permissionsShipping = PermissionOrdersShippings;


  ngOnInit() {
  }

  openDialogShipping(id: number = null): void {
    this.dialog.open(ShippingOrderSectionComponent, {
      data: { shipping_id: id, order_id: this.order_id },
      disableClose: true,
    }).beforeClosed().subscribe(res => {
      console.log({ res });
      if (res?.success) {
        this.change.emit('create or update');
      }
    });
  }

  deleteShipping(id: number): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el envío?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${this.order_id}/shippings/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Envío eliminado', icon: 'success' });
            if (res?.success) {
              this.change.emit('delete');
            }
          }
        });
      }
    });
  }

  changeStatusShipping(select: MatSelectChange, id: number): void {
    SwalService.swalFire(
      { title: 'Cambiar Estado',
       text: '¿Está seguro de cambiar el estado del Envío?',
        icon: 'warning',
      cancelButtonText: 'No, Cancelar',
      confirmButtonText: 'Si, cambiar estado',
      showCancelButton: true,
      showConfirmButton: true,
      })
      .then(res => {
        if (res.isConfirmed) {
          this.standard.methodPut(`system-orders/orders/${this.order_id}/shippings/${id}/status`, { status: select.value }).subscribe(res => {
            if (res?.success) {
              this.change.emit('update status');
            }
          }, err => {
            select.source.value = this.shippings.find(x => x.id == id).status;
          });
        } else {
          console.log(select);
          select.source.value = this.shippings.find(x => x.id == id).status;
        }
      }).catch(err => {
        select.source.value = this.shippings.find(x => x.id == id).status;
      });
  }

  openGenerateGuide(id: number): void {
    const indexShipping = this.shippings.findIndex(x => x.id === id);
    if (indexShipping !== -1) {
      this.dialog.open(GenerateGuideServientregaComponent, {
        data: { client: this.client, shipping_address: this.shipping_address, shipping: this.shippings[indexShipping], order_id: this.order_id },
      }).beforeClosed().subscribe(res => {
        console.log({ res });
        if (res?.success) {
          // this.shippings[indexShipping] = res.data;
          this.change.emit('generate guide');
        }
      });
    } else {
      SwalService.swalFire({ title: 'Error', text: 'No se encontró el Envío', icon: 'error' });
    }
  }

  deleteGuie(id: number): void {
    const indexShipping = this.shippings.findIndex(x => x.id === id);
    if (indexShipping !== -1) {
      SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar la guía?', 'warning').then(res => {
        if (res.isConfirmed) {
          this.standard.methodDelete(`system-orders/orders/${this.order_id}/shippings/${this.shippings[indexShipping].id}/servientrega`).subscribe(res => {
            if (res?.success) {
              SwalService.swalFire({ title: 'Eliminado', text: 'Guía eliminada', icon: 'success' });
              // this.shippings[indexShipping] = res.data;
              this.change.emit('delete guide');
            }
          });
        }
      });
    } else {
      SwalService.swalFire({ title: 'Error', text: 'No se encontró el Envío', icon: 'error' });
    }
  }

  openDialogHistoryStatus(id: number): void {
    this.standard.methodGet(`system-orders/orders/${this.order_id}/shippings/${id}/statuses`)
      .subscribe(res => {
        if (res?.success) {
          this.dialog.open(HistoryStatusesComponent, {
            width: '500px',
            data: { title: 'Historial de Envíos del #' + id.toString(), list: res.data },
            disableClose: true,
          });
        }
      });
  }

  openViewPdf(id: number): void {
    this.btnSheet.open(SelectedViewServientregaPdfComponent).afterDismissed()
      .subscribe(res => {
        if (res) {
          let url = null;
          switch (res) {
            case 'docs':
              url = `system-orders/orders/${this.order_id}/shippings/${id}/servientrega/tracking-pdf`;
              break;
            case 'labels':
              url = `system-orders/orders/${this.order_id}/shippings/${id}/servientrega/label-pdf`;
              break;
            case 'stickers':
              url = `system-orders/orders/${this.order_id}/shippings/${id}/servientrega/sticker-pdf`;
              break;
            default:
              url = `system-orders/orders/shippings/servientrega/manifest-pdf?date=${res}`;
              break;
          }
          this.standard.methodGet(url)
            .subscribe(res => {
              if (res?.success) {
                this.isOpenCv = true;
                const byteArray = new Uint8Array(atob(res.data.encoded_pdf).split('').map(char => char.charCodeAt(0)));
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                this.encoded_pdf = this._sanitizer.bypassSecurityTrustResourceUrl(url);
              }
            });
        }
      });
  }

  openDialogProductsShipping(id: number, status): void {
    console.log({ id, status });
    this.dialog.open(ModalAddProductsShippingComponent, {
      data: { shipping_id: id, order_id: this.order_id, isModify: !this.isCancelled && status === 'pending' },
      disableClose: true,
      maxHeight: '80vh',
    }).beforeClosed().subscribe(res => {
      console.log({ res });
      if (res?.success) {
        this.change.emit('create or update');
      }
    });
  }

  returnShipping(id: number): void {
    this.dialog.open(GenerateGuideServientregaComponent,{
      data: { client: this.client, shipping_address: this.shipping_address, shipping: this.shippings.find(x => x.id == id), order_id: this.order_id, isReturn: true },
    });
  }
}
