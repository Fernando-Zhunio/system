import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsWebPush } from '../../class/notifications-web-push';
import { INotification } from '../../interfaces/inotification';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SwPush } from '@angular/service-worker';
import { ListPermissions } from '../../class/list-permissions';
import { Store } from '@ngrx/store';
import { selectNotification } from '../../redux/state/state.selectors';
import { MethodsHttpService } from '../../services/methods-http.service';
import { INavData } from '../../interfaces/inav-data';
import { SidebarFzComponent } from '../sidebar-fz/sidebar-fz.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../class/fast-data';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./default-layout.component.css'],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  constructor(
    public sa: AuthService,
    // private ss: StorageService,
    private methodsHttp: MethodsHttpService,
    // public s_shared: SharedService,
    // private dialog: MatDialog,
    public overlayContainer: OverlayContainer,
    public sw_push: SwPush,
    private store: Store,
  ) {
    this.notifications$ = this.store.select(selectNotification);
  }
  notifications$: Observable<INotification[]>;

  @HostBinding('class') componentCssClass;
  @ViewChild(SidebarFzComponent) sidebarFz: SidebarFzComponent;

  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  public url_img = '';
  public isDark: boolean = false;
  public hideUsersChat: boolean = false;
  public progressDownloadReport: number = 0;
  public isProgressDownloadReport: boolean = false;
  public isDownloadStock: boolean = false;
  hiddenSidebar: boolean = false;

  countNotificationUnRead: number | null = null;
  notificationWeb: NotificationsWebPush | null = null;
  countMessages: any = null;
  user: any;
  searchBar: ListPermissions;
  imgCompany: { size: string, url: string } = { size: '100%', url: 'assets/icons_custom/novisolutions.svg' };

  ngOnInit(): void {
    this.loadUnreadCountMessages();
    this.hasDarkTheme();
    this.notificationWeb = new NotificationsWebPush(this.methodsHttp);
    this.notificationWeb.canInitSw();
    this.user = User.getUser();
    // if (!this.user.person) { this.addPersonModal(this.user); }
  }

  openOrCloseMenu(): void {
    this.sidebarFz.toggleMenu();
  }

  onSetTheme(e: MatSlideToggleChange | { checked: boolean }): void {
    const theme = e.checked ? 'dark-theme' : 'light-theme';
    localStorage.setItem('isDark', e.checked ? 'true' : 'false');
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    if (theme === 'dark-theme') {
      this.overlayContainer.getContainerElement().classList.remove('light-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    }
  }

  hasDarkTheme() {
    const isDark = localStorage.getItem('isDark');
    if (isDark) {
      this.onSetTheme({ checked: JSON.parse(isDark) });
      this.isDark = JSON.parse(isDark);
    }
  }

  // addPersonModal(user): void {
  //   this.dialog.open(AddInfoPersonModalComponent, {
  //     data: { user },
  //     disableClose: true,
  //   }).beforeClosed()
  //     .subscribe((res) => {
  //       if (res == undefined) {
  //         this.addPersonModal(user);
  //       } else {
  //         const userCurrent = this.ss.getCurrentUser();
  //         if (userCurrent) {
  //           userCurrent.person = res;
  //           this.ss.setCurrentUser(userCurrent);
  //         }
  //       }
  //     });
  // }

  newMessage(e): void {
    e ? this.countMessages++ : this.countMessages = null;
  }

  loadUnreadCountMessages(): void {
    this.methodsHttp.methodGet('chats/chat/messages/count-unread').subscribe((res) => {
      this.countMessages = res.data == 0 ? null : res.data;
    })
  }

  openOrCloseChats(): void {
    this.hideUsersChat = !this.hideUsersChat;
    if (this.hideUsersChat) {
      this.countMessages = null;
    }
  }

  changeDark(value) {
    this.isDark = value.target.checked;
    localStorage.setItem('isDark', JSON.stringify(this.isDark));
  }

}


