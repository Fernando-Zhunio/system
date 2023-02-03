import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission_products_prices } from '../../../../../../class/permissions-modules';
import { IProductPrice } from '../../../../../../interfaces/iprice';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { SwalService } from '../../../../../../services/swal.service';
import { groupBy } from '../../../../../../shared/class/tools';
import { PRICE_PRODUCT_ROUTE_API_SHOW_DELETE, PRICE_PRODUCT_ROUTE_API_STORE_OR_SHOW } from '../../routes-api/prices-routes-api';

@Component({
  selector: 'app-modal-list-prices',
  templateUrl: './modal-list-prices.component.html',
  styleUrls: ['./modal-list-prices.component.css']
})
export class ModalListPricesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public info, private mhs: MethodsHttpService) { }

  isLoading: boolean = false;
  data: any;
  permissions = Permission_products_prices.prices;
  last_product: IProductPrice | null = null;
  ngOnInit(): void {
    this.mhs.methodGet(PRICE_PRODUCT_ROUTE_API_STORE_OR_SHOW(this.info.id)).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.data = groupBy(res.data, 'price_group_id');
      }
    );
  }

  deletePrice(id: number, price_group_id: number) {
    SwalService.swalConfirmation('¿Está seguro de eliminar el precio?', '', 'warning').then(
      (res: any) => {
        if (res.isConfirmed) {
          this.mhs.methodDelete(PRICE_PRODUCT_ROUTE_API_SHOW_DELETE(this.info.id, id)).subscribe(
            (res: any) => {
              this.data[price_group_id].splice(this.data[price_group_id].findIndex(x => x.id == id), 1);
              this.last_product = res.data;
            }
          );
        }
      }
    );
  }


}
