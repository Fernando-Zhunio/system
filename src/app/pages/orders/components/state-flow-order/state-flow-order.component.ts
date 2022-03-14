import { Component, Input, OnInit } from '@angular/core';
import * as FlowChart from 'flowchart.js';
@Component({
  selector: 'app-state-flow-order',
  templateUrl: './state-flow-order.component.html',
  styleUrls: ['./state-flow-order.component.scss']
})
export class StateFlowOrderComponent implements OnInit {

  constructor() { }
  @Input() newStatus: string;
  currentStatus = 'created';
 statuses: any = {
   created: {name: 'Creado', enabled: false},
   paid: {name: 'Pagado', enabled: false},
   partially_paid: {name: 'Parcialmente pagado', enabled: false},
   cancelled: {name: 'Cancelado', enabled: false},
   refunded: {name: 'Reembolsado', enabled: false},
 };
  ngOnInit() {
    if (this.newStatus) {
      this.statuses[this.newStatus].enabled = true;
      this.statuses[this.currentStatus].enabled = false;
      this.currentStatus = this.newStatus;
    }
  }

  changeStatus(status: string) {
    this.statuses[this.currentStatus].enabled = false;
    this.statuses[status].enabled = true;
    this.currentStatus = status;
  }

}
