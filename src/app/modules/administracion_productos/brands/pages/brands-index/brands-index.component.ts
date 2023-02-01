import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Permission_brands } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { StatusCreateOrEdit } from '../../../../../shared/enums/status-create-or-edit';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';
import { CreateOrEditBrandComponent } from '../create-or-edit-brand/create-or-edit-brand.component';

@Component({
  selector: 'app-brands-index',
  templateUrl: './brands-index.component.html',
  styleUrls: ['./brands-index.component.css'],
})
export class BrandsIndexComponent extends MatTableHelper<any> {

  protected columnsToDisplay: string[] = ['id', 'name', 'code', 'products_count', 'actions'];
  protected url: string = 'products-admin/brands';
  
  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) {
    super();
  }

  permissions = Permission_brands.brands;

  createOrEdit(id =null ): void {
    const data: CreateOrEditDialogData = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create,
    }
    if (id) {
      data.id = id;
      data.info = this.dataSource.find((item) => item.id === id);
    }
    this.dialog.open(CreateOrEditBrandComponent, {
      data,
      disableClose: true,
    }).beforeClosed().subscribe((data) => {
      if (!data) {return }
        if(id) {
        this.updateItemInTable(id, data.sendData);
        } else {
          this.addItemInTable(data.response.data);
        }
    });
  }
}
