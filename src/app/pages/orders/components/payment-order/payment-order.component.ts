import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPaymentOrder } from '../../../../interfaces/iorder';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrEditPaymentOrderComponent } from './create-or-edit-payment-order/create-or-edit-payment-order.component';
import { SwalService } from '../../../../services/swal.service';
import { IOrder } from './../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {

  constructor(private dialog: MatDialog, private standard: StandartSearchService) { }
  @Input() order: IOrder;
  @Input() paymentOrderMap: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  @Output() getTotalPayment: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  openDialog(id: number = null) {
    this.dialog.open(CreateOrEditPaymentOrderComponent, {
      data: {
        isEdit: id ? true : false,
        order_id: this.order.id,
        data: this.paymentOrderMap.get(id)
      },
      disableClose: true
    }).afterClosed().subscribe(x => {
      if (x && x?.success) {
        const payment = x.data;
        this.paymentOrderMap.set(payment.id, payment);
        this.getTotalPayment.emit('create or update');
      }
    });
  }

  deleteItem(order_id: number, id: number): void {
    SwalService.swalConfirmation('Precaución', 'Esta seguro que desea eliminar', 'warning').then(result => {
        if (result.isConfirmed) {
            this.standard.methodDelete(`system-orders/orders/${order_id}/payments/${id}`).subscribe(data => {
                SwalService.swalFire({icon: 'success', title: 'Eliminado', text: 'Se elimino correctamente'});
                this.paymentOrderMap.delete(id);
                this.getTotalPayment.emit('delete');
            });
        }
    });
}

}
