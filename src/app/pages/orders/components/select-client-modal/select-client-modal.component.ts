import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { IClientOrder } from '../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-select-client-modal',
  templateUrl: './select-client-modal.component.html',
  styleUrls: ['./select-client-modal.component.scss']
})
export class SelectClientModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private order_id: number, private dialogRef: MatDialogRef<SelectClientModalComponent>, private standard: StandartSearchService) { }
  url = 'system-orders/clients';
  clients: IClientOrder[] = [];
  isLoading = false;

  ngOnInit() {
  }

  getData(data) {
    console.log(data);
    if (data?.data) {
      this.clients = data.data;
    }
  }

  selectedClient(event: MatSelectionListChange): void {
    const id = event.options[0].value;
    console.log(event, id);
    const indexClient = this.clients.findIndex(client => client.id === id);
    if (indexClient > -1) {
      // this.isLoading = true;
      this.dialogRef.close(this.clients[indexClient]);
      // this.standard.methodPut(`system-orders/orders/${this.order_id}/clients/${id}`, {client_id: id}).subscribe(data => {
      //   if (data?.success) {
      //     SwalService.swalFire({title: 'Cliente seleccionado', text: 'Cliente seleccionado correctamente', icon: 'success'});
      //     this.dialogRef.close(data);
      //   }
      //   this.isLoading = false;
      // }, error => {
      //   this.isLoading = false;
      //   });
    } else {
      SwalService.swalFire({title: 'Ups!', text: 'Problema al seleccionar cliente no encontrado', icon: 'error'});
    }
  }
}
