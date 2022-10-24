import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PATH_LOGIN } from '../../../../class/fast-data';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-capture-password',
  templateUrl: './capture-password.component.html',
  styleUrls: ['./capture-password.component.css']
})
export class CapturePasswordComponent implements OnInit  {

  constructor(private mhs: MethodsHttpService, private router: Router, private ar: ActivatedRoute) { }

  hide: boolean = true;
  hide2: boolean = true;
  isLoad = false;

  formPassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
    token: new FormControl('', [Validators.required])
  });
  // token: string;
  ngOnInit(): void {
    this.formPassword.get('token')?.setValue(this.ar.snapshot.queryParams['token']);
  }

  saveInServer(): void {
    let data = this.formPassword.value;
    if (this.formPassword.valid) {
      this.isLoad = true;
      this.mhs.methodPut('user/first-password', data).subscribe(res => {
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
