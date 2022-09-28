import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATH_LOGIN } from '../../class/fast-data';
import { StandartSearchService } from '../../services/standart-search.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-form-recuperation-password',
  templateUrl: './form-recuperation-password.component.html',
  styleUrls: ['./form-recuperation-password.component.css']
})
export class FormRecuperationPasswordComponent implements OnInit {

  constructor(private router:Router, private activeRouter:ActivatedRoute, private s_spinner:NgxSpinnerService,private s_standart:StandartSearchService) { }

  ngOnInit(): void {
    this.dataUser =  this.activeRouter.snapshot.data['user'].data
  }

  hidePasswordRepeat:boolean = true;
  hidePassword:boolean = true;
  isLoad:boolean = false;
  formRecuperationPassword:FormGroup = new FormGroup({
    password:new FormControl(null,[Validators.required]),
    password_confirmation:new FormControl(null,[Validators.required])
  })
  dataUser:any;

  sendRecuperationPassword():void{
    if(this.formRecuperationPassword.valid){
      this.s_spinner.show();
      const email = this.activeRouter.snapshot.queryParamMap.get("email") ;
      const token = this.activeRouter.snapshot.queryParamMap.get("token");
      this.s_standart.store('auth/password/reset',{email,token,...this.formRecuperationPassword.value}).subscribe(
        ()=>{
            this.router.navigate([PATH_LOGIN]);
            SwalService.swalFire({position:"center",icon:'success',title:'Contraseña cambiada con exito',html:'Ahora inicia sesion con tu nueva contraseña y email'})
            this.s_spinner.hide();
        },()=>{
          this.s_spinner.hide();
        }
      )
    }
  }
  goLogin(){
    this.router.navigate([PATH_LOGIN]);
  };

}
