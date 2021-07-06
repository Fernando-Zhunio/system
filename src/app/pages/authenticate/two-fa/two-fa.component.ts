import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { interval, Subscription } from "rxjs";
import { Session } from "../../../clases/session";
import { User } from "../../../clases/user";
import { Iuser } from "../../../interfaces/inotification";
import { StandartSearchService } from "../../../services/standart-search.service";
import { StorageService } from "../../../services/storage.service";
import { SwalService } from "../../../services/swal.service";

@Component({
  selector: "app-two-fa",
  templateUrl: "./two-fa.component.html",
  styleUrls: ["./two-fa.component.css"],
})
export class TwoFAComponent implements OnInit {
  constructor(
    private s_standart: StandartSearchService,
    private active_router: ActivatedRoute,
    private router: Router,
    private s_storage: StorageService
  ) {}

  hide: boolean = true;
  hide2: boolean = true;
  isLoad = false;
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  formPassword: FormGroup = new FormGroup({
    // email: new FormControl("", [Validators.email, Validators.required]),
    code: new FormControl("", [Validators.required]),
  });

  token: string;
  suscribir_reloj: Subscription;
  count_down: { hour: string; min: string } = { hour: "05", min: "00" };
  count_down_entero: { hour: number; min: number } = { hour: 5, min: 0 };
  user: Iuser;

  ngOnInit(): void {
    console.log(this.active_router.snapshot.data.response.data);
    const data = this.active_router.snapshot.data.response.data;
    this.user = data.user;
    this.token = data.token.token;
    const time_active = data.token.active;
    let fecha2 = new Date();
    let fecha1 = new Date(time_active);
    let resta = Math.round((fecha2.getTime() - fecha1.getTime())/1000);
    const time_rest = (300 - resta)/60;
    let min = Math.trunc(time_rest)
    let seg = Math.trunc((time_rest-min)*60);
    console.log({time_rest, min, seg, resta});
    console.log(Math.round(resta / (1000)));
    this.count_down.hour = min.toString();
    this.count_down.min = seg.toString();
    this.count_down_entero.hour = min;
    this.count_down_entero.min = seg;
    this.suscribir_reloj = interval(1000).subscribe((res) => {
      this.count_down_entero.min--;
      if (this.count_down_entero.min < 0) {
        this.count_down_entero.min = 59;
        this.count_down_entero.hour--;
        this.count_down.hour = this.count_down_entero.hour
          .toString()
          .padStart(2, "0");
        if (this.count_down_entero.hour < 0) {
          this.count_down.hour = "00";
          this.count_down.min = "00";
          this.suscribir_reloj.unsubscribe();
          this.router.navigate(['/login'])
          console.log("terminando");
          return;
        }
      }
      this.count_down.min = this.count_down_entero.min
        .toString()
        .padStart(2, "0");
    });
  }

  SaveInServer(): void {
    if (this.formPassword.valid) {
      this.s_standart
        .store("auth/email-two-factor/" + this.token, this.formPassword.value)
        .subscribe((res) => {
          console.log(res);
          if (res.hasOwnProperty("success") && res.success) {
            let session: Session = new Session();
            session.token = res.data.access_token;
            session.expires_at = res.data.expires_at;
            session.token_type = res.data.token_type;
            let user: User = new User(
              res.data.user.id,
              res.data.user.name,
              res.data.permissions,
              res.data.roles,
              res.data.companies,
              res.data.company_company_id
            );
            session.user = user;
            this.s_storage.setCurrentSession(session);
            this.router.navigate(["/home/inicio"]);
          } else {
            SwalService.swalToast(
              "Error de autenticacion verifique su contraseña o email",
              "warning"
            );
          }
        });
    }
  }

  confirmPassword(): void {}
}
