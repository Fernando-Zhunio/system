import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { IOrder } from '../../../../interfaces/iorder';
import { IClientOrder } from '../../../../interfaces/iclient-order';
import { IClientAddressOrder } from '../../../../interfaces/iclient-address-order';
import { SharedService } from '../../../../services/shared/shared.service';
import { CreateOrEditAddressClientComponent } from '../../modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { PermissionOrders, PermissionOrdersClients } from '../../../../class/permissions-modules';

@Component({
  selector: 'app-create-or-edit-order',
  templateUrl: './create-or-edit-order.component.html',
  styleUrls: ['./create-or-edit-order.component.scss']
})
export class CreateOrEditOrderComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Orden ';
  public urlSave: any = 'system-orders/orders';
  @ViewChild('stepper') stepper: MatHorizontalStepper;

  override loadCreate: boolean = false;
  typesOrders: any[] = [];
  channelsOrders: any[] = [];
  clientOrders: ClientOrderClass = new ClientOrderClass();
  order: IOrder;
  isEditStep: boolean = true;
  override form: FormGroup = new FormGroup({
    // id: new FormControl({ value: null, disabled: true }, [Validators.required]),
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

  permissions = PermissionOrders;
  permissionsClient = PermissionOrdersClients;
  workspace: string | null = null;

  get clientSelected(): IClientOrder | null{
    return this.clientOrders.client;
  }

  get addressSelected(): IClientAddressOrder | null {
    return this.clientOrders.address;
  }

  set clientSelected(client: IClientOrder | null) {
    if (client) {
      this.form.get('client_id')?.setValue(client.id);
      this.clientOrders.client = client;
      SharedService.scrollBottom();
    } else {
      this.form.get('client_id')?.setValue(null);
      this.clientOrders.client = null;
    }
  }

  set addressSelected(address: IClientAddressOrder | null) {
    if (address) {
      this.form.get('address_id')?.setValue(address.id);
      this.clientOrders.address = address;
      SharedService.scrollBottom();
    } else {
      this.form.get('address_id')?.setValue(null);
      this.clientOrders.address = null;
    }
  }

  constructor(private dialog: MatDialog, activatedRouter: ActivatedRoute, router: Router, standard: StandartSearchService) {
    super(activatedRouter, standard, router);
  }

  ngOnInit(): void {
    this.init();
  }

  override setData(data): void {
    this.typesOrders = data.types;
    this.channelsOrders = data.channels;
    this.companies = data?.companies || [];
    this.workspace = data.workspace;
  }

  getData($event): void {
    this.clientOrders.data = new Map<number, IClientOrder>($event.data.map((item: IClientOrder) => [item['id'], item]));
  }

  selectedClient(event: MatSelectionListChange): void {
    const key = event.options[0].value;
    const client = this.clientOrders.data.get(key);
    if (client) {
      this.clientSelected = client;
    }
    // this.clientSelected = this.clientOrders.data.get(key) ;
  }

  selectedAddress(event: MatSelectionListChange): void {
    const key = event.options[0].value;
    this.addressSelected = this.clientOrders.addressesData.get(key)!;
  }

  removeClientSelected(): void {
    this.clientSelected = null;
  }

  changeStepper(event: StepperSelectionEvent): void {
    if (event.selectedStep.label === 'address') {
      this.clientOrders.getAddresses(this.standard_service);
    }
  }

  openDialogCreateOrEdit(address_id: number | null = null): void {
    this.dialog.open(CreateOrEditAddressClientComponent, {
      data: {
        isoObligate: false,
        client_id: this.clientSelected!.id,
        address_id
      },
      disableClose: true
    }).beforeClosed().subscribe(res => {
      if (res?.success) {
        this.clientOrders.addressesData.set(res.data.id, res.data);
      }
    });
  }

  override go(data): void {
    this.router.navigate(['/system-orders/orders', data.id, 'edit']);
  }
}



class ClientOrderClass {
  url = 'system-orders/clients';
  data: Map<number, IClientOrder> = new Map<number, IClientOrder>();
  title = 'Buscador Clientes';
  client: IClientOrder | null;
  address: IClientAddressOrder | null;
  isLoadingAddresses: boolean = false;
  addressesData: Map<number, IClientAddressOrder> = new Map<number, IClientAddressOrder>();

  getAddresses(standard_service: StandartSearchService): void {
    this.isLoadingAddresses = true;
    const urlAddressClient = `system-orders/clients/${this.client?.id}/addresses`;
    standard_service.index(urlAddressClient).subscribe(res => {
      this.isLoadingAddresses = false;
      if (res?.data?.data?.length > 0) {
        this.addressesData = new Map(res.data.data.map(item => [item['id'], item]));
      }
    }, () => {
      this.isLoadingAddresses = false;
    });
  }

}
