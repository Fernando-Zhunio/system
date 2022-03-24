import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { IOrder, IShippingOrder } from '../../../../../../interfaces/iorder';
import { SwalService } from './../../../../../../services/swal.service';

@Component({
  selector: 'app-generate-guide-servientrega',
  templateUrl: './generate-guide-servientrega.component.html',
  styleUrls: ['./generate-guide-servientrega.component.scss']
})
export class GenerateGuideServientregaComponent implements OnInit, OnDestroy {

  constructor(private standard: StandartSearchService, @Inject(MAT_DIALOG_DATA) private dataExternal: { order_id: number, shipping: IShippingOrder }, private dialogRef: MatDialogRef<GenerateGuideServientregaComponent>) { }

  form: FormGroup = new FormGroup({
    id_ciudad_destino: new FormControl(null, [Validators.required]),
    id_ciudad_origen: new FormControl(null, [Validators.required]),
    direccion1_remite: new FormControl(null),
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
    peso_fisico: new FormControl(null, [Validators.required]),
  });
  formSearchCity = new FormControl(null);

  subscriptionCity: Subscription;
  isLoadingCity = false;
  intervalSearch: any;

  cities = [];
  searchCities = [];
  isLoading = false;

  ngOnInit() {
    this.fillForm();
    this.isLoading = true;
    this.standard.methodGet('system-orders/orders/shippings/servientrega/cities').subscribe(res => {
      this.isLoading = false;
      console.log(res);
      this.cities = res.data;
      this.isLoadingCity = false;
    }, err => {
      this.isLoadingCity = false; this.isLoading = false;
      SwalService.swalToast({ icon: 'error', title: 'Error', text: 'Se produjo un error al conectarse a los servidores de Servientra, vuelva a intentarlo' });
      this.dialogRef.close();
    });
    this.subscriptionCity = this.formSearchCity.valueChanges.subscribe(value => {
      console.log(value);
      if (value.length > 2) {
        this.searchCities = this.searchCity(value);
        console.log(this.searchCities);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionCity) {
      this.subscriptionCity.unsubscribe();
    }
  }

  fillForm(): void {
    const data = this.dataExternal.shipping;
    this.form.patchValue({
      ancho: data.width,
      alto: data.height,
      largo: data.length,
      peso_fisico: data.weight,
      direccion1_remite: data?.origin_warehouse?.address
    });
  }

  buscarInterval(text): void {
    this.isLoadingCity = true;
    clearTimeout(this.intervalSearch);
    this.intervalSearch = setTimeout(() => {
      this.searchCity(text);
    }, 1000);
  }

  searchCity(text): any[] {
    console.log(text);
    return this.cities.filter(item => item.nombre.toLowerCase().includes(text.toLowerCase()));
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      console.log(this.form.value);
      this.standard.methodPost(`system-orders/orders/${this.dataExternal.order_id}/shippings/${this.dataExternal.shipping.id}/servientrega`, this.form.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.dialogRef.close(res);
      }, err => {
        console.log(err);
        this.isLoading = false;
      }
      );
    } else {
      SwalService.swalFire({ icon: 'warning', title: 'Campos incompletos', text: 'Por favor complete los campos requeridos' });
    }
  }





}
