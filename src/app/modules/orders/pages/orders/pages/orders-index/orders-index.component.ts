import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionOrders } from '../../../../../../class/permissions-modules';
import { IOrder, IOrderWorkspace } from '../../../../../../interfaces/iorder';
import { DetailsOrderComponent } from '../../../../modules/shared-order/details-order/details-order.component';
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import * as moment from 'moment';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { EchoManager } from '../../../../../../class/echo-manager';
import { SharedService } from '../../../../../../services/shared/shared.service';
import { LogOrderModalComponent } from '../../../../orders/log-order-modal/log-order-modal.component';
import { ReuseComponent } from '../../../../../../interfaces/reuse-component';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { SearchTemplateTableComponent } from '../../../../../../Modulos/search-template/search-template-table/search-template-table.component';
import { CONST_ECHO_ORDERS_CHANNEL_PRIVATE } from '../../../../../../shared/objects/constants';

@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.scss'],
})
export class OrdersIndexComponent extends MatTableHelper<IOrder> implements OnInit, OnDestroy, AfterViewInit, ReuseComponent {

  constructor(private dialog: MatDialog, protected mhs: MethodsHttpService, protected snackBar: MatSnackBar) {
    super();
  }

  loadInfo(): void {
      // this.changePaginator();
  }

  @ViewChild('filterOrderMin', { static: false }) dpMinDateElement: ElementRef;
  @ViewChild('filterOrderMax', { static: false }) dpMaxDateElement: ElementRef;
  @ViewChild(MatTable) table: MatTable<IOrder>;
  @ViewChild(SearchTemplateTableComponent) searchTemplateTable: SearchTemplateTableComponent;
  @ViewChild(MatSort) sort: MatSort;

  url: string = 'system-orders/orders';
  iconChannels: {[key:string]: string} = {
    'whatsapp': 'fa-brands fa-whatsapp',
    'webstore': 'fa-solid fa-globe',
    'marketplace': 'fa-solid fa-store',
    'ml': 'fa-regular fa-handshake',
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

  override dataSource: IOrder[] = [];
  columnsToDisplay = ['id', 'type', 'status', 'client', 'channel', 'transference', 'guide', 'anticipe', 'invoice', 'warehouse', 'company', 'total', 'seller', 'created_at', 'started_at', 'ended_at', 'actions'];
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
    this.echo.leave(this.getChannelOrders());
  }

  createChannelEcho(): void {
    this.echo = new EchoManager().get();
    this.echo.private(this.getChannelOrders()).listen('.order', this.listener.bind(this));
  }

  getChannelOrders(): string {
    return CONST_ECHO_ORDERS_CHANNEL_PRIVATE;
  }

  listener(_e): void {
    SharedService.disabled_loader = true;
    this.canLoading = false;
    // this.changePaginator();
  }

  ngAfterViewInit() {
    this.dpMin = new AirDatepicker(this.dpMinDateElement.nativeElement, {
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
    this.mhs.methodGet(`system-orders/workspaces/me`)
      .subscribe(
        {
          next: (res) => {
            this.workspaces = res.data;
          }
        }
      )
  }

  // override getData($event: IResponse<IPaginate<any>>): void {
  //   this.dataSource = $event.data.data;
  //   this.detailPaginator.current_page = $event.data.current_page;
  //   this.detailPaginator.per_page = $event.data.per_page;
  //   this.detailPaginator.total = $event.data.total;
  // }

  // changePaginator(event: PageEvent | null = null): void {
  //   this.headerComponent.searchBar(event);
  // }

  changeWorkspaces(event: MatSelectChange) {
    this.mhs.methodPut(`system-orders/workspaces/preference/${event.value}`)
      .subscribe(
        {
          next: () => {
            this.searchTemplateTable.searchNow();
          }
        }
      )
  }

  changeSort(event: any): void {
    this.filters.orderBy = event.direction;
    this.filters.orderByColumn = event.active;
    this.searchTemplateTable.searchNow();
  }

  getDataForFilter(): void {
    this.mhs.methodGet('system-orders/orders/filter-data').subscribe(
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
    this.dialog.open(DetailsOrderComponent, {
      data: { order_id: id },
    });
  }

  // deleteOrder(id: number) {
  //   SwalService.swalFire({ text: '¿Está seguro de eliminar el pedido?', icon: 'warning', showConfirmButton: true, showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'No, cancelar' })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         this.methodsHttp.methodDelete(`system-orders/orders/${id}`).subscribe(
  //           {
  //             next: () => {
  //               this.snackBar.open('Orden eliminada', 'Cerrar', {
  //                 duration: 5000,
  //               });
  //               this.dataSource.splice(this.dataSource.findIndex(order => order.id === id), 1);
  //               this.table.renderRows();
  //             }
  //           });
  //       }
  //     })
  // }

  addWarehouse(warehouse): void {
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
