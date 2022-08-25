import { Location as LocationInject } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { CompanyAccess } from '../../../../interfaces/iml-info';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { Location } from '../../../../interfaces/Location';
import { SwalService } from '../../../../services/swal.service';

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
    private locationInject: LocationInject
  ) {}

  @ViewChild('mapElement') mapElement: ElementRef;
  state: 'create' | 'edit' = 'create';

  cities: any;
  keyCities: any[] = [];
  companies: CompanyAccess[] = [];
  types: any[] = [];
  keyTypes: any[] = [];
  map: any;
  marker: any;
  title: string = 'Creando una localidad';
  isLoadServer: boolean = false;
  coordinate: { longitud: number; latitud: number } = {
    longitud: 0,
    latitud: 0,
  };
  isEnabledMap: boolean = false;
  location: Location;
  formLocation = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    mba_code: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    company: new FormControl('', [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    latitude: new FormControl(""),
    longitude: new FormControl(""),
  });

  formSchedules = new FormGroup({
    monday: new FormGroup({
      status: new FormControl(true, [Validators.required]),
      start: new FormControl(null),
      end: new FormControl(null),
    }, [this.validateHours()]),
    tuesday: new FormGroup({
      status: new FormControl(true, [Validators.required]),
      start: new FormControl(null),
      end: new FormControl(null),
    }, [this.validateHours()]),
    wednesday: new FormGroup({
      status: new FormControl(true, [Validators.required]),

      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    }, [this.validateHours()]),
    thursday: new FormGroup({
      status: new FormControl(true, [Validators.required]),
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    }, [this.validateHours()]),
    friday: new FormGroup({
      status: new FormControl(true, [Validators.required]),
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    }, [this.validateHours()]),
    saturday: new FormGroup({
      status: new FormControl(true, [Validators.required]),
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    }),
    sunday: new FormGroup({
      status: new FormControl(true, [Validators.required]),
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    }, [this.validateHours()]),
  })

  ngOnInit(): void {
    this.ngx_spinner.show();
    this.act_router.data.subscribe((res) => {
      this.state = res['isEdit'] ? 'edit' : 'create';
      if (res['isEdit']) {
        this.title = 'Editando Localidad';
        const id = Number.parseInt(this.act_router.snapshot.paramMap.get('id')!);
        const url = 'admin/locations/' + id + '/edit';
        this.methodHttp.methodGet(url).subscribe(
          (response) => {
            if (response?.success) {
              this.setDataSelects(response.data);
              this.location = response.data.location;
              const {
                name,
                address,
                type,
                city_id: city,
                company_id: company,
                status,
                latitude,
                longitude,
                mba_code,
                phone,
                schedules
              } = this.location;
              this.formLocation.patchValue({
                name,
                address,
                type,
                city: city.toString(),
                company,
                status,
                latitude,
                longitude,
                phone,
                mba_code,
              });

              if (schedules) {
                this.formSchedules.patchValue(schedules);
              }

              if (this.location.latitude && this.location.longitude) {
                this.coordinate.latitud = Number.parseFloat(
                  this.location.latitude
                );
                this.coordinate.longitud = Number.parseFloat(
                  this.location.longitude
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
          () => {
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
          () => {
            this.ngx_spinner.hide();
          }
        );
      }
    });
  }

  autofillSchedules(value:{start, end}) {
    this.formSchedules.get('monday')?.setValue(value);
    this.formSchedules.get('tuesday')?.setValue(value);
    this.formSchedules.get('wednesday')?.setValue(value);
    this.formSchedules.get('thursday')?.setValue(value);
    this.formSchedules.get('friday')?.setValue(value);
    this.formSchedules.get('saturday')?.setValue(value);
    this.formSchedules.get('sunday')?.setValue(value);
  }

  getCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coord = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        this.createMap(coord.lon, coord.lat);
        this.coordinate.latitud = coord.lat;
        this.coordinate.longitud = coord.lon;
      });
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
      this.formLocation.get('latitude')?.setValue(this.coordinate.latitud);
      this.formLocation.get('longitude')?.setValue(this.coordinate.longitud);
    };
    this.marker.on('dragend', drag);
  }

  goBack() {
    this.locationInject.back();
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
    const validSchedule = this.validateFormSchedule();
    if (this.formLocation.valid && validSchedule) {
      this.isLoadServer = true;
      let dataSend = this.formLocation.value;
      if (this.formLocation.get('type')?.value == 'store') {
        dataSend.schedules = this.formSchedules.value;
      }
      if (this.state === 'create') {
        this.methodHttp.methodPost('admin/locations', dataSend ).subscribe(res => {
          if (res?.success) {
            this.route.navigate(['administracion-sistema/locations']);
          } else { this.isLoadServer = false; }
        }, () => {
          // console.log(err);
          this.isLoadServer = false;
        });
      } else {
        this.methodHttp.methodPut('admin/locations/' + this.location.id, dataSend ).subscribe(res => {
          if (res?.success) {
            this.route.navigate(['administracion-sistema/locations']);
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

  validateFormSchedule(): boolean {
    const valReturn =  this.formLocation.get('type')?.value == 'store' ? this.formSchedules.valid : true;
    if (!valReturn) {
      this.formSchedules.markAsTouched();
      SwalService.swalFire({title: '¡Atención!', text: 'Debe ingresar un horario valido, donde la hora de apertura sea menor a la hora de cierre', icon: 'warning'});
    }
    return valReturn;
  }

  addLocationValidationRequired(): void {
    console.log('addLocationValidationRequired');
    this.formLocation.get('latitude')?.addValidators([Validators.required]);
    this.formLocation.get('longitude')?.addValidators([Validators.required]);
  }

  removeLocationValidationRequired(): void {
    this.formLocation.get('latitude')?.removeValidators([Validators.required]);
    this.formLocation.get('longitude')?.removeValidators([Validators.required]);
  }

  validateHours(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.get('start')?.value ? ((control.get('start')?.value && control.get('end')?.value) && control.get('start')?.value > control.get('end')?.value) ? { 'invalidHours': true } : null : null;
    };
  }


}
