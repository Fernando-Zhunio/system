import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';

@Component({
  selector: 'app-index-workspaces-orders',
  templateUrl: './index-workspaces-orders.component.html',
  styleUrls: ['./index-workspaces-orders.component.scss']
})
export class IndexWorkspacesOrdersComponent extends MatTableHelper {
  protected columnsToDisplay = ['id', 'name', 'description','created_at', 'actions']; 
  @ViewChild(MatTable) protected table: MatTable<any>;
  
  url = 'system-orders/workspaces'
  constructor(
    protected mhs: MethodsHttpService,
  ) {
    super();
  }


  




}
