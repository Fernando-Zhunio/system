import { IndexWithMatTableComponent } from './../Modulos/index-with-mat-table/index-with-mat-table.component';
import { Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderSearchComponent } from '../components/header-search/header-search.component';
import { Ipagination } from '../interfaces/ipagination';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';
import { Router } from '@angular/router';
declare let Swal: any;

/**
 * @description Esta clase debe tener el component IndexWithMatTableComponent en su HTML
 */

@Injectable()
export abstract class IndexWithMatTable<T> {
  constructor(
    protected s_standart: StandartSearchService,
    protected snack_bar: MatSnackBar,
    protected router: Router
    // protected dialog: MatDialog
  ) {}
  @ViewChild(IndexWithMatTableComponent)
  indexWithMatTableComponent: IndexWithMatTableComponent;
  abstract displayedColumns: string[];
  abstract permissions: { create: string[]; edit: string[]; destroy: string[] };
  abstract itemRows: { key: string; title: string,  isEditable: boolean  }[];
  abstract url: string;
  permission_create: any[] = ['super-admin', 'admin.users.create'];
  permission_edit: any[] = ['super-admin', 'admin.users.edit'];
  permission_destroy: any[] = ['super-admin', 'admin.users.destroy'];
  paginator: Ipagination<T>;
  isLoading: boolean = false;

  deleteItem(id): void {
    SwalService.swalConfirmation(
      'Eliminar',
      'Esta seguro de eliminar este registro',
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this.snack_bar.open('Eliminando registro espere ...');
        this.s_standart.destory(this.url +'/'+ id).subscribe(
          (res) => {
            if (res.hasOwnProperty('success') && res.success) {
              this.snack_bar.open('registro Eliminado con exito', 'OK', {
                duration: 2000,
              });
              this.indexWithMatTableComponent.removeItemTable(id);
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

  goCreate(): void {
    this.router.navigate(['./create']);
  }

  // public abstract setDisplayedColumns(columns: string[]);
}
