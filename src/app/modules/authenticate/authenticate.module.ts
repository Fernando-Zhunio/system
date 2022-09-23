import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturePasswordComponent } from './capture-password/capture-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AutheticationRoutingModule, AutheticationMainComponents} from './authetication-routing.module'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TwoFAComponent } from './two-fa/two-fa.component';
import { CountdownModule } from 'ngx-countdown';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [CapturePasswordComponent, AutheticationMainComponents, TwoFAComponent],
  imports: [
    AutheticationRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CountdownModule,
    NgxSpinnerModule
  ]
})
export class AuthenticateModule { }
