import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  styles:['button {outline: none;}'],
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public url_img = '';
  public companies = [];
  constructor(private s_auth:AuthService, private route: Router,private s_storage: StorageService ){}
  ngOnInit(): void {
    // if(localStorage.getItem('user_name')){
      // let user = localStorage.getItem('user_name');
      let user = this.s_storage.getCurrentUser();
      let username = user.name.replace(' ','+');
      this.url_img = "https://ui-avatars.com/api/?name="+username;
      this.companies = user.companies
    // }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout():void{
    this.s_auth.logout().subscribe(
      (res:any)=>{
        if(res.success){
          this.s_storage.logout();
        }
        // if(localStorage.getItem('token'))localStorage.removeItem('token');
        // this.route.navigate(['/login'])
      }
    )
  }
}
