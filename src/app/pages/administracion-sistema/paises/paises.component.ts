import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../../../class/country';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Ipagination } from '../../../interfaces/ipagination';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';
import { CreateOrEditCountryComponent } from './create-or-edit-country/create-or-edit-country.component';
declare let Swal: any;

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  constructor(private s_standart: StandartSearchService, private snack_bar: MatSnackBar, private dialog: MatDialog) { }
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'created_at',
    // "roles",
    // "last_activity",
    'acciones',
  ];
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  ELEMENT_DATA: Country[] = [];
  permission_create: any[] = ['super-admin', 'admin.users.create'];
  permission_edit: any[] = ['super-admin', 'admin.users.edit'];
  permission_destroy: any[] = ['super-admin', 'admin.users.destroy'];
  dataSource = new MatTableDataSource<Country>(this.ELEMENT_DATA);
  paginator: Ipagination<Country>;
  isload: boolean;
  users: Country[];

  ngOnInit(): void {
    // this.getUserServer();
  }

  refreshDataTable(data) {
    const row: Country[] = data as Country[];
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<Country>(this.ELEMENT_DATA);
  }

  //#region botones de acciones de usuario
  editItem(i): void {

  }

  deleteItem(id): void {
    SwalService.swalConfirmation('Eliminar', 'Esta seguro de eliminar este usuario', 'warning').then((result) => {
      if (result.isConfirmed) {
        this.snack_bar.open('Eliminando usuario espere ...');
        this.s_standart.destory('admin/countries/' + id).subscribe(res => {
          if (res.hasOwnProperty('success') && res.success) {
            this.snack_bar.open('Usuario Eliminado con exito', 'OK', {duration: 2000});
            this.removeItemTable(id);
          } else {
            this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
          }
        }, err => {
          console.log(err);
          this.snack_bar.open('No se a podido eliminar ', 'Error', {duration: 2000});
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    });
  }

  removeItemTable(id): void {
      const index = this.ELEMENT_DATA.findIndex(x => x.id == id);
      this.ELEMENT_DATA.splice(index, 1);
      // this.dataSource.data.splice(this.ELEMENT_DATA.indexOf(element),1);
      this.dataSource = new MatTableDataSource<Country>(this.ELEMENT_DATA);
  }

  //#endregion
  loadData($event): void {
    this.paginator = $event.data;
    this.refreshDataTable(this.paginator.data);
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  createCountry(isEdit= false, id= 0): void {
    let title = 'Creando Pais';
    let state = 'create';
    let country = null;
    if (isEdit) {
      title = 'Editando Pais';
      state = 'edit';
      const index = this.ELEMENT_DATA.findIndex(res => res.id == id);
      if (index != -1) {
        country = this.ELEMENT_DATA[index];
      } else { return; }
    }
    this.dialog.open(CreateOrEditCountryComponent, {data: {action: {title, state}, country}}).beforeClosed().subscribe(res => {
      if (res) {
        this.snack_bar.open('Espere gestionando...');
        if (res.action == 'edit') {
          this.s_standart.updatePut('admin/countries/' + res.data.id, res.data).subscribe(res1 => {
            this.snack_bar.open('Pais Editado con exito', 'OK', {duration: 2000});
          });
        } else {
          this.s_standart.store('admin/countries', res.data).subscribe((res1: {success: boolean, data: Country}) => {
            this.snack_bar.open('Pais creado con exito', 'OK', {duration: 2000});
            this.ELEMENT_DATA.push(res1.data);
            this.dataSource = new MatTableDataSource<Country>(this.ELEMENT_DATA);
          });
        }
        // let country = res;
      }
    });
  }

}
