import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 

  constructor(private auth_service: AuthService,private router:Router){}
  formLogin:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',Validators.required),
  })


  login():void{
    if(this.formLogin.valid){
      let email = this.formLogin.controls['email'].value;
      let password = this.formLogin.controls['password'].value;
      this.router.navigate(['']);
      // this.auth_service.login(email,password).subscribe(
      //   res=>{
      //     console.log(res);
          
      //   },
      //   error=>{
      //     console.log(error);
          
      //   }
        
      //   )
    }
  }
}
