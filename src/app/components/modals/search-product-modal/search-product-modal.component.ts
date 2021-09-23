import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-search-product-modal',
  templateUrl: './search-product-modal.component.html',
  styleUrls: ['./search-product-modal.component.css']
})
export class SearchProductModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<SearchProductModalComponent>
  ) { }
  ngOnInit(): void {

  }

  products: any[] = []

  getProducts(event): void {
    this.products = event.data.data;
  }

  changeProduct(ind): void {
    this.dialogRef.close({id_product: this.products[ind].id})
  }

  captureImagenProduct(i): string | boolean {
    if (this.products[i]?.prestashop_products.length > 0) {
      return this.products[i].prestashop_products[0].image;
    }
    if (this.products[i].ml_infos.length > 0) {
      return this.products[i].ml_infos[0].image;
    }
    return 'assets/img/img_default_null.jpg';
  }

}
