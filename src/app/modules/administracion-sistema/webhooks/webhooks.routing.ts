import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IndexWebhookUrlComponent } from './pages/index-webhook-url/index-webhook-url.component';
import { CreateOrEditWebhookUrlComponent } from './pages/create-or-edit-webhook-url/create-or-edit-webhook-url.component';
import { PERMISSIONS_WEBHOOKS } from './permissions/webhooks.permissions';


const routes: Routes = [
  {
    path: 'webhooks-url',
    children: [
      {
        path: '',
        component: IndexWebhookUrlComponent,
        data: {
          permissions: {
            only: PERMISSIONS_WEBHOOKS.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditWebhookUrlComponent,
        data: {
          permissions: {
            only: PERMISSIONS_WEBHOOKS.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: ':webhook_url_id/edit',
        component: CreateOrEditWebhookUrlComponent,
        data: {
          permissions: {
            only: PERMISSIONS_WEBHOOKS.create,
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
