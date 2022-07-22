import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './ngx-bar-search.module';

@Injectable({
  providedIn: 'root'
})
export class NgxBarSearchService {

  constructor(private http: HttpClient, @Inject(AppConfig) private config: AppConfig) {
    console.log(this.config)
  }

  readonly end_point: string = this.config.serverUrl;

  public methodGet<T = any>(url, params: any = null): Observable<T> {
    return this.http.get<T>(this.end_point + url, { params });
  }

  public methodPost<T = any>(url, params: any = null): Observable<T> {
    return this.http.post<T>(this.end_point + url,  params );
  }

  public methodPut<T = any>(url, params: any = null): Observable<T> {
    return this.http.put<T>(this.end_point + url, params );
  }

  public methodDelete<T = any>(url): Observable<T> {
    return this.http.delete<T>(this.end_point + url);
  }

  public methodGetCustom<T = any>(url): Observable<any> {
    return this.http.get<any>(url);
  }


}
