import { ComponentRef, Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { CreateHostRef } from '../../shared/class/create-host-ref';
import { DownloadFileStatusComponent, ItemDownload } from '../components/download-file-status/download-file-status.component';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileStatusService {

  constructor( private chRef: CreateHostRef) { }

  $listDownload: Subject<ItemDownload> = new Subject<ItemDownload>();
  componentRef: ComponentRef<DownloadFileStatusComponent>

  addDownload(itemDownload: ItemDownload) {
    if (!this.componentRef) {
      this.createComponent();
    }
    this.$listDownload.next(itemDownload);
  }
  
  createComponent(): void {
    ({componentRef: this.componentRef } = this.host.injectComponent(DownloadFileStatusComponent));
  }

  close(): void {
    this.chRef.close();
  }

 
}
