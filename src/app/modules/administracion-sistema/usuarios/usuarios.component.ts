import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Ipagination } from '../../../interfaces/ipagination';
import { IuserSystem } from '../../../interfaces/iuser-system';
import { MethodsHttpService } from '../../../services/methods-http.service';
import { SwalService } from '../../../services/swal.service';

declare let Swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent  {

  constructor(private methodsHttp: MethodsHttpService, private snack_bar: MatSnackBar) { }
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    // 'companies',
    'roles',
    'last_activity',
    'acciones',
  ];
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  ELEMENT_DATA: IuserSystem[] = [];
  permission_create: any[] = ['super-admin', 'admin.users.create'];
  permission_edit: any[] = ['super-admin', 'admin.users.edit'];
  permission_destroy: any[] = ['super-admin', 'admin.users.destroy'];
  dataSource = new MatTableDataSource<IuserSystem>(this.ELEMENT_DATA);
  paginator: Ipagination<IuserSystem>;
  isLoading: boolean;
  users: IuserSystem[];

  refreshDataTable(data) {
    const row: IuserSystem[] = data as IuserSystem[];
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<IuserSystem>(this.ELEMENT_DATA);
  }

  //#region botones de acciones de usuario

  deleteItem(id): void {
    SwalService.swalConfirmation('Eliminar', 'Esta seguro de eliminar este usuario', 'warning').then((result) => {
      if (result.isConfirmed) {
        this.snack_bar.open('Eliminando usuario espere ...');
        this.methodsHttp.methodDelete('admin/users/' + id).subscribe(res => {
          if (res.hasOwnProperty('success') && res.success) {
            this.snack_bar.open('Usuario Eliminado con éxito', 'OK', {duration: 2000});
            this.removeItemTable(id);
          } else {
            this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
          }
        }, err => {
          console.log(err);
          this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
        });
      }
    });
  }

  removeItemTable(id): void {
      const index = this.ELEMENT_DATA.findIndex(x => x.id == id);
      this.ELEMENT_DATA.splice(index, 1);
      this.dataSource = new MatTableDataSource<IuserSystem>(this.ELEMENT_DATA);
  }

  //#endregion
  loadData($event): void {
    this.refreshDataTable($event);
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

}
