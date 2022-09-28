import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapturePasswordComponent } from './pages/capture-password/capture-password.component';
import { NewPasswordGuard } from '../../guards/new-password.guard';
import { TwoFAComponent } from './pages/two-fa/two-fa.component';
import { ConfirmCodeGuard } from '../../guards/confirm-code.guard';
import { LoginComponent } from './pages/login/login.component';
import { AuthReverseGuard } from '../../guards/auth-reverse.guard';
import { FormRecuperationPasswordComponent } from '../../views/form-recuperation-password/form-recuperation-password.component';
import { RecuperatePasswordGuard } from '../../guards/recuperate-password.guard';




const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      guard: 'guest'
    },
    canActivate: [AuthReverseGuard]
  },
  {
    path: 'recuperation-password',
    component: FormRecuperationPasswordComponent,
    resolve: { user: RecuperatePasswordGuard },
    data: {
      title: 'Recuperation password Page',
      guard: 'guest'
    },
  },
  {
    path: 'capture-password',
    component: CapturePasswordComponent,
    canLoad: [NewPasswordGuard],
    resolve: { person: NewPasswordGuard }
  },
  {
    path: 'codigo-confirmacion/:token',
    component: TwoFAComponent,
    resolve: { response: ConfirmCodeGuard },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
