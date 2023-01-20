import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.scss']
})
export class ViewDocComponent  {

  constructor(protected _sanitizer: DomSanitizer) { }
  @Input() isOpenCv = false;
  @Input() isUrl: boolean = true;
  @Input() file: any;
  @Input() typeFile = 'application/pdf';
  encoded_pdf: any;

  openFile(isUrl: boolean = this.isUrl): void {
    this.encoded_pdf = null;
    this.isOpenCv = true;
    if (!isUrl) {
      const byteArray = new Uint8Array(atob(this.file).split('').map(char => char.charCodeAt(0)));
      const blob = new Blob([byteArray], { type:  this.typeFile});
      const url = window.URL.createObjectURL(blob);
      this.encoded_pdf = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      this.encoded_pdf = this._sanitizer.bypassSecurityTrustResourceUrl(this.file);
    }
  }

}
