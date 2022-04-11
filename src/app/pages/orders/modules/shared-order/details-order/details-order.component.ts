import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOrder } from '../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss']
})
export class DetailsOrderComponent implements OnInit {

  isLoading = false;
  order: IOrder = null;
  constructor(public dialogRef: MatDialogRef<DetailsOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order_id: number}, private s_standard: StandartSearchService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.s_standard.methodGet(`system-orders/orders/${this.data.order_id}`).subscribe(res => {
      if (res?.success) {
        this.order = res.data;
      }
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

}
