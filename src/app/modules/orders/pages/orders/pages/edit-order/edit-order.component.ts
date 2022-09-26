import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionOrdersAdditionalAmounts, PermissionOrdersInvoicesMba, PermissionOrdersItems, PermissionOrdersPayments, PermissionOrdersPaymentsMba, PermissionOrdersShippings, PermissionOrdersTransfersMba } from '../../../../../../class/permissions-modules';
import { trans } from '../../../../../../class/translations';
import { IItemOrder, IStatus } from '../../../../../../interfaces/iorder';
import { TranslatefzPipe } from '../../../../../../pipes/translatefz.pipe';
import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { SwalService } from '../../../../../../services/swal.service';
import { EditDataOrderModalComponent } from '../../../../components/edit-data-order-modal/edit-data-order-modal.component';
import { SelectClientModalComponent } from '../../../../components/select-client-modal/select-client-modal.component';
import { StateFlowOrderComponent } from '../../../../components/state-flow-order/state-flow-order.component';
import { IPaymentOrder, Order } from '../../../../interfaces/order';
import { CreateOrEditAddressClientComponent } from '../../../../modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';
import { PdfDetailOrderComponent } from '../../../../modules/shared-order/pdf-detail-order/pdf-detail-order.component';
import { SelectClientAddressModalComponent } from '../../../../modules/shared-order/select-client-address-modal/select-client-address-modal.component';
import { OrdersService } from '../../../../services/orders.service';
import { DetailButtonSheetComponent } from '../../components/detail-button-sheet/detail-button-sheet.component';

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

  constructor(private orderService: OrdersService, private bottomSheet: MatBottomSheet, private spinner: NgxSpinnerService, private standard: StandartSearchService, private activated_router: ActivatedRoute, private dialog: MatDialog, private router: Router) { }
  @ViewChild(StateFlowOrderComponent) stateFlow: StateFlowOrderComponent;
  id: string | null;
  order: Order;
  items: Map<number, IItemOrder> = new Map<number, IItemOrder>();
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

  setIntervalOfTime: any = null;

  metaDataTransference = null;

  transcurrentTime: { hours, days } = { hours: '00:00:00', days: '0' };

  ngOnInit() {
    this.id = this.activated_router.snapshot.paramMap.get('order_id');
    this.spinner.show();
    this.getStatuses();
    this.orderService.$order.subscribe((order) => {
      if (order) {
        this.order = order;
        this.metaDataTransference = order.additional_data?.transfers_status;
        this.fillData();
        this.withTiming();
      }
    });

    this.orderService.init(this.id!)
    .subscribe(data => {
      if (data?.success) {
        this.metaDataTransference = data.data?.order.additional_data?.transfers_status;
        this.withTiming();
        this.fillData();
        this.spinner.hide();
        this.detailClient = [
          ['Ciudad', this.order?.client?.city],
          ['País', this.order?.client?.country],
          ['Estado', this.order?.client?.state],
          ['Creado', this.order?.client?.created_at],
          ['# Documento', this.order?.client?.doc_id],
          ['Correo', this.order?.client?.email],
          ['Nombres', this.order?.client?.first_name],
          ['Apellidos', this.order?.client?.last_name],
          ['Telefono', this.order?.client?.phone],
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

  withTiming(): void {
    if (this.order?.timing && this.order?.timing.started_at) {
      if (this.order.timing?.ended_at) {
        if (this.setIntervalOfTime) {
          clearInterval(this.setIntervalOfTime);
        }
        this.transcurrentTime = this.counterTime(this.order?.timing.started_at, this.order.timing?.ended_at);
      } else {
        this.startTranscurrentTime(this.order.timing.started_at)
      }
    }
  }

  openGeneratedPDF(): void {
    const _order = JSON.parse(JSON.stringify(this.order));
    this.dialog.open(PdfDetailOrderComponent,{
      data: {order:  _order },
      width: '90%',
      maxWidth: '90%',
      maxHeight: '80%',
    })
  }

  startTranscurrentTime(date): void {
    if (this.setIntervalOfTime) {
      clearInterval(this.setIntervalOfTime);
    }
    this.setIntervalOfTime = setInterval(() => {
      this.transcurrentTime = this.counterTime(date);
    }, 1000);
  }

  counterTime(start_date, end_date: any = Date.now()): { hours, days } {
    const diffTime = moment(end_date).diff(moment(start_date));
    const days = Math.floor(moment.duration(diffTime).asDays()).toString();
    return { hours: moment.utc(diffTime).format(`HH:mm:ss`), days }
    // return moment.utc(diffTime).format("LTS");
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

          setTimeout(() => {
            this.stateFlow.scrollBottom();
          }, 1000);
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
      if (data1?.success) {
        this.order = data1.data;
      }
    });
  }

  getOrder(_$event = null): void {
    this.orderService.refreshOrders();
    this.getStatuses();
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
        }, () => {
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

  scrollBottomStatus(): void {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  }

  editDataOrder(): void {
    this.dialog.open(EditDataOrderModalComponent, {
      data: {
      order_id: this.order.id,
      company_id: this.order.company.id,
      seller_code: this.order.seller_code,
      channel_id: this.order.channel_id,
      type: this.order.type
      },
      disableClose: true,
    }).afterClosed().subscribe(data => {
      if (data?.success) {
        console.log(data);
        this.getOrder();
      }
    })
  }
}
