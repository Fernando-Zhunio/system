import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebhookUrlIndexComponent } from './webhook-url/webhook-url-index/webhook-url-index.component';
import { WebhooksModuleRouting } from './webhooks.module.routing';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditWebhookUrlComponent } from './webhook-url/create-or-edit-webhook-url/create-or-edit-webhook-url.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [WebhookUrlIndexComponent, CreateOrEditWebhookUrlComponent],
  imports: [
    CommonModule,
    WebhooksModuleRouting,
    SearchTemplateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule
  ]
})
export class WebhooksModule { }
