import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transference-order',
  templateUrl: './transference-order.component.html',
  styleUrls: ['./transference-order.component.scss']
})
export class TransferenceOrderComponent implements OnInit {

  constructor() { }
  @Input() order_id: number;

  ngOnInit() {
  }

}
