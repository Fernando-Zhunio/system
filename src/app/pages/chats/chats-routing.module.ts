import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreateGroupChatComponent } from './create-group-chat/create-group-chat.component';

// import { ComprasAutomaticasComponent } from "./compras-automaticas/compras-automaticas.component";
// import { IpermissionStandart } from "src/app/interfaces/ipermission-standart";

@Component({
  selector: 'app-as-users',
  template: '<router-outlet></router-outlet>',
})
export class ChatMainComponents {}


const permission_module_CHAT = {
  usuarios: {
    index: ['super-admin', 'admin.users.index'],
    show: ['super-admin', 'admin.roles.show'],
    create: ['super-admin', 'admin.users.create'],
    edit: ['super-admin', 'admin.users.edit'],
    delete: ['super-admin', 'admin.users.destroy'],
  },
};

// export const permission_usuarios_AD:IpermissionStandart = permission_module_AD.usuarios;
// export const PERMISSION_ROLES_AD:IpermissionStandart = permission_module_AD.roles;

const routes: Routes = [
  // usuarios
  {
    path: '',
    component: ChatMainComponents,
    children: [
      // {
      //   path: '',
      //   component: UsuariosComponent,
      //   data: {
      //     permissions: {
      //       only: permission_module_AD.usuarios.index,
      //       all: permission_module_AD.usuarios,
      //     },
      //   },
      //   canActivate: [NgxPermissionsGuard],
      // },
      {
        path: 'create-chat-group',
        component: CreateGroupChatComponent,
        // data: {
        //   isEdit: false,
        //   permissions: {
        //     only: permission_module_CHAT.usuarios.create,
        //   },
        // },
        // canActivate: [NgxPermissionsGuard],
      },
      // {
      //   path: 'edit/:id',
      //   component: CreateOrEditComponent,
      //   data: {
      //     isEdit: true,
      //     permissions: {
      //       only: permission_module_AD.usuarios.edit,
      //     },
      //   },
      //   canActivate: [NgxPermissionsGuard],
      // },
    ],
    // data: {
    //   permissions: {
    //     only: permission_module_AD.usuarios.index,
    //   },
    // },
    // canActivate: [NgxPermissionsGuard],
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class ChatRoutingModule {}
