import { SharedService } from './../../../services/shared/shared.service';
import { DownloadFileStatusService } from './../../services/download-file-status.service';
import { Component, OnInit } from '@angular/core';
import { CreateHostService } from '../../../shared/services/create-host.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

export interface ItemDownload {
  id: any;
  url: string;
  name: string;
  percent: number;
  title: string
}

export interface ItemDownloadMetaData extends ItemDownload {
  status: 'downloading' | 'completed' | 'error';
  percent: 0;
}


@Component({
  selector: 'app-download-file-status',
  templateUrl: './download-file-status.component.html',
  styleUrls: ['./download-file-status.component.scss']
})
export class DownloadFileStatusComponent implements OnInit {

  listDownload: ItemDownloadMetaData[] = [];
  constructor(private http: HttpClient, private dfs: DownloadFileStatusService, private host: CreateHostService) { }

  ngOnInit(): void {
    this.dfs.$listDownload.subscribe((list: ItemDownload) => {
      const item: ItemDownloadMetaData = {
        ...list,
        status: 'downloading',
        percent: 0
      }
      this.listDownload.push(item);
      this.download(list.url, item);
    });
  }

  download(url, item: ItemDownloadMetaData) {
    SharedService.disabled_loader = true;
    return this.http.get(url, {
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
          a.download = this.getNameFile(url);
          a.click();
          window.URL.revokeObjectURL(urlDownload);
          a.remove();
        // options?.showSpinner &&  spinner?.close();
      }
    }, () => {
      // options?.showSpinner && spinner.close();
    });
  }
  getNameFile(url) {
    return new URL(url).searchParams.get('file_name') || 'file_' + Date.now();
  }
}
