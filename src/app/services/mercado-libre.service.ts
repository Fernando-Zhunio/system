import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreService {

  end_point = environment.server;

  constructor(private http: HttpClient) { }

  index(page):Observable<any>{
    return this.http.get<any>(this.end_point+'catalogs/ml-products',{params:{page}});
  }
}
