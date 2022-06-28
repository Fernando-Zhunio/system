import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexWorkspacesOrdersComponent } from './index-workspaces-orders/index-workspaces-orders.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';

@NgModule({
  imports: [
    CommonModule,
    SearchTemplateModule,
  ],
  declarations: [IndexWorkspacesOrdersComponent]
})
export class WorkspacesOrdersModule { }
