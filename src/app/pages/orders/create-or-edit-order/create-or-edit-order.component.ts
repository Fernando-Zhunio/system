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
  public title: string = 'Creando Orden';
  public urlSave: any = 'system-orders/orders';
  loadCreate: boolean = false;
  typesOrders: any[] = [];
  client: IClientOrder = null;

  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    client_id: new FormControl(null, [Validators.required]),
    address_id: new FormControl(null, [Validators.required]),
    channel_id: new FormControl(null, [Validators.required]),
    // client_id: new FormControl(null, [Validators.required]),
  });

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



}
