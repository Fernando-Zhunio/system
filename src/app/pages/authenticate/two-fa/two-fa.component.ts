import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { Session } from '../../../clases/session';
import { User } from '../../../clases/user';
import { Iuser } from '../../../interfaces/inotification';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { SwalService } from '../../../services/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';

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

  @ViewChildren('contentInput') inputs: QueryList<ElementRef>;
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
  CountInputs = 6;
  inputsValue = [];
  eventPaste = fromEvent(document, 'paste');



  ngOnInit(): void {
    this.eventPaste.subscribe((event) => {
      if (navigator.clipboard) {
        navigator.clipboard.readText().then((res) => {
          this.fillInputs(res);
        });
      } else {
        SwalService.swalToast(
          'Necesitas proporcionar permisos de portapapeles a esta pagina',
          'warning'
        );
      }
    })
    this.initializeInputs();

    const data = this.active_router.snapshot.data.response.data;
    this.user = data.user;
    this.token = data.token.token;
    this.config.leftTime = 300 - data.time_sub;
  }

  fillInputs(code: string): void {
    let i = 0 ;
    code.split('').forEach((char) => {
      this.inputs.get(i).nativeElement.value = char;
      i++;
    })
    setTimeout(() => {
      this.inputs.get(5).nativeElement.focus();
    },2000)
  }

  initializeInputs(): void {
    this.inputsValue = [];
    for (let i = 0; i < this.CountInputs; i++) {
      this.inputsValue.push('');
    }
  }

  handleEvent(event) {
    if (event.action === 'done') {
      SwalService.swalToast('Tiempo agotado', 'warning');
      this.router.navigate(['/login']);
    }
  }

  inputKeyDown(event, target, index): void {
    console.log(this.inputs.get(index));
    if (event.key === 'Backspace') {
     if (target.value === '') {
      if (index != 0) {
        this.inputs.get(index - 1).nativeElement.focus();
      } else {
        target.value = '';
      }
     }
    } else if (event.key === "ArrowLeft" && index !== 0) {
      this.inputs.get(index - 1).nativeElement.focus();
    } else if (event.key === "ArrowRight" && index !== this.inputs.length - 1) {
      this.inputs.get(index + 1).nativeElement.focus();
    } else if (event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != "Enter") {
      target.setAttribute("type", "text");
      target.value = '';
    }
  }

  inputEvent(event, target, index): void {
    if (target.value.length === 1 && index !== this.inputs.length - 1) {
      this.inputs.get(index + 1).nativeElement.focus();
    }
  }

  SaveInServer(): void {
    const code = this.getCodeTwoFactor();
    // console.log(code);
    if (code.length === 6) {
      this.isLoading = true;
      this.s_standart
        .methodPost('auth/email-two-factor/' + this.token, {code})
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
    } else {
      SwalService.swalToast('Código incorrecto', 'warning');
    }
  }

  getCodeTwoFactor(): string {
    let code = '';
    this.inputs.forEach((input) => {
      code += input.nativeElement.value
    })
    return code;
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
