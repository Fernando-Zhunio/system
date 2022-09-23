import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { PermissionReportsOrders } from '../../../class/permissions-modules';
import { IReportOrder } from '../../../interfaces/orders/ireport-order';
import { MethodsHttpService } from '../../../services/methods-http.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-index-reports',
  templateUrl: './index-reports.component.html',
  styleUrls: ['./index-reports.component.scss']
})
export class IndexReportsComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService,private snackBar: MatSnackBar) { }

  @ViewChild(MatTable) table: MatTable<IReportOrder>;
  url = 'system-orders/reports';
  permissions = PermissionReportsOrders
  dataSource: IReportOrder[] = [];
  isLoading = false;
  columnsToDisplay = [
    'id',
    'name',
    'title',
    // 'file_path',
    // 'disk',
    'created_at',
    'ext',
    'permalink',
    'actions'
  ]

  ngOnInit(): void {
  }

  getData(event): void {
    console.log(event);
    this.dataSource = event;
  }

  hasLoading(event): void {
    console.log(event);
    this.isLoading = event;
  }

  deleteReport(id): void {
    SwalService.swalFire(
      {
        text: '¿Está seguro de eliminar el reporte?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        showConfirmButton: true,
      }).then(res => {
        if (res.isConfirmed) {
          this.methodsHttp.methodDelete(`${this.url}/${id}`).subscribe({
            next: () => {
              this.snackBar.open('Reporte eliminado', 'Cerrar', {
                duration: 5000,
              });
              this.dataSource.splice(this.dataSource.findIndex(order => order.id === id), 1);
              this.table.renderRows();
            }
          });
        }
      })
  }

}
