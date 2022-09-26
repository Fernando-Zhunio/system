import { Component, Input, OnInit } from '@angular/core';
import { PermissionOrdersShippings } from '../../../../../../class/permissions-modules';
import { SwalService } from '../../../../../../services/swal.service';
import { ShippingStatus, ShippingTypes } from '../../../../enums/shipping.enum';
import { OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-select-change-status-shipping-order',
  templateUrl: './select-change-status-shipping-order.component.html',
  styleUrls: ['./select-change-status-shipping-order.component.scss']
})
export class SelectChangeStatusShippingOrderComponent implements OnInit {

  @Input() status: string;
  @Input() type: string;
  @Input() id: string;
  isCancelled: boolean = false;
  types = ShippingTypes;
  statuses = ShippingStatus;
  isLoading: boolean = false;

  constructor(private orderService : OrdersService) { }
  permissionsShipping = PermissionOrdersShippings;

  ngOnInit(): void {
  }

  changeStatus(status): void {
    SwalService.swalFire(
      { title: 'Cambiar Estado',
       text: '¿Está seguro de cambiar el estado del Envío?',
        icon: 'warning',
      cancelButtonText: 'No, Cancelar',
      confirmButtonText: 'Si, cambiar estado',
      showCancelButton: true,
      showConfirmButton: true,
      })
      .then(res => {
        if (res.isConfirmed) {
          this.isLoading = true;
          this.orderService.changeStatusShipping(this.id, status).subscribe(res => {
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
  // servientrega is automatic states
  isServientregaDelivered(): boolean {
    return this.type === ShippingTypes.servientrega || this.status === ShippingStatus.delivered || this.status == ShippingStatus.cancelled;
  }

  convertTranslateStatus(): string {
    return this.status == ShippingStatus.processed && this.type == ShippingTypes.pickup ? 'Listo para recoger' : this.status;
  }

}
