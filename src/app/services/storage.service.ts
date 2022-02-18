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

  constructor(private router: Router, private s_permissionsService: NgxPermissionsService) {
    this.currentSession = this.loadSessionData();
    const permissions = this.getPermissionUser();
    // let mergeRolAndPermission = [];
    // if (rolAndPermission) {
    //   mergeRolAndPermission = rolAndPermission.rol.concat(rolAndPermission.permission);
    // }
     this.s_permissionsService.loadPermissions(permissions);
  }

  setCurrentSession(session): void {
    this.currentSession = session;
    localStorage.setItem('currentUser', this.encryptedAes(JSON.stringify(session)));
    this.setPermission();
  }

  setCurrentUser(user: User): void {
    const session: Session = this.getCurrentSession();
    session.user = user;
    this.setCurrentSession(session);
  }

  setCompanyUser(id_company) {
    this.currentSession.user.company_company_id = id_company;
    localStorage.setItem('currentUser', this.encryptedAes(JSON.stringify(this.currentSession)));
  }

  loadSessionData(): Session {
    let sessionStr = null;
    try {
      sessionStr = JSON.parse(this.decryptAes(localStorage.getItem('currentUser')));
    } catch (e) {
      this.logout();
    }
    return (sessionStr) ? <Session>sessionStr : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.currentSession = null;
    localStorage.clear();
  }

  getCurrentUser(): User {
    const session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  getCurrentPerson(): Cperson {
    const session = this.getCurrentSession();
    return (session && session.user.person) ? session.user.person : null;
  }

  // setRolAndPermission(rol_permission: {'rol': [], 'permission': []}= null) {
  setPermission(permissions: any[]= null) {
      // const rolAndPermission = rol_permission ? rol_permission : this.getRolAndPermissionUser();
      // const permissions = rol_permission ? rol_permission : this.getRolAndPermissionUser();
      // let mergeRolAndPermission = [];
      // if (permissions) {
      //   permissions = rolAndPermission.rol.concat(rolAndPermission.permission)
      // }
      const session = this.getCurrentSession();
      // session.user.rol = rolAndPermission.rol;
      session.user.permission = permissions;
      localStorage.setItem('currentUser', this.encryptedAes(JSON.stringify(session)));
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
    return (user) ? user.permission : null;
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





