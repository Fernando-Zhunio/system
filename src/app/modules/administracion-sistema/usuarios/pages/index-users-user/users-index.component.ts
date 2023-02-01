import { Component, ViewChild } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { HeaderSearchComponent } from '../../../../../components/header-search/header-search.component';
// import { Pagination } from '../../../../../core/interfaces/pagination';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
// import { SwalService } from '../../../../../services/swal.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
// import { User } from '../../interfaces/user';
import { PERMISSIONS_ADMIN_USERS } from '../../permissions/users.permissions';

// declare let Swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent extends MatTableHelper  {
  protected url: string;
  protected table: MatTable<any>;

  constructor(protected mhs: MethodsHttpService,) { super() }
  columnsToDisplay: string[] = [
    'id',
    'name',
    'email',
    'roles',
    'last_activity',
    'acciones',
  ];
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  // ELEMENT_DATA: User[] = [];
  // permission_create: any[] = ['super-admin', 'admin.users.create'];
  // permission_edit: any[] = ['super-admin', 'admin.users.edit'];
  // permission_destroy: any[] = ['super-admin', 'admin.users.destroy'];
  permissions = PERMISSIONS_ADMIN_USERS;
  // dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  // paginator: Pagination<User>;
  // isLoading: boolean;
  // users: User[];

  // refreshDataTable(data) {
  //   const row: User[] = data as User[];
  //   this.ELEMENT_DATA = row;
  //   this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  // }

  //#region botones de acciones de usuario
  // deleteItem(id): void {
  //   SwalService.swalConfirmation('Eliminar', 'Esta seguro de eliminar este usuario', 'warning').then((result) => {
  //     if (result.isConfirmed) {
  //       this.snack_bar.open('Eliminando usuario espere ...');
  //       this.methodsHttp.methodDelete('admin/users/' + id).subscribe(res => {
  //         if (res.hasOwnProperty('success') && res.success) {
  //           this.snack_bar.open('Usuario Eliminado con éxito', 'OK', {duration: 2000});
  //           this.removeItemTable(id);
  //         } else {
  //           this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
  //         }
  //       }, err => {
  //         console.error(err);
  //         this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
  //       });
  //     }
  //   });
  // }

  // removeItemTable(id): void {
  //     const index = this.ELEMENT_DATA.findIndex(x => x.id == id);
  //     this.ELEMENT_DATA.splice(index, 1);
  //     this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  // }

  //#endregion
  // loadData($event): void {
  //   this.refreshDataTable($event);
  // }

  // changePaginator(event): void {
  //   this.headerComponent.searchBar(event);
  // }

}
