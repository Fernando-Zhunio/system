import { Location } from "@angular/common"
import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
// import type { Observable } from "rxjs"
import { NGX_SEARCH_BAR_DATA, NgxSearchBarProvider } from "./utils/DATA_FOR_SEARCH_BAR"
import { NgxSearchBarComponent } from "../public-api"
import { Observable } from "rxjs"

interface INsbParams {
  search: string | null
  paginate?: { page: { value: number; field: string }; pageSize: { value: number; field: string } }
  form?: { [key: string]: any }
}
@Injectable({
  providedIn: "root",
})
export class NgxSearchBarService {
  constructor(
    private http: HttpClient,
    private location: Location,
    @Inject(NGX_SEARCH_BAR_DATA) private data: NgxSearchBarProvider
  ) {
    this.getQueryParams()
  }
  searchBars = new Map<Symbol, {component: NgxSearchBarComponent, params: INsbParams}>()

  nameQueryParams: string = "params-ngx-search-bar"
  public queryParams: INsbParams = { search: null, paginate: undefined, form: undefined }

  search(path: string, params: any, baseUrl: string | null): Observable<any> {
    if (!baseUrl) {
      baseUrl = this.data.BASE_URL
    }
    return this.http.get<any>(`${baseUrl}/${path}`, { params })
  }

  changeQueryParams(symbol:Symbol): void {
    
    let searchParams = new URLSearchParams();
    const p = this.searchBars.get(symbol)!;
    searchParams.set(this.nameQueryParams, JSON.stringify(p.params) || "")
    this.location.replaceState(this.location.path().split("?")[0], searchParams.toString())
  }

  getQueryParams() {
    let paramsBar = this.queryParams;
    try {
      const queryParams = window.location.href.split("?")
      if (queryParams.length === 1) return 
      const params = Object?.fromEntries(new URLSearchParams(queryParams[1]) as any)
      if (!params || !params.hasOwnProperty(this.nameQueryParams)) {
        paramsBar =  { search: null }
        return 
      }
      const p = JSON.parse(params[this.nameQueryParams]) as INsbParams
      if (typeof p?.search === "string") {
        paramsBar["search"] = p.search
      }
      if (p?.paginate) {
        paramsBar["paginate"] = {
          page: p?.paginate?.page || 1,
          pageSize: p?.paginate?.pageSize || 10,
        }
      }

      if (p?.form) {
        paramsBar["form"] = p?.form
      }
      return
    } catch (e) {
      paramsBar = { search: null }
    }
    return
  }

  setParamsPaginate(symbol: Symbol, paginate: { page: { value: number; field: string }; pageSize: { value: number; field: string } }) {
    const paramsBar = this.searchBars.get(symbol)!.params;
    paramsBar["paginate"] = paginate;
  }

  setParamsForm(symbol: Symbol, form: { [key: string]: any } | null) {
    const paramsBar = this.searchBars.get(symbol)!.params;
    paramsBar["form"] = form || undefined
  }

  setParamsSearch(symbol: Symbol, search: string) {
    const paramsBar = this.searchBars.get(symbol)!.params;
    paramsBar["search"] = search
  }

  addBarSearch(symbol: Symbol, bar: NgxSearchBarComponent) {
    this.searchBars.set(symbol, {component: bar, params: {search: null}})
  }

  getBarSearch(symbol: Symbol) {
    return this.searchBars.get(symbol);
  }

  removeBarSearch(symbol: Symbol) {
    this.searchBars.delete(symbol)
  }

  searchApply(symbol: Symbol) {
    const bar = this.searchBars.get(symbol)
    if (bar) {
      bar.component.search()
    }
  }
}
