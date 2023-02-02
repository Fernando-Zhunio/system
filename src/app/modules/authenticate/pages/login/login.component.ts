import { ResponseApi } from './../../../../shared/interfaces/response-api';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../services/auth.service';
import { StorageService } from '../../../../services/storage.service';
import { SwalService } from '../../../../services/swal.service';
import { YetiLook } from "../../../../class/yeti";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  hide: boolean = true;
  btnLogin: boolean = false;
  isLoginActive: boolean = true;
  constructor(private auth_service: AuthService, private router: Router, public s_storage: StorageService, public s_spinner: NgxSpinnerService) { }
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  formRestartAccount: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  yeti: YetiLook;

  ngAfterViewInit(): void {
    this.yeti = new YetiLook();
    this.yeti.initialize();
  }

  login(): void {
    if (this.formLogin.valid) {
      this.btnLogin = !this.btnLogin;
      const email = this.formLogin.controls['email'].value;
      const password = this.formLogin.controls['password'].value;
      this.auth_service.login(email, password).subscribe(
        {
          next: (res: ResponseApi<any>) => {
            if (res?.success) {
              const url = '/authentication/codigo-confirmacion/' + res.data.token;
              this.router.navigate([url]);
            } else {
              this.btnLogin = !this.btnLogin;
            }
          }, error: () => {
            this.btnLogin = !this.btnLogin;
          }
        }

      );
    }
  }

  restartAccount(): void {
    if (this.formRestartAccount.valid) {
      this.s_spinner.show();
      this.auth_service.recuperationPassword(this.formRestartAccount.get('email')?.value).subscribe(
        () => {
          this.s_spinner.hide();
          SwalService.swalFire({ title: 'Correo enviado con éxito', text: 'Busque en su correo ' + this.formRestartAccount.get('email')?.value + ' el email enviado por NOVICOMPU SYSTEM para la recuperación contraseña', position: 'center', icon: 'success' })
          this.isLoginActive = true;
        }, err => {
          this.s_spinner.hide();
          SwalService.swalFire({ title: 'El correo no se pudo enviar', html: 'Por favor inténtelo de nuevo o póngase en contacto con el administrador <br><strong class="text-danger">' + err?.error?.data + '</strong>', position: 'center', icon: 'error' })

        }
      )
    }
  }
}
