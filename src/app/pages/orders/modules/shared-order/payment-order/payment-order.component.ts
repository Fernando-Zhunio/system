import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { CreateOrEditPaymentOrderComponent } from './create-or-edit-payment-order/create-or-edit-payment-order.component';
import { IPaymentOrder } from './../../../../../interfaces/iorder';
import { SwalService } from '../../../../../services/swal.service';
import { MatSelectChange } from '@angular/material/select';
import { StorageService } from '../../../../../services/storage.service';
import { FilesPaymentsOrderComponent } from './filesPaymentsOrder/filesPaymentsOrder.component';
import { TransactionsPaymentComponent } from './transactions-payment/transactions-payment.component';
import { HistoryStatusesComponent } from '../history-statuses/history-statuses.component';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {

  constructor(private dialog: MatDialog, private standard: StandartSearchService, private s_storage: StorageService) { }
  @Input() order_id: number;
  @Input() isCancelled: boolean;
  @Input() paymentsMap: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  @Output() change = new EventEmitter<string>();

  isOpenUploadFile = false;
  idUploadFile: number = null;
  urlUploadFile: string = 'api/';
  hasFile = false;

  ngOnInit() { }

  openDialog(id: number = null) {
    this.dialog.open(CreateOrEditPaymentOrderComponent, {
      data: {
        isEdit: id ? true : false,
        order_id: this.order_id,
        data: this.paymentsMap.get(id)
      },
      disableClose: true
    }).afterClosed().subscribe(x => {
      if (x && x?.success) {
        // const payment = x.data;
        // this.paymentsMap.set(payment.id, payment);
        // this.getTotalPayment.emit('create or update');
        this.change.emit('create or update');
      }
    });
  }

  lookFiles(id): void {
    this.hasFile = true;
    this.dialog.open(FilesPaymentsOrderComponent, {
      data: {
        order_id: this.order_id,
        payment_id: id
      }
    }).beforeClosed().subscribe(x => {
      if (x?.success) {
        this.change.emit('add file');
      }
    });
  }

  deleteItem(order_id: number, id: number): void {
    SwalService.swalConfirmation('Precaución', 'Esta seguro que desea eliminar', 'warning').then(result => {
      if (result.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${order_id}/payments/${id}`).subscribe(data => {
          SwalService.swalFire({ icon: 'success', title: 'Eliminado', text: 'Se elimino correctamente' });
          this.change.emit('delete');
        });
      }
    });
  }

  changeStatusPayment(select: MatSelectChange, id): void {
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
              this.change.emit('update status');
            }
          }, err => {
            select.source.value = this.paymentsMap.get(id).status;
          });
        } else {
          console.log(select);
          select.source.value = this.paymentsMap.get(id).status;
        }
      }).catch(err => {
        select.source.value = this.paymentsMap.get(id).status;
      });
  }

  refundPayment(id): void {
    const payment = this.paymentsMap.get(id);
    SwalService.swalFire(
      {
        title: 'Reembolso',
        text: `¿Está seguro de reembolsar el pago de $ ${payment.amount}?`,
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
              this.change.emit('update status');
            }
          });
        }
      });
  }

  uploadFile(id): void {
    // this.pondOptions.server = {url: `system-orders/orders/${this.order_id}/payments/${id}/attachments`};
    // this.idUploadFile = id;
    // this.isOpenUploadFile = true;
    // this.urlUploadFile = `system-orders/orders/${this.order_id}/payments/${id}/attachments`;
    // this.change.emit('upload file');
  }

  successFiles(event): void {
    this.hasFile = false;
  }

  lookTransaction(id): void {
    // this.standard.methodGet(`system-orders/orders/${this.order_id}/payments/${id}/transactions`).subscribe(data => {
    //   if (data?.success) {

    //   }
    // });
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

}
