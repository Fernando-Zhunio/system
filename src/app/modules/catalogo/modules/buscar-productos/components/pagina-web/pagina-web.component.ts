import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IproductVtexSku } from '../../../../../../interfaces/iproducts';
import { zoomImage } from '../../../../../../shared/class/tools';
import { InfoViewComponent } from '../../../../components/info-view/info-view.component';
// import { SharedService } from '../../../../../../services/shared/shared.service';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.scss']
})
export class PaginaWebComponent {

  constructor(private dialog: MatDialog) { }

  @Input() skus: IproductVtexSku[] = [];

  openDescription(id: number): void{
    const sku = this.skus.find(sku => sku.id === id);
    if (!sku) return;

    this.dialog.open(InfoViewComponent, {
      data: {name: sku.name, title: 'Descripción', info: sku.vtex_product?.description, isHtml: false},
    });
  }

  zoom(event): void {
    console.log(event.target);
    zoomImage(event.target)
  }
}
