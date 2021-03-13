import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GroupProductsComponent } from "../reportes/group-products/group-products.component";
import { NgxPermissionsGuard } from "ngx-permissions";
import { CreateOrEditGroupProductsComponent } from "../reportes/group-products/create-or-edit-group-products/create-or-edit-group-products.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CreateOrEditComponent } from "./usuarios/create-or-edit/create-or-edit.component";
import { RolesComponent } from "./roles/roles.component";
import { CreateOrEditRolesComponent } from "./roles/create-or-edit-roles/create-or-edit-roles.component";
import { IpermissionStandart } from "../../interfaces/ipermission-standart";
// import { IpermissionStandart } from "src/app/interfaces/ipermission-standart";

@Component({
  selector: 'app-as-users',
  template: '<router-outlet></router-outlet>',
})
export class ADUsersMainComponents  {
}

@Component({
  selector: 'app-as-roles',
  template: '<router-outlet></router-outlet>',
})
export class ADRolesMainComponents  {
}

const permission_module_AD = {
  usuarios:{
    show:["super-admin", "admin.users.index"],
    create:["super-admin", "admin.users.create"],
    edit:["super-admin", "admin.users.edit"],
    delete:["super-admin", "admin.users.index"]
  },
  roles:{
    show:["super-admin", "admin.roles.index"],
    create:["super-admin", "admin.roles.create"],
    edit:["super-admin", "admin.roles.edit"],
    delete:["super-admin", "admin.roles.index"]
  }
}

export const permission_usuarios_AD:IpermissionStandart = permission_module_AD.usuarios;
export const PERMISSION_ROLES_AD:IpermissionStandart = permission_module_AD.roles;

const routes: Routes = [
  // usuarios
  {
    path:'usuarios',
    component:ADUsersMainComponents,
    children:[
      {
        path:'',
        component:UsuariosComponent,

        data: {
          permissions: {
            only: permission_module_AD.usuarios.show,
            all:permission_module_AD.usuarios
          },

        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path:'create',
        component:CreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: permission_module_AD.usuarios.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path:'edit/:id',
        component:CreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: permission_module_AD.usuarios.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      }
    ],
    data: {
      permissions: {
        only: permission_module_AD.usuarios.show,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },

  // roles
  {
    path:'roles',
    component:ADRolesMainComponents,
    children:[
      {
        path:'',
        component:RolesComponent,
        data: {
          permissions: {
            only: permission_module_AD.roles.show,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path:'create',
        component:CreateOrEditRolesComponent,
        data: {
          isEdit:false,
          permissions: {
            only: permission_module_AD.roles.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path:'edit/:id',
        component:CreateOrEditRolesComponent,
        data: {
          isEdit:true,
          permissions: {
            only: permission_module_AD.roles.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: permission_module_AD.roles.show
      },
    },
    canActivate: [NgxPermissionsGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSystemRoutingModule {}
