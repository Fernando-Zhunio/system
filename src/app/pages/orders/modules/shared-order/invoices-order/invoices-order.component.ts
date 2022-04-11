import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IInvoice } from '../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-invoices-order',
  templateUrl: './invoices-order.component.html',
  styleUrls: ['./invoices-order.component.scss']
})
export class InvoicesOrderComponent implements OnInit {

  constructor(private standard: StandartSearchService) { }

  @Input() invoices: IInvoice[] = [];
  @Input() isCancelled: boolean;
  isOpenAddInvoice = false;
  isLoading = false;
  formControl = new FormControl(null, [Validators.required]);

  @Input() order_id: number;
  @Output() change = new EventEmitter<any>();

  ngOnInit(): void {
  }

  addTransferManually(): void {
    if (this.formControl.valid) {
      this.isLoading = true;
      this.standard.methodPost('system-orders/orders/' + this.order_id + '/invoices', { doc_id: this.formControl.value }).subscribe(
        (response: any) => {
          if (response.success) {
            this.change.emit('invoice');
            this.isOpenAddInvoice = false;
            this.formControl.reset();
          }
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        }
      );
    }
  }

  unlink(id): void {
    SwalService.swalFire({icon: 'info', title: 'Precaución', text: '¿Está seguro de querer desvincular esta factura de la orden?', confirmButtonText: 'Si, desvincular', cancelButtonText: 'No, cancelar'}).then(res => {
      if (res.isConfirmed) {
        this.isLoading = true;
        this.standard.methodDelete('system-orders/orders/' + this.order_id + '/invoices/' + id).subscribe(
          (response: any) => {
            if (response.success) {
              this.change.emit('invoice');
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
