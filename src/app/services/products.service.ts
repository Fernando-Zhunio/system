import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  end_point = environment.server;
  index(page): Observable<any>{

    return this.http.get<any>(this.end_point + 'products-admin/products', {params: {page}});
  }

  create(): Observable<any>{

    return this.http.get(this.end_point + 'products-admin/products/create');
  }

  edit(id): Observable<any>{

    return this.http.get(this.end_point + 'products-admin/products/' + id + '/edit');
  }

  store(params): Observable<any>{

    return this.http.post(this.end_point + 'products-admin/products', {...params});
  }

  update(id, params): Observable<any>{

    return this.http.patch(this.end_point + 'products-admin/products/' + id, {...params});
  }

  destroy(id): Observable<any>{

    return this.http.delete(this.end_point + 'products-admin/products/' + id);
  }

  searchProduct(search): Observable<any>{
    return this.http.get(this.end_point + 'catalogs/products', {params: {search}})
  }

  viewWareHouse(id, params = {}): Observable<any> {
    return this.http.get(this.end_point + 'catalogs/products/' + id + '/stock/ajax', {params});
  }

}
