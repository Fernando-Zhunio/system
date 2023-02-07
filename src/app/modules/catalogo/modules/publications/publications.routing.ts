import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { IndexPublicationsComponent } from "./pages/index-publications/index-publications.component";
import { PERMISSIONS_PUBLICATIONS } from "./permissions/publications.permissions";
import { ShowPublicationComponent } from "./pages/show-publication/show-publication.component";
import { EditPublicationComponent } from "./pages/create-or-edit-publication/create-or-edit-publication.component";

const routes: Routes = [

    {
        path: '',
        component: IndexPublicationsComponent,
        data: {
            permissions: {
                only: PERMISSIONS_PUBLICATIONS.index,
            },
            canActivate: [NgxPermissionsGuard],
        },
    },
    {
        path: ':id/edit',
        component: EditPublicationComponent,
        data: {
          isEdit: true,
          permissions: {
            only: PERMISSIONS_PUBLICATIONS.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: EditPublicationComponent,
        data: {
          isEdit: false,
          permissions: {
            only: PERMISSIONS_PUBLICATIONS.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: ':id/show',
        component: ShowPublicationComponent,
        data: {
          permissions: {
            only: PERMISSIONS_PUBLICATIONS.show,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicationsRoutingModule { }