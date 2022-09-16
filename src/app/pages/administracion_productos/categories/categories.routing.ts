import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriesIndexComponent } from './pages/categories-index.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { Permission_categories } from '../../../class/permissions-modules';
import { CategoriesCreateOrEditComponent } from './pages/categories-create-or-edit/categories-create-or-edit.component';
import { CategoriesIndexComponent } from './pages/categories-index/categories-index.component';

// const permission_categories = Permission_categories.categories;


const routes: Routes = [
      {
        path: '',
        component: CategoriesIndexComponent,
        data: {
          permissions: {
            only: Permission_categories.categories.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CategoriesCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: Permission_categories.categories.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CategoriesCreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: Permission_categories.categories.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
