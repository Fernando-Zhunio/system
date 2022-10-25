import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PermissionOrdersInvoicesMba } from '../../../../../class/permissions-modules';
import { IInvoice } from '../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-invoices-order',
  templateUrl: './invoices-order.component.html',
  styleUrls: ['./invoices-order.component.scss']
})
export class InvoicesOrderComponent  {

  constructor(private standard: StandartSearchService) { }

  @Input() invoice: IInvoice;
  @Input() isCancelled: boolean;
  permissionsInvoices = PermissionOrdersInvoicesMba;

  @Input() orderId: number;
  @Output() changeOrder = new EventEmitter<any>();


  // addTransferManually(): void {
  //   if (this.formControl.valid) {
  //     this.isLoading = true;
  //     this.standard.methodPost('system-orders/orders/' + this.order_id + '/invoices', { doc_id: this.formControl.value }).subscribe(
  //       (response: any) => {
  //         if (response.success) {
  //           this.changeOrder.emit('invoice');
  //           this.isOpenAddInvoice = false;
  //           this.formControl.reset();
  //         }
  //         this.isLoading = false;
  //       }, () => {
  //         this.isLoading = false;
  //       }
  //     );
  //   }
  // }

  unlink(id): void {
    SwalService.swalFire({icon: 'info', title: 'Precaución', text: '¿Está seguro de querer desvincular esta factura de la orden?', confirmButtonText: 'Si, desvincular', cancelButtonText: 'No, cancelar'}).then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete('system-orders/orders/' + this.orderId + '/invoices/' + id).subscribe(
          (response: any) => {
            if (response.success) {
              this.changeOrder.emit('invoice');
            }
          }
        );
      }
    });
  }

}
