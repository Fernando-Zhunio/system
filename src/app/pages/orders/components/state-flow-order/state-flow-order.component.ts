import { Component, Input, OnInit } from '@angular/core';
// import * as FlowChart from 'flowchart.js';
import { IStatus } from '../../../../interfaces/iorder';
// import { TranslatefzPipe } from './../../../../pipes/translatefz.pipe';
@Component({
  selector: 'app-state-flow-order',
  templateUrl: './state-flow-order.component.html',
  styleUrls: ['./state-flow-order.component.scss']
})
export class StateFlowOrderComponent implements OnInit {

  constructor() { }
  // translateFz = new TranslatefzPipe;
  @Input() newStatus: string = null;
  currentStatus = 'created';
  @Input() statuses: IStatus[] = [
    // { type: 'created', name: 'Creado', enabled: false  },
    // { type: 'paid', name: 'Pagado', enabled: false },
    // { type: 'partially_paid', name: 'Parcialmente pagado', enabled: false },
    // { type: 'cancelled', name: 'Cancelado', enabled: false } ,
    // { type: 'refunded', name: 'Reembolsado', enabled: false } ,
  ];
  ngOnInit() {
    // console.log(this.newStatus);
    // if (this.newStatus) {
    //   this.statuses.find(x => x.type == this.newStatus).enabled = true;
    //   this.currentStatus = this.newStatus;
    // } else {
    //   this.statuses.find(x => x.type == this.currentStatus).enabled = true;
    // }
  }

  changeStatus(status: string) {
    // this.statuses.find(x => x.type == this.currentStatus).enabled = false;
    // this.statuses.find(x => x.type == status).enabled = true;
    // this.currentStatus = status;
  }

}
