import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission_products_prices } from '../../../../../class/permissions-modules';
// import { prices_permission_module } from '../../../../../class/permissions-modules/prices-permissions';
import { IProductPrice } from '../../../../../interfaces/iprice';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-modal-list-prices',
  templateUrl: './modal-list-prices.component.html',
  styleUrls: ['./modal-list-prices.component.css']
})
export class ModalListPricesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public info, private standard: StandartSearchService) { }

  isLoading: boolean = false;
  data: any;
  product_name: string = '';
  permissions = Permission_products_prices.prices;
  last_product: IProductPrice = null;
  ngOnInit(): void {
    this.product_name = this.info.product_name
    this.standard.show(`catalogs/products/${this.info.id}/prices`).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.data = this.groupBy(res.data, 'price_group_id');
      }
    );
  }

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  deletePrice(id: number, price_group_id: number) {
    SwalService.swalConfirmation('¿Está seguro de eliminar el precio?', '', 'warning').then(
      (res: any) => {
        if (res.isConfirmed) {
          this.standard.destory(`catalogs/products/${this.info.id}/prices/${id}`).subscribe(
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
