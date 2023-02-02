import { MatTableModule } from '@angular/material/table';
import { NgxSearchBarPaginatorComponent } from './../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexWorkspacesOrdersComponent } from './pages/index-workspaces-orders/index-workspaces-orders.component';
import { WorkspacesOrdersRoutingRoutes } from './workspaces-orders.routing.routing';
import { CreateOrEditWorkspaceOrderComponent } from './pages/create-or-edit-workspace-order/create-or-edit-workspace-order.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchesModule } from '../../../Modulos/searches/searches.module';
import { SimpleSearchComponent } from '../../../shared/standalone-components/simple-search/simple-search.component';

@NgModule({
  imports: [
    CommonModule,
    WorkspacesOrdersRoutingRoutes,
    ReactiveFormsModule,
    SearchesModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    NgxSearchBarPaginatorComponent,
    MatTableModule,
    SimpleSearchComponent
  ],
  declarations: [
    IndexWorkspacesOrdersComponent,
    CreateOrEditWorkspaceOrderComponent
  ]
})
export class WorkspacesOrdersModule { }
