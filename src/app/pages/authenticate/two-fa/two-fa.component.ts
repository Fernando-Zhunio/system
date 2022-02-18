import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { Subscription } from 'rxjs';
import { Session } from '../../../clases/session';
import { User } from '../../../clases/user';
import { Iuser } from '../../../interfaces/inotification';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { SwalService } from '../../../services/swal.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css'],
})
export class TwoFAComponent implements OnInit, OnDestroy {
  constructor(
    private s_standart: StandartSearchService,
    private active_router: ActivatedRoute,
    private router: Router,
    private s_storage: StorageService,
    private dialog: MatDialog
  ) {}

  hide: boolean = true;
  hide2: boolean = true;
  isLoad = false;
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  formPassword: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  token: string;
  user: Iuser;

  config: CountdownConfig = {
    format: 'mm:ss',
    leftTime: 10,
  };



  ngOnInit(): void {
    const data = this.active_router.snapshot.data.response.data;
    this.user = data.user;
    this.token = data.token.token;
    this.config.leftTime = 300 - data.time_sub;
  }

  handleEvent(event) {
    if (event.action === 'done') {
      SwalService.swalToast('Tiempo agotado', 'warning');
      this.router.navigate(['/login']);
    }
  }

  SaveInServer(): void {
    if (this.formPassword.valid) {
      this.isLoad = true;
      this.s_standart
        .store('auth/email-two-factor/' + this.token, this.formPassword.value)
        .subscribe((res) => {
          if (res.hasOwnProperty('success') && res.success) {
            const session: Session = new Session();
            session.token = res.data.access_token;
            session.expires_at = res.data.expires_at;
            session.token_type = res.data.token_type;
            const user: User = new User(
              res.data.user.id,
              res.data.user.name,
              null,
              res.data.companies,
              res.data.company_company_id,
              res.data.user.person,
            );
            session.user = user;
            this.s_storage.setCurrentSession(session);
            this.router.navigate(['/home/inicio']);
          } else {
            SwalService.swalToast(
              'Error de autenticacion verifique su contraseña o email',
              'warning'
            );
          }
          this.isLoad = false;
        }, (err) => {
          this.isLoad = false;
        });
    }
  }

  ngOnDestroy(): void {

    // if (this.suscribir_reloj) {
    // this.suscribir_reloj.unsubscribe();
    // }
  }
}
