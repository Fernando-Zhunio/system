import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../clases/session';
// import { User } from '../clases/user';
import { NgxPermissionsService } from 'ngx-permissions';
// import { Cperson } from '../class/cperson';
// import { SwalService } from './swal.service';
import { User } from '../shared/interfaces/user';
import { Person } from '../shared/interfaces/person';

declare var require: any;
const CryptoJS = require('crypto-js');
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentSession: Session | boolean | null = null;
  private permissions: string[] | null = null;
  // private isUserAuthenticated: boolean = false;

  constructor(private router: Router, public s_permissionsService: NgxPermissionsService, private activatedRoute: ActivatedRoute) {
    this.init();
    // this.isUserAuthenticated = this.isAuthenticated();
  }

  // verifiedLoginUser(): boolean {
  //   this.currentSession = this.loadSessionData();
  //   if (!this.currentSession) {
  //     return false;
  //   }
  //   const permissions = this.getPermissions();
  //   if (permissions) {
  //     this.s_permissionsService.loadPermissions(permissions);
  //   } else {
  //     SwalService.swalFire({title: 'Error', text: 'No tiene permisos para acceder a esta Novisolutions', icon: 'error'});
  //     return false;
  //   }
  //   return true;
  // }

  // setSession(session) {
  //   this.currentSession = session;
  // }

  setCurrentSession(session): void {
    this.currentSession = session;
    localStorage.setItem('session', this.encryptedAes(JSON.stringify(session)));
    // this.isUserAuthenticated = true;
    // this.setPermission();
  }

  setCurrentUser(user: User): void {
    const session: Session = this.getCurrentSession() as Session;
    session.user = user;
    this.setCurrentSession(session);
  }

  // setCompanyUser(id_company) {
  //   (this.currentSession as Session).user.company_company_id = id_company;
  //   localStorage.setItem('session', this.encryptedAes(JSON.stringify(this.currentSession)));
  // }

  // loadSessionData(): Session | boolean {
  //   let sessionStr: any = null;
  //   try {
  //     const dataConvert = this.decryptAes(localStorage.getItem('session'));
  //     if (dataConvert) {
  //       sessionStr = JSON.parse(dataConvert) as Session;
  //       return sessionStr;
  //     }
  //     return false;
  //   } catch (e) {
  //     return false;
  //   }
  // }

  init(): void {
    this.currentSession = this.getCurrentSession();
    this.permissions = this.getPermissions();
    if (this.permissions) {
    this.s_permissionsService.loadPermissions(this.permissions);

    }
  }

  getCurrentSession(): Session | boolean {
    return this.currentSession || this.getCurrentSessionLocalStorage();
  }

  getCurrentSessionLocalStorage(): Session | boolean {
    const dataConvert = this.decryptAes(localStorage.getItem('session'));
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return false;
  }



  getCurrentUser(): User | null {
    const session: Session = this.getCurrentSession() as Session;
    return (session && session.user) ? session.user : null;
  }

  getCurrentPerson(): Person | null {
    const session = this.getCurrentSession() as Session;
    return  session.user.person || null;
  }

  setPermission(permissions: any[]) {
    localStorage.setItem('permissions', this.encryptedAes(JSON.stringify(permissions)));
    this.s_permissionsService.loadPermissions(permissions);
  }

  getPermissions(): string[] | null {
    return  this.permissions || this.getPermissionsLocalStorage();
  }

  getPermissionsLocalStorage(): string[] | null {
    const dataConvert = this.decryptAes(localStorage.getItem('permissions'));
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentToken();
  }

  getCurrentToken(): string | false {
    const session = this.getCurrentSession() as Session;
    return  session?.token || false;
  }

  getItemLocalStorage(key): any {
    const dataConvert = this.decryptAes(localStorage.getItem(key));
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return null;
  }

  hasItemLocalStorage(key): boolean {
    return (localStorage.getItem(key) != null) ? true : false;
  }

  setItemLocalStorage(key, value): void {
    localStorage.setItem(key, this.encryptedAes(JSON.stringify(value)));
  }

  logout(): void {
    this.removeCurrentSession();
    this.activatedRoute.data.subscribe(res => {
      if (res['guard'] != 'guest') {
        this.router.navigate(['/login']);
      }
    })
  }

  removeCurrentSession(): void {
    this.currentSession = null;
    localStorage.clear();
  }

  setUsersChat(users): void {
    localStorage.setItem('users-chat', this.encryptedAes(JSON.stringify(users)));
  }

  getUsersChat(): any {
    const dataConvert = this.decryptAes(localStorage.getItem('users-chat'))
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return null;
  }

  encryptedAes(text: string): string {
    return CryptoJS.AES.encrypt(text, 'fernando-zhunio-reyes').toString();
  }
  decryptAes(text: string | null): string | null {
    if (text) {
      return CryptoJS.AES.decrypt(text, 'fernando-zhunio-reyes').toString(CryptoJS.enc.Utf8);
    }
    return null;
  }
}





