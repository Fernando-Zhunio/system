import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Permission_prefixes } from '../../../class/permissions-modules';
import { CreateOrEditPrefixComponent } from './pages/create-or-edit-prefix/create-or-edit-prefix.component';
import { PrefixesIndexComponent } from './pages/prefixes-index/prefixes-index.component';

// import { PrefijoComponent } from './prefijo.component';
// import { PrefijosCreateOrEditComponent } from './prefijos-create-or-edit/prefijos-create-or-edit.component';



const routes: Routes = [
      {
        path: '',
        component: PrefixesIndexComponent,
        data: {
          permissions: {
            only: Permission_prefixes.prefixes.index,
          },
        },
      },
      {
        path: 'create',
        component: CreateOrEditPrefixComponent,
        data: {
          isEdit: false,
          permissions: {
            only: Permission_prefixes.prefixes.create,
          },
        },
      },
      {
        path: 'edit/:id',
        component: CreateOrEditPrefixComponent,
        data: {
          isEdit: true,
          permissions: {
            only: Permission_prefixes.prefixes.edit,
          },
        },
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefixesRoutingModule {}
