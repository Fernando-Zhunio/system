import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) { }

  end_point = environment.server;

  index(page):Observable<any>{
    return this.http.get<any>(this.end_point+'products-admin/brands',{params:{page}});
  }

  create():Observable<any>{
    return this.http.get(this.end_point+"products-admin/brand/create");
  }

  edit(id):Observable<any>{
    return this.http.get(this.end_point+"products-admin/brands/"+id+"/edit");
  }

  store(params):Observable<any>{
    return this.http.post(this.end_point+"products-admin/brands",{...params});
  }

  update(id,params):Observable<any>{
    return this.http.patch(this.end_point+"products-admin/brands/"+id,{...params});
  }

  destroy(id):Observable<any>{
    return this.http.delete(this.end_point+"products-admin/brands/"+id);
  }
}
