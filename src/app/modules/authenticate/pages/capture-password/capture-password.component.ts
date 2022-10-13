import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATH_LOGIN } from '../../../../class/fast-data';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-capture-password',
  templateUrl: './capture-password.component.html',
  styleUrls: ['./capture-password.component.css']
})
export class CapturePasswordComponent  {

  constructor(private s_standard: StandartSearchService, private router: Router) { }

  hide: boolean = true;
  hide2: boolean = true;
  isLoad = false;
  // regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  formPassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required])
  });
  token: string;
  // ngOnInit(): void {
  //   this.token = this.active_router.snapshot.queryParams['token'];
  //   // if(!this.token){
  //   //   this.router.navigate([PATH_LOGIN]);
  //   // }
  // }

  saveInServer(): void {
    let data = this.formPassword.value;
    data.token = this.token;
    if (this.formPassword.valid) {
      this.isLoad = true;
      this.s_standard.updatePut('user/first-password', data).subscribe(res => {
        if (res.hasOwnProperty('success') && res.success) {
          this.router.navigate([PATH_LOGIN]);
        }
        else {
          SwalService.swalFire({text: 'A ocurrido un error', icon: 'error'});
        }
        this.isLoad = false;
      }, () => {
        SwalService.swalFire({text: 'A ocurrido un error', icon: 'error'});
        this.isLoad = false;
      });
    }
  }


}
