import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../clases/session';
import { User } from '../clases/user';
import { NgxPermissionsService } from 'ngx-permissions';
// import { Iperson } from '../interfaces/iperson';
import { Cperson } from '../class/cperson';

declare var require: any;
const CryptoJS = require('crypto-js');
@Injectable({
  providedIn: 'root'
})
export class StorageService  {

  private currentSession: Session = null;

  constructor(private router: Router, public s_permissionsService: NgxPermissionsService) {

    this.currentSession = this.loadSessionData();
    if (!this.currentSession) {
      this.logout();
      return;
    }
      const permissions = this.getPermissionUser();
      if (permissions) {
      this.s_permissionsService.loadPermissions(permissions);
    }
  }

  setSession(session){
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
    this.currentSession.user.company_company_id = id_company;
    localStorage.setItem('914068895aa792bc7577dab10e7cf4e4', this.encryptedAes(JSON.stringify(this.currentSession)));
  }

  loadSessionData(): Session | null {
    let sessionStr = null;
    try {
      sessionStr = JSON.parse(this.decryptAes(localStorage.getItem('914068895aa792bc7577dab10e7cf4e4')));
    } catch (e) {
      this.logout();
      throw Error('Error al cargar la sesión');
    }
    return  sessionStr;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

 

  getCurrentUser(): User {
    const session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  getCurrentPerson(): Cperson {
    const session = this.getCurrentSession();
    return (session && session.user.person) ? session.user.person : null;
  }

  setPermission(permissions: any[]= []) {
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

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

  removeCurrentSession(): void {
    this.currentSession = null;
    localStorage.clear();
  }

  setUsersChat(users): void {
    localStorage.setItem('users-chat', this.encryptedAes(JSON.stringify(users)));
  }

  getUsersChat(): any {
    return  JSON.parse(this.decryptAes(localStorage.getItem('users-chat')));
  }

  // setVersionApp(version: string): void {
  //   localStorage.setItem('version-app', this.encryptedAes(version));
  // }

  // getVersionApp(): string {
  //   return  this.decryptAes(localStorage.getItem('version-app'));
  // }

}





