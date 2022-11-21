import { SharedService } from './../../../services/shared/shared.service';
import { DownloadFileStatusService } from './../../services/download-file-status.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CreateHostRef } from '../../../shared/class/create-host-ref';
import { Subscription } from 'rxjs';

export interface ItemDownload {
  id: any;
  url: string;
  name: string;
  content: string;
  title: string
}

export interface ItemDownloadMetaData extends ItemDownload {
  status: 'downloading' | 'completed' | 'error' | 'canceled';
  percent: number;
  subscription?: Subscription
}


@Component({
  selector: 'app-download-file-status',
  templateUrl: './download-file-status.component.html',
  styleUrls: ['./download-file-status.component.scss']
})
export class DownloadFileStatusComponent implements OnInit {

  listDownload: Map<number, ItemDownloadMetaData> = new Map<number, ItemDownloadMetaData>();
  constructor(private chRef: CreateHostRef,private http: HttpClient, private dfs: DownloadFileStatusService) { }

  ngOnInit(): void {
    this.dfs.$listDownload.subscribe((list: ItemDownload | null) => {
      if (!list || this.listDownload.has(list.id)) {
        return;
      }
      const item: ItemDownloadMetaData = {
        ...list,
        status: 'downloading',
        percent: 0,
      }
      this.listDownload.set(item.id,item);
      this.download(item);
    });
  }

  resetDownload(id: number): void {
    const item = this.listDownload.get(id);
    if (item) {
      item.status = 'downloading';
      this.download(item);
    }
  }

  cancelDownload(id: number): void {
    const item = this.listDownload.get(id);
    if (item) {
      item.subscription?.unsubscribe();
      this.listDownload.delete(id);
    }
  }

  download(item: ItemDownloadMetaData) {
    SharedService.disabled_loader = true;
    item.subscription = this.http.get(item.url, {
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
          item.percent = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          const blob = new Blob([event.body], { type: 'application/ms-Excel' });
          const urlDownload = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = urlDownload;
          a.download = this.getNameFile(item.url);
          a.click();
          window.URL.revokeObjectURL(urlDownload);
          a.remove();
          item.status = 'completed';
          setTimeout(() => {
            this.listDownload.delete(item.id);
          }, 2000);
        // options?.showSpinner &&  spinner?.close();
      }
    }, () => {
      item.status = 'error';
      // options?.showSpinner && spinner.close();
    });
  }
  getNameFile(url) {
    return new URL(url).searchParams.get('file_name') || 'file_' + Date.now();
  }

  close(): void {
    this.chRef.close();
  }
}
