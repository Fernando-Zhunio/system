import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarIndexComponent } from './sidebar-index/sidebar-index.component';
import { CreateOrEditSidebarComponent } from './create-or-edit-sidebar/create-or-edit-sidebar.component';

const permission_module = {
  index: ['super-admin', 'admin.sidebar.index'],
  show: ['super-admin', 'admin.sidebar.show'],
  create: ['super-admin', 'admin.sidebar.create'],
  edit: ['super-admin', 'admin.sidebar.edit'],
  delete: ['super-admin', 'admin.sidebar.destroy'],
};

const routes: Routes = [
  {
    path: '',
    component: SidebarIndexComponent,
    data: {
      permissions: {
        only: permission_module.index,
      }
    }
  },
  {
    path: 'item/create',
    component: CreateOrEditSidebarComponent,
    data: {
      permissions: {
        only: permission_module.create,
      }
    }
  },
  {
    path: 'item/:id/edit',
    component: CreateOrEditSidebarComponent,
    data: {
      permissions: {
        only: permission_module.edit,
      },
      isEdit: true
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class SidebarRoutingModule { }
