import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import Echo from 'laravel-echo';
import { Inotification } from '../../interfaces/inotification';
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

  constructor( private s_auth:AuthService, private route: Router,private s_storage: StorageService ){}
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

      let token ='Bearer '+ this.s_storage.getCurrentToken();
      const echo = new Echo({
        broadcaster: 'pusher',
        // key: '1564856898',
        cluster:'mt1',
        key: '03045e5e16a02b690e4c',
        // host: 'sistema-codificacion.test',
        //host: window.location.hostname,
        
        authEndpoint:'http://sistema-codificacion.test/api/broadcasting/auth',
        
        wsHost: 'sistema-codificacion.test',
        // wsHost: '//sistema-codificacion.test',
        disableStats: true,
        encrypted:false,
        wsPort: 6001,
        //wssPort: 6001,
        enabledTransports: ['ws'],
        forceTLS: false,
        auth:{
          headers:{
            Authorization:token,
            'Access-Control-Allow-Origin':'*'
          }
        }
      });

      echo.private('App.User.' + user.id).notification((notify)=>{
        console.log(notify);  
        const dataNoty:Inotification = notify.data_rendered;
        console.log(dataNoty);
        
        SwalService.swalToastNotification(dataNoty.text,dataNoty.image);
      });   
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

  section_admin_products:INavData[] =[
    {
      title: true,
      name: 'Informacion General',
    }
  ];
  section_admin_catalogo:INavData[] =[
    {
      title: true,
      name: 'Catalogo',
    }
  ]
  
  generateSideBarItems(){
    
  }
}

const navItems_: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Informacion General',
    

  // },
  // {
  //   name: 'Importaciones',
  //   url: '/theme/colors',
  //   icon: 'icon-cloud-upload',
  // },
  // {
  //   title: true,
  //   name: 'Administracion de productos'
  // },
  {
    name: 'Productos',
    url: '/admin-products/productos',
    icon: 'icon-basket',
    permission:'products-admin.products.index'
  },
  {
    name: 'Categoria',
    url: '/admin-products/categorias',
    icon: 'icon-badge',
    permission:'products-admin.categories.index'
  },
  {
    name: 'Marcas',
    url: '/admin-products/marcas',
    icon: 'icon-bag',
    permission:'products-admin.brands.index'
  },
  {
    name: 'Prefijos',
    url: '/admin-products/prefijos',
    icon: 'fab fa-autoprefixer',
    permission:'products-admin.prefixes.index'
  },
  // {
  //   title: true,
  //   name: 'Catalogo'
  // },
  {
    name: 'Buscar producto',
    url: '/catalogo/buscar_productos',
    icon: 'fas fa-search',
    permission:'catalogs.products.index'
  },
  {
    name: 'Mercado libre',
    url: '/catalogo/mercado-libre',
    icon: 'far fa-handshake',
    permission:'catalogs.ml-products.index'
  },
  {
    name: 'Publicaciones',
    url: '/catalogo/publicaciones',
    icon: 'fab fa-telegram-plane',
    permission:'catalogs.publications.index'
  },

// {
//   title: true,
//   name: 'Importaciones'
// },
{
  name: 'Proveedores',
  url: '/importaciones/proveedores',
  icon: 'fas fa-search',
  permission:'purchase-department.imports.index'
},
{
  name: 'Codificar importaciones',
  url: '/theme/colors',
  icon: 'far fa-handshake'
},
{
  name: 'Precios y promociones',
  url: '/theme/colors',
  icon: 'fab fa-telegram-plane',
  permission:'sin promocion'
}
]

