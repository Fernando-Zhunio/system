import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { IClientOrder } from '../../../../interfaces/iorder';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-select-client-modal',
  templateUrl: './select-client-modal.component.html',
  styleUrls: ['./select-client-modal.component.scss']
})
export class SelectClientModalComponent  {

  constructor(private dialogRef: MatDialogRef<SelectClientModalComponent>) { }
  url = 'system-orders/clients';
  clients: IClientOrder[] = [];
  isLoading = false;

  getData(data) {
    if (data?.data) {
      this.clients = data.data;
    }
  }

  selectedClient(event: MatSelectionListChange): void {
    const id = event.options[0].value;
    const indexClient = this.clients.findIndex(client => client.id === id);
    if (indexClient > -1) {
      this.dialogRef.close(this.clients[indexClient]);
    } else {
      SwalService.swalFire({title: 'Ups!', text: 'Problema al seleccionar cliente no encontrado', icon: 'error'});
    }
  }
}
