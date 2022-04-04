import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.scss']
})
export class ViewDocComponent implements OnInit {

  constructor(protected _sanitizer: DomSanitizer) { }
  @Input() isOpenCv = false;
  @Input() isUrl: boolean;
  @Input() base64File: any;
  @Input() typeFile = 'application/pdf';
  encoded_pdf: any;


  ngOnInit() {
  }

  openFile(isUrl: boolean = this.isUrl): void {
    this.encoded_pdf = null;
    this.isOpenCv = true;
    if (!isUrl) {
      const byteArray = new Uint8Array(atob(this.base64File).split('').map(char => char.charCodeAt(0)));
      const blob = new Blob([byteArray], { type:  this.typeFile});
      const url = window.URL.createObjectURL(blob);
      this.encoded_pdf = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

}
