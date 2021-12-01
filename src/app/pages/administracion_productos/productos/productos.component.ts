import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProducts } from '../../../interfaces/iproducts';
import { ProductsService } from '../../../services/products.service';
import { StandartSearchService } from '../../../services/standart-search.service';

declare let Swal: any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  constructor(
    private s_products: ProductsService,
    private s_standart: StandartSearchService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  permission_create: any[] = ['super-admin', 'products-admin.products.create'];
  permission_edit: any[] = ['super-admin', 'products-admin.products.edit'];
  permission_destroy: any[] = [
    'super-admin',
    'products-admin.products.destroy',
  ];
  products: IProducts;
  pageCurrent: number = 1;
  perPage: number = 10;
  totalItem: number = 0;

  formProducts: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    code_alt: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    prefix: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    sequence: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    const pageInitial =
      Number.parseInt(this.activeRoute.snapshot.queryParamMap.get('page')) || 1;
    const params = this.getQueryParams();
    params ? this.nextPage(pageInitial, params) : this.nextPage(pageInitial);
  }

  getQueryParams() {
    let params = {};
    params = JSON.parse(JSON.stringify(this.activeRoute.snapshot.queryParamMap['params']));
    if (params.hasOwnProperty('page')) {
      delete params['page'];
    }
    if (params != '{}') {
      try {
        const keysParams = Object.keys(params)
        for (let i = 0; i < keysParams.length; i++) {
          this.formProducts.controls[keysParams[i]].setValue(params[keysParams[i]]);
        }
        return params;
      } catch (error) {
        console.log(error);

        return null;
      }
    }
    return null;
  }



  nextPage(pageNumber = 1, params = null): void {
    const dataValid = params ? params : this.findValidControls();
    this.s_standart.search2('products-admin/products', { ...dataValid, page: pageNumber }).subscribe((res: any) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        this.products = res.data;
        this.totalItem = this.products.total;
        this.perPage = this.products.per_page;
        this.pageCurrent = this.products.current_page;
        this.gotoTop();
        const queryParams: Params = { page: this.pageCurrent, ...dataValid };
        this.router.navigate([], {
          relativeTo: this.activeRoute,
          queryParams: queryParams,
          replaceUrl: true,
        });
      }
    });
  }

  gotoTop() {
    const main = document.getElementsByClassName('app-body');
    main[0].scrollTop = 0;
  }

  public findValidControls() {
    const valid = [];
    const controls = this.formProducts.controls;
    for (const name in controls) {
      if (controls[name].valid) {
        // valid.push(name);
        valid[name] = controls[name].value;
      }
    }
    return valid;
  }

  goCreate():void {
    this.router.navigate(['/admin-products/productos/create']);
  } 

  destroyProduct(id): void {
    const index = this.products.data.findIndex((x) => x.id === id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Seguro que quieres eliminar esta Categoria ?',
        text: this.products.data[index].name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
      })
      .then((result) => {

        if (result.isConfirmed) {
          this.s_products.destroy(id).subscribe((res) => {
            if (index != -1) { this.products.data.splice(index, 1); }
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Eliminado con exito.',
              'success'
            );
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Tu accion a sido cancelada :)',
            'error'
          );
        }
      });
  }
}
