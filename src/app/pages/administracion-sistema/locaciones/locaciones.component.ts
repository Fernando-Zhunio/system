import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '../../../class/location';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Icity } from '../../../interfaces/icity';
import { ICompany } from '../../../interfaces/icompanies';
import { MethodsHttpService } from '../../../services/methods-http.service';
import { SwalService } from '../../../services/swal.service';

declare let Swal: any;

@Component({
  selector: 'app-locaciones',
  templateUrl: './locaciones.component.html',
  styleUrls: ['./locaciones.component.css']
})
export class LocacionesComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService, private snack_bar: MatSnackBar) { }
  displayedColumns: string[] = [
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
  dataSource = new MatTableDataSource<Location>(this.ELEMENT_DATA);
  isLoading: boolean;
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
    this.methodsHttp.methodGet('admin/locations/data-filter').subscribe({
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


  refreshDataTable(data) {
    let row: Location[] = data as Location[];
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<Location>(this.ELEMENT_DATA);
  }

  deleteItem(id): void {
    SwalService.swalConfirmation('Eliminar', 'Esta seguro de eliminar esta locación', 'warning').then((result) => {
      if (result.isConfirmed) {
        this.snack_bar.open('Eliminando locación espere ...');
        this.methodsHttp.methodDelete('admin/locations/' + id).subscribe(res => {
          if (res.hasOwnProperty('success') && res.success) {
            this.snack_bar.open('Localidad Eliminada con éxito', 'OK', { duration: 2000 });
            this.removeItemTable(id);
          } else {
            this.snack_bar.open('No se a podido eliminar ', 'Error', { duration: 2000 });
          }
        }, err => {
          console.log(err);
          this.snack_bar.open('No se a podido eliminar ', 'Error', { duration: 2000 });
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    });
  }

  removeItemTable(id): void {
    const index = this.ELEMENT_DATA.findIndex(x => x.id == id);
    this.ELEMENT_DATA.splice(index, 1);
    // this.dataSource.data.splice(this.ELEMENT_DATA.indexOf(element),1);
    this.dataSource = new MatTableDataSource<Location>(this.ELEMENT_DATA);
  }

  //#endregion
  loadData($event): void {
    // this.paginator = $event.data;
    this.refreshDataTable($event);
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  // createLocation(isEdit= false, id= 0): void{
  //   let title = 'Creando Pais';
  //   let state = 'create';
  //   let location = null;
  //   if (isEdit){
  //     title = 'Editando Pais';
  //     state = 'edit';
  //     const index = this.ELEMENT_DATA.findIndex(res => res.id === id);
  //     if (index !== -1) {
  //       location = this.ELEMENT_DATA[index];
  //     }
  //     else { return; }
  //   }
  //   this.dialog.open(CreateOrEditLocationComponent, {data: {action: {title, state}, Location}}).beforeClosed().subscribe(res => {
  //     if (res)
  //     {
  //       this.snack_bar.open('Espere gestionando...');
  //       if (res.action === 'edit') {
  //         this.s_standart.updatePut('admin/countries/' + res.data.id, res.data).subscribe(res1 => {
  //           this.snack_bar.open('Pais Editado con exito', 'OK', {duration: 2000})
  //         });
  //       } else {
  //         this.s_standart.store('admin/countries', res.data).subscribe((res1: {success: boolean, data: Location}) => {
  //           this.snack_bar.open('Pais creado con exito', 'OK', {duration: 2000})
  //           this.ELEMENT_DATA.push(res1.data);
  //           this.dataSource = new MatTableDataSource<Location>(this.ELEMENT_DATA);
  //         });
  //       }
  //     }
  //   });
  // }


}
