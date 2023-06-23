import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { CreateOrEditPaymentOrderComponent } from '../create-or-edit-payment-order/create-or-edit-payment-order.component';
import { IPaymentOrder } from '../../../../../../interfaces/iorder';
import { SwalService } from '../../../../../../services/swal.service';
import { MatSelectChange } from '@angular/material/select';
import { FilesPaymentsOrderComponent } from '../filesPaymentsOrder/filesPaymentsOrder.component';
import { TransactionsPaymentComponent } from '../transactions-payment/transactions-payment.component';
import { HistoryStatusesComponent } from '../history-statuses/history-statuses.component';
import { PermissionOrdersPayments } from '../../../../../../class/permissions-modules';
import { PaymentStatus } from '../../../../enums/payment.enum';
import { OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent {

  constructor(private orderService: OrdersService, private dialog: MatDialog, private standard: StandartSearchService) { }
  @Input() order_id: number;
  @Input() isCancelled: boolean;
  @Input() payments: IPaymentOrder[] = [];
  @Output() reload = new EventEmitter<string>();

  statuses = PaymentStatus;
  isOpenUploadFile = false;
  idUploadFile: number | null = null;
  urlUploadFile: string = 'api/';
  hasFile = false;

  permissionsPayments = PermissionOrdersPayments;


  openDialog(id: number | null = null) {
    const payment = this.payments.find(x => x.id === id);
    this.dialog.open(CreateOrEditPaymentOrderComponent, {
      data: {
        isEdit: id ? true : false,
        order_id: this.order_id,
        data: payment
      },
      disableClose: true
    }).afterClosed().subscribe(x => {
      if (x && x?.success) {
        this.reload.emit('create or update');
      }
    });
  }

  lookFiles(id): void {
    this.hasFile = true;
    this.dialog.open(FilesPaymentsOrderComponent, {
      data: {
        order_id: this.order_id,
        payment_id: id
      },
      panelClass: 'col-md-5',
      // minHeight: '70vh',

    }).beforeClosed().subscribe(x => {
      if (x?.success) {
        this.reload.emit('add file');
      }
    });
  }

  deleteItem(order_id: number, id: number): void {
    SwalService.swalConfirmation('Precaución', 'Esta seguro que desea eliminar', 'warning').then(result => {
      if (result.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${order_id}/payments/${id}`).subscribe(() => {
          SwalService.swalFire({ icon: 'success', title: 'Eliminado', text: 'Se elimino correctamente' });
          this.reload.emit('delete');
        });
      }
    });
  }

  changeStatusPayment(select: MatSelectChange, id): void {
    const payment = this.payments.find(x => x.id === id);
    SwalService.swalFire(
      {
        title: 'Cambiar Estado',
        text: '¿Está seguro de cambiar el estado del pago?',
        icon: 'warning',
        cancelButtonText: 'No, Cancelar',
        confirmButtonText: 'Si, cambiar estado',
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then(res => {
        if (res.isConfirmed) {
          this.standard.methodPut(`system-orders/orders/${this.order_id}/payments/${id}`, { status: select.value }).subscribe(res => {
            if (res?.success) {
              this.reload.emit('update status');
            }
          }, () => {
            select.source.value = payment?.status;
          });
        } else {
          select.source.value = payment?.status;
        }
      }).catch(() => {
        select.source.value = payment?.status;
      });
  }

  refundPayment(id): void {
    const payment = this.payments.find(x => x.id === id);
    SwalService.swalFire(
      {
        title: 'Reembolso',
        text: `¿Está seguro de reembolsar el pago de $ ${payment?.amount}?`,
        icon: 'warning',
        cancelButtonText: 'No, Cancelar',
        confirmButtonText: 'Si, rembolsar',
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then(res => {
        if (res.isConfirmed) {
          this.standard.methodPost(`system-orders/orders/${this.order_id}/payments/${id}/paymentez/refund`, { }).subscribe(res => {
            if (res?.success) {
              this.reload.emit('update status');
            }
          });
        }
      });
  }

  successFiles(_event): void {
    this.hasFile = false;
  }

  lookTransaction(id): void {

    this.dialog.open(TransactionsPaymentComponent, {
      data: { order_id: this.order_id, payment_id: id }
    });
  }

  openDialogHistoryStatus(id: number): void {
    this.standard.methodGet(`system-orders/orders/${this.order_id}/payments/${id}/statuses`)
      .subscribe(res => {
        if (res?.success) {
          this.dialog.open(HistoryStatusesComponent, {
            width: '500px',
            data: { title: 'Historial de Pagos del #' + id.toString(), list: res.data },
            disableClose: true,
          });
        }
      });
  }


  changeStatus(status, id: number): void {
    SwalService.swalFire(
      {
        title: 'Cambiar Estado',
        text: '¿Está seguro de cambiar el estado del pago?',
        icon: 'warning',
        cancelButtonText: 'No, Cancelar',
        confirmButtonText: 'Si, cambiar estado',
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then(res => {
        if (res.isConfirmed) {
          this.orderService.changeStatusPayment(id, status).subscribe(res => {
            if (res?.success) {
              
            }
          }, () => {
          });

        } else {

        }
      }).catch(() => {

      });
  }
}
