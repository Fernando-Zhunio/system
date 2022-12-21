import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Location } from '../../../../../class/location';
import { HeaderSearchComponent } from '../../../../../components/header-search/header-search.component';
import { Icity } from '../../../../../interfaces/icity';
import { ICompany } from '../../../../../interfaces/icompanies';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { DetailLocationDialogComponent } from '../../components/detail-location-dialog/detail-location-dialog.component';
import { PERMISSIONS_LOCATIONS } from '../../permissions/locations.permissions';

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
  // ELEMENT_DATA: Location[] = [];
  permissions = PERMISSIONS_LOCATIONS;
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

  openDetailLocation(id: number): void {

    const location = this.dataSource.find((location) => location.id === id);
    console.log({location})
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
