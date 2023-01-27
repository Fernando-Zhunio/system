import { FormControl, FormGroup } from '@angular/forms';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Component, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product';
import { NgxSearchBarComponent } from 'ngx-search-bar-fz';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { MatTable } from '@angular/material/table';

declare let Swal: any;
@Component({
  selector: 'app-productos',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.css'],
})
export class ProductsIndexComponent extends MatTableHelper<any> {
  protected columnsToDisplay: string[] = ['code', 'code_alt', 'name', 'description', 'prefix', 'category', 'sequence', 'brand', 'actions'];
  protected url: string = 'products-admin/products';
  @ViewChild(MatTable) protected table: MatTable<any>;
  constructor(
    protected mhs: MethodsHttpService,
  ) {
    super();
   }

  permission_create: any[] = ['super-admin', 'products-admin.products.create'];
  permission_edit: any[] = ['super-admin', 'products-admin.products.edit'];
  permission_destroy: any[] = [
    'super-admin',
    'products-admin.products.destroy',
  ];
  @ViewChild(NgxSearchBarComponent) searchBar: NgxSearchBarComponent
  products: Product[] = [];
  // filters: NgxSearchBarFilter = {
  //   id: {
  //     friendlyName: '#',
  //     value: null
  //   },
  //   code: {
  //     friendlyName: "Código",
  //     value: null,
  //   },
  //   code_alt: {
  //     friendlyName: "C Alt.",
  //     value: null
  //   },
  //   description: {
  //     friendlyName: "Descripción",
  //     value: null
  //   },
  //   prefix: {
  //     friendlyName: "Prefijo",
  //     value: null
  //   },
  //   category: {
  //     friendlyName: "Categoría",
  //     value: null
  //   },
  //   sequence: {
  //     friendlyName: "Secuencia",
  //     value: null
  //   },
  //   brand: {
  //     friendlyName: "Marca",
  //     value: null
  //   }
  // }

  formFilter: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    code_alt: new FormControl(''),
    description: new FormControl(''),
    prefix: new FormControl(''),
    category: new FormControl(''),
    sequence: new FormControl(''),
    brand: new FormControl(''),
  });

}
