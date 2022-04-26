import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { SwalService } from '../../../../../../services/swal.service';

@Component({
  selector: 'app-payment-mba-item',
  templateUrl: './payment-mba-item.component.html',
  styleUrls: ['./payment-mba-item.component.scss']
})
export class PaymentMbaItemComponent implements OnInit {

  constructor(private standard: StandartSearchService) { }
  isLoading = false;
  @Output() changeOrder: EventEmitter<any> = new EventEmitter<any>();
  @Input() order_id: number;
  @Input() item: any;
  @Input() isCancelled = false;
  ngOnInit(): void {
  }

  unlink(id): void {
    SwalService.swalFire({
      icon: 'info',
      title: 'Precaución',
      text: '¿Está seguro de querer desvincular esta factura de la orden?',
      confirmButtonText: 'Si, desvincular',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showConfirmButton: true

    }).then(res => {
      if (res.isConfirmed) {
        this.isLoading = true;
        this.standard.methodDelete('system-orders/orders/' + this.order_id + '/mba-payments/' + id).subscribe(
          (response: any) => {
            if (response.success) {
              this.changeOrder.emit('mba-payments');
            }
            this.isLoading = false;
          }, err => {
            this.isLoading = false;
          }
        );
      }
    });
  }

}
