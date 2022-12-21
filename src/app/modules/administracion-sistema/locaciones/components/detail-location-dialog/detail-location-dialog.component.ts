import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Map } from 'mapbox-gl';
import { environment } from '../../../../../../environments/environment';
import { Location } from '../../../../../interfaces/Location';
declare const mapboxgl: any;

@Component({
  selector: 'app-detail-location-dialog',
  templateUrl: './detail-location-dialog.component.html',
  styleUrls: ['./detail-location-dialog.component.scss']
})
export class DetailLocationDialogComponent implements AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public location: Location) { }

  DAYS = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo"
  }
  @ViewChild('mapElement') mapElement: ElementRef;
  map: Map;
  
  ngAfterViewInit(): void {
    if (this.location.longitude && this.location.latitude) {
      this.createMap(
        Number.parseInt(this.location.longitude)
      , Number.parseInt(this.location.latitude));
    }
  }
  createMap(lon = 0, lat = 0): void {
    mapboxgl.accessToken = environment.mapbox_key;
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 9,
    });

    this.map.resize();
    this.map.addControl(new mapboxgl.NavigationControl());
     new mapboxgl.Marker({
      draggable: false,
    })
      .setLngLat([lon, lat])
      .addTo(this.map);
    // const drag = () => {
    //   var lngLat = this.marker.getLngLat();
    //   this.coordinate.latitud = lngLat.lat;
    //   this.coordinate.longitud = lngLat.lng;
    //   this.formLocation.get('latitude')?.setValue(String(this.coordinate.latitud));
    //   this.formLocation.get('longitude')?.setValue(String(this.coordinate.longitud));
    // };
    // this.marker.on('dragend', drag);
  }
}
