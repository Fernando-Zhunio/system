import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { EchoManager } from '../../../../class/echo-manager';
import { StorageService } from '../../../../services/storage.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { LogOrderModalComponent } from '../log-order-modal/log-order-modal.component';
import { ReuseComponent } from '../../../../interfaces/reuse-component';
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
export class OrdersIndexComponent extends Crud<IOrder> implements OnInit, OnDestroy, ReuseComponent {

  constructor(private storage: StorageService, private dialog: MatDialog, protected standardService: StandartSearchService, protected snackBar: MatSnackBar) {
    super();
  }

  loadInfo(): void {
      // alert('loadInfo');
      console.log('loadInfo');
      this.changePaginator();
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
  filters: any = {
    'status[]': [],
    minDate: null,
    maxDate: null,
    minPrice: null,
    maxPrice: null,
    type: '',
    orderBy: null,
    orderByColumn: null,
    hasMbaTransfers: null,
    hasMbaPayments: null,
    hasMbaInvoices: null,
    hasConfirmedRetention: null,
    paymentDocCode: null,
    channel: null,
    guide: null,
    'warehouse[]': [],
    company: null,
  };

  statuses: any[] = [];
  types: any[] = [];
  channels: { id: number, name: string }[] = [];
  companies = [];
  isSearchWarehouse = false;

  warehousesSelected = new Map<number, string>();

  permissions = PermissionOrders;

  dpMax: any;
  dpMin: any;

  dataSource: IOrder[] = [];
  columnsToDisplay = ['id', 'type', 'status', 'client', 'channel', 'transference', 'guide', 'anticipe', 'invoice', 'warehouse', 'products', 'payments', 'company', 'total', 'seller', 'created_at', 'started_at', 'ended_at', 'actions'];
  expandedElement: IOrder | null;
  workspaceSelect = null;
  workspaces: IOrderWorkspace[] = [];
  echo: any = null;
  canLoading = true;


  ngOnInit(): void {
    this.getDataForFilter();
    this.getMyWorkspacesOrder();
    this.createChannelEcho();
  }

  ngOnDestroy(): void {
    this.echo.leave('orders-system.orders');
  }

  createChannelEcho(): void {
    this.echo = new EchoManager(this.storage).echo;
    this.echo.private('orders-system.orders').listen('.order', this.listener.bind(this));
  }

  listener(_e): void {
    SharedService.disabled_loader = true;
    this.canLoading = false;
    this.changePaginator();
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
        this.filters.minDate = moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm');
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
        this.filters.maxDate = moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm');
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

  override getData($event: IResponse<IPaginate<any>>): void {
    this.dataSource = $event.data.data;
    this.detailPaginator.current_page = $event.data.current_page;
    this.detailPaginator.per_page = $event.data.per_page;
    this.detailPaginator.total = $event.data.total;
  }

  changePaginator(event: PageEvent | null = null): void {
    this.headerComponent.searchBar(event);
  }

  changeWorkspaces(event: MatSelectChange) {
    this.standardService.methodPut(`system-orders/workspaces/preference/${event.value}`)
      .subscribe(
        {
          next: () => {
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
        this.channels = response.data.channels;
        this.companies = response.data.company_id;
        this.workspaceSelect = response.data.workspace_preference;
      },
      () => {
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
              next: () => {
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

  addWarehouse(warehouse): void {
    // console.log(warehouse);
    this.warehousesSelected.set(warehouse.id, warehouse);
    this.filters['warehouse[]'].push(warehouse.id);

  }

  removeWarehouse(id): void {
    const indexWarehouse = this.filters['warehouse[]'].findIndex(w => w === id);
    this.warehousesSelected.delete(id);
    this.filters['warehouse[]'].splice(indexWarehouse, 1);
  }

  getIsLoading($event) {
    if (this.canLoading) {
      this.isLoading = $event;
    }
    this.canLoading = true;
  }

  openLogOrder(id: number): void {
    this.dialog.open(LogOrderModalComponent, {
      data: { order_id: id },
    });
  }
}
