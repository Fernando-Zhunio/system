import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PermissionOrdersTransfersMba } from '../../../../../class/permissions-modules';
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
  @Input() isCancelled: boolean;
  @Input() order_id: number;
  @Input() metaData: any = null
  @Output() changeOrder: EventEmitter<string> = new EventEmitter<string>();
  isOpenAddTransfer = false;
  isLoading = false;
  formControl = new FormControl(null, [Validators.required]);

  permissionsTransference = PermissionOrdersTransfersMba;
  ngOnInit() {
  }

  addTransferManually(): void {
    if (this.formControl.valid) {
      this.isLoading = true;
      this.standard.methodPost('system-orders/orders/' + this.order_id + '/transfers', { doc_id: this.formControl.value }).subscribe(
        (response: any) => {
          if (response.success) {
            // this.transfers.push(response.data);
            this.changeOrder.emit('transfers');
            this.isOpenAddTransfer = false;
            this.formControl.reset();
          }
          this.isLoading = false;
        }, () => {
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
              if (response?.success) {
                this.changeOrder.emit('transfers');
              }
              this.isLoading = false;
            }, () => {
              this.isLoading = false;
            }
          );
        }
      }
    );
  }

  unlink(id): void {
    SwalService.swalFire({ icon: 'info', title: 'Precaución', text: '¿Está seguro de querer desvincular esta transferencia de la orden?', confirmButtonText: 'Si, desvincular', cancelButtonText: 'No, cancelar' }).then(res => {
      if (res.isConfirmed) {
        this.isLoading = true;
        this.standard.methodDelete('system-orders/orders/' + this.order_id + '/transfers/' + id).subscribe(
          (response: any) => {
            if (response.success) {
              this.changeOrder.emit('invoice');
            }
            this.isLoading = false;
          }, () => {
            this.isLoading = false;
          }
        );
      }
    });
  }

  confirmTransaction(): void {
    SwalService.swalFire({ icon: 'info', title: 'Precaución', text: '¿Está seguro de querer marca la transferencia?', confirmButtonText: 'Si, confirmar', cancelButtonText: 'No, cancelar', showCancelButton: true, showConfirmButton: true })
      .then(res => {
        if (res.isConfirmed) {
          const url = `system-orders/orders/${this.order_id}/transfers/mark-as-send`;
          this.standard.methodPut(url).subscribe({
            next: (response: any) => {
              if (response?.success) {
                this.changeOrder.emit('invoice');
                SwalService.swalFire({ icon: 'success', title: 'Correcto', text: 'La transferencia se ha marcado como enviada' });
              }
            }
          })
        }
      })
  }
}
