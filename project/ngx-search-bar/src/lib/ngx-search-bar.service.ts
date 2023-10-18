import { Location } from "@angular/common"
import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import type { Observable } from "rxjs"
import { NGX_SEARCH_BAR_DATA, NgxSearchBarProvider } from "./utils/DATA_FOR_SEARCH_BAR"

interface INsbParams {
  search: string | null
  paginate?: { pageSize: number; page: number }
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
    this.params = { search: null, paginate: undefined, form: undefined }
  }
  nameQueryParams: string = "params-ngx-search-bar"
  public params: INsbParams = { search: null, paginate: undefined, form: undefined }

  search(path: string, params: any, baseUrl: string | null): Observable<any> {
    if (!baseUrl) {
      baseUrl = this.data.BASE_URL
    }
    return this.http.get(`${baseUrl}/${path}`, { params })
  }

  setQueryParams(): void {
    let searchParams = new URLSearchParams()
    // console.log({ params })
    searchParams.set(this.nameQueryParams, JSON.stringify(this.params) || "")
    // this.params = params
    this.location.replaceState(this.location.path().split("?")[0], searchParams.toString())
  }

  getQueryParams(): INsbParams | null {
    try {
      const queryParams = window.location.href.split("?")
      if (queryParams.length === 1) return null
      const params = Object?.fromEntries(new URLSearchParams(queryParams[1]) as any)
      if (!params || !params.hasOwnProperty(this.nameQueryParams)) {
        this.params = { search: null }
        return null
      }
      const p = JSON.parse(params[this.nameQueryParams]) as INsbParams
      // if (!params.hasOwnProperty(this.nameQueryParams)) return null
      if (typeof p?.search === "string") {
        this.params["search"] = p.search
      }
      this.params = JSON.parse(params[this.nameQueryParams])
      if (p?.paginate) {
        this.params["paginate"] = {
          page: p?.paginate?.page || 1,
          pageSize: p?.paginate?.pageSize || 10,
        }
      }

      if (p?.form) {
        this.params["form"] = p?.form
      }
      return this.params
    } catch (e) {
      this.params = { search: null }
    }
    return this.params
  }

  setParamsPaginate(paginate: {page:number, pageSize: number}) {
    this.params["paginate"] = paginate;
  }

  setParamsForm(form: { [key: string]: any }) {
    this.params["form"] = form
  }
}
