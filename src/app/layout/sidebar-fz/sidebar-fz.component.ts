import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { compare } from 'compare-versions';
import { take } from 'rxjs/operators';
import { User } from '../../class/fast-data';
import { convertArrayOfObjectToMap } from '../../class/tools';
import { PreferencesTypes } from '../../core/enums/preferences-types';
import { Preferences as IPreferences } from '../../core/interfaces/preferences';
import { INavData } from '../../interfaces/inav-data';
import { setPreferenceApi } from '../../redux/actions/api/preferences-api.action';
import { selectPreference } from '../../redux/state/state.selectors';
import { AuthService } from '../../services/auth.service';
import { MethodsHttpService } from '../../services/methods-http.service';
import { SharedService } from '../../services/shared/shared.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';


@Component({
  selector: 'app-sidebar-fz',
  templateUrl: './sidebar-fz.component.html',
  styleUrls: ['./sidebar-fz.component.scss']
})
export class SidebarFzComponent implements OnInit {

  navItems: INavData[] = [];
  @Output() isMinimizeSidebar: EventEmitter<boolean> = new EventEmitter();
  @Output() hiddenSidebar: EventEmitter<boolean> = new EventEmitter();

  onlyIcons: boolean = false;
  user: User | null = null;
  urlImg;
  name: string;
  auxSearchPage: INavData[] = [];
  hiddenMenu: boolean = false;
  isMobile: boolean = false;
  isLoading: boolean = false;

  favoriteItems: Map<number, INavData> = new Map();

  constructor(private ss: StorageService, public sa: AuthService, private store: Store, private methodsHttp: MethodsHttpService) {
    this.user = User.getInstance();
    this.name = this.user!.person?.first_name || this.user.name;
    this.urlImg = this.user?.person?.photo?.permalink || `https://ui-avatars.com/api/?background=random&name=${this.name}`;
  }

  ngOnInit() {
    const width = window.innerWidth;
    if (width < 600) {
      this.hiddenMenu = true;
    }
    this.getSidebar();
  }

  getSidebar(): void {
    this.isLoading = true;
    this.methodsHttp.methodGet('user/permissions-roles')
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res?.success) {
            const { last_version_frontend, my_permissions } = res.data;
            if (last_version_frontend?.version) {
              this.validateVersion(last_version_frontend?.version, last_version_frontend?.description);
            }
            const array_permissions = typeof my_permissions == 'string' && my_permissions === 'super-admin' ?
              [my_permissions] : my_permissions;
            this.ss.setPermission(array_permissions);
            this.navItems = res.data.item_sidebar;
            this.getFavorites(2);
          }
        },
        error: () => {
          this.isLoading = false;
          SwalService.swalFire({
            position: 'center',
            title: 'Error al cargar datos',
            text: 'Recargué la pagina o vuelva a iniciar sesión, en caso de no funcionar contacte al administrador del sistema',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'Recargar',
            showCancelButton: true,
            cancelButtonText: 'Cerrar sesión',
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            } else {
              this.sa.logout();
            }
          })
        }
      });
  }

  

  getFavorites(_take = 1) {
    this.store.select(selectPreference).pipe(take(_take)).subscribe((preference: IPreferences) => {
      if (preference && preference?.favorites_items_nav) {
        this.favoriteItems = convertArrayOfObjectToMap(
          this.convertItemsNav(preference?.favorites_items_nav), 'id') || new Map();
      }
    });
  }

  convertItemsNav(_favorites: Array<number>): INavData[] {
    if (Array.isArray(_favorites) && this.navItems.length > 0) {
      return this.navItems.filter((item: any) => _favorites.includes(item.id)) || []; 
    } else {
      return [];
    }
  }

  searchPage(e): void {
    if (this.auxSearchPage.length < 1) {
      this.auxSearchPage = this.navItems;
    }
    this.navItems = this.auxSearchPage.filter(
      (item: any) => item?.name.toLowerCase().includes(e.target.value.toLowerCase()));
  }

  minimizeSidebar(): void {
    this.onlyIcons = !this.onlyIcons;
    this.isMinimizeSidebar.emit(this.onlyIcons);
  }

  toggleMenu(): void {
    this.hiddenMenu = !this.hiddenMenu;
    this.hiddenSidebar.emit(this.hiddenMenu);
  }

  addFavoriteItem(id: number, $event): void {
    $event.stopPropagation();
    $event.preventDefault();
    const item = this.navItems.find((item: any) => item.id === id);
    if (item) {
      if (this.favoriteItems.has(id)) {
        this.favoriteItems.delete(id);
      } else {
        this.favoriteItems.set(id, item);
      }
      this.saveFavoritesInDatabase();
    }
  }

  saveFavoritesInDatabase(): void {
    SharedService.disabled_loader = true;
    this.store.dispatch(setPreferenceApi(
      {
        preference: PreferencesTypes.FAVORITES_ITEMS_NAV,
        value: JSON.stringify(Array.from(this.favoriteItems.keys()))
      }));
  }

  validateVersion(latestVersion: string, message: string): void {
    try {
      const currentVersion = this.ss.getItemLocalStorage('version');
      if (currentVersion) {
        const isNewVersion = compare(currentVersion, latestVersion, '<'); // true
        if (isNewVersion) {
          SwalService.swalFire({ allowOutsideClick: false, showCancelButton: true, cancelButtonText: 'No, gracias', confirmButtonText: 'Si, actualizar', showConfirmButton: true, title: 'Actualización disponible', text: 'Hay una nueva versión de la aplicación, por favor actualice la aplicación, presione Ctrl + f5 \n' + message, icon: 'info' })
            .then((res) => {
              if (res.isConfirmed) {
                this.ss.setItemLocalStorage('version', latestVersion);
                location.reload();
              }
            }).catch(() => { });
        }
      } else {
        this.ss.setItemLocalStorage('version', latestVersion);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
