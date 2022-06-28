import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexWorkspacesOrdersComponent } from './index-workspaces-orders/index-workspaces-orders.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { WorkspacesOrdersRoutingRoutes } from './workspaces-orders.routing.routing';
import { CreateOrEditWorkspaceOrderComponent } from './create-or-edit-workspace-order/create-or-edit-workspace-order.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchesModule } from '../../../Modulos/searches/searches.module';

@NgModule({
  imports: [
    CommonModule,
    WorkspacesOrdersRoutingRoutes,
    SearchTemplateModule,
    ReactiveFormsModule,
    SearchesModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [
    IndexWorkspacesOrdersComponent,
    CreateOrEditWorkspaceOrderComponent
  ]
})
export class WorkspacesOrdersModule { }
