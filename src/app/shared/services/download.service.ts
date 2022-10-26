import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../services/shared/shared.service';
// import { SpinnerLoaderFileTemplateComponent } from '../components/spinner-loader-file/spinner-loader-file.component';
// import { CreateHostService } from './create-host.service';

interface DownloadOptions { 
  outHash?: boolean
  fileName?: string
  showSpinner?: boolean
  spinnerText?: string
  spinnerPercent?: number
  spinnerIcon?: string
}

@Injectable({
  providedIn: 'root'
})
export class DownloadAndRedirectService {

  defaultOptions: DownloadOptions = {
    outHash: false,
    showSpinner: true,
    spinnerText: 'Descargando archivo',
    spinnerPercent: 0
  }
  constructor(private router: Router, private http: HttpClient) { }
  urlServer = environment.server;
  download(url, options?: DownloadOptions) {
    if (!options) {
      options = this.defaultOptions;
    }
    // let spinner;
    // if (options?.showSpinner) {
    //   spinner =  this.chs.injectComponent(SpinnerLoaderFileTemplateComponent, null, false);
    // }
    const path = options?.outHash ? url : this.urlServer + url;
    SharedService.disabled_loader = true;
    return this.http.get(path, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.DownloadProgress:
          // params.percent = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          const blob = new Blob([event.body], { type: 'application/ms-Excel' });
          const urlDownload = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = urlDownload;
          a.download = options?.fileName || this.getNameFile(url);
          a.click();
          window.URL.revokeObjectURL(urlDownload);
          a.remove();
          // options?.showSpinner &&  spinner?.close();
      }
    },() => {
      // options?.showSpinner && spinner.close();
    });
  }

  getNameFile(url) {
    return new URL(url).searchParams.get('file_name') || 'file_' + Date.now();
  }

  generatePathAndQueryParams(data): { path: string, queryParams: any } {
    const urlOutHash = data.route.replace('#/', '');
    const urlObject: any = new URL(urlOutHash);
    const path = urlObject.pathname;
    const queryStrings = Array.from(urlObject.searchParams.entries());
    const queryParams = {};
    if (queryStrings.length > 0) {
      queryStrings.forEach((item: any) => {
        queryParams[item[0]] = item[1];
      });
    }
    return { path, queryParams };
  }

  redirectTo(data) {
    const { path, queryParams } = this.generatePathAndQueryParams(data);
    if (this.router.url !== path) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate([path], { queryParams }));
    }
  }
}
