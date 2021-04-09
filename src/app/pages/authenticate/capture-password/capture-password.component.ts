import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-capture-password',
  templateUrl: './capture-password.component.html',
  styleUrls: ['./capture-password.component.css']
})
export class CapturePasswordComponent implements OnInit {

  constructor(private s_standart:StandartSearchService, private act_router:ActivatedRoute,private router:Router) { }

  hide:boolean = true;
  hide2:boolean = true;
  isLoad = false;
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  formPassword: FormGroup = new FormGroup({
    // email: new FormControl("", [Validators.email, Validators.required]),
    password : new FormControl("", [Validators.required,Validators.pattern(this.regex)]),
    password_confirmation : new FormControl("", [Validators.required,Validators.pattern(this.regex)]),
  });
  token:string;
  suscribir_reloj:Subscription;
  count_down:{hour:string,min:string}={hour:"05",min:"00"}
  count_down_entero:{hour:number,min:number}={hour:5,min:0}
  ngOnInit(): void {
    // this.token = this.act_router.snapshot.queryParamMap.get("token");
    // if(!this.token) this.router.navigate(["login"])
   this.suscribir_reloj= interval(1000).subscribe(res=>{
     this.count_down_entero.min--;
     if(this.count_down_entero.min < 0)
     {
       this.count_down_entero.min = 12;
       this.count_down_entero.hour--;
       this.count_down.hour = this.count_down_entero.hour.toString().padStart(2,"0");
       if(this.count_down_entero.hour < 0){
         this.count_down.hour = "00";
         this.count_down.min = "00";
         this.suscribir_reloj.unsubscribe();
         console.log("terminando");
         return;
        }
      }
      this.count_down.min = this.count_down_entero.min.toString().padStart(2,"0");
   })
  }

  SaveInServer():void{
    if(this.formPassword.valid){
      this.s_standart.updatePut('user/new-password',this.formPassword.value).subscribe(res=>{
        console.log(res);
        if(res.hasOwnProperty('success') && res.success){

        }

      })
    }
  }




  confirmPassword():void{

  }
}
