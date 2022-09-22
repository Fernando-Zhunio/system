import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
// import { DialogProductsService } from '../../services/dialog-products.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  @Input() urlSearch: string;
  @Input() onlyOne: boolean = false;
  constructor() { }
  products:  Map<number, any> = new Map<number, any>();
  @Input() productsSelected: Map<number, any> = new Map<number, any>();
  @Output() isClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @ContentChild(TemplateRef) templateRef:TemplateRef<any>;
  ngOnInit() {
  }

  getData(data) {
    this.products = new Map(data.data.map((item: any) => [item.id, item]));
    // console.log(this.products);
  }

  addProduct(key) {
    if (this.onlyOne) {
      this.productsSelected.clear();
    }
    this.productsSelected.set(key, this.products.get(key));
    this.add.emit(this.products.get(key));
  }

  removeProduct(key) {
    this.productsSelected.delete(key);
    this.remove.emit(key);
  }

  close() {
    this.isClose.emit(true);
  }

  // closeDialog() {
  //   this.dialogProduct.close('hola');
  // }

}
