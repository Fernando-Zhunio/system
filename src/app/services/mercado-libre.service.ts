import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreService {

  end_point = environment.server;

  constructor(private http: HttpClient) { }

  index(page,pageSize):Observable<any>{
    return this.http.get<any>(this.end_point+'catalogs/ml-products',{params:{page,pageSize}});
  }

  search(search,pageSize,state,price_min,price_max):Observable<any>{
    let params = new HttpParams();
    params = params.append('page','1');
    params = params.append('pageSize',pageSize);
    params = params.append('status',state);
    if(price_min != null && price_max != null){
      params = params.append('price_min',price_min);
      params = params.append('price_max',price_max);
    }
    if(search != null){
      params = params.append('search',search);
      // params = params.set('page','1');
    }
    // return this.http.get<any>(this.end_point+'catalogs/ml-products',{params:{page,search,pageSize}});
    return this.http.get<any>(this.end_point+'catalogs/ml-products',{params});
  }

  nextPageSearch(page,search,pageSize,status,price_min,price_max):Observable<any>{
    let params = new HttpParams();
    params = params.append('page',page);
    params = params.append('pageSize',pageSize);
    params = params.append('status',status);
    if(price_min != null && price_max != null){
      params = params.append('price_min',price_min);
      params = params.append('price_max',price_max);
    }
    if(search != null){
      params = params.append('search',search);
    }
    return this.http.get<any>(this.end_point+'catalogs/ml-products',{params});
  }

  updateStatus(idproduct,status):Observable<any>{
    return this.http.put(`${this.end_point}catalogs/ml-products/${idproduct}/status`,{status});
  }

  assingProduct(url,params):Observable<any>{
    return this.http.put(this.end_point+url,{...params});
  }
}
