import { Component, ElementRef, Inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location, Schedules } from '../../../../../interfaces/Location';
import { GoogleMapFzService } from '../../../../../shared/modules/google-map/services/google-map-fz.service';

@Component({
  selector: 'app-detail-location-dialog',
  templateUrl: './detail-location-dialog.component.html',
  styleUrls: ['./detail-location-dialog.component.scss']
})
export class DetailLocationDialogComponent implements AfterViewInit, OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public location: Location, private googleMapService: GoogleMapFzService,) { }
  
  DAYS = [
     {day: "Lunes", key: "monday"},
     {day: "Martes", key: "tuesday"},
     {day: "Miércoles", key: "wednesday"},
     {day: "Jueves", key: "thursday"},
     {day: "Viernes", key: "friday"},
     {day: "Sábado", key: "saturday"},
     {day: "Domingo", key: "sunday"},
  ]
  schedule: Schedules;
  @ViewChild('mapElement') mapElement: ElementRef;
  
  ngOnInit(): void {
    this.schedule = this.location.schedules;
  }

  ngAfterViewInit(): void {
    if (this.location.longitude && this.location.latitude) {
      this.initMap(
        {
          lat: Number.parseFloat(this.location.latitude),
          lng: Number.parseFloat(this.location.longitude)
        });
    }
  }

  async initMap(coordinates: { lat: number, lng: number }) {
    await this.googleMapService.generateMap(
      this.mapElement.nativeElement, {
      center: coordinates,
      zoom: 8,
    });
    this.googleMapService.addMarker({
      position: coordinates,
      draggable: false,
      title: "This marker is draggable.",
    })
  }
}
