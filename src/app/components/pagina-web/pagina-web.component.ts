import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IprestashopProduct } from '../../interfaces/iprestashop-product';
import { InfoViewComponent } from '../modals/info-view/info-view.component';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.css']
})
export class PaginaWebComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  @Input() prestashop_product:IprestashopProduct;
  ngOnInit(): void {
  }

  openDescription():void{
    this.dialog.open(InfoViewComponent, { 
      data: {name: this.prestashop_product.name, title:"Descripcion",info:this.prestashop_product.description,isHtml:true},
    });
  }

}
