import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-invoices-order',
  templateUrl: './invoices-order.component.html',
  styleUrls: ['./invoices-order.component.scss']
})
export class InvoicesOrderComponent implements OnInit {

  constructor() { }

  @Input() order_id: number;
  @Output() change = new EventEmitter<any>();

  ngOnInit(): void {
  }

}
