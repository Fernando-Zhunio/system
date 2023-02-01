import { NgxSearchBarPaginatorComponent } from './../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebhooksModuleRouting } from './webhooks.routing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditWebhookUrlComponent } from './pages/create-or-edit-webhook-url/create-or-edit-webhook-url.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { IndexWebhookUrlComponent } from './pages/index-webhook-url/index-webhook-url.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [IndexWebhookUrlComponent, CreateOrEditWebhookUrlComponent],
  imports: [
    CommonModule,
    WebhooksModuleRouting,
    // SearchTemplateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    NgxSearchBarPaginatorComponent,
    MatTableModule
  ]
})
export class WebhooksModule { }
