import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { Import } from '../../interfaces/imports';

@Component({
  selector: 'app-imports-index',
  templateUrl: './imports-index.component.html',
  styleUrls: ['./imports-index.component.scss']
})
export class ImportsIndexComponent extends MatTableHelper<any> {
  protected columnsToDisplay: string[] = ['id', 'code', 'arrival_date', 'created_at', 'actions'] 
  protected url: string = 'catalogs/imports';
  @ViewChild(MatTable) table: MatTable<Import>;
  
  constructor(protected methodsHttp: MethodsHttpService) { 
    super();
  }

}
