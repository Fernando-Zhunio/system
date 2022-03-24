import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { IShippingOrder } from '../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';
import { ShippingOrderSectionComponent } from '../../../components/shipping-order-section/shipping-order-section.component';
import { HistoryStatusesComponent } from '../history-statuses/history-statuses.component';
import { GenerateGuideServientregaComponent } from '../tools/generate-guide-servientrega/generate-guide-servientrega.component';

@Component({
  selector: 'app-shippings',
  templateUrl: './shippings.component.html',
  styleUrls: ['./shippings.component.scss']
})
export class ShippingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private standard: StandartSearchService) { }
  @Input() shippings: IShippingOrder[] = [];
  @Input() order_id: number;
  @Output() change = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  ngOnInit() {
  }

  openDialogShipping(id: number = null): void {
    this.dialog.open(ShippingOrderSectionComponent, {
      width: '500px',
      data: { shipping_id: id, order_id: this.order_id },
      disableClose: true,
    }).beforeClosed().subscribe(res => {
      console.log({ res });
      if (res?.success) {
        if (id) {
          const index = this.shippings.findIndex(x => x.id === id);
          if (index !== -1) {
            this.shippings[index] = res.data;
          }
        } else {
          this.shippings.push(res.data);
        }
      }
    });
  }

  deleteShipping(id: number): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el Envió?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${this.order_id}/shippings/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Envió eliminado', icon: 'success' });
            // this.discountsAndTaxes.delete(id);
            if (res?.success) {
              const index = this.shippings.findIndex(x => x.id === id);
              if (index !== -1) {
                this.shippings.splice(index, 1);
              }

            }
            this.delete.emit(res);
          }
        });
      }
    });
  }

  changeStatusShipping(select: MatSelectChange, id: number): void {
    console.log({ select, id });
    this.standard.methodPut(`system-orders/orders/${this.order_id}/shippings/${id}/status`, { status: select.value }).subscribe(res => {
      if (res?.success) {
        const index = this.shippings.findIndex(x => x.id === id);
        if (index !== -1) {
          this.shippings[index].status = select.value;
        }
      }
    });
  }

  openGenerateGuide(id: number): void {
    const indexShipping = this.shippings.findIndex(x => x.id === id);
    if (indexShipping !== -1) {
      this.dialog.open(GenerateGuideServientregaComponent, {
        data: { shipping: this.shippings[indexShipping], order_id: this.order_id },
      }).beforeClosed().subscribe(res => {
        console.log({ res });
        if (res?.success) {
          this.shippings[indexShipping] = res.data;
        }
      });
    } else {
      SwalService.swalFire({ title: 'Error', text: 'No se encontró el Envió', icon: 'error' });
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
              this.shippings[indexShipping] = res.data;
            }
          });
        }
      });
    } else {
      SwalService.swalFire({ title: 'Error', text: 'No se encontró el Envió', icon: 'error' });
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

}
