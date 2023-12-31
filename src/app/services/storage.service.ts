import { Injectable } from '@angular/core';
import { Session } from '../clases/session';
import { NgxPermissionsService } from 'ngx-permissions';
import { User } from '../shared/interfaces/user';
import { Person } from '../shared/interfaces/person';
import { Token, User as UserFast } from '../class/fast-data';

declare var require: any;
const CryptoJS = require('crypto-js');
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentSession: Session | null;
  private permissions: string[] | null = null;

  constructor( public s_permissionsService: NgxPermissionsService) {}

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    localStorage.setItem('session', this.encryptedAes(JSON.stringify(session)));
    Token.setToken(this.currentSession.token);
    UserFast.setUser(this.currentSession.user);
  }

  setSession(session: Session): void {
    this.currentSession = session;
  }

  setCurrentUser(user: User): void {
    const session: Session = this.getCurrentSession() as Session;
    session.user = user;
    this.setCurrentSession(session);
  }

  getCurrentSession(): Session {
    return this.currentSession!;
  }

  getCurrentSessionLocalStorage(): Session | null {
    const dataConvert = this.decryptAes(localStorage.getItem('session'));
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return null;
  }

  getCurrentUser(): User {
    return this.currentSession!.user;
  }

  getCurrentPerson(): Person | null {
    return this.currentSession?.user?.person || null;
  }

  setPermission(permissions: any[]) {
    localStorage.setItem('permissions', this.encryptedAes(JSON.stringify(permissions)));
    this.s_permissionsService.loadPermissions(permissions);
    this.permissions = permissions;
  }

  getPermissions(): string[] | null {
    return this.permissions || this.getPermissionsLocalStorage();
  }

  getPermissionsLocalStorage(): string[] | null {
    const dataConvert = this.decryptAes(localStorage.getItem('permissions'));
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.currentSession?.token;
  }

  getCurrentToken(): string {
    return this.currentSession!.token;
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

  // logout(canPass: boolean = false): void {
  //   this.removeCurrentSession();
  //   this.activatedRoute.data.subscribe(res => {
  //     if (res?.['guard'] != 'guest' || canPass) {
  //       this.router.navigate([PATH_LOGIN]);
  //     }
  //   })
  // }

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





