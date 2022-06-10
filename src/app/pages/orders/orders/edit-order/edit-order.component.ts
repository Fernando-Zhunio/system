import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionOrdersAdditionalAmounts, PermissionOrdersInvoicesMba, PermissionOrdersItems, PermissionOrdersPayments, PermissionOrdersPaymentsMba, PermissionOrdersShippings, PermissionOrdersTransfersMba } from '../../../../class/permissions-modules';
import { IChannelOrder, IItemOrder, IOrder, IPaymentOrder, IStatus } from '../../../../interfaces/iorder';
import { TranslatefzPipe } from '../../../../pipes/translatefz.pipe';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';
import { SelectClientModalComponent } from '../../components/select-client-modal/select-client-modal.component';
import { CreateOrEditAddressClientComponent } from '../../modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';
import { SelectClientAddressModalComponent } from '../../modules/shared-order/select-client-address-modal/select-client-address-modal.component';
import { trans } from '../../../../class/translations';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DetailButtonSheetComponent } from './detail-button-sheet/detail-button-sheet.component';

interface Record {
  icon?: string | null;
  svgIcon?: string | null;
  iconUrl?: string | null;
  date: string;
  content: string;
}
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet, private spinner: NgxSpinnerService, private standard: StandartSearchService, private activated_router: ActivatedRoute, private dialog: MatDialog, private router: Router) { }
  id: string;
  order: IOrder = null;
  items: Map<number, IItemOrder> = new Map<number, IItemOrder>();
  types: any[] = [];
  channels: IChannelOrder[] = [];
  paymentsMap: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  payments: IPaymentOrder[] = [];
  discountsAndTaxes: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  hideTotals = true;
  data: any = null;
  statuses: Record[] = [];
  pipeTrans = new TranslatefzPipe();
  isPublishing = false;

  detailClient: any[] = [];

  permissionsProducts = PermissionOrdersItems;
  permissionsShipping = PermissionOrdersShippings;
  permissionsPayments = PermissionOrdersPayments;
  permissionsTaxAndDiscounts = PermissionOrdersAdditionalAmounts;
  permissionsTransfers = PermissionOrdersTransfersMba;
  permissionsAnticipe = PermissionOrdersPaymentsMba;
  permissionsInvoices = PermissionOrdersInvoicesMba;


  ngOnInit() {
    this.id = this.activated_router.snapshot.paramMap.get('order_id');
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
        this.detailClient = [
          ['Ciudad',this.order?.client?.city],
          // ['Compañía',this.order?.client?.company],
          ['País', this.order?.client?.country],
          ['Estado', this.order?.client?.state],
          ['Creado', this.order?.client?.created_at],
          ['# Documento', this.order?.client?.doc_id],
          // ['', this.order?.client?.doc_type],
          ['Correo', this.order?.client?.email],
          ['Nombres', this.order?.client?.first_name],
          // ['', this.order?.client?.id],
          ['Apellidos', this.order?.client?.last_name],
          // ['', this.order?.client?.novisys_id],
          ['Telefono', this.order?.client?.phone],
          // ['', this.order?.client?.updated_at],
        ]
      }
    }, err => {
      this.spinner.hide();
      if (err.status === 500) {
        SwalService.swalFire({ icon: 'error', title: 'Error', text: 'Error al cargar la orden, por favor intente de nuevo recargando la pagina', confirmButtonText: 'Recargar la pagina' }).then(res => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      }
    });
  }

  getStatuses(): void {
    this.standard.methodGet<IStatus[]>(`system-orders/orders/${this.id}/statuses`).subscribe(res => {
      if (res.success) {
        if (res.data?.length > 0) {
          this.statuses = res.data.map(item => {
            return {
              iconUrl: `https://ui-avatars.com/api/?background=random&name=${item?.user?.name ? item?.user?.name : 'novisolutions'}`,
              date: item.created_at,
              content: trans(item.type, 'orders'),
              for: item?.user?.name ? item?.user?.name : 'novisolutions'
            };
          });
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
    // if (this.order.payments && this.order.payments.length > 0) {
    //   this.paymentsMap = new Map<number, IPaymentOrder>(this.order.payments.map(item => [item.id, item]));
    // } else if (this.order.payments.length < 1) {
    //   this.paymentsMap.clear();
    // }
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
    SwalService.swalFire({ title: 'Atención', text, icon: 'warning', showCancelButton: true, confirmButtonText: 'Si, Enviar', cancelButtonText: 'No, Cancelar' }).then(res => {
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
            SwalService.swalFire({ icon: 'success', title: 'Éxito', text: 'Se ha enviado la notificación de la orden', confirmButtonText: 'Aceptar' });
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

  openDetailClient(): void {
    this.bottomSheet.open(DetailButtonSheetComponent, {
      data: this.detailClient
    })
  }

  deleteOrder(): void {
    SwalService.swalFire({ icon: 'warning', title: '¿Estas seguro?', text: 'Esta acción no se puede deshacer', showCancelButton: true, confirmButtonText: 'Si, eliminar orden', cancelButtonText: 'No, cancelar' }).then(res => {
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
