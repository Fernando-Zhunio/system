import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { InfoViewComponent } from '../components/modals/info-view/info-view.component';
import { Iresponse } from '../interfaces/Imports/invoice-item';

@Injectable({
  providedIn: 'root'
})
export class StandartSearchService {

  end_point = environment.server;

  constructor(private http: HttpClient,private dialog:MatDialog) { }

  index(url,page='10',pageSize='10'):Observable<any>{
    return this.http.get<any>(this.end_point+url,{params:{page,pageSize}});
  }

  create(url):Observable<Iresponse>{
    return this.http.get<Iresponse>(this.end_point+url)
  }

 store(url,params):Observable<Iresponse>{
  return this.http.post<Iresponse>(this.end_point+url,{...params})
  }

  search2(url:string,params){
    console.log(params);
    return this.http.get<Iresponse>(this.end_point+url,{params:{...params}})
  }

  search(search,pageSize,state,price_min,price_max,url):Observable<any>{
    let params = new HttpParams();
    params = params.append('page','1');
    params = params.append('pageSize',pageSize);
    params = params.append('status',state);
    if(price_min != null && price_max != null){
      params = params.append('min',price_min);
      params = params.append('max',price_max);
    }
    if(search != null){
      params = params.append('search',search);
      // params = params.set('page','1');
    }
    // return this.http.get<any>(this.end_point+'catalogs/ml-products',{params:{page,search,pageSize}});
    return this.http.get<any>(this.end_point+url,{params});
  }

  nextPageSearch(page,search,pageSize,status,min,max,url):Observable<any>{
    let params = new HttpParams();
    params = params.append('page',page);
    params = params.append('pageSize',pageSize);
    params = params.append('status',status);
    if(min != null && max != null){
      params = params.append('min',min);
      params = params.append('max',max);
    }
    if(search != null){
      params = params.append('search',search);
    }
    return this.http.get<any>(this.end_point+url,{params});
  }

 public  openDescription(name,title,info,isHtml=true){
    this.dialog.open(InfoViewComponent, {
           data: {name, title,info,isHtml},
         });
  }

  searchOnly(url,search):Observable<any>{
    let params = new HttpParams();
    params = params.append('search',search);
    return this.http.get(this.end_point+url,{params})
  }

  show(url):Observable<Iresponse>{
    return this.http.get<Iresponse>(this.end_point+url);
  }
  destory(url):Observable<Iresponse>{
    return this.http.delete<Iresponse>(this.end_point+url)
    }

  updatePut(url,params,with_descomposition=true):Observable<Iresponse>{
    if(with_descomposition){
      params = {...params}
    }
    return this.http.put<Iresponse>(this.end_point+url,params)
  }

  uploadImg(url,img,name="image"):Observable<any>{
       let form = new FormData();
       form.append(name,img);
    return this.http.post(this.end_point+url,form);
  }

  uploadFormData(url,form:FormData):Observable<Iresponse>{
    return this.http.post<Iresponse>(this.end_point+url,form);
  }

  // uploadFormDataPut(url,form:FormData):Observable<Iresponse>{
  //   return this.http.put<Iresponse>(this.end_point+url,form);
  // }



  //#region  convert date
  public formatDate(date):any{
    return  formatDate(
        new Date(date),
        "yyyy/MM/dd",
        "en"
      );
  }

  //#endregion

}
