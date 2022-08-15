import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MethodsHttpService } from '../../../../services/methods-http.service';

@Component({
  selector: 'app-log-order-modal',
  templateUrl: './log-order-modal.component.html',
  styleUrls: ['./log-order-modal.component.scss']
})
export class LogOrderModalComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService, @Inject(MAT_DIALOG_DATA) public dataExternal: {order_id: number}) { }

  dataLog: any[] = [];
  isLoading = false;
  ngOnInit() {
    this.isLoading = true;
    const url = `system-orders/orders/${this.dataExternal.order_id}/activity-log`;
    this.methodsHttp.methodGet(url).subscribe({
      next: (res) => {
        console.log(res)
        this.dataLog = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

}
