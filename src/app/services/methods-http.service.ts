import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IPaginate<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}
export interface IResponse<T = any> {
  success: boolean;
  data: T;
}

export interface RequestPaginate<T = any>  extends IResponse<IPaginate<T>>{}
@Injectable({
  providedIn: 'root'
})
export class MethodsHttpService {

  end_point = environment.server;

  constructor(private http: HttpClient) { }

  public methodGet<T = any>(url, params: any = null): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.end_point + url, { params });
  }

  public methodGetJsonp<T = any>(url, callbackParam: string = 'callback'): Observable<IResponse<T>> {
    return this.http.jsonp<IResponse<T>>(url,  callbackParam );
  }

  public methodGetPaginate<T = any>(url, params: any = null): Observable<IResponse<IPaginate<T>>> {
    return this.http.get<IResponse<IPaginate<T>>>(this.end_point + url, { params });
  }

  public methodPost<T = any>(url, params: any = null): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.end_point + url,  params );
  }

  public methodPut<T = any>(url, params: any = null): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.end_point + url, params );
  }

  public methodDelete<T = any>(url): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(this.end_point + url);
  }

  public methodGetCustom<T = any>(url): Observable<T> {
    return this.http.get<any>(url);
  }
}
