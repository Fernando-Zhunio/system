import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PATH_LOGIN } from '../class/fast-data';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService, private router: Router) { }


  server = environment.server;

  login(email, password): Observable<any> {
    return this.http.post(this.server + 'auth/login', { email, password });
  }

  recuperationPassword(email): Observable<any> {
    return this.http.post(this.server + 'auth/password/email', { email });
  }

  /** 
  * @description Desloguea al usuario y redirecciona a la ruta de login
  * @param logoutInServer: Si se desea hacer logout en el servidor
  */

  logout(logoutInServer: boolean = false): void {
    this.storage.removeCurrentSession();
    const isAuthPath = window.location.href.includes('authentication');
    logoutInServer && this.http.get(this.server + 'auth/logout').subscribe(() => { });
    if (!isAuthPath) {
      this.router.navigate([PATH_LOGIN]);
    }
    // this.router.navigate([PATH_LOGIN]);
  }

}
