import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { helpers } from 'chart.js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProducts } from '../interfaces/iproducts';

const Header  = new HttpHeaders({
  'accept': 'application/json',
  'Content-Type':'application/json'
})
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private htpp: HttpClient) { }

  end_point = environment.server;

  index(page):Observable<any>{
    return this.htpp.get<any>(this.end_point+'products-admin/products',{params:{page}, headers:Header});
  }

  create():Observable<any>{
    return this.htpp.get(this.end_point+"products-admin/products/create",{headers:Header});
  }

  edit(id):Observable<any>{
    return this.htpp.get(this.end_point+"products-admin/products/"+id+"/edit",{headers:Header});
  }

  store(id):Observable<any>{
    return this.htpp.get(this.end_point+"products-admin/products/"+id+"/edit",{headers:Header});
  }

  update(id):Observable<any>{
    return this.htpp.get(this.end_point+"products-admin/products/"+id+"/edit",{headers:Header});
  }

  destroy(id):Observable<any>{
    return this.htpp.get(this.end_point+"products-admin/products/"+id+"/edit",{headers:Header});
  }
  
  

  

}
