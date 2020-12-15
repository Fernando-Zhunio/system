import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  server=environment.server;

  login(email,password):Observable<any>{
    return this.http.post(this.server+'',{email,password})
  }

  saveToken(token){
    return localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
