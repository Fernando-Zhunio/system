import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { PERMISSIONS_IMPORTS } from '../../class/permissions-imports';
import { CreateOrEditImportModalComponent } from '../../components/create-or-edit-import-modal/create-or-edit-import-modal.component';
import { ShowImportDialogComponent } from '../../components/show-import-dialog/show-import-dialog.component';
import { Import } from '../../interfaces/imports';
import { Origin } from '../../interfaces/origin';

@Component({
  selector: 'app-imports-index',
  templateUrl: './imports-index.component.html',
  styleUrls: ['./imports-index.component.scss']
})
export class ImportsIndexComponent extends MatTableHelper<Import>  {
  protected columnsToDisplay: string[] = ['id', 'code', 'arrival_date', 'created_at', 'actions']
  protected url: string = 'catalogs/imports';
  @ViewChild(MatTable) table: MatTable<Import>;

  origin: Origin
  permissions = PERMISSIONS_IMPORTS;
  constructor(private dialog: MatDialog, protected mhs: MethodsHttpService) {
    super();
  }

  openDialogCreateOrEditImport(importId?: number | null) {
    const data = this.dataForDialog(importId);
    this.dialog.open(CreateOrEditImportModalComponent, {
      data,
      maxWidth: '500px',
      disableClose: true,
    }).beforeClosed().subscribe((response) => {
      if (response?.success) {
       importId ? this.updateItemInTable(importId, response.data) : this.addItemInTable(response.data);
      }
    });
  }

  dataForDialog(importId: number | null = null): any {
    return {
      isEdit: importId ? true : false,
      id: importId,
    }
  }

  openDialogShowImport(importId: number) {
    this.dialog.open(ShowImportDialogComponent, {
      data: {
        importId
      }
    });
  }

}
