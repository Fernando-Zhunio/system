import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { IChannelOrder, IItemOrder, IOrder, IPaymentOrder } from '../../../interfaces/iorder';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SelectClientAddressModalComponent } from '../components/select-client-address-modal/select-client-address-modal.component';
import { SelectClientModalComponent } from '../components/select-client-modal/select-client-modal.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  constructor(private standard: StandartSearchService, private activated_router: ActivatedRoute, private dialog: MatDialog) { }
  readonly id = this.activated_router.snapshot.params['order_id'];
  order: IOrder = null;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  items:  Map<number, IItemOrder> = new Map<number, IItemOrder>();
  types: any[] = [];
  channels: IChannelOrder[] = [];
  paymentsMap: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  discountsAndTaxes: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();

  ngOnInit() {
    console.log(this.id);
    this.standard.methodGet(`system-orders/orders/${this.id}/edit`).subscribe(data => {
      console.log(data);
      if (data?.success) {
        this.order = data.data.order;
        this.items = new Map<number, IItemOrder>(data.data.order.items.map(item => [item.id, item]));
        this.channels = data.data.channels;
        this.types = data.data.types;
        this.paymentsMap = new Map<number, IPaymentOrder>(this.order.payments.map(item => [item.id, item]));
        this.discountsAndTaxes = new Map<number, any>(this.order.additional_amounts.map(item => [item.id, item]));
      }
    });
  }

  openSelectClient(): void {
    this.dialog.open(SelectClientModalComponent, {
      data: this.order.id,
      disableClose: true,
    }).beforeClosed().subscribe(data => {
      if (data) {
        this.dialog.open(SelectClientAddressModalComponent, {
          data: {
            client: data,
            order_id: this.order.id
          },
          disableClose: true,
        }).beforeClosed().subscribe(data1 => {
          console.log(data1);
          if (data1?.success) {
            this.order = data1.data;
          }
        });
      }

    });
  }
  openDialogAddress(address_id: number = null): void {
    // this.dialog.open(CreateOrEditAddressClientComponent, {
    //   data: {
    //     client_id: this.order.client_id,
    //     order_id: this.order.id,
    //     address_id
    //   },
    //   disableClose: true,
    // }).beforeClosed().subscribe(data1 => {
    //   console.log(data1);
    //   // if (data1?.success) {
    //   //   this.order = data1.data;
    //   // }
    // });
    this.dialog.open(SelectClientAddressModalComponent, {
      data: {
        client: this.order.client,
        order_id: this.order.id
      },
      disableClose: true,
    }).beforeClosed().subscribe(data1 => {
      console.log(data1);
      if (data1?.success) {
        this.order = data1.data;
      }
    });
  }

  loadOrder(): void {
    this.standard.methodGet(`system-orders/orders/${this.id}/edit`).subscribe(data => {
      console.log(data);
      if (data?.success) {
        this.order = data.data.order;
        this.channels = data.data.channels;
        this.types = data.data.types;
      }
    });
  }

}
