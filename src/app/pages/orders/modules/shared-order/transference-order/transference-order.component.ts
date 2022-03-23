import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ITransference } from '../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-transference-order',
  templateUrl: './transference-order.component.html',
  styleUrls: ['./transference-order.component.scss']
})
export class TransferenceOrderComponent implements OnInit {

  constructor(private standard: StandartSearchService) { }
  @Input() transfers: ITransference[] = [];
  @Input() order_id: number;
  isOpenAddTransfer = false;
  isLoading = false;
  formControl = new FormControl(null, [Validators.required]);
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
  }

  addTransferManually(): void {
    if (this.formControl.valid) {
      this.isLoading = true;
      this.standard.methodPost('system-orders/orders/' + this.order_id + '/transfers', { doc_id: this.formControl.value }).subscribe(
        (response: any) => {
          if (response.success) {
            this.transfers.push(response.data);
            this.change.emit('transfers');
            this.isOpenAddTransfer = false;
            this.formControl.reset();
          }
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        }
      );
    }
  }

  deleteTransfer(id: number): void {

    SwalService.swalConfirmation('Precaución', '¿Está seguro de eliminar la transferencia?', 'info', 'Si, eliminar', 'No, cancelar').then(
      (result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.standard.methodDelete('system-orders/orders/' + this.order_id + '/transfers/' + id).subscribe(
            (response: any) => {
              if (response.success) {
                const transfers = this.transfers.find(item => item.id == id);
                if (transfers) {
                  this.transfers.splice(this.transfers.indexOf(transfers), 1);
                }
                this.change.emit('transfers');
              }
              this.isLoading = false;
            }, err => {
              this.isLoading = false;
            }
          );
        }
      }
    );
  }

}
