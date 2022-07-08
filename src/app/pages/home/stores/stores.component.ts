import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { PermissionLocations } from '../../../class/permissions-modules';
import { MethodsHttpService } from '../../../services/methods-http.service';
import { StorageService } from '../../../services/storage.service';
import { SwalService } from '../../../services/swal.service';
import { ModificateStoresComponent } from './modificate-stores/modificate-stores.component';
declare const mapboxgl: any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  constructor(private storage: StorageService, private methodHttp: MethodsHttpService, private dialog: MatDialog) { }
  map: any;
  storeInMap: HTMLElement[] = [];
  stores = new Map();
  storesFilter = new Map();
  isLoading = false;
  keyEncryptStore = '914068895saa7t92ob23cr757e7dab10e7cf4e4';
  permissions = PermissionLocations;
  cities = new Map<string, string>();

  ngOnInit() {
    this.getStores();
  }

  getStores() {
    this.isLoading = true;
    const url = 'company/stores/vtex';
    const hasLocalStorageStores = this.storage.hasItemLocalStorage(this.keyEncryptStore);
    if (hasLocalStorageStores) {
      const stores = this.storage.getItemLocalStorage(this.keyEncryptStore);
      this.convertStoresObjectToMap(stores, false);
    }
    this.methodHttp.methodGet(url).subscribe(
      {
        next: (data: any) => {
          try {
            this.convertStoresObjectToMap(data.data?.properties);
            // console.log(this.stores);
          } catch (ex) {
            console.log(ex);
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          SwalService.swalToast('Ups! ocurrió un error a querer cargar las tiendas', 'error');
          this.isLoading = false;
        }
      }
    );
  }
  ngAfterViewInit(): void {
    this.createMap();
  }

  convertStoresObjectToMap(obj: any, saveLocal = true): void {
    for (let store in obj) {
      const mapAux1 = new Map();
      for (let city in obj[store]) {
        const mapAux2 = new Map();
        if (saveLocal) {
          this.cities.set(city, 'city');
        }
        for (let stores of obj[store][city]) {
          mapAux2.set(stores.name, stores);
        }
        mapAux1.set(city, mapAux2);
      }
      this.stores.set(store, mapAux1);
    }
    if (saveLocal) {
      this.storage.setItemLocalStorage(this.keyEncryptStore, obj);
      this.storesFilter = new Map(this.stores);
    }
  }

  filterForCity(city): void {
    console.log({ city });
    if (city.value == 'all') {
      this.stores = new Map(this.storesFilter);
      return;
    }
    this.storesFilter.forEach((_stores: any, key_company) => {
        this.stores.set(key_company, _stores.has(city.value) ? new Map([[city.value, _stores.get(city.value)]]): []);
        console.log(this.stores);
    }
    );
  }
  getViewImageToMapCompany($event: MatButtonToggleChange): void {
    const { value } = $event;
    this.storeInMap.forEach(store => {
      store.remove();
    })
    this.storeInMap = [];
    this.stores.get(value).forEach((cityWithStores: any) => {
      console.log({ cityWithStores });
      cityWithStores.forEach((store: any) => {
        console.log({ store });
        const el = document.createElement('div');
        el.className = 'marker-' + value.replaceAll(' ', '-');
        el.innerHTML = store.name;
        this.storeInMap.push(el);
        new mapboxgl.Marker(el).setLngLat([store.longitude, store.latitude]).addTo(this.map);
      }
      );
    })
    // if (value) {
    //   this.map.setStyle('mapbox://styles/mapbox/streets-v11');
    // } else {
    //   this.map.setStyle('mapbox://styles/mapbox/satellite-v9');
    // }
  }

  createMap(lon = 0, lat = 0): void {
    mapboxgl.accessToken = environment.mapbox_key;
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.02474380973959, -1.100522422816233],
      zoom: 6,
    });

    this.map.resize();
    this.map.addControl(new mapboxgl.NavigationControl());
    // this.marker = new mapboxgl.Marker({
    //   draggable: true,
    // })
    //   .setLngLat([lon, lat])
    //   .addTo(this.map);
    // const drag = () => {
    //   var lngLat = this.marker.getLngLat();
    //   this.coordinate.latitud = lngLat.lat;
    //   this.coordinate.longitud = lngLat.lng;
    //   this.formLocation.get('latitude').setValue(this.coordinate.latitud);
    //   this.formLocation.get('longitude').setValue(this.coordinate.longitud);
    // };
    // this.marker.on('dragend', drag);
  }

  modifyStore(company: string, isCreateCity: boolean, city: any = null, isEdit: boolean = false, nameStore: string = null): void {
    const title = `${company} ${isCreateCity ? '' : '- ' + city} - ${!isEdit ? 'Crear' : 'Editar'} ${!isCreateCity ? 'Store' : 'Ciudad'}`;
    let data = null;
    if (isEdit) {
      data = this.stores.get(company).get(city).get(name); // [company][city][name];
      console.log(data);
    }
    const dialogRef = this.dialog.open(ModificateStoresComponent, {
      width: '500px',
      data: { title, isCreateCity, isEdit, data }
    }).beforeClosed().subscribe({
      next: (data: any) => {
        if (data) {
          const { city_name, name, address, latitude, longitude, phone, schedules, mba_code } = data
          if (isCreateCity) {
            const newStore = new Map([[data.name, { name, address, latitude, longitude, phone, schedules, mba_code }]]);
            this.stores.get(company).set(city_name, newStore);
            console.log(this.stores);
          } else if (!isEdit) {
            this.stores.get(company).get(city).set(name, { name, address, latitude, longitude, phone, schedules, mba_code });
            console.log(this.stores);
          } else if (isEdit) {
            this.stores.get(company).get(city).set(nameStore, { name: nameStore, address, latitude, longitude, phone, schedules, mba_code }); //[city][name] = data;
          }
        }
      }
    });
  }

  removeStore(company: string, city: string, name: string): void {
    this.stores.get(company).get(city).delete(name);
    console.log(this.stores);
  }

  generateSchemasJson(): any {
    let jsonSchemas = {};
    this.stores.forEach((company, companyName) => {
      jsonSchemas[companyName] = {};
      company.forEach((city, cityName) => {
        jsonSchemas[companyName][cityName] = Array.from(city.values());
      });
    })
    // console.log(jsonSchemas);
    return jsonSchemas;
  }

  saveInServer() {
    this.isLoading = true;
    const jsonSchemas = jsonStores; // this.generateSchemasJson();
    const url = 'company/stores/vtex';
    this.methodHttp.methodPost(url, jsonSchemas).subscribe(
      {
        next: (data: any) => {
          if (data?.success) {
            SwalService.swalToast('Se guardaron los cambios', 'success');
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          SwalService.swalToast('Error al guardar los cambios', 'error');
          this.isLoading = false;
        }
      }
    );
  }

}

const jsonStores = {
  "novicompu": {
    "Quito": [
      {
        "name": "NOVICOMPU CC EL RECREO 2",
        "address": "C.C. RECREO PEDRO VICENTE MALDONADO MALADONADO S10-194 CALVAS JUNTO AMERICA CLASICC",
        "latitude": "-0.17619224304857",
        "longitude": "-78.485994106908",
        "phone": "0992710784",
        "schedules": "Lunes a Sábado de 10:00 a 20:00\nDomingo: de 10:00 a 19:00",
        "mba_code": "057"
      },
      {
        "name": "NOVICOMPU AV. REPUBLICA",
        "address": "AV REPUBLICA N36-148 Y AV AMERICA ESQUINA",
        "latitude": "-0.17530037537981",
        "longitude": "-78.493287497234",
        "phone": "0998624681",
        "schedules": "Lunes a Sábado de 08:30 a 19:30\nDomingo: de 09:30 a 17:00",
        "mba_code": "060"
      },
      {
        "name": "NOVICOMPU SHYRIS Y RIO COCA",
        "address": "AV LOS SHYRIS N44-26 AV RIO COCA LOCAL 6 A UNA CUADRA DE POLLOS DE LA KENNEDY.",
        "latitude": "-0.16267271723403248",
        "longitude": "-78.47825183505606",
        "phone": "0984147799",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 09:30 a 17:00",
        "mba_code": "PRI"
      },
      {
        "name": "NOVICOMPU NACIONES UNIDAS",
        "address": "AV. NACIONES UNIDAS Y SHYRIS PB (JUNTO A BCO BOLIVARIANO)",
        "latitude": "-0.17585234749667",
        "longitude": "-78.48272567553",
        "phone": "0992822369",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 09:30 a 17:00",
        "mba_code": "006"
      },
      {
        "name": "NOVICOMPU CC RECREO",
        "address": "C.C. EL RECREO: PEDRO VICENTE MALDONADO S11-122 EL RECREO K15",
        "latitude": "-0.17619224304857",
        "longitude": "-78.485994106908",
        "phone": "0993530880",
        "schedules": "Lunes a Sábado de 10:00 a 20:00\nDomingo: de 10:00 a 19:00",
        "mba_code": "005"
      },
      {
        "name": "NOVICOMPU AV 6 DE DICIEMBRE",
        "address": "AV 06 DE DICIEMBRE Y COLON LT 2016 N26 BATALLAS ESQ LOCAL 3",
        "latitude": "-0.20132822193942",
        "longitude": "-78.485614722888",
        "phone": "0995450561",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 10:00 a 16:00",
        "mba_code": "037"
      },
      {
        "name": "NOVICOMPU AV. DEL MAESTRO",
        "address": "AV MAESTRO OE4-202 QUITUMBE",
        "latitude": "-0.12267393778783",
        "longitude": "-78.492179413769",
        "phone": "0984775228",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 10:00 a 16:00",
        "mba_code": "038"
      },
      {
        "name": "NOVICOMPU CARACOL",
        "address": "C.C. CARACOL: AV AMAZONAS Y AV NNUU LOCAL 108 (FRENTE AL CC IÑAQUITO)",
        "latitude": "-0.17624900766304",
        "longitude": "-78.486019062303",
        "phone": "0958882380",
        "schedules": "Lunes a Sábado de 10:00 a 19:30\nDomingo: de 10:00 a 18:00",
        "mba_code": "002"
      },
      {
        "name": "NOVICOMPU EL BOSQUE",
        "address": "ALONSO DE TORRES N44 -98  Y EDMUNDO CARVAJAL DIAGONAL AL C.C EL BOSQUE",
        "latitude": "-0.16078605558042",
        "longitude": "-78.496687809342",
        "phone": "0991864043",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 09:30 a 17:00",
        "mba_code": "063"
      },
      {
        "name": "NOVICOMPU CALDERON",
        "address": "9 DE AGOSTO Y LIZARDO BECERRA, DIAGONAL AL DILIPA",
        "latitude": "-0.099724063787827",
        "longitude": "-78.422512672269",
        "phone": "0998316897",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 10:00 a 17:00",
        "mba_code": "079"
      },
      {
        "name": "NOVICOMPU VALLE DE LOS CHILLOS",
        "address": "RUMIÑAHUI E ISLA MARCHANA SECTOR SAN RAFAEL. JUNTO A LA GASOLINERA TERPEL",
        "latitude": "-0.30287749923222484",
        "longitude": "-78.45554179156471",
        "phone": "0989453656",
        "schedules": "Lunes a Viernes de 09:00 a 19:00\nSábado:  09:00 A 18:00\nDomingo: de 10:00 a 16:00",
        "mba_code": "080"
      },
      {
        "name": "NOVICOMPU CALDERON 2",
        "address": "CALLE CARAPUNGO OE4-173 Y PANAMERICANA NORTE, VIA PRINCIPAL CALDERON",
        "latitude": "-0.10193237265027",
        "longitude": "-78.422745652828",
        "phone": "0939750382",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 10:00 a 17:00",
        "mba_code": "083"
      },
      {
        "name": "NOVICOMPU SANGOLQUI",
        "address": "AV. GRAL ENRIQUEZ #2814 SECTOR REDONDEL RIVER MALL",
        "latitude": "-0.32381382205438",
        "longitude": "-78.448321737913",
        "phone": "0992936202",
        "schedules": "Lunes a Sábado de 08:30 a 18:30\nDomingo: de 10:00 a 16:00",
        "mba_code": "086"
      }
    ],
    "Guayaquil": [
      {
        "name": "NOVICOMPU URDESA Y ÉBANOS",
        "address": "AV. VICTOR EMILIO ESTRADA N. 431 Y ÉBANOS",
        "latitude": "-2.17123903958",
        "longitude": "-79.908912708372",
        "phone": "0963850526",
        "schedules": "Lunes a Sábado de 09:00 a 19:30\nDomingo: de 10:00 a 17:00",
        "mba_code": "042"
      },
      {
        "name": "NOVICOMPU 9 DE OCTUBRE Y RUMICHACA",
        "address": "EDIF KFC: 09 DE OCTUBRE 910 Y RUMICHACA JUNTO A EDIF MILITARES",
        "latitude": "-2.1900706886559",
        "longitude": "-79.88635402297",
        "phone": "0981402235",
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \nDomingo: de 09:00 a 16:00",
        "mba_code": "019"
      },
      {
        "name": "HIPER NOVICOMPU",
        "address": "KENNEDY NORTE AV. FRANCISCO DE ORELLANA N.30 Y NAHIN ISAIAS  MZ 71 (ALADO DE LA PARRILLADA DEL ÑATO)",
        "latitude": "-2.1609202990807",
        "longitude": "-79.899188354373",
        "phone": "0981522266",
        "schedules": "Lunes a Sábado de 08:30 a 19:30 \nDomingo: de 10:00 a 17:00",
        "mba_code": "032"
      },
      {
        "name": "NOVICOMPU 9 DE OCTUBRE Y ESCOBEDO",
        "address": "9 DE OCTUBRE 515 Y ESCOBEDO LOCAL 2B",
        "latitude": "-2.1913782448514",
        "longitude": "-79.883105672053",
        "phone": "0996333117",
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \nDomingo: de 09:00 a 16:00",
        "mba_code": "048"
      },
      {
        "name": "NOVICOMPU FRANCISCO DE ORELLANA",
        "address": "CIUDADELA KENNEDY NORTE AV. FRANCISCO ORELLANA SOLAR 5 Y EUGENIO ALMAZAN (JUNTO A JUAN MARCET)",
        "latitude": "-2.1670162905976",
        "longitude": "-79.895529374903",
        "phone": "0992312276",
        "schedules": "Lunes a Sábado de 08:30 a 19:30 \nDomingo: de 10:00 a 17:00",
        "mba_code": "018"
      },
      {
        "name": "NOVICOMPU CITY MALL",
        "address": "C.C. CITY MALL: FELIPE PESO S/N BENJAMIN CARRION LOCAL 5",
        "latitude": "-2.1412708301513",
        "longitude": "-79.909282095041",
        "phone": "0996532582",
        "schedules": "Lunes a Sábado de 10:00 a 21:00 \nDomingo: de 10:00 a 20:00",
        "mba_code": "008"
      },
      {
        "name": "NOVICOMPU MALL DEL SUR",
        "address": "C.C. MALL DEL SUR: AV 25 DE JULIO JOSE DE LA CUADRA LOCAL 26",
        "latitude": "-2.2282338602267",
        "longitude": "-79.898456614217",
        "phone": "0968973409",
        "schedules": "Lunes a Sábado de 10:00 a 21:00\nDomingo: de 10:00 a 20:00",
        "mba_code": "013"
      },
      {
        "name": "NOVICOMPU URDESA 2",
        "address": "VICTOR EMILIO ESTRADA 612A MONJAS Y FICUS JUNTO A PHARMACYS",
        "latitude": "-2.1688102526971",
        "longitude": "-79.910134377286",
        "phone": "0978971096",
        "schedules": "Lunes a Sábado de 09:00 a 19:30\nDomingo: de 10:00 a 17:00",
        "mba_code": "034"
      }
    ],
    "Ambato": [
      {
        "name": "NOVICOMPU AMBATO 2",
        "address": "AV. PEDRO FERMIN CEVALLOS Y JOAQUIN AYLLON",
        "latitude": "-1.2382287796552",
        "longitude": "-78.623315794923",
        "phone": "0984861330",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \nDomingo: de 09:30 a 15:00",
        "mba_code": "069"
      },
      {
        "name": "NOVICOMPU AMBATO",
        "address": "LALAMA O8-59 ENTRE LAS CALLES JUAN BENIGNO VELA Y AV CEVALLOS",
        "latitude": "-1.2382360818081",
        "longitude": "-78.623314010304",
        "phone": "0958807681",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo:Cerrado",
        "mba_code": "012"
      }
    ],
    "Loja": [
      {
        "name": "NOVICOMPU LOJA",
        "address": "BOLIVAR Y ROCAFUERTE ESQ. LOCAL #0942 - PORTAL DEL PARQUE STO DOMINGO",
        "latitude": "-3.9985589813124",
        "longitude": "-79.201925735517",
        "phone": "0967635895",
        "schedules": "Lunes a Sábado de 10:00 a 20:00\nDomingo: Cerrado",
        "mba_code": "028"
      }
    ],
    "Machala": [
      {
        "name": "NOVICOMPU BUENAVISTA",
        "address": "BUENAVISTA ENTRE BOLIVAR Y ROCAFUERTE DIAGONAL AL COMERCIO",
        "latitude": "-3.2629681483449",
        "longitude": "-79.955931347275",
        "phone": "0939023278",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 10:00 a 15:00",
        "mba_code": "076"
      },
      {
        "name": "NOVICOMPU MACHALA",
        "address": "ROCAFUERTE ENTRE GUAYAS Y AYACUCHO, JUNTO A CORTE DE JUSTICIA",
        "latitude": "-3.2583470338946",
        "longitude": "-79.960828321781",
        "phone": "0985220448",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 10:00 a 15:00",
        "mba_code": "059"
      }
    ],
    "Santo Domingo de los Tsachilas": [
      {
        "name": "NOVICOMPU SANTO DOMINGO",
        "address": "Av. Quito 1308 y Abraham Calazacom",
        "latitude": "-0.25029223958332",
        "longitude": "-79.16288364831",
        "phone": "0985522539",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 10:00 a 17:00",
        "mba_code": "022"
      }
    ],
    "Quevedo": [
      {
        "name": "NOVICOMPU QUEVEDO",
        "address": "CALLE 7 DE OCTUBRE Y 4TA ESQUINA BCO INTERNACIONAL",
        "latitude": "-1.0231731417004",
        "longitude": "-79.466178860293",
        "phone": "0982328203",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 09:00 a 15:00",
        "mba_code": "029"
      }
    ],
    "Portoviejo": [
      {
        "name": "NOVICOMPU PORTOVIEJO 2",
        "address": "AV MANABI ENTRE PIO MONTUFAR Y ATAHUALPA (DIAGONAL QILONG COMIDAS CHINAS)",
        "latitude": "-1.0538875811479",
        "longitude": "-80.458492901431",
        "phone": "0994464564",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 09:00 a 15:00",
        "mba_code": "055"
      },
      {
        "name": "NOVICOMPU PORTOVIEJO",
        "address": "PORTOVIEJO: PEDRO GUAL 921 Y GARCIA MORENO EDIF ALVERTO GILER DIAGONAL A ORVE HOGAR",
        "latitude": "-1.0574432081303347",
        "longitude": "-80.45500643922819",
        "phone": "0983657452",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 09:00 a 15:00",
        "mba_code": "011"
      }
    ],
    "Babahoyo": [
      {
        "name": "NOVICOMPU BABAHOYO",
        "address": "AV 5 DE JUNIO SN JUAN MONTALVO",
        "latitude": "-1.7981760617864",
        "longitude": "-79.528744436175",
        "phone": "0989269395",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \nDomingo: de 09:00 a 16:00",
        "mba_code": "064"
      }
    ],
    "Riobamba": [
      {
        "name": "NOVICOMPU RIOBAMBA",
        "address": "PRIMERA CONSTITUYENTE 26-25 GARCIA MORENO FRENTE BCO GYE",
        "latitude": "-1.6706786480247",
        "longitude": "-78.6513180388",
        "phone": "0962971217",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 09:00 a 16:00",
        "mba_code": "030"
      },
      {
        "name": "NOVICOMPU RIOBAMBA 2",
        "address": "AV UNIDAD NACIONAL Y CARABOBO 2915",
        "latitude": "-1.6657431842868442",
        "longitude": "-78.64970408582633",
        "phone": "0988476570",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo:Cerrado",
        "mba_code": "077"
      }
    ],
    "Manta": [
      {
        "name": "NOVICOMPU MANTA",
        "address": "Manta calle TRECE SN avenida 12/13",
        "latitude": "-0.94741243614193",
        "longitude": "-80.725730816936",
        "phone": "0983894066",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 09:00 a 15:00",
        "mba_code": "035"
      },
      {
        "name": "NOVICOMPU MANTA 2",
        "address": "MANTA CALLE AV 2 #1175 JUNTO AL BCO PICHINCHA",
        "latitude": "-0.94633669261902",
        "longitude": "-80.723060853393",
        "phone": "0963380724",
        "schedules": "Lunes a Viernes de 08:00 a 18:00\nSábado: 08:00 A 16:00\nDomingo: Cerrado",
        "mba_code": "067"
      }
    ],
    "Milagro": [
      {
        "name": "NOVICOMPU MILAGRO",
        "address": "AV GABRIEL GARCIA MORENO Y GRAL ELOY ALFARO JUNTO ARTEFACTA",
        "latitude": "-2.1283617041205",
        "longitude": "-79.589916083042",
        "phone": "0989312111",
        "schedules": "Lunes a Sábado de 08:30 a 18:30\nDomingo: de 10:00 a 16:00",
        "mba_code": "058"
      },
      {
        "name": "NOVICOMPU MILAGRO 2",
        "address": "GARCIA MORENO ENTRE 12 DE FEBRERO Y ROCAFUERTE JUNTO A COMPUTRON",
        "latitude": "-2.1277142980568",
        "longitude": "-79.591881532491",
        "phone": "0986410261",
        "schedules": "Lunes a Sábado de 09:00 a 19:00\nDomingo: de 09:00 a 17:00",
        "mba_code": "068"
      }
    ],
    "Ibarra": [
      {
        "name": "NOVICOMPU IBARRA",
        "address": "BOLIVAR 10-90 PEREZ GUERRERO",
        "latitude": "0.34636036857112",
        "longitude": "-78.119236415907",
        "phone": "0985230763",
        "schedules": "Lunes a Sábado de 09:00 a 19:30\nDomingo:Cerrado",
        "mba_code": "065"
      }
    ],
    "Esmeraldas": [
      {
        "name": "NOVICOMPU ESMERALDAS",
        "address": "ROCAFUERTE M44 SL7 AV. SUCRE ESQ CENTRO DE CIUDAD.",
        "latitude": "0.96806935226207",
        "longitude": "-79.653047458312",
        "phone": "0959204511",
        "schedules": "Lunes a Sábado de 09:00 a 18:30 \nDomingo: Cerrado",
        "mba_code": "071"
      }
    ],
    "Cuenca": [
      {
        "name": "NOVICOMPU CUENCA 2",
        "address": "C.C. MALL DEL RIO FELIPE II Y CIRCUNVALACIÓN SUR  PLANTA BAJA LOCAL C 5-6-7-8-9-10",
        "latitude": "-2.9184839356615",
        "longitude": "-79.014465953267",
        "phone": "0978998885",
        "schedules": "Lunes a Jueves de 10:00 A 20:00 \nViernes y Sábados de 10:00 A 21:00\nDomingo: de 10:00 a 20:00",
        "mba_code": "061"
      },
      {
        "name": "NOVICOMPU CUENCA",
        "address": "C.C. MALL DEL RIO AV FELIPE CIRCUNVALACIÓN SUR PLANTA BAJA LOCAL S3",
        "latitude": "-2.918502686772",
        "longitude": "-79.01446394161",
        "phone": "0962962290",
        "schedules": "Lunes a Jueves de 10:00 A 20:00 \nViernes y Sábados de 10:00 A 21:00\n Domingo: de 10:00 a 20:00",
        "mba_code": "021"
      }
    ],
    "Naranjal": [
      {
        "name": "NOVICOMPU NARANJAL",
        "address": "CALLE GUAYAQUIL SN DR EUGENIO ESPEJO",
        "latitude": "-2.6748268277451",
        "longitude": "-79.618693695327",
        "phone": "0963814774",
        "schedules": "Lunes a Sábado de 09:00 a 18:30\nDomingo:Cerrado",
        "mba_code": "075"
      }
    ],
    "Chone": [
      {
        "name": "NOVICOMPU CHONE",
        "address": "CALLE ROCAFUERTE ENTRE COLON Y PICHINCHA JUNTO AL UPC",
        "latitude": "-0.69837683307794",
        "longitude": "-80.093606770205",
        "phone": "0967077909",
        "schedules": "Lunes a Viernes de 09:00 a 18:00 \nSábado: 09:00 A 17:00 \nDomingo: Cerrado",
        "mba_code": "078"
      }
    ],
    "Tena": [
      {
        "name": "NOVICOMPU TENA",
        "address": "AV. 15 DE NOVIEMBRE Y 9 DE OCTUBRE. (FARMACIAS ECONÓMICAS BELLAVISTA FRENTE AL PUENTE PAETONAL) TENA -NAPO.",
        "latitude": null,
        "longitude": null,
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \\nDomingo: de 10:00 a 15:00 \\n",
        "phone": "0999165907",
        "city": {
          "name": "Tena",
          "code": "TN",
          "country_id": 1
        }
      }
    ],
    "La Libertad": [
      {
        "name": "NOVICOMPU LA LIBERTAD",
        "address": "Av. 9 de Octubre y calle Guayaquil",
        "latitude": "-2.2216509176902",
        "longitude": "-80.910259413895",
        "phone": "0959924317",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo: de 10:00 a 15:00",
        "mba_code": "082"
      }
    ],
    "Latacunga": [
      {
        "name": "NOVICOMPU LATACUNGA",
        "address": "JUAN ABEL ECHEVERRIA Y QUITO.",
        "latitude": "-0.93096919020088",
        "longitude": "-78.615756107718",
        "phone": "0987933475",
        "schedules": "Lunes a Sábado de 08:30 a 19:00\nDomingo:Cerrado",
        "mba_code": "087"
      }
    ]
  },
  "ganacell": {
    "Quito": [
      {
        "name": "GANACELL RIO COCA",
        "address": "AV RIO COCA N44-26 AV LOS SHIRYS  JUNTO A NOVITECNOLOGIA",
        "latitude": "-0.16266219022006428",
        "longitude": "-78.47825152472022",
        "phone": "NULL",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\n Domingo : Cerrado",
        "mba_code": "040"
      }
    ],
    "Guayaquil": [
      {
        "name": "GANACELL LA ROTONDA",
        "address": "C.C. LA ROTONDA AV BENJAMIN CARRION MORA LOCAL 27 JUNTO A DE PRATI",
        "latitude": "-2.1388698908975132",
        "longitude": "-79.90808609939543",
        "phone": "null",
        "schedules": "Lunes a Viernes de 10:00 a 20:00 \\n Domingo de 11:00 a 20:00",
        "mba_code": "054"
      }
    ],
    "Manta": [
      {
        "name": "GANACELL MANDA",
        "address": "CALLE 13 AV 17 A LADO DE LA FARMACIA DANILO FRENTA A NOVICOMPU",
        "latitude": "-0.9473005871628258",
        "longitude": "-80.72577333202415",
        "phone": "NULL",
        "schedules": "Lunes a Viernes 09:00 a 19:00 \\n Domingo 09:00 a 15:00",
        "mba_code": "045"
      }
    ],
    "Portoviejo": [
      {
        "name": "GANACELL PORTOVIEJO",
        "address": "AVENIDA MANABI Y CALLE QUITO",
        "latitude": "-1.0542529238598577",
        "longitude": "-80.45768756137316",
        "phone": "null",
        "schedules": "Lunes a Sábado 09:00 a 19:00  /n Domingo de 09:00 a 15:00",
        "mba_code": "047"
      }
    ],
    "Machala": [
      {
        "name": "GANACELL MACHALA",
        "address": "CC ORO PLAZA: AV 25 DE JUNIO CIUDAD VERDE KM25 SEGUNDA PLANTA LOCAL #230 GANACELL",
        "latitude": "32",
        "longitude": "4567",
        "phone": "null",
        "schedules": "Lunes a Sábado 09:00 a 19:00 \\n Domingo 10:00 a 15:00",
        "mba_code": "015"
      }
    ],
    "Santo domingo": [
      {
        "name": "GANACELL SANTO DOMINGO",
        "address": "24 DE MAYO AV 29 DE MAYO COCANIGUAS FRENTE A IMPRENTA STO DOMINGO",
        "latitude": "-0.25394055618534406",
        "longitude": "-79.16710770580079",
        "phone": "1548",
        "schedules": "Lunes a Viernes de 09:00 a 19:00 \\n Domingo: Cerrado",
        "mba_code": "052"
      }
    ],
    "Cuenca": [
      {
        "name": "GANACEL CUENCA",
        "address": "AV FRAY VICENTE SOLANO EDIFICIO CICA LOCAL 5",
        "latitude": "-2.9062148457136003",
        "longitude": "-79.0068937660938",
        "phone": "null",
        "schedules": "Lunes a Sabado de 08:30 a 18:30 \\n Domingo: Cerrado",
        "mba_code": "049"
      }
    ]
  },
  "importadora novoa": {
    "Guayaquil": [
      {
        "name": "IMPORTADORA CITY MALL",
        "address": "C.C. CITY MALL FELIPE PESO Y BENJAMIN CARRION LOCAL 104-105",
        "latitude": "-2.140930143359273",
        "longitude": "-79.90943863628449",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t10:00 a 21:00\t\n Domingo de 10:00 a 20:00",
        "mba_code": "062"
      }
    ],
    "Portoviejo": [
      {
        "name": "IMPORTADORA PORTOVIEJO",
        "address": "AV MANABI Y CALLE QUITO FRENTE COMERCIAL FATIMA",
        "latitude": "-1.054075328543568",
        "longitude": "-80.45761315401474",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t09:00 a 19:00\t\n Domingo de 10:00 a 15:00",
        "mba_code": "056"
      }
    ],
    "Manta": [
      {
        "name": "IMPORTADORA MANTA",
        "address": "MANTA: CALLE AV TRECE ENTRE AV 12 y 13 ( FRENTE LICORERIA LOPEZ)",
        "latitude": "-0.9474245636900083",
        "longitude": "-80.72573955001081",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t09:00 a 19:00\t\n Domingo de 10:00 a 15:00",
        "mba_code": "045"
      }
    ],
    "Quito": [
      {
        "name": "IMPORTADORA RECREO",
        "address": "C.C. EL RECREO: PEDRO VICENTE MALDONADO S11-122 EL RECREO LOCAL A50 ETAPA 1",
        "latitude": "-0.25229754830931567",
        "longitude": "-78.5228991817609",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t10:00 a 20:00\t\n Domingo 10:00 a 19:00",
        "mba_code": "070"
      }
    ],
    "Babahoyo": [
      {
        "name": "IMPORTADORA BABAHOYO",
        "address": "AV 5 DE JUNIO CALDERON ABDON REFERENCIA FRENTE A LA CORTE PROVINCIAL",
        "latitude": "-1.7990911519800026",
        "longitude": "-79.5307926711615",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t08:30 a 19:00\t\n Domingo 09:00 a 15:00",
        "mba_code": "072"
      }
    ],
    "Machala": [
      {
        "name": "IMPORTADORA MACHALA",
        "address": "PAEZ SN Y AV ROCAFUERTE ESQ JUNTO A COMANDATO",
        "latitude": "-3.2578530419325826",
        "longitude": "-79.95518182169647",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t09:00 a 19:00\t\n Domingo 10:00 a 15:00",
        "mba_code": "036"
      }
    ],
    "La Libertad": [
      {
        "name": "IMPORTADORA LA LIBERTAD",
        "address": "Calle 21 Edmundo diagonal a la AV 2DA A",
        "latitude": "-2.2217183146814223",
        "longitude": "-80.90935302495089",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t08:30 a 19:00\t\n Domingo 10:00 a 15:00",
        "mba_code": "066"
      }
    ],
    "Santo Domingo": [
      {
        "name": "IMPORTADORA STO DOMINGO",
        "address": "URB HNOS GUERRERO 1 SL 105 MZ 132",
        "latitude": "-1.2403724779510554",
        "longitude": "-78.62916884523472",
        "phone": "null",
        "schedules": "Lunes a Sábado de\t09:00 a 19:00\t\n Domingo :CERRADO",
        "mba_code": "073"
      }
    ]
  }
}
