import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { PersonDataComponent } from '../../components/person-data/person-data.component';
import { zoomImage } from '../../../../../shared/class/tools';
// import { Person } from '../../../../../shared/interfaces/person';

@Component({
  selector: 'app-peoples',
  templateUrl: './index-people.component.html',
  styleUrls: ['./index-people.component.css'],
})
export class IndexPeopleComponent extends MatTableHelper {
  protected columnsToDisplay: string[] = [
    'id',
    'image',
    'name',
    'position',
    'birthday',
    'city',
    'ci',
    'location',
    'sex',
    'start_date',
    'status',
    'user',
    'actions'
  ];
  protected url = 'admin/people';
  @ViewChild(MatTable) protected table: MatTable<any>;
 
  // @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  // isLoading: boolean = false;
  // paginator: Ipagination<Cperson>;

  constructor(
    protected mhs: MethodsHttpService,
    private dialog: MatDialog,
  ) {
    super();
  }

  openContactInfos(id: number): void {
    this.dialog.open(PersonDataComponent, {
      data: {id},
    });
  }

  zoom(event): void {
    zoomImage(event.target)
  }

}
