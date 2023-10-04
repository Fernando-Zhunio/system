import { IndexCompaniesComponent } from './pages/index-companies/index-companies.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { COMPANIES_PERMISSIONS } from './permissions/companies.permissions'
import { CreateOrEditCompanyComponent } from './pages/create-or-edit-company/create-or-edit-company.component';
import { IndexDepartmentsComponent } from './pages/index-departments/index-departments.component';
import { CreateOrEditDepartmentComponent } from './pages/create-or-edit-department/create-or-edit-department.component';
import { DialogCreateOrEditPositionComponent } from './components/dialog-create-or-edit-position/dialog-create-or-edit-position.component';
import { IndexPositionsComponent } from './pages/index-positions/index-positions.component';
const routes: Routes = [
    {
        path: '',
        component: IndexCompaniesComponent,
        data: {
            permissions: {
                only: COMPANIES_PERMISSIONS.index,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: 'create',
        component: CreateOrEditCompanyComponent,
        data: {
            isEdit: true,
            permissions: {
                only: COMPANIES_PERMISSIONS.create,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: ':id/edit',
        component: CreateOrEditCompanyComponent,
        data: {
            isEdit: true,
            permissions: {
                only: COMPANIES_PERMISSIONS.edit,
            },
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: ':company_id/departments',
        children: [
            {
                path: '',
                component: IndexDepartmentsComponent,
            },
            {
                path: 'create',
                component: CreateOrEditDepartmentComponent,
            },
            {
                path: ':department_id/edit',
                component: CreateOrEditDepartmentComponent,
                data: {
                    isEdit: true,
                },
            },
            {
                path: ':department_id/positions',
                children: [
                    {
                        path: '',
                        component: IndexPositionsComponent,
                    },
                    {
                        path: 'create',
                        component: DialogCreateOrEditPositionComponent,
                        data: {
                            isEdit: false,
                            permissions: {},
                        },
                    },
                    {
                        path: ':position_id/edit',
                        component: DialogCreateOrEditPositionComponent,
                        data: {
                            isEdit: true,
                            permissions: {},
                        },
                    },
                ],
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [
        RouterModule
    ]
})
export class CompaniesRoutingModule { }