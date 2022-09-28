import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Iresponse } from '../interfaces/Imports/invoice-item';

export interface IResponse<T = any> {
  success: boolean;
  data: T;
}

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
@Injectable({
  providedIn: 'root'
})
export class StandartSearchService {

  end_point = environment.server;

  constructor(private http: HttpClient) { }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  index(url, page: any = '1', pageSize = '10'): Observable<Iresponse> {
    return this.http.get<Iresponse>(this.end_point + url, { params: { page, pageSize } });
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  create(url): Observable<Iresponse> {
    return this.http.get<Iresponse>(this.end_point + url);
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  getWithHttpParams(url, param: HttpParams): Observable<any> {
    return this.http.get(this.end_point + url, { params: param });
  }


/**
   * @deprecated Este método esta en desuso
   *  @use methodPush or methodGetPaginate
   */
  store(url, params): Observable<Iresponse> {
    return this.http.post<Iresponse>(this.end_point + url, { ...params });
  }

  /**
   * @deprecated Este método esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  search2(url: string, params) {
    return this.http.get<Iresponse>(this.end_point + url, { params: { ...params } });
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  search(search, pageSize, state, price_min, price_max, url): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', '1');
    params = params.append('pageSize', pageSize);
    params = params.append('status', state);
    if (price_min != null && price_max != null) {
      params = params.append('min', price_min);
      params = params.append('max', price_max);
    }
    if (search != null) {
      params = params.append('search', search);
      // params = params.set('page','1');
    }
    // return this.http.get<any>(this.end_point+'catalogs/ml-products',{params:{page,search,pageSize}});
    return this.http.get<any>(this.end_point + url, { params });
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  nextPageSearch(page, search, pageSize, status, min, max, url): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    params = params.append('status', status);
    if (min != null && max != null) {
      params = params.append('min', min);
      params = params.append('max', max);
    }
    if (search != null) {
      params = params.append('search', search);
    }
    return this.http.get<any>(this.end_point + url, { params });
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  searchOnly(url, search): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get(this.end_point + url, { params });
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodGet or methodGetPaginate
   */
  show(url): Observable<Iresponse> {
    return this.http.get<Iresponse>(this.end_point + url);
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodDelete
   */
  destory(url): Observable<Iresponse> {
    return this.http.delete<Iresponse>(this.end_point + url);
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodPut
   */
  updatePut(url, params, with_descomposition = true): Observable<Iresponse> {
    if (with_descomposition) {
      params = { ...params };
    }
    return this.http.put<Iresponse>(this.end_point + url, params);
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodPut
   */
  uploadImg(url, img, name = 'image'): Observable<any> {
    const form = new FormData();
    form.append(name, img);
    return this.http.post(this.end_point + url, form);
  }

  /**
   * @deprecated Este metodo esta en desuso
   *  @use methodPost or methodGetPaginate
   */
  /**
   *
   * @param url
   * @param form
   * @example form ={
   *   const form_data_send = new FormData();
    form_data_send.append('first_name', data_send.first_name);}
   * @returns
   */
  uploadFormData(url, form: FormData): Observable<Iresponse> {
    return this.http.post<Iresponse>(this.end_point + url, form);
  }

  customUrlGet(url): Observable<any> {
    return this.http.get(url);
  }




  //#region  convert date
  public formatDate(date): any {
    return formatDate(
      new Date(date),
      'yyyy/MM/dd',
      'en'
    );
  }
  //#endregion


  // new code
  public methodGet<T = any>(url, params: any = null): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.end_point + url, { params });
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

}
