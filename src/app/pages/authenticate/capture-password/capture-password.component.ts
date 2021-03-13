import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-capture-password',
  templateUrl: './capture-password.component.html',
  styleUrls: ['./capture-password.component.css']
})
export class CapturePasswordComponent implements OnInit {

  constructor(private s_standart:StandartSearchService, private act_router:ActivatedRoute,private router:Router) { }

  hide:boolean = true;
  isLoad = false;
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  formPassword: FormGroup = new FormGroup({
    // email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required,Validators.pattern(this.regex)]),
  });
  token:string;
  ngOnInit(): void {
    this.token = this.act_router.snapshot.queryParamMap.get("token");
    if(!this.token) this.router.navigate(["login"])
  }

  confirmPassword():void{

  }
}
