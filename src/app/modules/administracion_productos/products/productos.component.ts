import { MethodsHttpService } from './../../../services/methods-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { IProducts } from '../../../interfaces/iproducts';
import { RequestPaginate } from '../../../services/methods-http.service';
import { Product } from './interfaces/product';
import { PageEvent } from '@angular/material/paginator';
import { NgxSearchBarComponent, NgxSearchBarFilter } from 'ngx-search-bar-fz';
import { MatTableHelper } from '../../../shared/class/mat-table-helper';
import { MatTable } from '@angular/material/table';

declare let Swal: any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent extends MatTableHelper<any> implements OnInit {
  protected columnsToDisplay: string[] = ['code', 'code_alt', 'description', 'prefix', 'category', 'sequence', 'brand', 'actions'];
  protected url: string;
  protected table: MatTable<any>;
  protected mhs: MethodsHttpService;
  constructor(
    private methods_http: MethodsHttpService,
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
  // pageCurrent: number = 1;
  // perPage: number = 10;
  totalItem: number = 0;
  paginator: PageEvent = {
    pageIndex: 0,
    length: 0,
    pageSize: 0
  }

  filters: NgxSearchBarFilter = {
    id: {
      friendlyName: '#',
      value: null
    },
    code: {
      friendlyName: "Código",
      value: null,
    },
    code_alt: {
      friendlyName: "C Alt.",
      value: null
    },
    description: {
      friendlyName: "Descripción",
      value: null
    },
    prefix: {
      friendlyName: "Prefijo",
      value: null
    },
    category: {
      friendlyName: "Categoría",
      value: null
    },
    sequence: {
      friendlyName: "Secuencia",
      value: null
    },
    brand: {
      friendlyName: "Marca",
      value: null
    }
  }

  // formProducts: FormGroup = new FormGroup({
  //   id: new FormControl('', [Validators.required]),
  //   code: new FormControl('', [Validators.required]),
  //   code_alt: new FormControl('', [Validators.required]),
  //   name: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required]),
  //   prefix: new FormControl('', [Validators.required]),
  //   category: new FormControl('', [Validators.required]),
  //   sequence: new FormControl('', [Validators.required]),
  //   brand: new FormControl('', [Validators.required]),
  // });
  ngOnInit(): void {
    // const pageInitial =
    //   Number.parseInt(this.activeRoute.snapshot.queryParamMap.get('page')!) || 1;
    // const params = this.getQueryParams();
    // params ? this.nextPage(pageInitial, params) : this.nextPage(pageInitial);
    console.log('products')
  }

  // getQueryParams() {
  //   let params = {};
  //   params = JSON.parse(JSON.stringify(this.activeRoute.snapshot.queryParamMap['params']));
  //   if (params.hasOwnProperty('page')) {
  //     delete params['page'];
  //   }
  //   if (params != '{}') {
  //     try {
  //       const keysParams = Object.keys(params)
  //       for (let i = 0; i < keysParams.length; i++) {
  //         this.formProducts.controls[keysParams[i]].setValue(params[keysParams[i]]);
  //       }
  //       return params;
  //     } catch (error) {
  //       console.error(error);

  //       return null;
  //     }
  //   }
  //   return null;
  // }

  // nextPage(pageNumber = 1, params: any = null): void {
  //   const dataValid = params ? params : this.findValidControls();
  //   this.methods_http.methodGet('products-admin/products', { ...dataValid, page: pageNumber }).subscribe((res: any) => {
  //     if (res && res.hasOwnProperty('success') && res.success) {
  //       this.products = res.data;
  //       this.totalItem = this.products.total;
  //       this.perPage = this.products.per_page;
  //       this.pageCurrent = this.products.current_page;
  //       this.gotoTop();
  //       const queryParams: Params = { page: this.pageCurrent, ...dataValid };
  //       this.router.navigate([], {
  //         relativeTo: this.activeRoute,
  //         queryParams: queryParams,
  //         replaceUrl: true,
  //       });
  //     }
  //   });
  // }

  // gotoTop() {
  //   const main = document.getElementsByClassName('app-body');
  //   main[0].scrollTop = 0;
  // }

  // findValidControls() {
  //   const valid = [];
  //   const controls = this.formProducts.controls;
  //   for (const name in controls) {
  //     if (controls[name].valid) {
  //       valid[name] = controls[name].value;
  //     }
  //   }
  //   return valid;
  // }

  // goCreate(): void {
  //   this.router.navigate(['/admin-products/productos/create']);
  // }

  destroyProduct(id): void {
    const productIndex = this.products.findIndex((x) => x.id === id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Seguro que quieres eliminar esta Categoría ?',
        text: this.products[productIndex]!.name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
      })
      .then((result) => {

        if (result.isConfirmed) {
          this.methods_http.methodDelete(id).subscribe(() => {
            if (productIndex != -1) { this.products.splice(productIndex, 1); }
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Eliminado con éxito.',
              'success'
            );
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Tu acción a sido cancelada :)',
            'error'
          );
        }
      });
  }

  override getData(event: RequestPaginate<Product>) {
    // this.products = event.data.data
    this.dataSource = event.data.data;
    this.paginator.length = event.data.total
  }

  changePaginator(event: PageEvent): void {
    this.paginator = event
    const params = {
      pageSize: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1
    }
    this.searchBar.search(params)
  }
}
