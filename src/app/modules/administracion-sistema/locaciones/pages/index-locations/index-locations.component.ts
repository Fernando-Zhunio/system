import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  templateUrl: './index-locations.component.html',
  styleUrls: ['./index-locations.component.css']
})
export class IndexLocationsComponent extends MatTableHelper<Location> implements OnInit {
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
      minWidth: '50%'
    })
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }
}
