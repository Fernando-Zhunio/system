import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PermissionOrders, PermissionOrdersTickets } from '../../../../class/permissions-modules';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { SearchTemplateComponent } from '../../../../components/search-template/search-template.component';
import { IOrderWorkspace, ITicketOrder } from '../../../../interfaces/iorder';
import { MethodsHttpService } from '../../../../services/methods-http.service';

@Component({
  templateUrl: './tickets-index.component.html',
  styleUrls: ['./tickets-index.component.scss']
})
export class TicketsIndexComponent implements OnInit {

  @ViewChild(SearchTemplateComponent) headerComponent: SearchTemplateComponent;
  constructor(private methodsHttp: MethodsHttpService) { }

  url = 'system-orders/tickets';
  workspaceSelect = null;
  tickets: ITicketOrder[] = [];
  filters = {
    status: 'open',
    ticket_department_id: null,
    order_id: null,
    client_id: null,
    client_unread_messages: null,
    user_unread_messages: null,
  };
  statuses = [];
  departments = [];
  permissions = PermissionOrdersTickets;
  permissionOrderIndex = PermissionOrders.index;
  workspaces: IOrderWorkspace[] = [];


  ngOnInit(): void {
    this.getDataForFilter();
    this.getMyWorkspacesOrder();
  }

  getDataForFilter(): void {
    this.methodsHttp.methodGet('system-orders/tickets/filter-data').subscribe(res => {
      this.departments = res.data.departments;
      this.statuses = res.data.statuses;
      this.workspaceSelect = res.data.workspace_preference;

    });
  }

  getData(event): void {
    console.log(event);
    this.tickets = event;
  }

  changeWorkspaces(event: MatSelectChange) {
    this.methodsHttp.methodPut(`system-orders/workspaces/preference/${event.value}`)
      .subscribe(
        {
          next: (res) => {
            this.headerComponent.searchNow();
          }
        }
      )
  }

  getMyWorkspacesOrder(): void {
    this.methodsHttp.methodGet(`system-orders/workspaces/me`)
      .subscribe(
        {
          next: (res) => {
            this.workspaces = res.data;
          }
        }
      )
  }
}
