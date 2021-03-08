import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../clases/session';
import { User } from '../clases/user';

import * as CryptoJS from 'crypto-js';
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

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router,private s_permissionsService: NgxPermissionsService) {
    this.localStorageService = this.secureStorage;
    this.currentSession = this.loadSessionData();
    console.log('ccc');
    const rolAndPermission = this.getRolAndPermissionUser();
    let mergeRolAndPermission = [];
    if(rolAndPermission)
      mergeRolAndPermission = rolAndPermission.rol.concat(rolAndPermission.permission)
      console.log(rolAndPermission);
     this.s_permissionsService.loadPermissions(mergeRolAndPermission);

  }

  changedPermission(){

  }



  secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);
 
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
 
        data = data.toString();
 
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);
 
        data = data.toString(CryptoJS.enc.Utf8);
 
        return data;
    }
});
    

  setCurrentSession(session): void {
    this.currentSession = session;
    this.secureStorage.setItem('currentUser',session);
    console.log("Session creada");  
    this.setRolAndPermission();
  }

  setCompanyUser(id_company){
    this.currentSession.user.company_company_id = id_company;
    this.secureStorage.setItem('currentUser',this.currentSession);
  }

  loadSessionData(): Session{
    let sessionStr = null;
    // if(localStorage.getItem('currentUser')){
       sessionStr = this.secureStorage.getItem('currentUser');
       console.log(sessionStr);
       
    // }/
    return (sessionStr) ? <Session>sessionStr : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.currentSession = null;
    this.localStorageService.clear();
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  setRolAndPermission(rol_permission:{'rol':[],'permission':[]}= null){
    // if(this.getRolAndPermissionUser() != null){

      const rolAndPermission = rol_permission?rol_permission:this.getRolAndPermissionUser();
      let mergeRolAndPermission = [];
      if(rolAndPermission)
        mergeRolAndPermission = rolAndPermission.rol.concat(rolAndPermission.permission)
        console.log(rolAndPermission);
       this.s_permissionsService.loadPermissions(mergeRolAndPermission);
    // }
  }

  getRolAndPermissionUser(): {'rol':string[],'permission':string[]} {
    var user: User = this.getCurrentUser();
    return (user) ? {rol:user.rol,permission:user.permission} : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    // console.log(session);
    
    return (session && session.token) ? session.token : null;
  }

  // getAllCompanies():[]{
  //   this.currentSession.companies
  // }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
