import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { StorageService } from '../../../services/storage.service';


interface IdataJsonHeaderDashboard {
  // product:{
  for: 'dia' | 'semana' | 'mes' | 'año';
  title: any;
  text_footer: any;
  // }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet,
    private _dialog:MatDialog,private s_storage: StorageService) {}

  dataJsonHeaderDashbardProduct: IdataJsonHeaderDashboard = {
    for: 'mes',
    title: function () {
      return `Producto mas vendido por ${this.for}`;
    },
    text_footer: function () {
      return `Veces vendido en este ${this.for}`;
    },
  };

  companies:any[] = []


  isCompare:boolean = false;
  currentCompare:'productos'|'locales';
  current_item:'product'|'warehouse';
  isCompareCompany:boolean =false;

  ngOnInit(): void {
    this.companies = this.s_storage.getCurrentUser().companies;
    new Chart('chart-main', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Top 6 de productos mas vendidos',
            data: [12, 19, 3, 5, 2, 3],
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
        responsive: true,
        // aspectRatio: 1,
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
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
    });

    new Chart('chart-warehouses', {
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
        aspectRatio: 1,
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
    });

    new Chart('chart-months', {
      type: 'radar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
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
            data: [0, 1, 2, 3, 4],
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Radar Chart',
          },
        },
      },
    });
  }



  openSheetButton( currentCompare:'productos'|'locales'): void {
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

  openCompareCompany():void{
    this.isCompareCompany = true;
  }

  closeCompare(event):void{
    this.isCompare=!event;
  }



  currentItemHeader(item:'product'|'warehouse'){
    this.current_item = item;
  }

  viewFor(send_for:'dia' | 'semana' | 'mes' | 'año'):void{
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

  applyFilter():void{
  }


}
