import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Permission_brands } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { CreateOrEditBrandComponent } from '../create-or-edit-brand/create-or-edit-brand.component';

@Component({
  selector: 'app-brands-index',
  templateUrl: './brands-index.component.html',
  styleUrls: ['./brands-index.component.css'],
})
export class BrandsIndexComponent extends MatTableHelper<any> implements OnInit {

  protected columnsToDisplay: string[] = ['id', 'name', 'code', 'products_count', 'actions'];
  protected url: string = 'products-admin/brands';
  
  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor(protected methodsHttp: MethodsHttpService, private dialog: MatDialog) {
    super();
  }

  permissions = Permission_brands.brands;
  ngOnInit(): void {
  }

  createOrEdit(isEdit = true, id =null ): void {
    this.dialog.open(CreateOrEditBrandComponent, {
      data: {id, isEdit},
      disableClose: true,
    }).beforeClosed().subscribe((data) => {
      if (data) {
        if(isEdit) {
        this.updateItemInTable(data.id, data);
        } else {
          this.addItemInTable(data);
        }
      }
    });
  }
}
