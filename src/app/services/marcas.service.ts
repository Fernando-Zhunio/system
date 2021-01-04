import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) { }

  end_point = environment.server;

  // createHeader(){
  //   const token =localStorage.getItem('token'); 
  //   const Header = new HttpHeaders({
  //     'accept': 'application/json',
  //     'Content-Type':'application/json',
  //     'Authorization':'Bearer '+token
  //    });
  //    return Header;
  // }

  index(page):Observable<any>{
    // const Header = this.createHeader();

    return this.http.get<any>(this.end_point+'products-admin/brands',{params:{page}});
  }

  create():Observable<any>{
    // const Header = this.createHeader();

    return this.http.get(this.end_point+"products-admin/brand/create");
  }

  edit(id):Observable<any>{
    // const Header = this.createHeader();

    return this.http.get(this.end_point+"products-admin/brands/"+id+"/edit");
  }

  store(params):Observable<any>{
    // const Header = this.createHeader();

    return this.http.post(this.end_point+"products-admin/brands",{...params});
  }

  update(id,params):Observable<any>{
    // const Header = this.createHeader();

    return this.http.patch(this.end_point+"products-admin/brands/"+id,{...params});
  }

  destroy(id):Observable<any>{
    // const Header = this.createHeader();

    return this.http.delete(this.end_point+"products-admin/brands/"+id);
  }
}
