import { ComponentRef, Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';
import { SimpleSearchSelectorService } from '../../shared/standalone-components/simple-search/simple-search-selector.service';
import { DownloadFileStatusComponent, ItemDownload } from '../components/download-file-status/download-file-status.component';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileStatusService {

  constructor(private host: SimpleSearchSelectorService) { }

  $listDownload: BehaviorSubject<ItemDownload | null> = new BehaviorSubject<ItemDownload | null>(null);
  componentRef: ComponentRef<DownloadFileStatusComponent>

  addDownload(itemDownload: ItemDownload) {
    if (!this.componentRef) {
      this.createComponent();
    }
    this.$listDownload.next(itemDownload);
  }
  
  createComponent(): void {
    ({componentRef: this.componentRef } = this.host.openDialog(DownloadFileStatusComponent));
  }
 
}
