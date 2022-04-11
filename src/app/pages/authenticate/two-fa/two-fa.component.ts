import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { Session } from '../../../clases/session';
import { User } from '../../../clases/user';
import { Iuser } from '../../../interfaces/inotification';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { SwalService } from '../../../services/swal.service';
import { environment } from '../../../../environments/environment';
import { compare } from 'compare-versions';
import { SharedService } from '../../../services/shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService,
  ) { }

  hide: boolean = true;
  hide2: boolean = true;
  isLoading = false;

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
      this.isLoading = true;
      this.s_standart
        .methodPost('auth/email-two-factor/' + this.token, this.formPassword.value)
        .subscribe((res) => {
          if (res.hasOwnProperty('success') && res?.success) {
            this.spinner.show('spinner-tf');
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

            // this.getPermissionAndVersionServer();
          } else {
            SwalService.swalToast(
              'Error  verifique su contraseña o email',
              'warning'
            );
          }
          this.isLoading = false;
        }, (err) => {
          this.isLoading = false;
        });
    }
  }

  ngOnDestroy(): void {

  }

  // getPermissionAndVersionServer() {
  //   return this.s_standart.methodGet('user/permissions-roles')
  //     .subscribe((res) => {
  //       this.spinner.show('spinner-tf');
  //       console.log('Response 1 - ', res);
  //       console.log({ res });
  //       if (res && res.hasOwnProperty('success') && res.success) {
  //         if (res.data?.last_version_frontend?.version) {
  //           this.validateVersion(res.data?.last_version_frontend?.version, res.data?.last_version_frontend?.description);
  //         }
  //         const permissions = res.data.my_permissions;
  //         const array_permissions = typeof permissions == 'string' && permissions == 'super-admin' ?
  //           [permissions] : permissions;
  //         this.s_storage.setPermission(array_permissions);
  //         SharedService.navItems = res.data.item_sidebar;
  //         this.router.navigate(['/home/inicio']);
  //       }

  //     }, (err) => {
  //       console.log(err);
  //       this.spinner.show('spinner-tf');
  //       SwalService.swalFire({ allowOutsideClick: false, confirmButtonText: 'Cerrar sesión', title: 'Error', text: "Error, presioné ctrl + f5 para limpiar el cache, \n Cierre e inicie sesion, \n si no se soluciona el problema consulta al administrador del sistema", icon: 'error' })
  //         .then(res => {
  //           if (res.isConfirmed) {
  //             this.s_storage.logout();
  //           }
  //         });
  //       throw err;
  //     });
  // }

  // validateVersion(latestVersion: string, message: string): void {
  //   try {
  //     const current_version = environment.appVersion;
  //     console.log(current_version, latestVersion);
  //     const isNewVersion = compare(current_version, latestVersion, '<'); // true
  //     if (isNewVersion) {
  //       SwalService.swalFire({ allowOutsideClick: false, showConfirmButton: true, title: 'Nueva de version', text: 'Hay una nueva versión de la aplicación, por favor actualice la aplicación, presione Ctrl + f5 \n' + message, icon: 'info' })
  //         .then((res) => {
  //           console.log(res);
  //           if (res.isConfirmed) {
  //             console.log('Confirmado');
  //             location.reload();
  //           }
  //         }).catch(() => { });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
