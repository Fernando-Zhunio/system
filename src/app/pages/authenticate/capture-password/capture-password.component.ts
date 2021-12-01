import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { interval, Subscription } from 'rxjs';

import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from './../../../services/swal.service';

@Component({
  selector: 'app-capture-password',
  templateUrl: './capture-password.component.html',
  styleUrls: ['./capture-password.component.css']
})
export class CapturePasswordComponent implements OnInit, OnDestroy {

  constructor(private s_standard: StandartSearchService, private active_router: ActivatedRoute, private router: Router) { }

  hide: boolean = true;
  hide2: boolean = true;
  isLoad = false;
  // regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  formPassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required])
  });
  token: string;
  ngOnInit(): void {
    // this.active_router.queryParams.subscribe(params => {
    //   this.token = params.token;
    //   console.log(params);
    //   // if(!this.token) this.router.navigate(["login"])
    // });
    this.token = this.active_router.snapshot.queryParams.token;
    // console.log(this.token);
    if(!this.token){
      this.router.navigate(["login"]);
    }
    

  }

  saveInServer(): void {
    let data = this.formPassword.value;
    data.token = this.token;
    if (this.formPassword.valid) {
      this.isLoad = true;
      this.s_standard.updatePut('user/first-password', data).subscribe(res => {
        if (res.hasOwnProperty('success') && res.success) {
          this.router.navigate(["login"]);
        }
        else {
          SwalService.swalFire({text: 'A ocurrido un error', icon: 'error'});
        }
        this.isLoad = false;
      }, err => {
        SwalService.swalFire({text: 'A ocurrido un error', icon: 'error'});
        this.isLoad = false;
      });
    } 
  }

  // equalPassword(AC: AbstractControl): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null =>
  //     control.value === AC.get('password_confirmation').value
  //       ? null : { equalPassword: control.value };
  // }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    // this.suscribir_reloj.unsubscribe();
  }

}
