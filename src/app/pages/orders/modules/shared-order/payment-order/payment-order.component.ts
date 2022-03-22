import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { CreateOrEditPaymentOrderComponent } from './create-or-edit-payment-order/create-or-edit-payment-order.component';
import { IOrder, IPaymentOrder } from './../../../../../interfaces/iorder';
import { SwalService } from '../../../../../services/swal.service';
import { MatSelectChange } from '@angular/material/select';
import { FilePondOptions } from 'filepond';
import { environment } from '../../../../../../environments/environment';
import { StorageService } from '../../../../../services/storage.service';
// import { FilePondComponent } from 'ngx-filepond/filepond.component';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {

  constructor(private dialog: MatDialog, private standard: StandartSearchService, private s_storage: StorageService) { }
  @ViewChild('myPondPaid') myPond: any;
  @Input() order_id: number;
  @Input() paymentsMap: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  @Output() getTotalPayment: EventEmitter<string> = new EventEmitter<string>();
  isOpenUploadFile = false;
  idUploadFile: number = null;
  urlUploadFile: string = 'api/';
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastre o presione aquí',
    name: 'file',
    maxParallelUploads: 5,
    server: {
      url: `${environment.server}`,
      process: {
        // url: 'storage/attachments/upload',
        url: this.urlUploadFile,
        headers: {
          Authorization: `Bearer ${this.s_storage.getCurrentToken()}`,
          Accept: 'application/json',
        },
        onload: (response: any) => {
          const data = JSON.parse(response);
          // this.sendOneMessage(null, [data.id]);
          return data.id;
        }
      },
    }
  };
  hasFile = false;

  ngOnInit() {
  }



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
        const payment = x.data;
        this.paymentsMap.set(payment.id, payment);
        this.getTotalPayment.emit('create or update');
      }
    });
  }

  deleteItem(order_id: number, id: number): void {
    SwalService.swalConfirmation('Precaución', 'Esta seguro que desea eliminar', 'warning').then(result => {
      if (result.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${order_id}/payments/${id}`).subscribe(data => {
          SwalService.swalFire({ icon: 'success', title: 'Eliminado', text: 'Se elimino correctamente' });
          this.paymentsMap.delete(id);
          this.getTotalPayment.emit('delete');
        });
      }
    });
  }

  changeStatusPayment(event: MatSelectChange, id): void {
    const status = event.value;
    if (status === this.paymentsMap.get(id).status) {
      return;
    }
    SwalService.swalConfirmation('Precaución', 'Esta seguro que desea cambiar el estado', 'warning', 'Si, cambiar estado', 'No, cancelar').then(result => {
      if (result.isConfirmed) {
        this.standard.methodPut(`system-orders/orders/${this.order_id}/payments/${id}`, {status: event.value}).subscribe(data => {
          if (data?.success) {
            SwalService.swalFire({ icon: 'success', title: 'Cambiado', text: 'Se cambio correctamente' });
            this.paymentsMap.set(id, data.data);
            this.getTotalPayment.emit('change status');
          }
        });
      }
    }
    );
  }

  uploadFile(id): void {
    this.pondOptions.server = {url: `system-orders/orders/${this.order_id}/payments/${id}/attachments`};
    this.idUploadFile = id;
    this.isOpenUploadFile = true;

    this.urlUploadFile = `system-orders/orders/${this.order_id}/payments/${id}/attachments`;
  }

  successFiles(event): void {
    this.hasFile = false;
  }

}
