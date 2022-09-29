import { Component, EventEmitter, Output } from '@angular/core';
import { animation_conditional } from '../../animations/animate_leave_enter';
import { DialogProductsService } from '../../services/dialog-products.service';

@Component({
  selector: 'app-search-products-dialog',
  templateUrl: './search-products-dialog.component.html',
  styleUrls: ['./search-products-dialog.component.scss'],
  animations: animation_conditional
})
export class SearchProductsDialogComponent {

  url: string;
  onlyOne: boolean = false;
  productsSelected: Map<number, any> = new Map<number, any>();

  constructor(
    private dialogService: DialogProductsService 
  ) {}

  products: Map<number, any> = new Map<number, any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  // @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  getData(data: { data: any[]; }) {
    this.products = new Map(data.data.map((item: any) => [item.id, item]));
  }

  addProduct(key) {
    if (this.onlyOne) {
      this.productsSelected.clear();
      this.productsSelected.set(key, this.products.get(key));
      this.close();
    } else {
      this.productsSelected.set(key, this.products.get(key));
      this.add.emit(this.products.get(key));
    }
  }

  removeProduct(key) {
    this.productsSelected.delete(key);
    this.remove.emit(key);
  }

  close() {
    if (this.productsSelected.size > 0) {
      this.dialogService.close({ data: this.onlyOne ? [...this.productsSelected][0][1] : this.productsSelected });
    }
    else {
      this.dialogService.close();
    }
  }

}
