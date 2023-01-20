import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';

@Component({
  selector: 'app-stock-rappi-modal',
  templateUrl: './stock-rappi-modal.component.html',
  styleUrls: ['./stock-rappi-modal.component.scss']
})
export class StockRappiModalComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService, @Inject(MAT_DIALOG_DATA) public product: {id: number, name: string}) { }

  ngOnInit() {
    this.getStockProduct();
  }

  items = [];
  isLoading = false;

  getStockProduct(): void {
    this.isLoading = true;
    this.methodsHttp.methodGet(`rappi-service/products/${this.product.id}/stocks`).subscribe(
      {
        next: (res: any) => {
          this.items = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      }
    );
  }

}
