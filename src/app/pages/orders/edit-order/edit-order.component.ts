import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { IChannelOrder, IItemOrder, IOrder, IPaymentOrder } from '../../../interfaces/iorder';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SelectClientAddressModalComponent } from '../components/select-client-address-modal/select-client-address-modal.component';
import { SelectClientModalComponent } from '../components/select-client-modal/select-client-modal.component';
import { TranslatefzPipe } from './../../../pipes/translatefz.pipe';

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
  items: Map<number, IItemOrder> = new Map<number, IItemOrder>();
  types: any[] = [];
  channels: IChannelOrder[] = [];
  paymentsMap: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  discountsAndTaxes: Map<number, IPaymentOrder> = new Map<number, IPaymentOrder>();
  hideTotals = true;
  data: any = null;
  statuses: any[] = [];
  pipeTrans = new TranslatefzPipe();
  ngOnInit() {
    this.getStatuses();
    this.standard.methodGet(`system-orders/orders/${this.id}/edit`).subscribe(data => {
      console.log(data);
      if (data?.success) {
        this.order = data.data.order;
        this.channels = data.data.channels;
        this.types = data.data.types;
        this.fillData();
      }
    });
  }

  getStatuses(): void {
    this.standard.methodGet(`system-orders/orders/${this.id}/statuses`).subscribe(res => {
      if (res.success) {
        if (res.data?.length > 0) {
          this.statuses = res.data;
        }
      }
    });
  }

  fillData(): void {
    if (this.order?.items && this.order.items.length > 0) {
      this.items = new Map<number, IItemOrder>(this.order.items.map(item => [item.id, item]));
    }
    // this.items = new Map<number, IItemOrder>(data.data.order.items.map(item => [item.id, item]));
    if (this.order.payments && this.order.payments.length > 0) {
      this.paymentsMap = new Map<number, IPaymentOrder>(this.order.payments.map(item => [item.id, item]));
    }
    if (this.order.additional_amounts && this.order.additional_amounts.length > 0) {
      console.log(this.order.additional_amounts);
      this.discountsAndTaxes = new Map<number, any>(this.order.additional_amounts.map(item => [item.id, item]));
    }
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

  getOrder(): void {
    this.standard.methodGet(`system-orders/orders/${this.order.id}`).subscribe(res => {
      if (res.success) {
        this.order = res.data;
        this.fillData();
      }
    });
  }

}
