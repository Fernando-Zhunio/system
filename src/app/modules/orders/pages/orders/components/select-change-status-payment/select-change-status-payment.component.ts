import { Component, Input, OnInit } from '@angular/core';
import { PermissionOrdersPayments } from '../../../../../../class/permissions-modules';
import { SwalService } from '../../../../../../services/swal.service';
import { OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-select-change-status-payment',
  templateUrl: './select-change-status-payment.component.html',
  styleUrls: ['./select-change-status-payment.component.scss']
})
export class SelectChangeStatusPaymentComponent implements OnInit {

  @Input() status: string;
  @Input() type: string;
  @Input() id: any;
  @Input() isCancelled: boolean = false;
  isLoading: boolean = false;
  permissionsPayments = PermissionOrdersPayments
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
  }

  changeStatus(status): void {
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
          this.isLoading = true;
          this.orderService.changeStatusPayment(this.id, status).subscribe(res => {
            if (res?.success) {
              this.isLoading = false;
            }
          }, () => {
            this.isLoading = false;
          });

        } else {

        }
      }).catch(() => {

      });
  }

}
