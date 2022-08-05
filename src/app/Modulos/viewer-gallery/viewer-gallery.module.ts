import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerGalleryComponent } from './viewer-gallery.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ViewerGalleryComponent],
  exports: [ViewerGalleryComponent],

})
export class ViewerGalleryModule { }
