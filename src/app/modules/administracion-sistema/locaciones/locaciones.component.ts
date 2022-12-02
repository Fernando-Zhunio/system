import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Location } from '../../../class/location';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Icity } from '../../../interfaces/icity';
import { ICompany } from '../../../interfaces/icompanies';
import { MethodsHttpService } from '../../../services/methods-http.service';
// import { SwalService } from '../../../services/swal.service';
import { MatTableHelper } from '../../../shared/class/mat-table-helper';

declare let Swal: any;

@Component({
  selector: 'app-locaciones',
  templateUrl: './locaciones.component.html',
  styleUrls: ['./locaciones.component.css']
})
export class LocacionesComponent extends MatTableHelper<Location> implements OnInit {
  // protected columnsToDisplay: string[];
  protected url: string ='admin/locations';
  @ViewChild(MatTable) table: MatTable<any>;
  // protected mhs: MethodsHttpService;

  constructor(protected mhs: MethodsHttpService) { super() }
  columnsToDisplay: string[] = [
    'id',
    'name',
    'type',
    'status',
    'mba_code',
    'address',
    'latitude',
    'longitude',
    'city',
    'company',
    'acciones',
  ];
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  ELEMENT_DATA: Location[] = [];
  permission_create: any[] = ['super-admin', 'admin.users.create'];
  permission_edit: any[] = ['super-admin', 'admin.users.edit'];
  permission_destroy: any[] = ['super-admin', 'admin.users.destroy'];
  // override dataSource = new MatTableDataSource<Location>(this.ELEMENT_DATA);
  // isLoading: boolean;
  cities: Icity[] = [];
  types: any [] = [];
  companies: ICompany[] = [];
  filters = {
    city_id: null,
    company_id: null,
    status: null,
    type: null
  }

  ngOnInit(): void {
    this.getDataFilters();
  }

  getDataFilters(): void {
    this.mhs.methodGet('admin/locations/data-filter').subscribe({
      next: (res) => {
        if (res?.success) {
          this.cities = res.data.cities;
          this.companies = res.data.companies;
          this.types = res.data.types;
        }
      }
    })
  }

  users: Location[];


  // refreshDataTable(data) {
  //   let row: Location[] = data.data as Location[];
  //   this.ELEMENT_DATA = row;
  //   this.dataSource = new MatTableDataSource<Location>(this.ELEMENT_DATA);
  // }

  // deleteItem(id): void {
  //   SwalService.swalConfirmation('Eliminar', 'Esta seguro de eliminar esta locación', 'warning').then((result) => {
  //     if (result.isConfirmed) {
  //       this.snack_bar.open('Eliminando locación espere ...');
  //       this.methodsHttp.methodDelete('admin/locations/' + id).subscribe(res => {
  //         if (res.hasOwnProperty('success') && res.success) {
  //           this.snack_bar.open('Localidad Eliminada con éxito', 'OK', { duration: 2000 });
  //           this.removeItemTable(id);
  //         } else {
  //           this.snack_bar.open('No se a podido eliminar ', 'Error', { duration: 2000 });
  //         }
  //       }, err => {
  //         console.log(err);
  //         this.snack_bar.open('No se a podido eliminar ', 'Error', { duration: 2000 });
  //       });
  //     } else if (
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //     }
  //   });
  // }

  // removeItemTable(id): void {
  //   const index = this.ELEMENT_DATA.findIndex(x => x.id == id);
  //   this.ELEMENT_DATA.splice(index, 1);
  //   this.dataSource = new MatTableDataSource<Location>(this.ELEMENT_DATA);
  // }

  // loadData($event): void {
  //   this.refreshDataTable($event);
  // }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }
}
