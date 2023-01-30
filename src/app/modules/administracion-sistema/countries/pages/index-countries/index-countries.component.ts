import { CreateOrEditDialogData } from './../../../../../shared/interfaces/create-or-edit-dialog-data';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
// import { Country } from '../../../../../class/country';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { StatusCreateOrEdit } from '../../../../../shared/enums/status-create-or-edit';
import { CreateOrEditCountryComponent } from '../create-or-edit-country/create-or-edit-country.component';
import { PERMISSIONS_COUNTRIES } from '../../permissions/countries-and-cities.permissions';
// import { Country } from '../../../class/country';
// import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
// import { Ipagination } from '../../../interfaces/ipagination';
// import { StandartSearchService } from '../../../services/standart-search.service';
// import { SwalService } from '../../../services/swal.service';
// import { CreateOrEditCountryComponent } from './create-or-edit-country/create-or-edit-country.component';
declare let Swal: any;

@Component({
  selector: 'app-index-countries',
  templateUrl: './index-countries.component.html',
  styleUrls: ['./index-countries.component.css']
})
export class IndexCountriesComponent extends MatTableHelper {
  protected url: string = 'admin/countries';
  @ViewChild(MatTable) protected table: MatTable<any>;

  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) {
    super();
  }

  columnsToDisplay: string[] = [
    'id',
    'name',
    'code',
    'created_at',
    'acciones',
  ];
  permissions = PERMISSIONS_COUNTRIES;


  // permissions: 
  // @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  // ELEMENT_DATA: Country[] = [];
  // permission_create: any[] = ['super-admin', 'admin.users.create'];
  // permission_edit: any[] = ['super-admin', 'admin.users.edit'];
  // permission_destroy: any[] = ['super-admin', 'admin.users.destroy'];
  // dataSource = new MatTableDataSource<Country>(this.ELEMENT_DATA);
  // paginator: Ipagination<Country>;
  // isload: boolean;
  // users: Country[];

  // refreshDataTable(data) {
  //   const row: Country[] = data as Country[];
  //   this.ELEMENT_DATA = row;
  //   this.dataSource = new MatTableDataSource<Country>(this.ELEMENT_DATA);
  // }

  // deleteItem(id): void {
  //   SwalService.swalConfirmation('Eliminar', 'Esta seguro de eliminar este usuario', 'warning').then((result) => {
  //     if (result.isConfirmed) {
  //       this.snack_bar.open('Eliminando usuario espere ...');
  //       this.s_standart.destory('admin/countries/' + id).subscribe(res => {
  //         if (res.hasOwnProperty('success') && res.success) {
  //           this.snack_bar.open('Usuario Eliminado con exito', 'OK', {duration: 2000});
  //           this.removeItemTable(id);
  //         } else {
  //           this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
  //         }
  //       }, err => {
  //         console.error(err);
  //         this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
  //       });
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //     }
  //   });
  // }

  // removeItemTable(id): void {
  //     const index = this.ELEMENT_DATA.findIndex(x => x.id == id);
  //     this.ELEMENT_DATA.splice(index, 1);
  //     // this.dataSource.data.splice(this.ELEMENT_DATA.indexOf(element),1);
  //     this.dataSource = new MatTableDataSource<Country>(this.ELEMENT_DATA);
  // }

  //#endregion
  // loadData($event): void {
  //   // this.paginator = $event.data;
  //   // this.refreshDataTable(this.paginator.data);
  //   this.refreshDataTable($event);
  // }

  // changePaginator(event): void {
  //   this.headerComponent.searchBar(event);
  // }

  openDialog(id: number | null = null): void {
    const data: CreateOrEditDialogData = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create,
    }
    if (id) {
      data.id = id;
      data.info = this.dataSource.find(res => res.id == id);
    }
    this.dialog.open(CreateOrEditCountryComponent,
      {
        data
      }
    ).beforeClosed().subscribe(res => {
      if (!res) {
        return;
      }
      if (!id) {
        this.addItemInTable(res.response.data)
      } else {
        this.updateItemInTable(id, res.response.data)
      }
    });
  }

}
