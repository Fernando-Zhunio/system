import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IRequest<T= any>{
  success: boolean;
  data: T;
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  methodPost(url: string, data: any): Observable<IRequest> {
    return this.http.post<IRequest>(url, data);
  }

  methodGet(url: string): Observable<IRequest> {
    return this.http.get<IRequest>(url);
  }

  methodPut(url: string, data: any): Observable<IRequest> {
    return this.http.put<IRequest>(url, data);
  }

  methodDelete(url: string): Observable<IRequest> {
    return this.http.delete<IRequest>(url);
  }
}
