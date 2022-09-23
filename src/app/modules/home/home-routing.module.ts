import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileComponent } from './profile/profile.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
  },
  {
    path: 'stores/vtex',
    component: StoresComponent,
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'versus',
        loadChildren: () => import('./versus/versus.module').then(m => m.VersusModule),
      }
    ],
    data: {
      isEdit: true,
      permissions: {
        only: ['super-admin', 'dashboard'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
