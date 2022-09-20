import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import { PermissionOrdersItems } from '../../../../class/permissions-modules';
import { IItemOrder, IOrder } from '../../../../interfaces/iorder';
import { IProduct } from '../../../../interfaces/iproducts';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { IPaginate } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-add-products-order',
  templateUrl: './add-products-order.component.html',
  styleUrls: ['./add-products-order.component.scss']
})
export class AddProductsOrderComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService) { }
  @Input() order: IOrder;
  @Input() items
  @Input() isCancelled: boolean;
  @Output() changeOrder = new EventEmitter<string>();
  productsSelected : Map<number, IItemOrder> = new Map<number, IItemOrder>();
  itemEditing: IItemOrder;
  isOpenSearchProducts = false;
  isEditingItem = false;
  isLoading = false;
  products: Map<number, IProduct> = new Map<number, IProduct>();
  urlProducts: string = 'system-orders/products';
  form: FormGroup = new FormGroup({
    product: new FormControl(null, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
    description: new FormControl(null),
    price: new FormControl(null, [Validators.required]),
  });
  formEdit: FormGroup = new FormGroup({
    product: new FormControl({ value: null, disabled: true }, [Validators.required]),
    description: new FormControl(null),
    quantity: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  });

  permissionsProducts = PermissionOrdersItems;


  ngOnInit() {
  }

  createOrEditItemOrder(): void {
    const form = this.isEditingItem ? this.formEdit : this.form;
    if (form.valid) {
      this.createOrEdit({ order_id: this.order.id, form: {...form.value, product_id: form.value.product.id}, isEdit: this.isEditingItem });
    } else {
      SwalService.swalFire({ title: 'Error', text: 'Faltan datos', icon: 'error' });
    }
  }

  openSearchProducts(): void {
    this.isOpenSearchProducts = true;
    // const currentProduct = this.form.get('product')?.value;
    // if (currentProduct) {
    //   this.productsSelected.delete(currentProduct.id);
    // }
  }

  addProduct(product: any | null) : void {
    // const product = this.productsSelected.get(id);
    // this.form.get('product_id')?.setValue(product?.id);
    if (product) {
      if (this.isEditingItem) {
        this.formEdit.get('product')?.setValue(product);
      } else {
        this.form.get('product')?.setValue(product);
      }
      this.isOpenSearchProducts = false;
    }

  }

  createOrEdit({ order_id, form, isEdit }): void {
    this.isLoading = true;
    let observer: Observable<any>;
    if (isEdit) {
      observer = this.methodsHttp.methodPut(`system-orders/orders/${order_id}/items/${this.itemEditing.id}`, form);
    } else {
      observer = this.methodsHttp.methodPost(`system-orders/orders/${order_id}/items`, form);
    }
    observer.subscribe(res => {
      if (res?.success) {
        if (this.isEditingItem) {
          this.disabledEditingItemOrder();
          this.formEdit.reset();
          SwalService.swalFire({ title: 'Mensaje', text: 'Actualizado correctamente', icon: 'success' });
        } else {
          this.form.reset();
        }
        this.changeOrder.emit('change');
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  disabledEditingItemOrder(): void {
    this.isEditingItem = false;
    this.form.enable();
    this.formEdit.disable();
  }

  enabledEditingItemOrder(id): void {
    this.itemEditing = this.items.get(id)!;
    this.isEditingItem = true;
    this.form.disable();
    this.formEdit.enable();
    this.formEdit.patchValue({
      quantity: this.itemEditing.quantity,
      price: this.itemEditing.price,
      description: this.itemEditing.description,
      product: this.itemEditing?.product,
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

  selectedProduct(event: MatSelectionListChange): void {
    if (this.isEditingItem) {
      this.formEdit.get('product_id')?.setValue(event.options[0].value);
      const nameProduct = this.products.get(event.options[0].value)?.name;
      this.formEdit.get('product')?.setValue(nameProduct);
      this.isOpenSearchProducts = false;
    } else {
      this.form.get('product_id')?.setValue(event.options[0].value);
      const nameProduct = this.products.get(event.options[0].value)?.name;
      this.form.get('product')?.setValue(nameProduct);
      this.isOpenSearchProducts = false;
    }
  }

}
