import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../class/create-or-edit';
import { StandartSearchService } from '../../../services/standart-search.service';
import { Validators } from '@angular/forms';
import { IClientOrder } from '../../../interfaces/iclient-order';
import { SharedService } from '../../../services/shared/shared.service';
import { IClientAddressOrder } from '../../../interfaces/iclient-address-order';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrEditAddressClientComponent } from '../modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';
import { MatSelectionListChange } from '@angular/material/list';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { IOrder } from '../../../interfaces/iorder';

@Component({
  selector: 'app-create-or-edit-order',
  templateUrl: './create-or-edit-order.component.html',
  styleUrls: ['./create-or-edit-order.component.scss']
})
export class CreateOrEditOrderComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Orden ';
  public urlSave: any = 'system-orders/orders';
  @ViewChild('stepper') stepper: MatHorizontalStepper;

  loadCreate: boolean = false;
  typesOrders: any[] = [];
  channelsOrders: any[] = [];
  clientOrders: ClientOrderClass = new ClientOrderClass();
  order: IOrder = null;
  isEditStep: boolean = true;
  form: FormGroup = new FormGroup({
    id: new FormControl({ value: null, disabled: true }, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    client_id: new FormControl(null, [Validators.required]),
    address_id: new FormControl(null, [Validators.required]),
    channel_id: new FormControl(null, [Validators.required]),
    tax: new FormControl('12', [Validators.required]),
    seller_code: new FormControl(null, [Validators.required]),
    company_id: new FormControl(null, [Validators.required])
  });

  shippingTypes: any[] = [];
  shippingStatues: any[] = [];
  companies: any[] = [];

  get clientSelected(): IClientOrder {
    return this.clientOrders.client;
  }

  get addressSelected(): IClientAddressOrder {
    return this.clientOrders.address;
  }

  set clientSelected(client: IClientOrder) {
    if (client) {
      this.form.get('client_id').setValue(client.id);
      this.clientOrders.client = client;
      SharedService.scrollBottom();
    } else {
      this.form.get('client_id').setValue(null);
      this.clientOrders.client = null;
    }
  }

  set addressSelected(address: IClientAddressOrder) {
    if (address) {
      this.form.get('address_id').setValue(address.id);
      this.clientOrders.address = address;
      SharedService.scrollBottom();
    } else {
      this.form.get('address_id').setValue(null);
      this.clientOrders.address = null;
    }
  }

  constructor(private dialog: MatDialog, private activatedRouter: ActivatedRoute, router: Router, standard: StandartSearchService) {
    super(activatedRouter, standard, router);
  }

  ngOnInit(): void {
    this.init();
  }

  setData(data): void {
    if (this.status === 'create') {
      console.log(data);
    }
    this.typesOrders = data.types;
    this.channelsOrders = data.channels;
    this.companies = data?.companies || [];
  }

  getData($event): void {
    console.log($event);
    this.clientOrders.data = new Map<number, IClientOrder>($event.data.map((item: IClientOrder) => [item['id'], item]));
    console.log(this.clientOrders);
  }

  selectedClient(event: MatSelectionListChange): void {
    const key = event.options[0].value;
    console.log(event, key);
    this.clientSelected = this.clientOrders.data.get(key);
    console.log(this.form.get('client_id').value);
  }

  selectedAddress(event: MatSelectionListChange): void {
    const key = event.options[0].value;
    console.log(event, key);
    this.addressSelected = this.clientOrders.addressesData.get(key);
    console.log(this.form.get('address_id').value);
  }

  removeClientSelected(): void {
    this.clientSelected = null;
  }

  changeStepper(event: StepperSelectionEvent): void {
    console.log(event);
    if (event.selectedStep.label === 'address') {
      this.clientOrders.getAddresses(this.standard_service);
    }
  }

  openDialogCreateOrEdit(address_id: number = null): void {
    this.dialog.open(CreateOrEditAddressClientComponent, {
      data: {
        isoObligate: false,
        client_id: this.clientSelected.id,
        address_id
      },
      disableClose: true
    }).beforeClosed().subscribe(res => {
      if (res?.success) {
        this.clientOrders.addressesData.set(res.data.id, res.data);
      }
      console.log(res);
    });
  }

  go(data: IOrder): void {
    // this.order = data;
    // this.form.get('id').setValue(data.id);
    // this.isEditStep = false;
    // this.stepper.next();
    this.router.navigate(['/system-orders/orders', data.id, 'edit']);
  }
}



class ClientOrderClass {
  url = 'system-orders/clients';
  data: Map<number, IClientOrder> = new Map<number, IClientOrder>();
  title = 'Buscador Clientes';
  client: IClientOrder = null;
  address: IClientAddressOrder = null;
  isLoadingAddresses: boolean = false;
  addressesData: Map<number, IClientAddressOrder> = new Map<number, IClientAddressOrder>();

  getAddresses(standard_service: StandartSearchService): void {
    this.isLoadingAddresses = true;
    const urlAddressClient = `system-orders/clients/${this.client.id}/addresses`;
    standard_service.index(urlAddressClient).subscribe(res => {
      console.log(res);
      this.isLoadingAddresses = false;
      if (res?.data?.data?.length > 0) {
        this.addressesData = new Map(res.data.data.map(item => [item['id'], item]));
      }
    }, err => {
      this.isLoadingAddresses = false;
      console.log(err);
    });
  }

}
