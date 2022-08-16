import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilePondOptions } from 'filepond';
import { environment } from '../../../../../environments/environment';
import { Crud } from '../../../../class/crud';
import { PermissionRappiProducts } from '../../../../class/permissions-modules';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { StorageService } from '../../../../services/storage.service';
import { SwalService } from '../../../../services/swal.service';
import { StockRappiModalComponent } from '../components/stock-rappi-modal/stock-rappi-modal.component';
import { RappiProduct } from '../interfaces/rappi-product';

@Component({
  selector: 'app-index-rappi-products',
  templateUrl: './index-rappi-products.component.html',
  styleUrls: ['./index-rappi-products.component.scss']
})
export class IndexRappiProductsComponent extends Crud<any> implements OnInit {

  constructor(private dialog: MatDialog,  private storage: StorageService, protected standardService: StandartSearchService, protected snackBar: MatSnackBar) {
    super();
  }

  columnsToDisplay = ['sku', 'name', 'ean', 'trademark', 'price', 'discount_price', 'created_at', 'stock', 'is_available', 'actions'];
  dataSource: RappiProduct[] = [];
  url = `rappi-service/products`;
  pondOptions: FilePondOptions = {
    allowMultiple: false,
    labelIdle: 'Arrastre o presione aquí',
    name: 'file',
    maxParallelUploads: 5,
    server: {
      url: `${environment.server}`,
      process: {
        url: 'rappi-service/products/import',
        headers: {
          Authorization: `Bearer ${this.storage.getCurrentToken()}`,
          Accept: 'application/json',
        },
        onload: (response: any) => {
          const data = JSON.parse(response);
          console.log(data);
          SwalService.swalFire({ title: 'Procesando excel en el servidor', text: 'El excel se esta procesando en el servidor, en unos momento recibirá una notificación describiendo el estado del proceso', icon: 'success' });
          return data.id;
        }
      },
    }
  };
  isOpenFileImport = false;
  data: Map<any, RappiProduct>;
  permissions = PermissionRappiProducts
  ngOnInit() {
  }

  changeAvailable(id: number, event: MatSlideToggleChange) {
    console.log(id, event);
    event.source.disabled = true;
    SwalService.swalFire(
      {
        title: 'Cambiar Disponibilidad',
        text: '¿Está seguro de cambiar el la disponibilidad?',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Si, cambiar',
        cancelButtonText: 'No, cancelar',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(result => {
        if (result.isConfirmed) {

          this.standardService.methodPut(`${this.url}/${id}`, { enabled: event.checked }).subscribe(
            {
              next: res => {
                event.source.disabled = false;
                event.source.checked = event.checked;
              },
              error: err => {
                event.source.disabled = false;
                event.source.checked = !event.checked;
              }
            }
          );
        } else {
          event.source.disabled = false;
          event.source.checked = !event.checked;
        }
      });
  }

  getData($event: any): void {
    console.log($event);
    this.dataSource = $event;
  }

  openStockProduct(id: number): void {
    const {name} = this.dataSource.find(item => item.id === id);
    this.dialog.open(StockRappiModalComponent, {data: {id, name}})
  }





}
