import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { Session } from '../../../../clases/session';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { StorageService } from '../../../../services/storage.service';
import { SwalService } from '../../../../services/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { User } from '../../../../shared/interfaces/user';
import { PATH_LOGIN } from '../../../../class/fast-data';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css'],
})
export class TwoFAComponent implements OnInit {
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
  user: User;

  config: CountdownConfig = {
    format: 'mm:ss',
    leftTime: 10,
  };
  CountInputs = 6;
  inputsValue: any[] = [];
  eventPaste = fromEvent(document, 'paste');

  ngOnInit(): void {
    this.eventPaste.subscribe(() => {
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

    const data = this.active_router.snapshot.data['response'].data;
    this.user = data.user;
    this.token = data.token.token;
    this.config.leftTime = 300 - data.time_sub;
  }

  fillInputs(code: string): void {
    let i = 0;
    code.split('').forEach((char) => {
      const input = this.inputs.get(i);
      if (input) {
        input.nativeElement.value = char;
      }
      i++;
    })
    setTimeout(() => {
      const input = this.inputs.get(5);
      if (input) {
        input.nativeElement.focus();
      }
    }, 2000)
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
      this.router.navigate([PATH_LOGIN]);
    }
  }

  inputKeyDown(event, target, index): void {
    if (event.key === 'Backspace') {
      if (target.value === '') {
        if (index != 0) {
          this.inputs.get(index - 1)?.nativeElement.focus();
        } else {
          target.value = '';
        }
      }
    } else if (event.key === "ArrowLeft" && index !== 0) {
      this.inputs.get(index - 1)?.nativeElement.focus();
    } else if (event.key === "ArrowRight" && index !== this.inputs.length - 1) {
      this.inputs.get(index + 1)?.nativeElement.focus();
    } else if (event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != "Enter") {
      target.setAttribute("type", "text");
      target.value = '';
    }
  }

  inputEvent(_event, target, index): void {
    if (target.value.length === 1 && index !== this.inputs.length - 1) {
      this.inputs.get(index + 1)?.nativeElement.focus();
    }
  }

  SaveInServer(): void {
    const code = this.getCodeTwoFactor();
    if (code.length === 6) {
      this.isLoading = true;
      this.s_standart
        .methodPost('auth/email-two-factor/' + this.token, { code })
        .subscribe({
          next: (res) => {
            if (res?.success) {
              this.spinner.show('spinner-tf');
              const session: Session = new Session();
              session.token = res.data.access_token;
              session.expires_at = res.data.expires_at;
              session.token_type = res.data.token_type;
              const {
                id,
                name,
                email,
                person
              } = res.data.user;
              session.user = {
                id,
                name,
                email,
                person
              };
              this.s_storage.setCurrentSession(session);
              this.router.navigate(['/home/inicio']);
            } else {
              SwalService.swalToast(
                'Error  verifique su contraseña o email',
                'warning'
              );
            }
            this.isLoading = false;
          }, error: () => {
            this.isLoading = false;
          }
        }
        );
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
}
