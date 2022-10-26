import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ok-login',
  templateUrl: './ok-login.component.html',
  styleUrls: ['./ok-login.component.css']
})
export class OkLoginComponent implements OnInit {

  constructor(private sa:AuthService, private permissions:NgxPermissionsService) { }

  ngOnInit(): void {
    this.permissions.hasPermission(["super-admin", "ml.accounts.create"]).then(res=>{
      if(!res){
        this.sa.logout();
      }
    });
  }

  salir():void{
    window.opener.focus()
    window.close()
  }

}
