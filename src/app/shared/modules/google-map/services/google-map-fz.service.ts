import { Injectable } from '@angular/core';
// import { catchError, map } from 'rxjs/operators';
import { google, Loader } from 'google-maps';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapFzService {

  private google: google;
  private map: google.maps.Map;
  apiLoaded: any;
  marker: google.maps.Marker;
  constructor() {
    // this.setGoogle();
  }

  async setGoogle(): Promise<google> {
    const loader = new Loader(environment.MAPS_API_KEY, {});
    this.google = await loader.load();
    return this.google;
  }

  getGoogle() {
    return this.google || this.setGoogle();
  }

  async generateMap(element: HTMLElement, options: google.maps.MapOptions) {
    const google = await this.getGoogle();
    this.map =  new google.maps.Map(element, options);
    return this.map;
  }

  getMap() {
    return this.map;
  }

  getMarker() {
    return this.marker;
  }

  addMarker(options: google.maps.MarkerOptions) {
    this.marker = new this.google.maps.Marker({
      map: options?.map || this.map,...options
    });
    return this.marker;
  }

  



}
