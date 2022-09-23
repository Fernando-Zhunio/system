import { Component, OnInit, Input } from '@angular/core';
import { IClientOrder } from './../../../../interfaces/iclient-order';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @Input() client: IClientOrder;
  constructor() { }

  ngOnInit(): void {
  }

}
