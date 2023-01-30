// import { NgxSearchBarFilter } from 'ngx-search-bar-fz';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Location } from '../../../../../class/location';
import { HeaderSearchComponent } from '../../../../../components/header-search/header-search.component';
import { Icity } from '../../../../../interfaces/icity';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { DetailLocationDialogComponent } from '../../components/detail-location-dialog/detail-location-dialog.component';
import { PERMISSIONS_LOCATIONS } from '../../permissions/locations.permissions';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from '../../../companies/interfaces/company';

@Component({
  selector: 'app-index-locations-page',
  templateUrl: './index-locations.page.html',
  styleUrls: ['./index-locations.page.css']
})
export class IndexLocationsPage extends MatTableHelper<Location> implements OnInit {
  protected url: string ='admin/locations';
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) { super() }
  columnsToDisplay: string[] = [
    'id',
    'name',
    'type',
    'status',
    'mba_code',
    'postal_code',
    'address',
    'reference',
    'latitude',
    'longitude',
    'city',
    'company',
    'acciones',
  ];
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  permissions = PERMISSIONS_LOCATIONS;
  cities: Icity[] = [];
  types: any [] = [];
  companies: Company[] = [];
  formFilters: FormGroup = new FormGroup({
    city_id: new FormControl(null),
    company_id: new FormControl(null),
    status: new FormControl(null),
    type: new FormControl(null),
  });

  // filters: NgxSearchBarFilter = {
  //   city_id: {
  //     value: 0,
  //     friendlyName: 'Ciudad',
  //   },
  //   company_id: {
  //     value: 0,
  //     friendlyName: 'Empresa',
  //     castValue: () => { 
  //       console.log('aqui')
  //      return this.companies.find((company) => company.id === this.filters['company_id'].value)?.name || 'nos'},
  //   },
  //   status: {
  //     value: null,
  //     friendlyName: 'Estado',
  //     castValue: 'fernando'
      
  //   },
  //   type: {
  //     value: null,
  //     friendlyName: 'Tipo',
  //   }
  // }

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

  openDetailLocation(id: number): void {

    const location = this.dataSource.find((location) => location.id === id);
    if (!location) return;
    this.dialog.open(DetailLocationDialogComponent, {
      data: location,
      panelClass: 'col-md-7',
      
    
    })
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }
}
