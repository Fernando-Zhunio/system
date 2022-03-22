import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Input() order_id: any;
  @Output() eventOccurrence: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private standard: StandartSearchService) { }

  ngOnInit() {
  }

  openDialogCreateOrEditDiscountOrTax(id: number): void {
    console.log(id);
    this.dialog.open(CreateOrEditDiscountOrTaxOrderComponent, {
      width: '500px',
      data: { id, order_id: this.order_id },

      disableClose: true,

    }).beforeClosed().subscribe(res => {
      if (res) {
        if (this.discountsAndTaxes.has(res.id)){
          this.discountsAndTaxes.delete(res.id);
        }
        this.discountsAndTaxes.set(res.id, res);
        this.eventOccurrence.emit('updated');
      }
    });
  }

  deleteAdditionalAmount(id: number): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el Monto?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.standard.methodDelete(`system-orders/orders/${this.order_id}/additional-amount/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Monto eliminado', icon: 'success' });
            this.discountsAndTaxes.delete(id);
            this.eventOccurrence.emit('updated');
          }
        });
      }
    });
  }

}
