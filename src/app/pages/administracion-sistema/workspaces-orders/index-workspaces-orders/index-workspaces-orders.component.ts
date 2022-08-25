import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { IOrderWorkspace } from '../../../../interfaces/iorder';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-index-workspaces-orders',
  templateUrl: './index-workspaces-orders.component.html',
  styleUrls: ['./index-workspaces-orders.component.scss']
})
export class IndexWorkspacesOrdersComponent extends Crud<IOrderWorkspace> implements OnInit {

  url = 'system-orders/workspaces'
  workspaces: IOrderWorkspace[] = []
  override key = 'id';
  constructor(
    protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar,
  ) {
    super();
  }


  ngOnInit() {
  }




}
