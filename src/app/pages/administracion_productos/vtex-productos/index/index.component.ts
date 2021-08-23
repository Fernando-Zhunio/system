import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { Ipagination } from '../../../../interfaces/ipagination';
import { IproductVtexSku } from '../../../../interfaces/iproducts';
import { IproductVtex } from './../../../../interfaces/iproducts';
import { SwiperOptions } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { ModalSkuComponent } from './../modal-sku/modal-sku.component';
import { SwalService } from '../../../../services/swal.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { ModalPricesComponent } from './../templates/modal-prices/modal-prices.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private modal:MatDialog,private s_serviceStandart: StandartSearchService) { }

  permission_page = {product_edit:['products-admin.vtex.product-vtex.edit'],sku_edit:['products-admin.vtex.products.skus.edit']}
  min:number;max:number;
  warehouse_ids:any[];
  prefix_id:string;
  isload:boolean;
  url:string = "products-admin/vtex/product-vtex";
  paginator: Ipagination<IproductVtex>;
  products:IproductVtex[] = [];
  img_not:string = environment.img_not_default;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  public config: SwiperOptions = {
    // a11y: { enabled: true },
    direction: "horizontal",
    spaceBetween: 10,
    // slidesPerView: 4,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      // when window width is >= 640px
      601: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      950: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
    // keyboard: true,
    // mousewheel: true,
    scrollbar: true,
    // navigation: true,
    pagination: false,
  };
  ngOnInit(): void {
  }

  loadData($event): void {
    this.paginator = $event.data;
    this.products = this.paginator.data;
    console.log(this.paginator);
  }

  changePaginator(event):void{
    this.headerComponent.searchBar(event);
    console.log(event);
  }

  showSku(id):void{
    this.modal.open(ModalSkuComponent,{
      data:{id},
      disableClose:true,
      hasBackdrop:true
    })
  }

  deleteVtexProduct(vtex_api_id):void{
    SwalService.swalConfirmation("Eliminacion de producto","Desea eliminar este producto?","center","Si, eliminar","No, cancelar").then(result=>{
      if(result.isConfirmed){
        this.s_serviceStandart.destory(`products-admin/vtex/product-vtex/${vtex_api_id}`).subscribe(res=>{
          console.log(res);
          if(res && res.hasOwnProperty('success') && res.success){
           const index = this.products.findIndex(i=>i.vtex_api_id == vtex_api_id);
            this.products.splice(index ,1 );
          }

        })
      }
    })
  }

  openModalPrices(vtex_api_id,index):void{
    console.log(vtex_api_id,index,this.products);

    const sku = this.products[index].skus.find(item=> item.vtex_api_id == vtex_api_id);
    console.log(sku);

    this.modal.open(ModalPricesComponent,{
      data:{sku},
      disableClose:true,
      hasBackdrop:true,
      panelClass:'position-relative'
    })
  }

}