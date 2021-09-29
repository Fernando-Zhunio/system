import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IprestashopProduct } from '../../interfaces/iprestashop-product';
import { IproductVtex, IproductVtexSku } from '../../interfaces/iproducts';
import { InfoViewComponent } from '../modals/info-view/info-view.component';
import { SharedService } from './../../services/shared/shared.service';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.css']
})
export class PaginaWebComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Input() prestashop_product: IproductVtexSku;
  ngOnInit(): void {
  }

  openDescription(): void{
    this.dialog.open(InfoViewComponent, {
      data: {name: this.prestashop_product.name, title: "Descripcion", info: this.prestashop_product.vtex_product.description, isHtml: false},
    });
  }

  rediredImgBag(img): string {
    const imagen = img ? img[0]?.ImageUrl : null;
    return SharedService.rediredImageNull(imagen);
  }



}
