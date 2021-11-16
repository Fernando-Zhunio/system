import { Component, OnInit } from '@angular/core';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-versus-productos',
  templateUrl: './versus-productos.component.html',
  styleUrls: ['./versus-productos.component.css']
})
export class VersusProductosComponent implements OnInit {

  constructor(private s_standart: StandartSearchService) { }
  products: any[] = [];
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(page= null): void {
    const url = 'products-admin/products?page=1';
    this.s_standart.index(url).subscribe(res => {
      console.log(res);
    });
  }

}
