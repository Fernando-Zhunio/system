import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Session } from '../../clases/session';
import { User } from '../../clases/user';
import { Iresponse } from '../../interfaces/Imports/invoice-item';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  hide: boolean = true;
  btnLogin: boolean = false;
  isLoginActive: boolean = true;
  constructor(private auth_service: AuthService, private router: Router, public s_storage: StorageService, public s_spinner: NgxSpinnerService) {}
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  formRecuperacionCuenta: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  login(): void {
    if (this.formLogin.valid) {
      this.btnLogin = !this.btnLogin;
      // this.spinner.show();
      const email = this.formLogin.controls['email'].value;
      const password = this.formLogin.controls['password'].value;
      this.auth_service.login(email, password).subscribe(
        (res: Iresponse) => {

          if (res.hasOwnProperty('success') && res.success) {
            const url = '/authetication/codigo-confirmacion/' + res.data.token;
            this.router.navigate([url]);
          } else {
            this.btnLogin = !this.btnLogin;
          }
        },
        (err) => {
          this.btnLogin = !this.btnLogin;
        }
      );
    }
  }

  recuperacionCuenta(): void {
    if (this.formRecuperacionCuenta.valid) {
      this.s_spinner.show();
      this.auth_service.recuperationPassword(this.formRecuperacionCuenta.get('email').value).subscribe(
        res => {
          this.s_spinner.hide();

          SwalService.swalFire({title: 'Correo enviado con exito', text: 'Busque en su correo ' + this.formRecuperacionCuenta.get('email').value + ' el email enviado por NOVICOMPU SYSTEM para la recuperacion contraseña', position: 'center', icon: 'success'})
          this.isLoginActive = true;
        }, err => {
          console.log(err);
          this.s_spinner.hide();
          SwalService.swalFire({title: 'El correo no se pudo enviar', html: 'Por favor intentelo de nuevo o pongase en contacto con el administrador <br><strong class="text-danger">' + err?.error?.data + '</strong>', position: 'center', icon: 'error'})

        }
      )
    }
  }
}
