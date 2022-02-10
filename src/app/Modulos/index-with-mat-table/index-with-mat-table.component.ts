import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HeaderSearchComponent } from '../../components/header-search/header-search.component';
import { Ipagination } from '../../interfaces/ipagination';
import { IPermission } from '../../interfaces/ipermission';
import { StandartSearchService } from '../../services/standart-search.service';

@Component({
  selector: 'app-index-with-mat-table',
  templateUrl: './index-with-mat-table.component.html',
  styleUrls: ['./index-with-mat-table.component.css'],
})
export class IndexWithMatTableComponent implements OnInit {
  constructor(
    private s_standard: StandartSearchService,
    private snack_bar: MatSnackBar // private dialog: MatDialog
  ) { }
  @Output() onClickEdit: EventEmitter<number> = new EventEmitter<any>();
  @Output() onClickDestroy: EventEmitter<number> = new EventEmitter<any>();
  @Output() onClickCreate: EventEmitter<number> = new EventEmitter<any>();
  @Output() onClickSaveEditItem: EventEmitter<number> = new EventEmitter<any>();
  @Input() displayedColumns: string[];

  @Input() itemRows: { key: string; title: string; isEditable: boolean }[] = [];
  @Input() placeholder: string = 'Buscador';
  @Input() url = 'indefinido';
  @Input() isEditable = false;
  @Input() permissions: { create: []; edit: []; destroy: [] } = {
    create: [],
    edit: [],
    destroy: [],
  };
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  paginator: Ipagination<any>;
  isLoading: boolean;
  dataLastRevert: any[] = [];
  isCreating: boolean = false;

  ngOnInit(): void { }

  loadData($event): void {
    console.log($event.data);
    this.paginator = $event.data;
    this.refreshDataTable(this.paginator.data);
  }

  changePaginator(event = null): void {
    if (event) {
      this.headerComponent.searchBar(event);
    } else {
      this.headerComponent.searchBar();
    }
  }

  refreshDataTable(data) {
    const row: any[] = data as any[];
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

  onClickEditItem(id, isClose = false): void {
    this.onClickEdit.emit(id);
    if ( id == 'Sin datos') {
      this.removeItemTable(id);
      this.isCreating = false;
      return;
    }
    if (this.isEditable) {
      if (isClose) {
        const data = this.dataSource.data.find((x) => x['id'] == id);
        const data_editable = this.getItemEditable();
        const data_revert = {
          ...this.dataLastRevert.find((x) => x['id'] == id),
          isEditable: false,
        };
        data_editable.forEach((element) => {
          data[element.key] = data_revert[element.key];
        });
        data.isEditable = false;
        const index = this.dataLastRevert.findIndex((x) => x['id'] == id);
        this.dataLastRevert.splice(index, 1);
      } else {
        const data = this.dataSource.data.find((x) => x['id'] == id);
        data.isEditable = true;
        this.dataLastRevert.push(Object.assign({}, data));
      }
    }
  }

  getItemEditable(): any[] {
    return this.itemRows.filter((x) => x.isEditable == true);
  }

  saveInServer(id, isCreating = false): void {
    if (isCreating) {
      const data_row = this.dataSource.data.find((x) => x['id'] == id);
      const name_editable = this.getItemEditable();
      const data_send = {};
      name_editable.map((x) => {
        return (data_send[x.key] = data_row[x.key]);
      });
      this.s_standard
        .store(`${this.url}`, { ...data_send })
        .subscribe((res) => {
          if (res.success) {
            this.snack_bar.open('Guardado con éxito', '', {
              duration: 2000,
            });
            const data = this.dataSource.data.find((x) => x['id'] == id);
            this.itemRows.forEach((element) => {
              data[element.key] = res.data[element.key];
            });
            data.isEditable = false;
            data.isCreating = false;
            this.isCreating = false;
          }
        });
    } else {
      const data_row = this.dataSource.data.find((x) => x['id'] == id);
      const name_editable = this.getItemEditable();
      const data_send = {};
      name_editable.map((x) => {
        return (data_send[x.key] = data_row[x.key]);
      });
      this.s_standard
        .updatePut(`${this.url}/${id}`, { ...data_send })
        .subscribe((res) => {
          if (res.success) {
            this.snack_bar.open('Guardado con éxito', '', {
              duration: 2000,
            });
            const data = this.dataSource.data.find((x) => x['id'] == id);
            const data_editable = this.getItemEditable();
            // const data_revert = {...this.dataLastRevert.find(x => x['id'] == id), isEditable: false};
            data_editable.forEach((element) => {
              data[element.key] = res.data[element.key];
            });
            data.isEditable = false;
            const index = this.dataLastRevert.findIndex((x) => x['id'] == id);
            this.dataLastRevert.splice(index, 1);
          }
        });
    }
  }

  onClickDestroyItem(id): void {
    this.onClickDestroy.emit(id);
  }

  onClickCreateItem(): void {
    this.onClickCreate.emit();
   if (this.isEditable) {
     const newRow = {};
     for (const element of this.itemRows) {
       if (element.isEditable) {
         newRow[element.key] = '';
         continue;
       }
       newRow[element.key] = 'Sin datos';
     }
     newRow['isEditable'] = true;
     newRow['isCreating'] = true;
     this.dataSource.data.push(newRow);
     this.table.renderRows();
     this.isCreating = true;
     const scrollBody = document.getElementsByClassName('app-body')[0];
     scrollBody.scrollTop = scrollBody.scrollHeight;
   }
  }

  removeItemTable(id): void {
    console.log(id);
    const index = this.ELEMENT_DATA.findIndex((x) => x['id'] == id);
    this.ELEMENT_DATA.splice(index, 1);
    // this.dataSource.data.splice(this.ELEMENT_DATA.indexOf(element),1);
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

  // updateItemTable(id, data: IPermission): void {
  //   const _data: IPermission = this.dataSource.data.find(x => x['id'] == id);
  //   if (data) {
  //     this.itemRows.forEach((element) => {
  //       _data[element.key] = data[element.key];
  //     });
  //     console.log(_data, data);
  //   }
  // }

   index(obj, i) {  return obj ? obj[i] : null}

}

