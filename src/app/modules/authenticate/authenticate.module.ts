import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturePasswordComponent } from './pages/capture-password/capture-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule} from './authetication.routing'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TwoFAComponent } from './pages/two-fa/two-fa.component';
import { CountdownModule } from 'ngx-countdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './pages/login/login.component';
import { FormRecuperationPasswordComponent } from '../../views/form-recuperation-password/form-recuperation-password.component';
import { LayoutAuthComponent } from './components/layout-auth/layout-auth.component';

@NgModule({
  declarations: [LayoutAuthComponent, FormRecuperationPasswordComponent, CapturePasswordComponent, TwoFAComponent, LoginComponent],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CountdownModule,
    NgxSpinnerModule,
  ]
})
export class AuthenticateModule { }
