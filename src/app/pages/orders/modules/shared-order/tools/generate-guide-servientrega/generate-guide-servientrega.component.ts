import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { IServientregaGuide, IShippingOrder } from '../../../../../../interfaces/iorder';
import { SwalService } from './../../../../../../services/swal.service';
import { IShippingAddress } from './../../../../../../interfaces/iorder';
import { IClientOrder } from '../../../../../../interfaces/iclient-order';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import collect from 'collect.js';
import { StorageService } from '../../../../../../services/storage.service';
// import { IuserSystem } from '../../../../../../interfaces/iuser-system';

@Component({
  selector: 'app-generate-guide-servientrega',
  templateUrl: './generate-guide-servientrega.component.html',
  styleUrls: ['./generate-guide-servientrega.component.scss']
})
export class GenerateGuideServientregaComponent implements OnInit, OnDestroy {

  constructor(private storage: StorageService, private methodsHttp: MethodsHttpService, @Inject(MAT_DIALOG_DATA) private dataExternal: { client: IClientOrder, shipping_address: IShippingAddress, order_id: number, shipping: IShippingOrder, isReturn: boolean }, private dialogRef: MatDialogRef<GenerateGuideServientregaComponent>) { }

  form: FormGroup = new FormGroup({
    id_ciudad_destino: new FormControl(null, [Validators.required]),
    id_ciudad_origen: new FormControl(null, [Validators.required]),
    nombre_remitente: new FormControl(null, [Validators.required]),
    apellido_remite: new FormControl(null, [Validators.required]),
    direccion1_remite: new FormControl(null, [Validators.required]),
    telefono1_remite: new FormControl(null, [Validators.required]),
    telefono2_remite: new FormControl(null),
    razon_social_desti_ne: new FormControl(null, [Validators.required]),
    nombre_destinatario_ne: new FormControl(null, [Validators.required]),
    apellido_destinatar_ne: new FormControl(null, [Validators.required]),
    direccion1_destinat_ne: new FormControl(null, [Validators.required]),
    sector_destinat_ne: new FormControl(null),
    telefono1_destinat_ne: new FormControl(null, [Validators.required]),
    telefono2_destinat_ne: new FormControl(null),
    contenido: new FormControl(null, [Validators.required]),
    numero_piezas: new FormControl(null, [Validators.required]),
    valor_mercancia: new FormControl(null, [Validators.required]),
    valor_asegurado: new FormControl(null, [Validators.required]),
    largo: new FormControl(null),
    ancho: new FormControl(null),
    alto: new FormControl(null),
    peso_fisico: new FormControl(2, [Validators.required]),
  });
  title = 'Generar Guía';
  formSearchCity = new FormControl(null);
  formSearchDestinoCity = new FormControl(null);

  subscriptionCity: Subscription;
  subscriptionDestinoCity: Subscription;

  isLoadingCity = false;
  intervalSearch: any;

  cities = [];
  searchCities = [];
  searchDestinoCities = [];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    const request = {
      cities: this.methodsHttp.methodGet('system-orders/orders/shippings/servientrega/cities'),
    }
    const isReturn = this.dataExternal.isReturn;
    if (isReturn) {
      const url = `system-orders/orders/${this.dataExternal.order_id}/shippings/${this.dataExternal.shipping.id}/servientrega`;
      request['dataReturn'] = this.methodsHttp.methodGet(url);
      this.title = 'Generar Guía de Devolución';
    } else {
      this.fillForm();
    }

    forkJoin(request).subscribe(
      {
        next: (data: any) => {
          console.log(data)
          this.isLoading = false;
          console.log(data);
          this.cities = data.cities.data;
          this.searchCities = this.cities;
          this.searchDestinoCities = this.cities;
          this.isLoadingCity = false;
          if (isReturn) {
            this.fillFormReturn(data.dataReturn.data);
          }
        },
        error: (err) => {
          this.isLoadingCity = false; this.isLoading = false;
          SwalService.swalToast({ icon: 'error', title: 'Error', text: 'Se produjo un error al conectarse a los servidores de Servientrega, vuelva a intentarlo' });
          this.dialogRef.close();
        }
      }
    )

    this.subscriptionCity = this.formSearchCity.valueChanges.subscribe(value => {
      this.searchCities = this.searchCity(value);
    });
    this.subscriptionDestinoCity = this.formSearchDestinoCity.valueChanges.subscribe(value => {
      this.searchDestinoCities = this.searchCity(value);
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionCity) {
      this.subscriptionCity.unsubscribe();
    }

    if (this.subscriptionDestinoCity) {
      this.subscriptionDestinoCity.unsubscribe();
    }
  }

  fillForm(): void {
    const data = this.dataExternal;
    const user = this.storage.getCurrentPerson();
    this.form.patchValue({
      nombre_remitente: user.first_name,
      apellido_remite: user.last_name,
      ancho: data.shipping.width,
      alto: data.shipping.height,
      largo: data.shipping.length,
      peso_fisico: data.shipping.weight | 2,
      direccion1_remite: data.shipping?.origin_warehouse?.address,
      telefono1_destinat_ne: data.client.phone,
      nombre_destinatario_ne: data.shipping_address.first_name,
      apellido_destinatar_ne: data.shipping_address.last_name,
      direccion1_destinat_ne: this.getConcat([
        data.shipping_address.state,
        data.shipping_address.city,
        data.shipping_address?.neighborhood,
        data.shipping_address?.street
      ]),
      sector_destinat_ne: this.getConcat([
        data.shipping_address?.neighborhood,
        data.shipping_address?.street
      ])
    });
  }


  fillFormReturn(data: IServientregaGuide): void {
    const destinatario = this.convertNamesToArray(data.destinatario);
    const user = this.storage.getCurrentPerson();
    const idCityOrigin = this.cities.find(city => city.nombre.includes(data.origen))?.id;
    const idCityDestination = this.cities.find(city => city.nombre.includes(data.destino))?.id;
    this.form.patchValue({
      id_ciudad_destino: idCityOrigin,
      id_ciudad_origen: idCityDestination,
      nombre_remitente: destinatario.first_name,
      apellido_remite: destinatario.last_name,
      direccion1_remite: data.direccion_destinatario,
      telefono1_remite: '',
      telefono2_remite: '',
      razon_social_desti_ne: data.razon_social_remitente,

      nombre_destinatario_ne: user.first_name,
      apellido_destinatar_ne: user.last_name,
      direccion1_destinat_ne: data.direccion_remitente,
      sector_destinat_ne: '',
      telefono1_destinat_ne: '',
      telefono2_destinat_ne: '',

      contenido: data.contenido,
      numero_piezas: data.cantidad,
      valor_mercancia: data.valor_mercancia,
      valor_asegurado: data.valor_asegurado,
      largo: data.largo,
      ancho: data.ancho,
      alto: data.alto,
      peso_fisico: data.peso_fisico,
    })
  }

  getConcat(arg): string {
    return arg.filter(n => n).join(', ');
  }

  convertNamesToArray(arg): object | any {
    const collection = collect(arg.split(/\s+/));
    const unique = collection.unique()
    const arrayNames = unique.all();
    const size = arrayNames.length;
    const first_name = size < 4 ? (size > 1 ? arrayNames[0] : '') : `${arrayNames[0]} ${arrayNames[1]}`;
    const last_name = size < 4 ? size == 3 ? `${arrayNames[1]} ${arrayNames[2]}` : arrayNames[1] : `${arrayNames[2]} ${arrayNames[3]}`;
    if (size > 4) {
      SwalService.swalFire({ icon: 'warning', title: 'Atención', text: 'El nombre y apellido del remitente pueden que no este correcto, por favor verifique' });
    }
    return {
      first_name,
      last_name
    };
  }


  searchCity(text): any[] {
    return this.cities.filter(item => item.nombre.toLowerCase().includes(text.toLowerCase()));
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      console.log(this.form.value);
      let observable;
      if (!this.dataExternal.isReturn) {
        observable = this.methodsHttp.methodPost(`system-orders/orders/${this.dataExternal.order_id}/shippings/${this.dataExternal.shipping.id}/servientrega`, this.form.value)
      } else {
        observable = this.methodsHttp.methodPost(`system-orders/orders/${this.dataExternal.order_id}/shippings/${this.dataExternal.shipping.id}/servientrega/return-shipping`, this.form.value)
      }
      // this.methodsHttp.methodPost(`system-orders/orders/${this.dataExternal.order_id}/shippings/${this.dataExternal.shipping.id}/servientrega`, this.form.value).subscribe(res => {
      observable.subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.dialogRef.close(res);
      }, err => {
        console.log(err);
        this.isLoading = false;
      }
      );
    } else {
      this.form.markAllAsTouched();
      SwalService.swalFire({ icon: 'warning', title: 'Campos incompletos', text: 'Por favor complete los campos requeridos' });
    }
  }
}
