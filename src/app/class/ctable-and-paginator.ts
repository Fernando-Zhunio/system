import { ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderSearchComponent } from '../components/header-search/header-search.component';
import { Ipagination } from '../interfaces/ipagination';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

declare let Swal: any;

export class CtableAndPaginator<T> {
  // @ViewChild(HeaderSearchComponent) headerComponent:HeaderSearchComponent;

  ELEMENT_DATA: T[] = [];
  dataSource = new MatTableDataSource<T>(this.ELEMENT_DATA);
  paginator: Ipagination<T>;
  isload: boolean;
  displayedColumns: string[];
  snack_bar: MatSnackBar;
  s_standart: StandartSearchService;

  headerComponent: HeaderSearchComponent;
  urlDelete: string;
  wordMain: string;
  ngx_spinner: any;
  name_spinner: string = 'Spinner_table';
  public refreshDataTable(data) {
    const row: T[] = data as T[];
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<T>(this.ELEMENT_DATA);
  }

  loadData($event): void {
    this.paginator = $event.data;
    this.refreshDataTable(this.paginator.data);
  }

  removeItemTable(id): void {
    const index = this.ELEMENT_DATA.findIndex((x) => x['id'] == id);
    this.ELEMENT_DATA.splice(index, 1);
    // this.dataSource.data.splice(this.ELEMENT_DATA.indexOf(element),1);
    this.dataSource = new MatTableDataSource<T>(this.ELEMENT_DATA);
  }

  deleteItem(id): void {
    SwalService.swalConfirmation(
      'Eliminar',
      'Esta seguro de eliminar ' + this.wordMain,
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this.snack_bar.open(`Eliminando ${this.wordMain}  espere ...`);
        this.s_standart.destory(this.urlDelete + id).subscribe(
          (res) => {
            if (res.hasOwnProperty('success') && res.success) {
              this.snack_bar.open(' Eliminado con exito', 'OK', {
                duration: 2000,
              });
              this.removeItemTable(id);
            } else {
              this.snack_bar.open('No se a podido eliminar ', 'Error', {
                duration: 2000,
              });
            }
          },
          (err) => {
            console.log(err);
            this.snack_bar.open('No se a podido eliminar ', 'Error', {
              duration: 2000,
            });
          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    });
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  loaderTable(state): void {
  state ? this.ngx_spinner.show(this.name_spinner) : this.ngx_spinner.hide(this.name_spinner);
  }
}
