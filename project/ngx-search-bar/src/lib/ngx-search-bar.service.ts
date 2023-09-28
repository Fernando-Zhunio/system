import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { NGX_SEARCH_BAR_DATA, NgxSearchBarProvider } from './utils/DATA_FOR_SEARCH_BAR';

@Injectable({
  providedIn: 'root'
})
export class NgxSearchBarService {

  constructor(private http: HttpClient,
    private location: Location,
    @Inject(NGX_SEARCH_BAR_DATA) private data: NgxSearchBarProvider) {
      NgxSearchBarService.currentQueryParams = this.getQueryParams();
  }
  nameQueryParams: string = 'params-ngx-search-bar';
  public static currentQueryParams: { [key: string]: any } | null = null;

  search(path: string, params: any, baseUrl: string | null): Observable<any> {
    if (!baseUrl) {
      baseUrl = this.data.BASE_URL
    }
    return this.http.get(`${baseUrl}${path}`, { params });
  }

  setQueryParams(params: { [key: string]: any } = {}): void {
    let searchParams = new URLSearchParams();
    console.log({params})
    searchParams.set(this.nameQueryParams, JSON.stringify(params) || '');
    NgxSearchBarService.currentQueryParams = params;
    this.location.replaceState(this.location.path().split('?')[0], searchParams.toString())
  }

  getQueryParams(): {[key:string]: string} | null {
    try {
      const queryParams = window.location.href.split('?');
      if (queryParams.length === 1) return null;
      const params = Object?.fromEntries(new URLSearchParams(queryParams[1]) as any);
      if (!params || !params.hasOwnProperty(this.nameQueryParams)) return null;
      NgxSearchBarService.currentQueryParams = JSON.parse(params[this.nameQueryParams]);
    }
    catch (e) {
      NgxSearchBarService.currentQueryParams = null;
    }
    return NgxSearchBarService.currentQueryParams
  }
}
