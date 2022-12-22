import { Location as LocationInject } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../../environments/environment';
import { CompanyAccess } from '../../../../../interfaces/iml-info';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Location } from '../../../../../interfaces/Location';
import { SwalService } from '../../../../../services/swal.service';
import { CODE_POSTAL_ROUTE_API } from '../../routes-api/location-routes-api';
import { GoogleMapFzService } from '../../../../../shared/modules/google-map/services/google-map-fz.service';


declare const mapboxgl: any;

@Component({
  selector: 'app-create-or-edit-location',
  templateUrl: './create-or-edit-location.component.html',
  styleUrls: ['./create-or-edit-location.component.css'],
})
export class CreateOrEditLocationComponent implements OnInit, AfterViewInit {
  @ViewChild("mapElement") mapElement: ElementRef;
  constructor(
    private methodsHttp: MethodsHttpService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private locationInject: LocationInject,
    private googleMapService: GoogleMapFzService,
  ) { }

  state: 'create' | 'edit' = 'create';
  cities: any;
  keyCities: any[] = [];
  companies: CompanyAccess[] = [];
  types: any[] = [];
  keyTypes: any[] = [];
  title: string = 'Creando una localidad';
  isLoadServer: boolean = false;
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
    reference: new FormControl(""),
    postal_code: new FormControl("", [Validators.required]),
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
  coordinates: { lat: number, lng: number } = { lat: 0, lng: 0 };

  ngOnInit(): void {
    this.spinner.show();
    this.state = this.getIsEditState() ? 'edit' : 'create';;
    if (this.state === 'edit') {
      this.title = 'Editando Localidad';
      const id = this.activatedRoute.snapshot.paramMap?.get('id');
      const url = 'admin/locations/' + id + '/edit';
      this.methodsHttp.methodGet(url).subscribe(
        (res) => {
          if (res?.success) {
            this.fillEditData(res.data);
            this.location = res.data.location;
            const { latitude, longitude } = this.location;
            if (latitude && longitude) {
              this.initMap({ lat: Number.parseFloat(latitude), lng: Number.parseFloat(longitude) });
              this.isEnabledMap = true;
            } else {
              this.initMap();
            }
          }
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    } else {
      this.methodsHttp.methodGet('admin/locations/create').subscribe(
        (response) => {
          if (response?.success) {
            this.fillInputsData(response.data);
          }
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }

  ngAfterViewInit(): void {
    if (this.state === 'create') {
      this.initMap()
    }
  }

  getIsEditState(): boolean {
    return this.activatedRoute.snapshot.data['isEdit'];
  }

  async initMap(coordinates: { lat: number, lng: number } | null = null) {
    await this.googleMapService.generateMap(
      this.mapElement.nativeElement, {
      center: coordinates || this.getCurrentCoordinates(),
      zoom: 8,
    });
    this.googleMapService.addMarker({
      position: coordinates || this.getCurrentCoordinates(),
      draggable: true,
      title: "This marker is draggable.",
    }).addListener('dragend', (event) => {
      const position = event.latLng;
      this.formLocation.patchValue({
        latitude: position.lat().toString(),
        longitude: position.lng().toString()
      })
    });
  }

  fillEditData(data: any) {
    const { location } = data;
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
      reference,
      postal_code
    } = location;
    this.formLocation.patchValue({
      name,
      address,
      type,
      city: city!.toString(),
      company,
      status,
      latitude,
      longitude,
      phone,
      mba_code,
      reference,
      postal_code
    });
    if (location.schedules) {
      this.formSchedules.patchValue(location.schedules);
    }
    this.fillInputsData(data);
  }

  fillInputsData(d: any) {
    this.companies = d.companies;
    this.cities = d.cities;
    this.keyCities = Object.keys(this.cities);
    this.types = d.types;
    this.keyTypes = Object.keys(this.types);
  }

  fillFormSchedules(value) {
    Object.keys(this.formSchedules.value).forEach((key) => {
      this.formSchedules.get(key)?.patchValue({
        status: true,
        start: value.start,
        end: value.end,
      });
    });
  }

  getCurrentCoordinates(): { lat: number, lng: number } {
    const coordinates = { lat: -1.3272563450142145, lng: -78.45758381196407 };
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        coordinates.lat = position.coords.latitude;
        coordinates.lng = position.coords.longitude;
      });
    }
    return coordinates;
  }

  goLocationMarker(): void {
    const { latitude, longitude }: any = this.formLocation.value;
    if (latitude && longitude) {
      try {
        this.resetMap([Number.parseFloat(latitude), Number.parseFloat(longitude)], 15);
        this.googleMapService.getMarker().setPosition({ lat: Number.parseFloat(latitude), lng: Number.parseFloat(longitude) });
      } catch (err) {
        console.log(err);
      }
    }
  }

  goBack() {
    this.locationInject.back();
  }

  saveInServer(): void {
    const validSchedule = this.validateFormSchedule();
    if (this.formLocation.valid && validSchedule) {
      this.isLoadServer = true;
      let dataSend = this.formLocation.value;
      if (this.formLocation.get('type')?.value == 'store') {
        dataSend['schedules'] = this.formSchedules.value;
      }
      if (this.state === 'create') {
        this.methodsHttp.methodPost('admin/locations', dataSend).subscribe(res => {
          if (res?.success) {
            this.goBack();
          } else { this.isLoadServer = false; }
        }, () => {
          this.isLoadServer = false;
        });
      } else {
        this.methodsHttp.methodPut('admin/locations/' + this.location.id, dataSend).subscribe(res => {
          if (res?.success) {
            this.goBack();
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
    const valReturn = this.formLocation.get('type')?.value == 'store' ? this.formSchedules.valid : true;
    if (!valReturn) {
      this.formSchedules.markAsTouched();
      SwalService.swalFire({ title: '¡Atención!', text: 'Debe ingresar un horario valido, donde la hora de apertura sea menor a la hora de cierre', icon: 'warning' });
    }
    return valReturn;
  }

  addLocationValidationRequired(): void {
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

  isLoadingPostalCode = false;
  getCodePostal(): void {
    const { latitude, longitude }: any = this.formLocation.value;
    if (!latitude || !longitude) {
      SwalService.swalFire({ title: '¡Atención!', text: 'Debe ingresar una latitud y longitud valida', icon: 'warning' });
      return;
    }
    this.isLoadingPostalCode = true;
    this.formLocation.get('postal_code')?.setValue('Espere un momento...');
    const url = CODE_POSTAL_ROUTE_API(environment.MAPS_API_KEY, latitude, longitude);
    fetch(url).then(res => res.json()).then(res => {
      if (res?.results?.length > 0) {
        const resultPostCode = res.results.find((item: any) => item.types.includes('postal_code'));
        if (resultPostCode) {
          const { long_name: postal_code }: any = resultPostCode.address_components.find((item: any) => item.types.includes('postal_code'));
          this.formLocation.get('postal_code')?.setValue(postal_code);
        }
      }
      this.isLoadingPostalCode = false;
      if (this.formLocation.get('postal_code')?.value == 'Espere un momento...') {
        SwalService.swalFire({ title: '¡Atención!', text: 'No se pudo obtener el código postal', icon: 'warning' });
        this.formLocation.get('postal_code')?.setValue('');
      }
    }).catch(err => {
      console.log(err);
      this.isLoadingPostalCode = false;
      SwalService.swalFire({ title: '¡Atención!', text: 'No se pudo obtener el código postal', icon: 'warning' });
    });
  }

  resetMap(coordinates: [number, number] = [4.7110, -74.0721], zoom: number = 5): void {
    this.googleMapService.getMap().setCenter({ lat: coordinates[0], lng: coordinates[1] });
    this.googleMapService.getMap().setZoom(zoom);
  }
}