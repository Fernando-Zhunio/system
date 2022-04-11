import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { IClientOrder, IShippingAddress } from '../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-select-client-address-modal',
  templateUrl: './select-client-address-modal.component.html',
  styleUrls: ['./select-client-address-modal.component.scss']
})
export class SelectClientAddressModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dataExternal: {order_id: number, client: IClientOrder}, private dialogRef: MatDialogRef<SelectClientAddressModalComponent>, private standard: StandartSearchService) { }
  isLoading = false;
  addresses: IShippingAddress[] = [];
  url = `system-orders/clients/${this.dataExternal.client.id}/addresses`;


  ngOnInit() {
  }

  getData(data) {
    console.log(data);
    if (data?.data) {
      this.addresses = data.data;
    }
  }


  selectedAddress(event: MatSelectionListChange): void {
    const id = event.options[0].value;
    console.log(event, id);
    const indexAddress = this.addresses.findIndex(address => address.id === id);
    if (indexAddress > -1) {
      this.isLoading = true;
      this.standard.methodPut(`system-orders/orders/${this.dataExternal.order_id}`, {client_id: this.dataExternal.client.id, address_id: id}).subscribe(data => {
        if (data?.success) {
          SwalService.swalFire({title: 'Dirección seleccionada', text: 'Dirección seleccionada correctamente', icon: 'success'});
          this.dialogRef.close(data);
        }
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        });
    } else {
      SwalService.swalFire({title: 'Ups!', text: 'Problema al seleccionar dirección no encontrada', icon: 'error'});
    }
  }
}
