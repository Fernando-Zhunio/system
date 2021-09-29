import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../clases/session';
import { User } from '../clases/user';

// import * as CryptoJS from 'crypto-js';
import { NgxPermissionsService } from 'ngx-permissions';
// import {AES}  from 'crypto-js';
// var CryptoJS = require("crypto-js");
declare var require: any;
const SecureStorage = require('secure-web-storage');
// import * as SecureStorage from 'secure-web-storage';
const SECRET_KEY = 'secret_key';
@Injectable({
  providedIn: 'root'
})
export class StorageService  {

  // private localStorageService;
  private currentSession: Session = null;

  constructor(private router: Router, private s_permissionsService: NgxPermissionsService) {
    // this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    const rolAndPermission = this.getRolAndPermissionUser();
    let mergeRolAndPermission = [];
    if (rolAndPermission) {
      mergeRolAndPermission = rolAndPermission.rol.concat(rolAndPermission.permission)
    }
     this.s_permissionsService.loadPermissions(mergeRolAndPermission);

  }

  // changedPermission(){

  // }



//   secureStorage = new SecureStorage(localStorage, {
//     hash: function hash(key) {
//         key = CryptoJS.SHA256(key, SECRET_KEY);
//         return key.toString();
//     },
//     encrypt: function encrypt(data) {
//         data = CryptoJS.AES.encrypt(data, SECRET_KEY);
//         data = data.toString();

//         return data;
//     },
//     decrypt: function decrypt(data) {
//         data = CryptoJS.AES.decrypt(data, SECRET_KEY);
//         data = data.toString(CryptoJS.enc.Utf8);
//         return data;
//     }
// });


  setCurrentSession(session): void {
    this.currentSession = session;
    localStorage.setItem('currentUser', JSON.stringify(session));
    this.setRolAndPermission();
  }

  setCompanyUser(id_company) {
    this.currentSession.user.company_company_id = id_company;
    localStorage.setItem('currentUser', JSON.stringify(this.currentSession));
  }

  loadSessionData(): Session {
    let sessionStr = null;
       sessionStr = JSON.parse(localStorage.getItem('currentUser'));
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

  setRolAndPermission(rol_permission: {'rol': [], 'permission': []}= null) {
      const rolAndPermission = rol_permission ? rol_permission : this.getRolAndPermissionUser();
      let mergeRolAndPermission = [];
      if (rolAndPermission) {
        mergeRolAndPermission = rolAndPermission.rol.concat(rolAndPermission.permission)
      }
      const session = this.getCurrentSession();
      session.user.rol = rolAndPermission.rol;
      session.user.permission = rolAndPermission.permission;
       localStorage.setItem('currentUser', JSON.stringify(session));
       this.s_permissionsService.loadPermissions(mergeRolAndPermission);
    // }
  }

  getRolAndPermissionUser(): {'rol': string[], 'permission': string[]} {
    const user: User = this.getCurrentUser();
    return (user) ? {rol: user.rol, permission: user.permission} : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  // getAllCompanies():[]{
  //   this.currentSession.companies
  // }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
