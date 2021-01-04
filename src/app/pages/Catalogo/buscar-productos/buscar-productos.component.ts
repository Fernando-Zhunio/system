import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {

  constructor(private s_product: ProductsService) { }

  products=[];
  isColumns:boolean=true;
  search_name:string = "";
  // wordSearch:string="";
  ngOnInit(): void {
    this.s_product.searchProduct(this.search_name).subscribe(
      res=>{
        console.log(res);
        this.products = res.products.data;
      }
    )
  }

  selectEvent(event):void{
    console.log(event.target);
  }

  searchAutocomplete(){
    if(this.search_name.length > 3)
    {
      this.s_product.searchProduct(this.search_name).subscribe(
        res=>{
          console.log(res);
          this.products = res.products.data;
        }
      )
    }
  }
}
