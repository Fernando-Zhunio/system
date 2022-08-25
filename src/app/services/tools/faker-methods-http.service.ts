import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPaginate, IResponse } from '../methods-http.service';

@Injectable({
  providedIn: 'root'
})
export class FakerMethodsHttpService {

  // constructor(private http: HttpClient) { }

  public methodGet<T = any>(_url, _params: any = null): Observable<IResponse<T>> {
    // return this.http.get<IResponse<T>>(this.end_point + url, { params });
    return of({success: true, data: {}}) as Observable<IResponse<T>>;
  }

  public methodGetPaginate<T = any>(_url, _params: any = null): Observable<IResponse<IPaginate<T>>> {
    // return this.http.get<IResponse<IPaginate<T>>>(this.end_point + url, { params });
    return of({success: true, data: {}}) as Observable<IResponse<IPaginate<T>>>;

  }

  // public methodPost<T = any>(url, params: any = null): Observable<IResponse<T>> {
  //   // return this.http.post<IResponse<T>>(this.end_point + url,  params );
  //   return of({success: true, data: {}}) as Observable<IResponse<IPaginate<T>>>;
  // }

  // public methodPut<T = any>(url, params: any = null): Observable<IResponse<T>> {
  //   return this.http.put<IResponse<T>>(this.end_point + url, params );
  // }

  // public methodDelete<T = any>(url): Observable<IResponse<T>> {
  //   return this.http.delete<IResponse<T>>(this.end_point + url);
  // }

  // public methodGetCustom<T = any>(url): Observable<any> {
  //   return this.http.get<any>(url);
  // }

}
