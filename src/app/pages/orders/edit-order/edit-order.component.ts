import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IChannelOrder, IItemOrder, IOrder } from '../../../interfaces/iorder';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SelectClientAddressModalComponent } from '../components/select-client-address-modal/select-client-address-modal.component';
import { SelectClientModalComponent } from '../components/select-client-modal/select-client-modal.component';
import { CreateOrEditAddressClientComponent } from '../modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  constructor(private standard: StandartSearchService, private activated_router: ActivatedRoute, private dialog: MatDialog) { }
  readonly id = this.activated_router.snapshot.params['order_id'];
  order: IOrder = null;
  items:  Map<number, IItemOrder> = new Map<number, IItemOrder>();
  types: any[] = [];
  channels: IChannelOrder[] = [];
  ngOnInit() {
    console.log(this.id);
    this.standard.methodGet(`system-orders/orders/${this.id}/edit`).subscribe(data => {
      console.log(data);
      if (data?.success) {
        this.order = data.data.order;
        this.items = new Map<number, IItemOrder>(data.data.order.items.map(item => [item.id, item]));
        this.channels = data.data.channels;
        this.types = data.data.types;
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
