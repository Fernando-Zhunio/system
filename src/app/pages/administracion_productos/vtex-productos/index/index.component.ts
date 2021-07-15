import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { Ipagination } from '../../../../interfaces/ipagination';
import { IproductVtexSku } from '../../../../interfaces/iproducts';
import { IproductVtex } from './../../../../interfaces/iproducts';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }
  min:number;max:number;
  warehouse_ids:any[];
  prefix_id:string;
  isload:boolean;
  url:string = "products-admin/product-vtex";
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

  // editVtexProduct(id): void{

  // }

}
