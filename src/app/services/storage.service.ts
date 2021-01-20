import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../clases/session';
import { User } from '../clases/user';

import * as CryptoJS from 'crypto-js';
// import {AES}  from 'crypto-js';
// var CryptoJS = require("crypto-js");
declare var require: any;
const SecureStorage = require('secure-web-storage');
// import * as SecureStorage from 'secure-web-storage';
const SECRET_KEY = 'secret_key';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = this.secureStorage;
    this.currentSession = this.loadSessionData();
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
    // this.secureStorage.setItem('data', session);

    this.secureStorage.setItem('currentUser',session);
    console.log(this.getCurrentSession());  
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
