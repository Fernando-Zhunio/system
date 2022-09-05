import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INavData } from '../../../interfaces/inav-data';
import { StorageService } from '../../../services/storage.service';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-sidebar-fz',
  templateUrl: './sidebar-fz.component.html',
  styleUrls: ['./sidebar-fz.component.scss']
})
export class SidebarFzComponent implements OnInit {

  @Input() items: INavData[];
  @Output() isMinimizeSidebar: EventEmitter<boolean> = new EventEmitter();
  @Output() hiddenSidebar: EventEmitter<boolean> = new EventEmitter();

  onlyIcons: boolean = false;
  user: User | null = null;
  urlImg = 'https://ui-avatars.com/api/?background=random&name=';
  name: string;
  auxSearchPage: INavData[] = [];
  hiddenMenu: boolean = false;
  isMobile: boolean = false;

  constructor(public storage: StorageService) {
    this.user = this.storage.getCurrentUser();
    this.name = this.user!.person?.first_name ? this.user!.person?.first_name+' '+this.user?.person?.last_name[0] : this.getLastNameFirstLetter(this.user!.name);
    this.urlImg += this.name;
  }

  getLastNameFirstLetter(full_name: string): string {
    const preName = full_name.split(' ');
    let name = preName[0];
    if (preName.length > 1) {
      name += ' ' + preName[1][0];
    }
    return name;
  }

  ngOnInit() {
    const width = window.innerWidth;
    if (width < 600) {
      // this.isMobile = true;
      this.hiddenMenu = true;
    }
  }

  searchPage(e): void {
    if (this.auxSearchPage.length < 1) {
      this.auxSearchPage = this.items;
    }
    this.items = this.auxSearchPage.filter(
      (item: any) => item?.name.toLowerCase().includes(e.target.value.toLowerCase()));
  }


  minimizeSidebar(): void {
    this.onlyIcons = !this.onlyIcons;
    this.isMinimizeSidebar.emit(this.onlyIcons);
  }

  toggleMenu(): void {
    this.hiddenMenu = !this.hiddenMenu;
    this.hiddenSidebar.emit(this.hiddenMenu);
    // return this.hiddenMenu;
  }
}

// function dataFaker() {
//   return [
//     {
//       "title": true,
//       "name": "Inicio"
//     },
//     {
//       "id": 2,
//       "name": "Dashboard",
//       "url": "/home/dashboard",
//       "icon": "icon-speedometer",
//       "permission_id": 141,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 141,
//         "group_permission_id": 1,
//         "group_permission": {
//           "id": 1,
//           "name": "Inicio",
//           "slug": "home",
//           "position": 0,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 1,
//       "name": "Inicio",
//       "url": "/home/inicio",
//       "icon": "icon-home",
//       "permission_id": 1,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 1,
//         "group_permission_id": 1,
//         "group_permission": {
//           "id": 1,
//           "name": "Inicio",
//           "slug": "home",
//           "position": 0,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "title": true,
//       "name": "Recursos humanos"
//     },
//     {
//       "id": 5,
//       "name": "Citas",
//       "url": "/recursos-humanos/appointments",
//       "icon": "icon-star",
//       "permission_id": 143,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 143,
//         "group_permission_id": 2,
//         "group_permission": {
//           "id": 2,
//           "name": "Recursos humanos",
//           "slug": "rrhh",
//           "position": 1,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 3,
//       "name": "Dashboard Rrhh",
//       "url": "/recursos-humanos/dashboard",
//       "icon": "icon-star",
//       "permission_id": 142,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 142,
//         "group_permission_id": 2,
//         "group_permission": {
//           "id": 2,
//           "name": "Recursos humanos",
//           "slug": "rrhh",
//           "position": 1,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 4,
//       "name": "Empleos",
//       "url": "/recursos-humanos/works",
//       "icon": "icon-star",
//       "permission_id": 145,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 145,
//         "group_permission_id": 2,
//         "group_permission": {
//           "id": 2,
//           "name": "Recursos humanos",
//           "slug": "rrhh",
//           "position": 1,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 6,
//       "name": "Solicitudes",
//       "url": "/recursos-humanos/requests",
//       "icon": "icon-star",
//       "permission_id": 144,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 144,
//         "group_permission_id": 2,
//         "group_permission": {
//           "id": 2,
//           "name": "Recursos humanos",
//           "slug": "rrhh",
//           "position": 1,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 7,
//       "name": "Usuarios Web",
//       "url": "/recursos-humanos/users-web",
//       "icon": "icon-star",
//       "permission_id": 146,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 146,
//         "group_permission_id": 2,
//         "group_permission": {
//           "id": 2,
//           "name": "Recursos humanos",
//           "slug": "rrhh",
//           "position": 1,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "title": true,
//       "name": "Administración de productos"
//     },
//     {
//       "id": 10,
//       "name": "Categoria",
//       "url": "/admin-products/categorias",
//       "icon": "icon-badge",
//       "permission_id": 7,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 7,
//         "group_permission_id": 3,
//         "group_permission": {
//           "id": 3,
//           "name": "Administración de productos",
//           "slug": "admin-products",
//           "position": 2,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 11,
//       "name": "Marcas",
//       "url": "/admin-products/marcas",
//       "icon": "icon-bag",
//       "permission_id": 12,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 12,
//         "group_permission_id": 3,
//         "group_permission": {
//           "id": 3,
//           "name": "Administración de productos",
//           "slug": "admin-products",
//           "position": 2,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 12,
//       "name": "Prefijos",
//       "url": "/admin-products/prefijos",
//       "icon": "fab fa-autoprefixer",
//       "permission_id": 17,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 17,
//         "group_permission_id": 3,
//         "group_permission": {
//           "id": 3,
//           "name": "Administración de productos",
//           "slug": "admin-products",
//           "position": 2,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 8,
//       "name": "Productos",
//       "url": "/admin-products/productos",
//       "icon": "icon-basket",
//       "permission_id": 2,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 2,
//         "group_permission_id": 3,
//         "group_permission": {
//           "id": 3,
//           "name": "Administración de productos",
//           "slug": "admin-products",
//           "position": 2,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 9,
//       "name": "Vtex Productos",
//       "url": "/admin-products/vtex-products",
//       "icon": "icon-basket",
//       "permission_id": 2,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 2,
//         "group_permission_id": 3,
//         "group_permission": {
//           "id": 3,
//           "name": "Administración de productos",
//           "slug": "admin-products",
//           "position": 2,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "title": true,
//       "name": "Catalogo"
//     },
//     {
//       "id": 13,
//       "name": "Buscar producto",
//       "url": "/catalogo/buscar_productos",
//       "icon": "fas fa-search",
//       "permission_id": 22,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 22,
//         "group_permission_id": 4,
//         "group_permission": {
//           "id": 4,
//           "name": "Catalogo",
//           "slug": "catalog",
//           "position": 3,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 14,
//       "name": "Mercado libre",
//       "url": "/catalogo/mercado-libre",
//       "icon": "far fa-handshake",
//       "permission_id": 82,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 82,
//         "group_permission_id": 4,
//         "group_permission": {
//           "id": 4,
//           "name": "Catalogo",
//           "slug": "catalog",
//           "position": 3,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 16,
//       "name": "Precios",
//       "url": "/catalogo/products/prices",
//       "icon": "fas fa-dollar-sign",
//       "permission_id": 148,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 148,
//         "group_permission_id": 4,
//         "group_permission": {
//           "id": 4,
//           "name": "Catalogo",
//           "slug": "catalog",
//           "position": 3,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 18,
//       "name": "Publicaciones",
//       "url": "/catalogo/publicaciones",
//       "icon": "fab fa-telegram-plane",
//       "permission_id": 27,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 27,
//         "group_permission_id": 4,
//         "group_permission": {
//           "id": 4,
//           "name": "Catalogo",
//           "slug": "catalog",
//           "position": 3,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "title": true,
//       "name": "Reportes"
//     },
//     {
//       "id": 24,
//       "name": "Download stock",
//       "url": "/reports/general-stock",
//       "icon": "icon-cloud-download",
//       "permission_id": 134,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 134,
//         "group_permission_id": 5,
//         "group_permission": {
//           "id": 5,
//           "name": "Reportes",
//           "slug": "reports",
//           "position": 4,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 22,
//       "name": "Grupo de Productos",
//       "url": "/reports/group-products",
//       "icon": "icon-briefcase",
//       "permission_id": 114,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 114,
//         "group_permission_id": 5,
//         "group_permission": {
//           "id": 5,
//           "name": "Reportes",
//           "slug": "reports",
//           "position": 4,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "title": true,
//       "name": "Ordenes"
//     },
//     {
//       "id": 42,
//       "name": "Clientes",
//       "url": "/system-orders/clients",
//       "icon": "cui-user",
//       "permission_id": 192,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 192,
//         "group_permission_id": 6,
//         "group_permission": {
//           "id": 6,
//           "name": "Ordenes",
//           "slug": "orders",
//           "position": 5,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 41,
//       "name": "Ordenes",
//       "url": "/system-orders/orders",
//       "icon": "cui-cart",
//       "permission_id": 158,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 158,
//         "group_permission_id": 6,
//         "group_permission": {
//           "id": 6,
//           "name": "Ordenes",
//           "slug": "orders",
//           "position": 5,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 43,
//       "name": "Tickets",
//       "url": "/system-orders/tickets",
//       "icon": "cui-user",
//       "permission_id": 197,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 197,
//         "group_permission_id": 6,
//         "group_permission": {
//           "id": 6,
//           "name": "Ordenes",
//           "slug": "orders",
//           "position": 5,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 44,
//       "name": "Workspace ordenes",
//       "url": "/administracion-sistema/workspaces-orders",
//       "icon": "icon-frame",
//       "permission_id": 207,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 207,
//         "group_permission_id": 6,
//         "group_permission": {
//           "id": 6,
//           "name": "Ordenes",
//           "slug": "orders",
//           "position": 5,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "title": true,
//       "name": "Administración de sistema"
//     },
//     {
//       "id": 28,
//       "name": "Empresas",
//       "url": "/administracion-sistema/companies",
//       "icon": "icon-directions",
//       "permission_id": 52,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 52,
//         "group_permission_id": 9,
//         "group_permission": {
//           "id": 9,
//           "name": "Administración de sistema",
//           "slug": "admin",
//           "position": 100,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 29,
//       "name": "Grupo de precios",
//       "url": "/administracion-sistema/prices/groups",
//       "icon": "fas fa-dollar-sign",
//       "permission_id": 153,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 153,
//         "group_permission_id": 9,
//         "group_permission": {
//           "id": 9,
//           "name": "Administración de sistema",
//           "slug": "admin",
//           "position": 100,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 30,
//       "name": "Locaciones",
//       "url": "/administracion-sistema/locations",
//       "icon": "icon-directions",
//       "permission_id": 67,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 67,
//         "group_permission_id": 9,
//         "group_permission": {
//           "id": 9,
//           "name": "Administración de sistema",
//           "slug": "admin",
//           "position": 100,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 31,
//       "name": "Mercado Libre",
//       "url": "/administracion-sistema/mercado-libre/cuentas",
//       "icon": "far fa-handshake",
//       "permission_id": 72,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 72,
//         "group_permission_id": 9,
//         "group_permission": {
//           "id": 9,
//           "name": "Administración de sistema",
//           "slug": "admin",
//           "position": 100,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 33,
//       "name": "Países",
//       "url": "/administracion-sistema/paises",
//       "icon": "icon-globe",
//       "permission_id": 42,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 42,
//         "group_permission_id": 9,
//         "group_permission": {
//           "id": 9,
//           "name": "Administración de sistema",
//           "slug": "admin",
//           "position": 100,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 35,
//       "name": "Roles",
//       "url": "/administracion-sistema/roles",
//       "icon": "icon-briefcase",
//       "permission_id": 37,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 37,
//         "group_permission_id": 9,
//         "group_permission": {
//           "id": 9,
//           "name": "Administración de sistema",
//           "slug": "admin",
//           "position": 100,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 36,
//       "name": "Usuarios",
//       "url": "/administracion-sistema/usuarios",
//       "icon": "icon-user-following",
//       "permission_id": 32,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 32,
//         "group_permission_id": 9,
//         "group_permission": {
//           "id": 9,
//           "name": "Administración de sistema",
//           "slug": "admin",
//           "position": 100,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "title": true,
//       "name": "Otros"
//     },
//     {
//       "id": 26,
//       "name": "Chat Bots",
//       "url": "/administracion-sistema/chatbot",
//       "icon": "icon-social-reddit",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 20,
//       "name": "Codificar importaciones",
//       "url": "/importaciones/codificar-importaciones",
//       "icon": "far fa-handshake",
//       "permission_id": 94,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 94,
//         "group_permission_id": 10,
//         "group_permission": {
//           "id": 10,
//           "name": "Otros",
//           "slug": "others",
//           "position": 1000,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 19,
//       "name": "Importaciones",
//       "url": "/importaciones/index",
//       "icon": "icon-briefcase",
//       "permission_id": 94,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 94,
//         "group_permission_id": 10,
//         "group_permission": {
//           "id": 10,
//           "name": "Otros",
//           "slug": "others",
//           "position": 1000,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 25,
//       "name": "Organizacion",
//       "url": "/information-general/organizacion",
//       "icon": "icon-briefcase",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 39,
//       "name": "Permisos y Grupos",
//       "url": "/administracion-sistema/permissions",
//       "icon": "icon-like",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 34,
//       "name": "Personas",
//       "url": "/administracion-sistema/personas",
//       "icon": "icon-user",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 21,
//       "name": "Precios y promociones",
//       "url": "/importaciones/precios-promociones",
//       "icon": "icon-briefcase",
//       "permission_id": 94,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": {
//         "id": 94,
//         "group_permission_id": 10,
//         "group_permission": {
//           "id": 10,
//           "name": "Otros",
//           "slug": "others",
//           "position": 1000,
//           "created_at": "2022-07-08T16:22:45.000000Z",
//           "updated_at": "2022-07-08T16:22:45.000000Z"
//         }
//       }
//     },
//     {
//       "id": 17,
//       "name": "Promociones",
//       "url": "/catalogo/promotions",
//       "icon": "cui-tags",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 15,
//       "name": "Rappi",
//       "url": "/catalogo/rappi",
//       "icon": "far fa-handshake",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 23,
//       "name": "Reportes",
//       "url": "/reports",
//       "icon": "icon-briefcase",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 40,
//       "name": "Sidebar",
//       "url": "/administracion-sistema/sidebar",
//       "icon": "icon-like",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 27,
//       "name": "Version Frontend",
//       "url": "/administracion-sistema/version-app",
//       "icon": "icon-social-reddit",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 37,
//       "name": "Vtex Sites",
//       "url": "/administracion-sistema/vtex-sites",
//       "icon": "icon-bag",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     },
//     {
//       "id": 38,
//       "name": "Webhooks",
//       "url": "/administracion-sistema/webhooks/webhooks-url",
//       "icon": "icon-wrench",
//       "permission_id": null,
//       "created_at": "2022-08-15T15:05:00.000000Z",
//       "updated_at": "2022-08-15T15:05:00.000000Z",
//       "permission": null
//     }
//   ]
// }
