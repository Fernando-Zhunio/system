import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { CreateOrEditCompanyComponent } from '../create-or-edit-company/create-or-edit-company.component';
import { StatusCreateOrEdit } from '../../../../../shared/enums/status-create-or-edit';

@Component({
  selector: 'app-index-companies',
  templateUrl: './index-companies.component.html',
  styleUrls: ['./index-companies.component.scss']
})
export class IndexCompaniesComponent extends MatTableHelper<any> {
  protected columnsToDisplay: string[] = ['id', 'name', 'created_at', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;

  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) {
    super();
  }
  url: string = 'admin/companies';

  openDialog(id: number | null = null): void {
    const data = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create
    }
    if (id) {
      data['id'] = id;
      data['info'] = { ...this.dataSource.find((item: any) => item.id === id) };
    }
    console.log(data);

    this.dialog.open(CreateOrEditCompanyComponent, {
      data
    }).beforeClosed().subscribe((res) => {
      if (!res) {
        return
      }
      if (id) {
        this.updateItemInTable(id, res.sendData);
      } else {
        this.addItemInTable(res.sendData);
      }
    }
    );
  }
}
