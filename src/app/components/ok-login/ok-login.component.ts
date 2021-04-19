import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-ok-login',
  templateUrl: './ok-login.component.html',
  styleUrls: ['./ok-login.component.css']
})
export class OkLoginComponent implements OnInit {

  constructor(private s_storage:StorageService, private permissions:NgxPermissionsService) { }

  ngOnInit(): void {
    this.permissions.hasPermission(["super-admin", "ml.accounts.create"]).then(res=>{
      if(!res){
        this.s_storage.logout();
      }
    });
  }

  salir():void{
    window.opener.focus()
    window.close()
  }

}
