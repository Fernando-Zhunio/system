import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../class/create-or-edit';
import { StandartSearchService } from '../../../services/standart-search.service';
import { Validators } from '@angular/forms';
import { IClientOrder } from '../../../interfaces/iclient-order';

@Component({
  selector: 'app-create-or-edit-order',
  templateUrl: './create-or-edit-order.component.html',
  styleUrls: ['./create-or-edit-order.component.scss']
})
export class CreateOrEditOrderComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Orden ';
  public urlSave: any = 'system-orders/orders';
  loadCreate: boolean = false;
  typesOrders: any[] = [];
  // client: Map<number, IClientOrder> = new Map<number, IClientOrder>();

  clientOrders: ClientOrderClass = new ClientOrderClass();

  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    client_id: new FormControl(null, [Validators.required]),
    address_id: new FormControl(null, [Validators.required]),
    channel_id: new FormControl(null, [Validators.required]),
  });

  // _clientSelected: IClientOrder;
  get clientSelected(): IClientOrder {
    return this.clientOrders.client;
  }

  set clientSelected(client: IClientOrder) {
    if (client) {
      this.form.get('client_id').setValue(client.id);
      this.clientOrders.client = client;
    } else {
      this.form.get('client_id').setValue(null);
      this.clientOrders.client = null;
    }
  }

  constructor(private activatedRouter: ActivatedRoute, router: Router, standard: StandartSearchService) {
    super(activatedRouter, standard, router);
  }

  ngOnInit(): void {
    this.init();
  }

  setData(data): void {
    if (this.status === 'create') {
      console.log(data);
      this.typesOrders = data.data;
    }
  }

  getData($event): void {
    console.log($event);
    this.clientOrders.data = new Map<number, IClientOrder>($event.data.map((item: IClientOrder) => [item['id'], item]));
    console.log(this.clientOrders);
  }

  selectedClient($key): void {
    console.log(this.clientOrders.data.get($key));

    this.clientSelected = this.clientOrders.data.get($key);
    console.log(this.form.get('client_id').value);
  }

  removeClientSelected(): void {
    this.clientSelected = null;
  }
}



class ClientOrderClass {
  url = 'system-orders/clients';
  data: Map<number, IClientOrder> = new Map<number, IClientOrder>();
  title = 'Buscador Clientes';
  form: FormControl = new FormControl(null, [Validators.required]);
  client: IClientOrder = null;
}
