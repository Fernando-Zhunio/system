import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { PermissionOrders } from '../../../../class/permissions-modules';
import { IOrder, IOrderWorkspace } from '../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { DetailsOrderComponent } from '../../modules/shared-order/details-order/details-order.component';
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import * as moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { PageEvent } from '@angular/material/paginator';
import { IPaginate, IResponse } from '../../../../services/methods-http.service';
import { MatSort } from '@angular/material/sort';
import { SwalService } from '../../../../services/swal.service';
import { MatTable } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersIndexComponent extends Crud<IOrder> implements OnInit {

  constructor(private dialog: MatDialog, protected standardService: StandartSearchService, protected snackBar: MatSnackBar) {
    super();
  }

  @ViewChild('filterOrderMin', { static: false }) dpMinDateElement: ElementRef;
  @ViewChild('filterOrderMax', { static: false }) dpMaxDateElement: ElementRef;
  @ViewChild(MatTable) table: MatTable<IOrder>;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @ViewChild(MatSort) sort: MatSort;

  url: string = 'system-orders/orders';
  detailPaginator = {
    current_page: 1,
    per_page: 10,
    total: 0
  }
  filters = {
    status: '',
    min: null,
    max: null,
    type: '',
    orderBy: null,
    orderByColumn: null,
    hasMbaTransfers: null,
    hasMbaPayments: null,
    hasMbaInvoices: null,
    hasConfirmedRetention: null,
    // workspace_id: null
  };

  statuses: any[] = [];
  types: any[] = [];
  permissions = PermissionOrders;

  dpMax: any;
  dpMin: any;

  dataSource: IOrder[] = [];
  columnsToDisplay = ['id', 'type', 'status', 'client', 'products', 'payments', 'company', 'created_at', 'started_at', 'ended_at', 'actions'];
  expandedElement: IOrder | null;
  workspaceSelect = null;
  workspaces: IOrderWorkspace[] = [];


  ngOnInit(): void {
    this.getDataForFilter();
    this.getMyWorkspacesOrder();
  }

  ngAfterViewInit() {
    this.dpMin = new AirDatepicker(this.dpMinDateElement.nativeElement, {
      classes: 'z-indez-1020',
      position: 'bottom right',
      locale: localeEs,
      timepicker: true,
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      autoClose: true,
      onSelect: ({ date }) => {
        this.dpMax.update({
          minDate: date
        })
        this.filters.min = moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm');
      }
    })
    this.dpMax = new AirDatepicker(this.dpMaxDateElement.nativeElement, {
      classes: 'z-indez-1020',
      locale: localeEs,
      position: 'bottom right',
      timepicker: true,
      autoClose: true,
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      onSelect: ({ date }) => {
        this.dpMin.update({
          maxDate: date
        })
        this.filters.max = moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm');
      }
    })
  }


  getMyWorkspacesOrder(): void {
    this.standardService.methodGet(`system-orders/workspaces/me`)
      .subscribe(
        {
          next: (res) => {
            this.workspaces = res.data;
          }
        }
      )
  }

  getData($event: IResponse<IPaginate<any>>): void {
    this.dataSource = $event.data.data;
    this.detailPaginator.current_page = $event.data.current_page;
    this.detailPaginator.per_page = $event.data.per_page;
    this.detailPaginator.total = $event.data.total;
  }

  changePaginator(event: PageEvent | null): void {
    this.headerComponent.searchBar(event);
  }

  changeWorkspaces(event: MatSelectChange) {
    this.standardService.methodPut(`system-orders/workspaces/preference/${event.value}`)
      .subscribe(
        {
          next: (res) => {
            this.headerComponent.searchBar(null);
          }
        }
      )
  }

  changeSort(event: any): void {
    console.log(event);
    this.filters.orderBy = event.direction;
    this.filters.orderByColumn = event.active;
    this.headerComponent.searchBar();
  }

  getDataForFilter(): void {
    this.standardService.methodGet('system-orders/orders/filter-data').subscribe(
      (response: any) => {
        this.statuses = response.data.status;
        this.types = response.data.type;
        this.workspaceSelect = response.data.workspace_preference;

      },
      (error) => {
        this.snackBar.open('Error al cargar los datos', 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

  openDetailOrder(id: number) {
    console.log(id);
    this.dialog.open(DetailsOrderComponent, {
      data: { order_id: id },
    });
  }

  deleteOrder(id: number) {
    SwalService.swalFire({ text: '¿Está seguro de eliminar el pedido?', icon: 'warning', showConfirmButton: true, showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'No, cancelar' })
      .then((result) => {
        if (result.isConfirmed) {
          this.standardService.methodDelete(`system-orders/orders/${id}`).subscribe(
            {
              next: (response) => {
                this.snackBar.open('Orden eliminada', 'Cerrar', {
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
