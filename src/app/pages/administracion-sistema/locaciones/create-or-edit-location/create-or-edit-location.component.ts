import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { Icity, Icompanies_access } from '../../../../interfaces/iml-info';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { Location as Clocation } from '../../../../class/location';

import * as Mapboxgl from 'mapbox-gl';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-create-or-edit-location',
  templateUrl: './create-or-edit-location.component.html',
  styleUrls: ['./create-or-edit-location.component.css'],
})
export class CreateOrEditLocationComponent implements OnInit {
  constructor(
    private s_standart: StandartSearchService,
    private act_router: ActivatedRoute,
    private ngx_spinner: NgxSpinnerService,
    private route: Router,
    private location: Location
  ) {}

  state: 'create' | 'edit' = 'create';

  cities: any;
  keyCities = [];
  companies: Icompanies_access[] = [];
  types = [];
  keyTypes = [];
  map: Mapboxgl.Map;
  marker: Mapboxgl.Marker;
  title: string = 'Creando una localidad';
  isLoadServer: boolean = false;
  coordinate: { longitud: number; latitud: number } = {
    longitud: 0,
    latitud: 0,
  };
  isEnabledMap: boolean = false;
  location_: Clocation = new Clocation();
  form_location: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    company: new FormControl('', [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    // latitude: new FormControl("", [Validators.required]),
    // longitude: new FormControl("", [Validators.required]),
  });
  ngOnInit(): void {
    this.ngx_spinner.show();
    this.act_router.data.subscribe((res) => {
      this.state = res.isEdit ? 'edit' : 'create';
      if (res.isEdit) {
        this.title = 'Editando Usuario';
        const id = Number.parseInt(this.act_router.snapshot.paramMap.get('id'));
        const url = 'admin/locations/' + id + '/edit';
        this.s_standart.show(url).subscribe(
          (response) => {
            if (response.hasOwnProperty('success') && response.success) {
              this.setDataSelects(response.data);
              this.location_ = response.data.location;
              const {
                name,
                address,
                type,
                city_id: city,
                company_id: company,
                status
              } = this.location_;
              this.form_location.setValue({
                name,
                address,
                type,
                city: city.toString(),
                company,
                status,
              });

              if (this.location_.latitude && this.location_.longitude) {
                this.coordinate.latitud = Number.parseFloat(
                  this.location_.latitude
                );
                this.coordinate.longitud = Number.parseFloat(
                  this.location_.longitude
                );
                this.createMap(
                  this.coordinate.longitud,
                  this.coordinate.latitud
                );
                this.isEnabledMap = true;
              } else {
                this.getCurrentPosition();
              }
            }
            this.ngx_spinner.hide();
          },
          (err) => {
            this.ngx_spinner.hide();
          }
        );
      } else {
        this.s_standart.show('admin/locations/create').subscribe(
          (response) => {
            if (response.success) {
              this.setDataSelects(response.data);
            }
            this.ngx_spinner.hide();
          },
          (err) => {
            this.ngx_spinner.hide();
          }
        );
        setTimeout(() => {
          this.getCurrentPosition();
        }, 2000);
      }
    });
  }

  getCurrentPosition() {
    if ('geolocation' in navigator) {
      /* la geolocalización está disponible */
      navigator.geolocation.getCurrentPosition((position) => {
        const coord = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        this.createMap(coord.lon, coord.lat);
        this.coordinate.latitud = coord.lat;
        this.coordinate.longitud = coord.lon;
      });
    } else {
      /* la geolocalización NO está disponible */
    }
  }

  setDataSelects(data): void {
    this.companies = data.companies;
    this.cities = data.cities;
    this.keyCities = Object.keys(this.cities);
    this.types = data.types;
    this.keyTypes = Object.keys(this.types);
  }

  createMap(lon = 0, lat = 0): void {
    Mapboxgl.accessToken = environment.mapbox_key;
    this.map = new Mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat], // starting position
      zoom: 9, // starting zoom
      // interactive: this.isEnabledMap
    });

    this.map.resize();
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.marker = new Mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lon, lat])
      .addTo(this.map);
    const drag = () => {
      var lngLat = this.marker.getLngLat();
      this.coordinate.latitud = lngLat.lat;
      this.coordinate.longitud = lngLat.lng;
    };
    this.marker.on('dragend', drag);
    // this.enabledAndDesabledMap();
  }

  goBack() {
    this.location.back();
  }

  enableAndDesableMap(event): void {

    if (!event.checked) {
      this.map.boxZoom.disable();
      this.map.scrollZoom.disable();
      this.map.dragPan.disable();
      this.map.dragRotate.disable();
      this.map.keyboard.disable();
      this.map.doubleClickZoom.disable();
      this.map.touchZoomRotate.disable();
      // this.marker.style.visibility();
      // this.marker.draggable = false;
    } else {
      this.map.boxZoom.enable();
      this.map.scrollZoom.enable();
      this.map.dragPan.enable();
      this.map.dragRotate.enable();
      this.map.keyboard.enable();
      this.map.doubleClickZoom.enable();
      this.map.touchZoomRotate.enable();
    }
    // this.map.dragging.disable(this.isEnabledMap);
    // this.map.disabled()
  }

  saveInServer(): void {
    if (this.form_location.valid) {
      this.isLoadServer = true;
      let dataSend = this.form_location.value;
      if (this.isEnabledMap) {
        dataSend.latitude = this.coordinate.latitud;
        dataSend.longitude = this.coordinate.longitud;
      }
      if (this.state === 'create') {
        this.s_standart.store('admin/locations', {...dataSend}).subscribe(res => {
          if (res.hasOwnProperty('success') && res.success) {
            this.route.navigate(['administracion-sistema/locaciones']);
          } else { this.isLoadServer = false; }
        }, err => {
          console.log(err);
          this.isLoadServer = false;
        });
      } else {
        this.s_standart.updatePut('admin/locations/' + this.location_.id, {...dataSend}).subscribe(res => {
          if (res.hasOwnProperty('success') && res.success) {
            this.route.navigate(['administracion-sistema/locaciones']);
          } else { this.isLoadServer = false; }
        }, err => {
          console.log(err);
          this.isLoadServer = false;
        });
      }
    } else {
      this.form_location.markAllAsTouched();
    }
  }
}
