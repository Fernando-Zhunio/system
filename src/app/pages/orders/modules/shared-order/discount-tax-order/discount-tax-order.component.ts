import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionOrdersAdditionalAmounts } from '../../../../../class/permissions-modules';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';
import { CreateOrEditDiscountOrTaxOrderComponent } from '../../../components/create-or-edit-discount-or-tax-order/create-or-edit-discount-or-tax-order.component';

@Component({
  selector: 'app-discount-tax-order',
  templateUrl: './discount-tax-order.component.html',
  styleUrls: ['./discount-tax-order.component.scss']
})
export class DiscountTaxOrderComponent implements OnInit {

  @Input() discountsAndTaxes: Map<number, any> = new Map<number, any>();
  @Input() isCancelled: boolean;
  @Input() order_id: any;
  @Output() change = new EventEmitter<string>();

  permissionTaxAndDiscount = PermissionOrdersAdditionalAmounts;

  constructor(private dialog: MatDialog, private standard: StandartSearchService) { }

  ngOnInit() {
  }

  openDialogCreateOrEditDiscountOrTax(id: number = null): void {
    console.log(id);
    this.dialog.open(CreateOrEditDiscountOrTaxOrderComponent, {
      width: '500px',
      data: { id, order_id: this.order_id },

      disableClose: true,

    }).beforeClosed().subscribe(res => {
      if (res?.success) {
        // if (this.discountsAndTaxes.has(res.id)){
        //   this.discountsAndTaxes.delete(res.id);
        // }
        // this.discountsAndTaxes.set(res.id, res);
        // this.eventOccurrence.emit('updated');
        this.change.emit('updated');
      }
    });
  }

  deleteAdditionalAmount(id: number): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el Monto?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${this.order_id}/additional-amounts/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Monto eliminado', icon: 'success' });
            // this.discountsAndTaxes.delete(id);
            // this.eventOccurrence.emit('updated');
            this.change.emit('delete');
          }
        });
      }
    });
  }

  confirmedRetention(id: number): void {
    SwalService.swalFire({ title: 'Confirmar esta retención', text: '¿Está seguro de confirmar la retención?', icon: 'warning', showConfirmButton: true, showCancelButton: true, confirmButtonText: 'Confirmar', cancelButtonText: 'Cancelar' })
      .then(res => {
        if (res.isConfirmed) {
          this.standard.methodPut(`system-orders/orders/${this.order_id}/additional-amounts/${id}/confirm-retention`).subscribe(
            {
              next: res => {
                if (res?.success) {
                  SwalService.swalFire({ title: 'Confirmar', text: 'Retención activada', icon: 'success' });
                  this.change.emit('delete');
                }
              },
              error: err => {
                console.error(err);
                SwalService.swalFire({ title: 'Error', text: 'Error al querer confirmar esta retención', icon: 'error' });
              }
            }
          );
        }
      })
  }

}
