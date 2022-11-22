import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { PERMISSIONS_ADMIN_USERS } from "./class/permissions-users";
import { CreateOrEditUserComponent } from "./pages/create-or-edit-user/create-or-edit-user.component";
import { UsersIndexComponent } from "./pages/index-users-user/users-index.component";

const routes: Routes = [
    {
        path: '',
        component: UsersIndexComponent,
        data: {
          permissions: {
            only: PERMISSIONS_ADMIN_USERS.index,
          }
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditUserComponent,
        data: {
          isEdit: false,
          permissions: {
            only: PERMISSIONS_ADMIN_USERS.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditUserComponent,
        data: {
          isEdit: true,
          permissions: {
            only: PERMISSIONS_ADMIN_USERS.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}