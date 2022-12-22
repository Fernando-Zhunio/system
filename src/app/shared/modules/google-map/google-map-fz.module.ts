import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapFzComponent } from './components/google-map-fz/google-map-fz.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GoogleMapFzComponent],
  exports: [GoogleMapFzComponent]
})
export class GoogleMapFzModule { }
