import { NgModule } from '@angular/core';
import { WebhookUrlIndexComponent } from './webhook-url/webhook-url-index/webhook-url-index.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditWebhookUrlComponent } from './webhook-url/create-or-edit-webhook-url/create-or-edit-webhook-url.component';

const permisos = {
  prices_group: {
    index: ['super-admin'],
    show: ['super-admin'],
    create: ['super-admin'],
    edit: ['super-admin'],
    delete: ['super-admin'],
  },
};

const routes: Routes = [
  {
    path: 'webhooks-url',
    children: [
      {
        path: '',
        component: WebhookUrlIndexComponent,
        data: {
          permissions: {
            only: permisos.prices_group.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditWebhookUrlComponent,
        data: {
          permissions: {
            only: permisos.prices_group.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: ':webhook_url_id/edit',
        component: CreateOrEditWebhookUrlComponent,
        data: {
          permissions: {
            only: permisos.prices_group.create,
          },
          isEdit: true
        },
        canActivate: [NgxPermissionsGuard],
      },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class WebhooksModuleRouting { }
