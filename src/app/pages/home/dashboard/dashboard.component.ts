import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { StorageService } from '../../../services/storage.service';


interface IdataJsonHeaderDashboard {
  // product:{
  for: 'dia' | 'semana' | 'mes' | 'año';
  title: any;
  text_footer: any;
  // }
}

interface IsellCity{
  id: number;
  name: string;
  total: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet,
    private _dialog: MatDialog, private s_storage: StorageService, private spinner: NgxSpinnerService) {}

  dataJsonHeaderDashbardProduct: IdataJsonHeaderDashboard = {
    for: 'mes',
    title: function () {
      return `Producto mas vendido por ${this.for}`;
    },
    text_footer: function () {
      return `Veces vendido en este ${this.for}`;
    },
  };

  companies: any[] = [];


  isCompare: boolean = false;
  now: Date = new Date();
  currentCompare: 'productos'|'locales';
  current_item: 'product'|'warehouse';
  isCompareCompany: boolean = false;
  chartProduct: Chart = null;
  chartLocales: Chart = null;
  chartVentas: Chart = null;
  total_sell: number = 0;
  formDate: FormGroup = new FormGroup({
    star_date: new FormControl(new Date()),
    end_date: new FormControl(new Date()),
  });
  displayedColumns: string[] = [
    'id',
    'name',
    'total',
  ];
  ELEMENT_DATA: IsellCity[] = [
    {id: 1, name: 'Hydrogen', total: 1.0079},
    {id: 2, name: 'Helium', total: 4.0026},
    {id: 3, name: 'Lithium', total: 6.941},
    {id: 4, name: 'Beryllium', total: 9.0122},
    {id: 5, name: 'Boron', total: 10.811},
    {id: 6, name: 'Carbon', total: 12.0107},
    {id: 7, name: 'Nitrogen', total: 14.0067},
    {id: 8, name: 'Oxygen', total: 15.9994},
  ];
  dataSource = new MatTableDataSource<IsellCity>(this.ELEMENT_DATA);


  ngOnInit(): void {
    this.companies = this.s_storage.getCurrentUser().companies;
    // this.spinner.show('total-ventas');
    this.createChartProduct();
    this.createChartLocales();
    this.createChartVentas();
    this.createChartOther();

    // new Chart('chart-months', {
    //   type: 'radar',
    //   data: {
    //     labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    //     datasets: [
    //       {
    //         label: 'Population (millions)',
    //         backgroundColor: [
    //           '#3e95cd',
    //           '#8e5ea2',
    //           '#3cba9f',
    //           '#e8c3b9',
    //           '#c45850',
    //         ],
    //         data: [0, 1, 2, 3, 4],
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     aspectRatio: 1,
    //     plugins: {
    //       title: {
    //         display: true,
    //         text: 'Chart.js Radar Chart',
    //       },
    //     },
    //   },
    // });
  }
  createChartProduct(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('chart-main');
    const ctx = canvas.getContext('2d');

    const data =  {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Top 6 de productos mas vendidos',
            data: [15, 4, 3, 5, 2, 3],
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
            borderWidth: 1,
          }, 
        ],
      },
      options: {
        // responsive: false,
        maintainAspectRatio: false,

        responsive: true,
        // aspectRatio: 1,
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

    this.chartProduct =  new Chart(ctx, data );
  }

  createChartLocales(): void {
    const data = {
      type: 'doughnut',
      data: {
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850',
            ],
            data: [2478, 5267, 734, 784, 433],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        // aspectRatio: 1,
        // plugins: {
        //   legend: {
        //     position: 'top',
        //   },
        //   title: {
        //     display: true,
        //     text: 'Chart.js Doughnut Chart',
        //   },
        // },
      },
    };
    this.chartLocales = new Chart('chart-warehouses', data);
  }

  createChartVentas(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('chart-ventas');
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
        responsive: false,
        // maintainAspectRatio: false,
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
    this.chartVentas =  new Chart(ctx, data );
  }

  createChartOther(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('chart-other');
    const ctx = canvas.getContext('2d');

    const data =  {
      type: 'radar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Top 6 de productos mas vendidos',
            data: [15, 4, 3, 5, 2, 3],
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
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        // maintainAspectRatio: false,
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

    this.chartProduct =  new Chart(ctx, data );
  }

  openSheetButton( currentCompare: 'productos'|'locales'): void {
    // this._bottomSheet.open(ViewForComponent);
    // this._dialog.open(CompareProductComponent)
    switch (currentCompare) {
      case 'productos':
        this.currentCompare = currentCompare;
        break;
      case 'locales':
        this.currentCompare = currentCompare;
        break;
      default:
        break;
    }
    this.isCompare = true;
  }

  openCompareCompany(): void{
    this.isCompareCompany = true;
  }

  closeCompare(event): void{
    this.isCompare = !event;
  }



  currentItemHeader(item: 'product'|'warehouse'){
    this.current_item = item;
  }

  viewFor(send_for: 'dia' | 'semana' | 'mes' | 'año'): void{
    switch (this.current_item) {
      case 'product':
        this.dataJsonHeaderDashbardProduct.for = send_for;
        break;
      case 'warehouse':

        break;
      default:
        break;
    }
  }

  applyFilter(): void{
  }


}
