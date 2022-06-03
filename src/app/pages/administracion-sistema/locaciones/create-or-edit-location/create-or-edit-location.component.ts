import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { Icompanies_access } from '../../../../interfaces/iml-info';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { Location as Clocation } from '../../../../class/location';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { MatSelectChange } from '@angular/material/select';

declare const mapboxgl: any;

@Component({
  selector: 'app-create-or-edit-location',
  templateUrl: './create-or-edit-location.component.html',
  styleUrls: ['./create-or-edit-location.component.css'],
})
export class CreateOrEditLocationComponent implements OnInit, AfterViewInit {
  constructor(
    private methodHttp: MethodsHttpService,
    private act_router: ActivatedRoute,
    private ngx_spinner: NgxSpinnerService,
    private route: Router,
    private location: Location
  ) { }

  @ViewChild('mapElement') mapElement: ElementRef;
  state: 'create' | 'edit' = 'create';

  cities: any;
  keyCities = [];
  companies: Icompanies_access[] = [];
  types = [];
  keyTypes = [];
  map: any;
  marker: any;
  title: string = 'Creando una localidad';
  isLoadServer: boolean = false;
  coordinate: { longitud: number; latitud: number } = {
    longitud: 0,
    latitud: 0,
  };
  isEnabledMap: boolean = false;
  location_: Clocation = new Clocation();
  formLocation: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    company: new FormControl('', [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    latitude: new FormControl(""),
    longitude: new FormControl(""),
  });

  form_schedules = new FormGroup({
    monday: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
    tuesday: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
    wednesday: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
    thursday: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
    friday: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
    saturday: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
    sunday: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
  })
  ngOnInit(): void {
    this.ngx_spinner.show();
    this.act_router.data.subscribe((res) => {
      this.state = res.isEdit ? 'edit' : 'create';
      if (res.isEdit) {
        this.title = 'Editando Usuario';
        const id = Number.parseInt(this.act_router.snapshot.paramMap.get('id'));
        const url = 'admin/locations/' + id + '/edit';
        this.methodHttp.methodGet(url).subscribe(
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
              this.formLocation.setValue({
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
        this.methodHttp.methodGet('admin/locations/create').subscribe(
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

  ngAfterViewInit(): void {
    this.getCurrentPosition();
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
    this.marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lon, lat])
      .addTo(this.map);
    const drag = () => {
      var lngLat = this.marker.getLngLat();
      this.coordinate.latitud = lngLat.lat;
      this.coordinate.longitud = lngLat.lng;
      this.formLocation.get('latitude').setValue(this.coordinate.latitud);
      this.formLocation.get('longitude').setValue(this.coordinate.longitud);
    };
    this.marker.on('dragend', drag);
    // this.enabledAndDesabledMap();
  }

  goBack() {
    this.location.back();
  }

  enableAndDisableMap(event): void {
    if (!event.checked) {
      this.map.boxZoom.disable();
      this.map.scrollZoom.disable();
      this.map.dragPan.disable();
      this.map.dragRotate.disable();
      this.map.keyboard.disable();
      this.map.doubleClickZoom.disable();
      this.map.touchZoomRotate.disable();

    } else {
      this.map.boxZoom.enable();
      this.map.scrollZoom.enable();
      this.map.dragPan.enable();
      this.map.dragRotate.enable();
      this.map.keyboard.enable();
      this.map.doubleClickZoom.enable();
      this.map.touchZoomRotate.enable();
    }
  }

  saveInServer(): void {
    if (this.formLocation.valid) {
      this.isLoadServer = true;
      let dataSend = this.formLocation.value;
      if (this.isEnabledMap) {
        dataSend.latitude = this.coordinate.latitud;
        dataSend.longitude = this.coordinate.longitud;
      }
      if (this.state === 'create') {
        this.methodHttp.methodPost('admin/locations', { ...dataSend }).subscribe(res => {
          if (res.hasOwnProperty('success') && res.success) {
            this.route.navigate(['administracion-sistema/locaciones']);
          } else { this.isLoadServer = false; }
        }, err => {
          console.log(err);
          this.isLoadServer = false;
        });
      } else {
        this.methodHttp.methodPut('admin/locations/' + this.location_.id, { ...dataSend }).subscribe(res => {
          if (res.hasOwnProperty('success') && res.success) {
            this.route.navigate(['administracion-sistema/locaciones']);
          } else { this.isLoadServer = false; }
        }, err => {
          console.log(err);
          this.isLoadServer = false;
        });
      }
    } else {
      this.formLocation.markAllAsTouched();
    }
  }

  selectionType($event: MatSelectChange): void {
    console.log($event);
    if ($event.value == 'store') {
      this.addLocationValidationRequired();
      console.log('store')
    } else {
      this.removeLocationValidationRequired();
    }
  }

  addLocationValidationRequired(): void {
    this.formLocation.get('latitude').addValidators([Validators.required]);
    this.formLocation.get('longitude').addValidators([Validators.required]);
  }
  
  removeLocationValidationRequired(): void {
    this.formLocation.get('latitude').removeValidators([Validators.required]);
    this.formLocation.get('longitude').removeValidators([Validators.required]);
  }

  
}
