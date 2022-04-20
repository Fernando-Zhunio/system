import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardBrand } from '../../../../../../class/card-brand';
import { ITransactionPaymentOrder } from '../../../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../../../services/standart-search.service';

@Component({
  selector: 'app-transactions-payment',
  templateUrl: './transactions-payment.component.html',
  styleUrls: ['./transactions-payment.component.scss']
})
export class TransactionsPaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: { order_id, payment_id },
    private dialog: MatDialogRef<TransactionsPaymentComponent>,
    private standard: StandartSearchService,
  ) { }
  isLoading = false;
  transactions: ITransactionPaymentOrder[] = [];
  detailsTransaction: ITransactionPaymentOrder = null;
  cards = new CardBrand();
  hiddenDetails = true;

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    const url = `system-orders/orders/${this.data.order_id}/payments/${this.data.payment_id}/transactions`;
    this.isLoading = true;
    this.standard.methodGet<ITransactionPaymentOrder[]>(url).subscribe(res => {
      console.log(res);
      this.transactions = res.data;
      this.isLoading = false;
    }, err => {
      this.dialog.close();
      this.isLoading = false;
    });
  }

  moreInfo(id: number): void {
    this.detailsTransaction = this.transactions.find(x => x.id === id);
    this.hiddenDetails = false;
  }

}