import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Session } from "../../clases/session";
import { User } from "../../clases/user";
import { Iresponse } from "../../interfaces/Imports/invoice-item";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { SwalService } from "../../services/swal.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent {
  hide:boolean = true;
  btnLogin: boolean = false;
  constructor(private auth_service: AuthService, private router: Router,public s_storage: StorageService) {}
  formLogin: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", Validators.required),
  });

  login(): void {
    if (this.formLogin.valid) {
      this.btnLogin = !this.btnLogin;
      // this.spinner.show();
      let email = this.formLogin.controls["email"].value;
      let password = this.formLogin.controls["password"].value;
      this.auth_service.login(email, password).subscribe(
        (res:Iresponse) => {
          console.log(res);
          if(res.hasOwnProperty('success') && res.success){
            const url = '/authetication/codigo-confirmacion/'+res.data.token;
            this.router.navigate([url]);
          }
          this.btnLogin = !this.btnLogin;
          // if(res.hasOwnProperty("access_token")) {
          //   let session:Session = new Session
          //   session.token = res.access_token
          //   session.expires_at = res.expires_at;
          //   session.token_type = res.token_type;
          //   let user:User = new User(res.user.id,res.user.name,res.permissions,res.roles,res.companies,res.company_company_id)
          //   session.user =user;
          //   this.s_storage.setCurrentSession(session)
          //   this.router.navigate(["/dashboard"]);
          // } else {
          //   SwalService.swalToast(
          //     "Error de autenticacion verifique su contraseña o email",
          //     "warning"
          //   );
          // }
          console.log(res);
        },
        (err) => {
          // console.log('error');
          this.btnLogin = !this.btnLogin;
        }
      );
    }
  }
}
