import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { IChannelOrder, IItemOrder, IOrder, IPaymentOrder } from '../../../interfaces/iorder';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';
import { SelectClientAddressModalComponent } from '../modules/shared-order/select-client-address-modal/select-client-address-modal.component';
import { SelectClientModalComponent } from '../components/select-client-modal/select-client-modal.component';
import { TranslatefzPipe } from './../../../pipes/translatefz.pipe';
import { CreateOrEditAddressClientComponent } from '../modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';
import { NgxSpinnerService } from 'ngx-spinner';
// import { DetailsOrderComponent } from '../modules/shared-order/details-order/details-order.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private standard: StandartSearchService, private activated_router: ActivatedRoute, private dialog: MatDialog, private router: Router) { }
  readonly id = this.activated_router.snapshot.params['order_id'];
  order: IOrder = null;
  // @ViewChild(MatAccordion) accordion: MatAccordion;
  items: Map<number, IItemOrder> = new Map<number, IItemOrder>();
  types: any[] = [];
  channels: IChannelOrder[] = [];
  paymentsMap: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  discountsAndTaxes: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  hideTotals = true;
  data: any = null;
  statuses: any[] = [];
  pipeTrans = new TranslatefzPipe();
  isPublishing = false;

  ngOnInit() {
    this.spinner.show();
    this.getStatuses();
    this.standard.methodGet(`system-orders/orders/${this.id}/edit`).subscribe(data => {
      console.log(data);
      if (data?.success) {
        this.order = data.data.order;
        this.channels = data.data.channels;
        this.types = data.data.types;
        this.fillData();
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      SwalService.swalFire({ icon: 'error', title: 'Error', text: 'Error al cargar la orden, por favor intente de nuevo recargando la pagina', confirmButtonText: 'Recargar la pagina'}).then(res => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    });
  }

  getStatuses(): void {
    this.standard.methodGet(`system-orders/orders/${this.id}/statuses`).subscribe(res => {
      if (res.success) {
        if (res.data?.length > 0) {
          this.statuses = res.data;
        }
      }
    });
  }

  fillData(): void {
    if (this.order?.items && this.order.items.length > 0) {
      this.items = new Map<number, IItemOrder>(this.order.items.map(item => [item.id, item]));
    } else if (this.order.items.length < 1) {
      this.items.clear();
    }
    // this.items = new Map<number, IItemOrder>(data.data.order.items.map(item => [item.id, item]));
    if (this.order.payments && this.order.payments.length > 0) {
      this.paymentsMap = new Map<number, IPaymentOrder>(this.order.payments.map(item => [item.id, item]));
    } else if (this.order.payments.length < 1) {
      this.paymentsMap.clear();
    }
    if (this.order.additional_amounts && this.order.additional_amounts.length > 0) {
      this.discountsAndTaxes = new Map<number, any>(this.order.additional_amounts.map(item => [item.id, item]));
    } else if (this.order.additional_amounts.length < 1) {
      this.discountsAndTaxes.clear();
    }
  }

  openSelectClient(): void {
    this.dialog.open(SelectClientModalComponent, {
      data: this.order.id,
      disableClose: true,
    }).beforeClosed().subscribe(data => {
      if (data) {
        this.dialog.open(SelectClientAddressModalComponent, {
          data: {
            client: data,
            order_id: this.order.id
          },
          disableClose: true,
        }).beforeClosed().subscribe(data1 => {
          console.log(data1);
          if (data1?.success) {
            this.order = data1.data;
          }
        });
      }
    });
  }
  openDialogAddress(): void {
    this.dialog.open(SelectClientAddressModalComponent, {
      data: {
        client: this.order.client,
        order_id: this.order.id
      },
      disableClose: true,
    }).beforeClosed().subscribe(data1 => {
      console.log(data1);
      if (data1?.success) {
        this.order = data1.data;
      }
    });
  }

  loadOrder(): void {
    this.standard.methodGet(`system-orders/orders/${this.id}/edit`).subscribe(data => {
      console.log(data);
      if (data?.success) {
        this.order = data.data.order;
        this.channels = data.data.channels;
        this.types = data.data.types;
      }
    });
  }

  getOrder($event = null): void {
    // console.log($event);
    this.standard.methodGet(`system-orders/orders/${this.order.id}`).subscribe(res => {
      if (res.success) {
        this.order = res.data;
        this.fillData();
      }
    });
  }

  changeStatusPublish(): void {
    const text = (this.order.status == 'init') ? '¿Está seguro de cambiar el estado de la orden?' : 'Esta seguro de enviar las notificaciones de la orden?';
    SwalService.swalFire({title: 'Atención', text , icon: 'warning', showCancelButton: true, confirmButtonText: 'Si, Enviar', cancelButtonText: 'No, Cancelar'}).then(res => {
      if (res.isConfirmed) {
        this.isPublishing = true;
        const url = `system-orders/orders/${this.order.id}/publish`;
        this.standard.methodPost(url).subscribe(res => {
          if (res?.success) {
            this.getOrder();
            if (this.order.status == 'init') {
              this.getStatuses();
            }
            this.isPublishing = false;
            SwalService.swalFire({icon: 'success', title: 'Éxito', text: 'Se ha enviado la notificación de la orden', confirmButtonText: 'Aceptar'});
          }
        }, err => {
          console.log(err);
          this.isPublishing = false;
        }
        );
      }
    });
  }

  addClientAddress(id = null): void {
    this.dialog.open(CreateOrEditAddressClientComponent, {
      data: { client_id: this.order.client_id, address_id: id, url: 'system-orders/orders/' + this.order.id + '/shipping-address' },
    }).beforeClosed()
      .subscribe(data => {
        if (data?.success) {
          this.getOrder();
        }
      });
  }

  deleteOrder(): void {
      SwalService.swalFire({icon: 'warning', title: '¿Estas seguro?', text: 'Esta acción no se puede deshacer', showCancelButton: true, confirmButtonText: 'Si, eliminar orden', cancelButtonText: 'No, cancelar'}).then(res => {
        if (res.isConfirmed) {
          this.standard.methodPost(`system-orders/orders/${this.order.id}/cancel`).subscribe((res1: any) => {
            if (res1.success) {
              this.router.navigate(['/system-orders/orders']);
            }
          });
        }
      });
  }
}
