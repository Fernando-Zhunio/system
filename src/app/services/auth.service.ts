import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { SwalService } from "./swal.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient,
     private s_swal:SwalService
     ) {}

    //  createHeader(){
    //   const token =localStorage.getItem('token');
    //   const Header = new HttpHeaders({
    //     'accept': 'application/json',
    //     'Content-Type':'application/json',
    //     'Authorization':'Bearer '+token
    //    });
    //    return Header;
    // }

  server = environment.server;

  login(email, password): Observable<any> {
    return this.http.post(this.server + "auth/login", { email, password });
  }

  recuperationPassword(email): Observable<any> {
    return this.http.post(this.server + "auth/password/email", { email });
  }

  saveToken(token) {
    return localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    return this.http.get(this.server + "auth/logout");
  }

  changedCompany(company):Observable<any>{
    return this.http.patch(`${this.server}user/preferences/company/context`,{company})
  }
}
