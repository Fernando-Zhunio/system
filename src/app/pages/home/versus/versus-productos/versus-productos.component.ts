import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Iproduct2 } from '../../../../interfaces/iproducts';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-versus-productos',
  templateUrl: './versus-productos.component.html',
  styleUrls: ['./versus-productos.component.css']
})
export class VersusProductosComponent implements OnInit {

  constructor(private s_standart: StandartSearchService, private spinner: NgxSpinnerService) { }
  products: Map<number, Iproduct2> = new Map<number, Iproduct2>();
  productsSelect: Map<number, Iproduct2> = new Map<number, Iproduct2>();
  searchText: string = '';
  isload: boolean = false;
  chartVersus: Chart;
  ngOnInit(): void {
    this.getProducts();
    this.createChartVersus();
  }

  getProducts(page= null): void {
    const url = `catalogs/products?search=${this.searchText}`;
    this.isload = true;
    this.spinner.show('isload');
    this.s_standart.index(url).subscribe(res => {
      console.log(res);
      this.products = new Map <number, Iproduct2>(res.data.data.map((x) => [x.id, x]));
      this.isload = false;
      this.spinner.hide('isload');
    });
  }

  captureImagenProduct(key): string {
    if (this.products.get(key)?.prestashop_products?.length > 0) {
      return this.products.get(key).prestashop_products[0].image;
    }
    if (this.products.get(key).ml_infos?.length > 0) {
      return this.products.get(key).ml_infos[0].image;
    }
    return 'assets/img/img_default_null.jpg';
  }

  captureImagenProductSelect(key): string {
    if (this.productsSelect.get(key)?.prestashop_products?.length > 0) {
      return this.productsSelect.get(key).prestashop_products[0].image;
    }
    if (this.productsSelect.get(key).ml_infos?.length > 0) {
      return this.productsSelect.get(key).ml_infos[0].image;
    }
    return 'assets/img/img_default_null.jpg';
  }

  addProductSelect(key): void {
    const value = Object.assign({}, this.products.get(key));
    this.productsSelect.set(key, value);
  }

  removeProductSelect(key): void {
    this.productsSelect.delete(key);
  }

  createChartVersus(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('chart-versus');
    const ctx = canvas.getContext('2d');
    const data =  {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Top 6 de productos mas vendidos',
            data: [15, 4, 3, 5, 2, 3],
            backgroundColor: [
              // 'rgba(255, 99, 132, 0.2)',
              'rgb(112, 221, 98, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              // 'rgba(255, 99, 132, 1)',
              'rgb(112, 221, 98)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
          {
            label: 'Top 6 de productos mas vendidos',
            data: [5, 3, 10, 1, 0, 7],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // responsive: true,
        // aspectRatio: 2,
        // scales: {
        //   y: {
        //     stacked: true,
        //     grid: {
        //       display: true,
        //       color: "rgba(255,99,132,0.2)"
        //     }
        //   },
        //   x: {
        //     grid: {
        //       display: false
        //     }
        //   }
        // },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart',
          },
        },
      },
    };
    this.chartVersus =  new Chart(ctx, data as any);
  }

}
