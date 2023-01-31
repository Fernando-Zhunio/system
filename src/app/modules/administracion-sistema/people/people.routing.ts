import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { CreateOrEditPersonComponent } from "./pages/create-or-edit-person/create-or-edit-person.component";
import { IndexPeopleComponent } from "./pages/index-people/index-people.component";
import { PERMISSION_PEOPLE } from "./permissions/people.permissions";
const routes: Routes = [

    {
        path: '',
        component: IndexPeopleComponent,
        data: {
            permissions: {
                only: PERMISSION_PEOPLE.index,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: 'create',
        component: CreateOrEditPersonComponent,
        data: {
            isEdit: false,
            permissions: {
                only: PERMISSION_PEOPLE.create,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: ':id/edit',
        component: CreateOrEditPersonComponent,
        data: {
            isEdit: true,
            permissions: {
                only: PERMISSION_PEOPLE.edit,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeopleRoutingModule { }