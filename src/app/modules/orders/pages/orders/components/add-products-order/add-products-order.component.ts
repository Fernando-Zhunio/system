import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { MatSelectionListChange } from '@angular/material/list';
// import { Observable } from 'rxjs';
import { PermissionOrdersItems } from '../../../../../../class/permissions-modules';
// import { SearchProductModalComponent } from '../../../../components/modals/search-product-modal/search-product-modal.component';
import { IOrder } from '../../../../../../interfaces/iorder';
import { IProduct } from '../../../../../../interfaces/iproducts';
// import { DialogProductsService } from '../../../../../../services/dialog-products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { IPaginate } from '../../../../../../services/standart-search.service';
import { SwalService } from '../../../../../../services/swal.service';
import { SearchProductsDialogComponent } from '../../../../../../shared/search-products-dialog/search-products-dialog.component';
import { CreateHostService } from '../../../../../../shared/services/create-host.service';
import { EditProductOrderComponent } from '../edit-product-order/edit-product-order.component';

@Component({
  selector: 'app-add-products-order',
  templateUrl: './add-products-order.component.html',
  styleUrls: ['./add-products-order.component.scss']
})
export class AddProductsOrderComponent  {

  constructor(private matDialog: MatDialog, private methodsHttp: MethodsHttpService, private chs: CreateHostService) { }
  @Input() order: IOrder;
  @Input() items
  @Input() isCancelled: boolean;
  @Output() changeOrder = new EventEmitter<string>();
  isLoading = false;
  products: Map<number, IProduct> = new Map<number, IProduct>();
  urlProducts: string = 'system-orders/products';
  form: FormGroup = new FormGroup({
    product: new FormControl(null, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
    description: new FormControl(null),
    price: new FormControl(null, [Validators.required]),
  });

  permissionsProducts = PermissionOrdersItems;

  openSearchProducts(): void {
    this.chs.injectComponent(
      SearchProductsDialogComponent,
      {
        url: this.urlProducts,
        onlyOne: true
      }).beforeClose().subscribe(res => {
        console.log(res);
        if (res?.data) {
          this.form.get('product')?.setValue(res.data);
        }
      });
  }

  addItem(): void {
    this.isLoading = true;
    const values = { ...this.form.value, product_id: this.form.getRawValue().product.id };
    this.methodsHttp.methodPost(`system-orders/orders/${this.order.id}/items`, values)
    .subscribe(res => {
      if (res?.success) {
          this.form.reset();
          SwalService.swalToast('Agregado correctamente', 'success' );
        this.changeOrder.emit('change');
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  deleteItemOrder(order_id, id, _callback = null): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el item?', 'warning').then(res => {
      if (res.isConfirmed) {
        this.methodsHttp.methodDelete(`system-orders/orders/${order_id}/items/${id}`).subscribe(res => {
          if (res?.success) {
            SwalService.swalFire({ title: 'Eliminado', text: 'Item eliminado', icon: 'success' });
            this.changeOrder.emit('change');
          }
        });
      }
    });
  }

  getDataProducts(event: IPaginate<IProduct>): void {
    this.products = new Map<number, IProduct>(event.data.map(x => [x.id, x]));
  }

  editItem(id): void {
    this.matDialog.open(EditProductOrderComponent, {
      data: {
        item: this.items.get(id),
        order_id: this.order.id
      },
      disableClose: true,
    })
  }

}
