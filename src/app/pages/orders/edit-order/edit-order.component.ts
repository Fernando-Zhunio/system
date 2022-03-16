import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  constructor(private standard: StandartSearchService, private activated_router: ActivatedRoute) { }
  readonly id = this.activated_router.snapshot.params['order_id'];
  ngOnInit() {
    console.log(this.id);
    this.standard.methodGet(`system-orders/orders/${this.id}/edit`).subscribe(data => {
      console.log(data);
    });
  }

}
