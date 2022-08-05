import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { downloadImage } from '../../class/tools';

@Component({
  selector: 'app-viewer-gallery',
  templateUrl: './viewer-gallery.component.html',
  styleUrls: ['./viewer-gallery.component.scss']
})
export class ViewerGalleryComponent implements OnInit {

  @Input() src: string;
  @Input() alt: string = 'imagen de portada';
  @Output() close = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  closeViewer(): void {
    this.close.emit();
  }

  downloadImage() {
    downloadImage(this.src);
  }
}
