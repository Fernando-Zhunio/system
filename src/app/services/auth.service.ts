import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
     ) {}


  server = environment.server;

  login(email, password): Observable<any> {
    return this.http.post(this.server + 'auth/login', { email, password });
  }

  recuperationPassword(email): Observable<any> {
    return this.http.post(this.server + 'auth/password/email', { email });
  }

  saveToken(token) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    return this.http.get(this.server + 'auth/logout');
  }

  changedCompany(company):Observable<any>{
    return this.http.patch(`${this.server}user/preferences/company/context`,{company})
  }
}
