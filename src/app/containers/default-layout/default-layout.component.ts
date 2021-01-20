import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';
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
  public company_select = null;
  constructor(private s_auth:AuthService, private route: Router,private s_storage: StorageService ){}
  ngOnInit(): void {
    // if(localStorage.getItem('user_name')){
      // let user = localStorage.getItem('user_name');
      let user = this.s_storage.getCurrentUser();
      let username = user.name.replace(' ','+');
      this.url_img = "https://ui-avatars.com/api/?name="+username;
      this.companies = user.companies
      console.log(this.companies);
      
      const id_company =  user.company_company_id;
      const index = this.companies.findIndex(x=> x.id == id_company)
      if(index == -1){
        // this.company_select = "Todas las empresas"
        this.companies.push({id:'all',name:'Todas las empresas'})
        this.company_select = 'Todas las empresas'

      }
      else{

        this.company_select = this.companies[index].name;
        const indexAll = this.companies.findIndex(x=> x.id == 'all')
        if(indexAll ==-1){
        this.companies.push({id:'all',name:'Todas las empresas'})
        }

      }
      // console.log(index);
      
      // this.company_select = this.companies[index].name
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

  changeCompany(idCompany,index):void{
    if(this.company_select == this.companies[index].name)return;
    this.s_auth.changedCompany(idCompany).subscribe(res=>{
      if(res.success){
        SwalService.swalToast('Compañia cambiada con exito');
        // const aux_company = this.company_select;
        this.company_select = this.companies[index].name;
        this.s_storage.setCompanyUser(idCompany);
        this.route.navigateByUrl(`/`).then(
          () => {this.route.navigateByUrl(this.route.url);});
        // this.companies[index].name = aux_company;
      }
      // SwalService.swalToast('Up! a ocu');
    })
  }
}
