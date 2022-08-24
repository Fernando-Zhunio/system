import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  constructor(private http: HttpClient) {}

  end_point = environment.server;

  index(page):Observable<any>{
    return this.http.get<any>(this.end_point+'products-admin/categories',{params:{page}});
  }

  create():Observable<any>{
    return this.http.get(this.end_point+"products-admin/categories/create",);
  }

  edit(id):Observable<any>{
    return this.http.get(this.end_point+"products-admin/categories/"+id+"/edit");
  }

  store(params):Observable<any>{
    return this.http.post(this.end_point+"products-admin/categories",{...params});
  }

  update(id,params):Observable<any>{

    return this.http.patch(this.end_point+"products-admin/categories/"+id,{...params});
  }

  destroy(id):Observable<any>{
    return this.http.delete(this.end_point+"products-admin/categories/"+id);
  }
}
