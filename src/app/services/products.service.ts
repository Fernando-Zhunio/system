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

    return this.http.get<any>(this.end_point+'products-admin/products',{params:{page}});
  }

  create():Observable<any>{
    // const Header = this.createHeader();

    return this.http.get(this.end_point+"products-admin/products/create");
  }

  edit(id):Observable<any>{
    // const Header = this.createHeader();

    return this.http.get(this.end_point+"products-admin/products/"+id+"/edit");
  }

  store(params):Observable<any>{
    // const Header = this.createHeader();

    return this.http.post(this.end_point+"products-admin/products",{...params});
  }

  update(id,params):Observable<any>{
    // const Header = this.createHeader();

    return this.http.patch(this.end_point+"products-admin/products/"+id,{...params});
  }

  destroy(id):Observable<any>{
    // const Header = this.createHeader();

    return this.http.delete(this.end_point+"products-admin/products/"+id);
  }

  searchProduct(search):Observable<any>{
    return this.http.get(this.end_point+"catalogs/products",{params:{search}})
  }

  viewWareHouse(id):Observable<any>{
    return this.http.get(this.end_point+'catalogs/products/'+id+'/stock/ajax')
  }
  
  

  

}
