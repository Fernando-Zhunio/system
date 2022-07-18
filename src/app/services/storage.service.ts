import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../clases/session';
import { User } from '../clases/user';
import { NgxPermissionsService } from 'ngx-permissions';
import { Cperson } from '../class/cperson';
import { SwalService } from './swal.service';

declare var require: any;
const CryptoJS = require('crypto-js');
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentSession: Session | boolean = null;

  constructor(private router: Router, public s_permissionsService: NgxPermissionsService, private activatedRoute: ActivatedRoute) {}

  verifiedLoginUser(): boolean {
    this.currentSession = this.loadSessionData();
    if (!this.currentSession) {
      return false;
    }
    const permissions = this.getPermissionUser();
    if (permissions) {
      this.s_permissionsService.loadPermissions(permissions);
    } else {
      SwalService.swalFire({title: 'Error', text: 'No tiene permisos para acceder a esta Novisolutions', icon: 'error'});
      return false;
    }
    return true;
  }

  setSession(session) {
    this.currentSession = session;
  }

  setCurrentSession(session): void {
    this.currentSession = session;
    localStorage.setItem('914068895aa792bc7577dab10e7cf4e4', this.encryptedAes(JSON.stringify(session)));
    this.setPermission();
  }

  setCurrentUser(user: User): void {
    const session: Session = this.getCurrentSession();
    session.user = user;
    this.setCurrentSession(session);
  }

  setCompanyUser(id_company) {
    (this.currentSession as Session).user.company_company_id = id_company;
    localStorage.setItem('914068895aa792bc7577dab10e7cf4e4', this.encryptedAes(JSON.stringify(this.currentSession)));
  }

  loadSessionData(): Session | boolean {
    let sessionStr = null;
    try {
      sessionStr = JSON.parse(this.decryptAes(localStorage.getItem('914068895aa792bc7577dab10e7cf4e4')));
    } catch (e) {
      return false;
    }
    return sessionStr;
  }

  getCurrentSession(): Session {
    return this.currentSession as Session;
  }



  getCurrentUser(): User {
    const session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  getCurrentPerson(): Cperson {
    const session = this.getCurrentSession();
    return (session && session.user.person) ? session.user.person : null;
  }

  setPermission(permissions: any[] = []) {
    const session = this.getCurrentSession();
    session.user.permission = permissions;
    localStorage.setItem('914068895aa792bc7577dab10e7cf4e4', this.encryptedAes(JSON.stringify(session)));
    this.s_permissionsService.loadPermissions(permissions);
  }

  encryptedAes(text: string): string {
    return CryptoJS.AES.encrypt(text, 'fernando-zhunio-reyes').toString();
  }
  decryptAes(text: string): string {
    if (text) {
      return CryptoJS.AES.decrypt(text, 'fernando-zhunio-reyes').toString(CryptoJS.enc.Utf8);
    }
    return null;
  }

  getPermissionUser(): any[] {
    const user: User = this.getCurrentUser();
    return (user) ? user?.permission : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  getItemLocalStorage(key): any {
    return JSON.parse(this.decryptAes(localStorage.getItem(key)));
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
      console.log(res);
      if (res?.guard != 'guest') {
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
    return JSON.parse(this.decryptAes(localStorage.getItem('users-chat')));
  }

}





