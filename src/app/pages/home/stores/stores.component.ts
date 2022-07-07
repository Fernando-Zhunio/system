import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { MethodsHttpService } from '../../../services/methods-http.service';
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
  constructor(private methodHttp: MethodsHttpService, private dialog: MatDialog) { }
  map: any;
  stores = new Map();
  ngOnInit() {
    // this.getStores();
  }

  getStores() {
    const url = 'company/stores/vtex';
    this.methodHttp.methodGet(url).subscribe(
      {
        next: (data: any) => {
          try {
            for (let store in data.data?.properties) {
              const mapAux1 = new Map();
              for (let city in data.data?.properties[store]) {
                const mapAux2 = new Map();
                for (let stores of data.data?.properties[store][city]) {
                  mapAux2.set(stores.name, stores);
                  // this.map.on('load', () => {
                  //   this.map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
                  //     if (error) {
                  //       console.log(error);
                  //       return;
                  //     }
                  //     this.map.addImage('custom-marker', image);
                  //     this.map.addSource('points', {
                  //       'type': 'geojson',
                  //       'data': {
                  //         'type': 'FeatureCollection',
                  //         'features':  [
                  //           {
                  //             // feature for Mapbox DC
                  //             'type': 'Feature',
                  //             'geometry': {
                  //               'type': 'Point',
                  //               'coordinates': [
                  //                 -77.03238901390978, 38.913188059745586
                  //               ]
                  //             },
                  //             'properties': {
                  //               'title': 'Mapbox DC'
                  //             }
                  //           },
                  //           {
                  //             // feature for Mapbox SF
                  //             'type': 'Feature',
                  //             'geometry': {
                  //               'type': 'Point',
                  //               'coordinates': [-122.414, 37.776]
                  //             },
                  //             'properties': {
                  //               'title': 'Mapbox SF'
                  //             }
                  //           }
                  //         ]
                  //       }
                  //     });
                  //     this.map.addLayer({
                  //       'id': 'points',
                  //       'type': 'symbol',
                  //       'source': 'points',
                  //       'layout': {
                  //       'icon-image': 'custom-marker',
                  //       // get the title name from the source's "title" property
                  //       'text-field': ['get', 'title'],
                  //       'text-font': [
                  //       'Open Sans Semibold',
                  //       'Arial Unicode MS Bold'
                  //       ],
                  //       'text-offset': [0, 1.25],
                  //       'text-anchor': 'top'
                  //       }
                  //       });
                  //   })
                  // });
                  const el = document.createElement('div');
                  el.className = 'marker-'+store;
                 new mapboxgl.Marker(el).setLngLat([stores.longitude, stores.latitude]).addTo(this.map);
                }
                mapAux1.set(city, mapAux2);
              }
              this.stores.set(store, mapAux1);
            }

            // console.log(Object.fromEntries(this.stores));
            // console.log(this.stores);
            // this.map.on('load', () => {
            //   this.stores.forEach((value: Map<string, Map<any, any>>, key) => {
            //     this.map.loadImage('https://novicompu.myvtex.com/arquivos/favicon.ico'/* 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png' */, (error, image) => {
            //       if (error) {
            //         console.log({error});
            //         return;
            //       }
            //       this.map.addImage('custom-marker', image);
            //       const features = [];
            //       value.forEach((map2value: Map<string,any>, map2Key) => {
            //         map2value.forEach((store, storeName) => {
            //           features.push({
            //             'type': 'Feature',
            //             'geometry': {
            //               'type': 'Point',
            //               'coordinates': [store.longitude, store.latitude]
            //             },
            //             'properties': {
            //               'title': store.name
            //             }
            //           });
            //         })});
            //       console.log({features});
            //       this.map.addSource('points', {
            //         'type': 'geojson',
            //         'data': {
            //           'type': 'FeatureCollection',
            //           'features': features
            //         }
            //       });
            //       this.map.addLayer({
            //         'id': 'points',
            //         'type': 'symbol',
            //         'source': 'points',
            //         'layout': {
            //         'icon-image': 'custom-marker',
            //         'text-field': ['get', 'title'],
            //         'text-font': [
            //         'Open Sans Semibold',
            //         'Arial Unicode MS Bold'
            //         ],
            //         'text-offset': [0, 1.25],
            //         'text-anchor': 'top'
            //         }
            //         });
            //     })
            //   })
            // });
          } catch (ex) {
            console.log(ex);
          }

        }
      }
    );
  }
  ngAfterViewInit(): void {
    this.createMap();
    this.getStores();
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
      data = this.stores.get(company).get(city).get(nameStore); // [company][city][nameStore];
      console.log(data);
    }
    const dialogRef = this.dialog.open(ModificateStoresComponent, {
      width: '500px',
      data: { title, isCreateCity, isEdit, data }
    }).beforeClosed().subscribe({
      next: (data: any) => {
        if (data) {
          const { city_name, name, address, latitude, longitude, phone, schedules } = data
          if (isCreateCity) {
            const newStore = new Map([[data.name, { name, address, latitude, longitude, phone, schedules }]]);
            // const newCity = new Map([[city_name, newStore]]);
            // this.stores.set(company, new Map());
            this.stores.get(company).set(city_name, newStore);
            console.log(this.stores);
          } else if (!isEdit) {
            this.stores.get(company).get(city).set(name, { name, address, latitude, longitude, phone, schedules });
            console.log(this.stores);
          } else if (isEdit) {
            this.stores.get(company).get(city).set(nameStore, { nameStore, address, latitude, longitude, phone, schedules }); //[city][name] = data;
          }
          // else {
          //   this.stores[company][city][data.name] = data;
          // }
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
    // jsonSchemas = Object.fromEntries(this.stores);
    this.stores.forEach((company, companyName) => {
      jsonSchemas[companyName] = {};
      company.forEach((city, cityName) => {
        jsonSchemas[companyName][cityName] = Array.from(city.values());
        // city.forEach((store, storeName) => {
        //   // console.log(`${companyName} ${cityName} ${storeName}`);
        //   jsonSchemas[companyName][cityName] = {};
        // });
      });
    })
    console.log(jsonSchemas);
    return jsonSchemas;
  }

  saveInServer() {
    const jsonSchemas = this.generateSchemasJson();
    const url = 'company/stores/vtex';
    this.methodHttp.methodPost(url, jsonSchemas).subscribe(
      {
        next: (data: any) => {
          if (data?.success) {
            SwalService.swalToast('Se guardaron los cambios', 'success');
          }
        }
      }
    );
  }

}

const jsonStores =
{
  "novicompu": {
    "Quito": [
      {
        "name": "NOVICOMPU CC EL RECREO 2",
        "address": "C.C. RECREO PEDRO VICENTE MALDONADO MALADONADO S10-194 CALVAS JUNTO AMERICA CLASICC",
        "latitude": "-0.17619224304857",
        "longitude": "-78.485994106908",
        "schedules": "Lunes a Sábado de 10:00 a 20:00 \\nDomingo: de 10:00 a 19:00 \\n",
        "phone": "0992710784"
      },
      {
        "name": "NOVICOMPU AV. REPUBLICA",
        "address": "AV REPUBLICA N36-148 Y AV AMERICA ESQUINA",
        "latitude": "-0.17530037537981",
        "longitude": "-78.493287497234",
        "schedules": "Lunes a Sábado de 08:30 a 19:30 \\nDomingo: de 09:30 a 17:00 \\n",
        "phone": "0998624681"
      },
      {
        "name": "NOVICOMPU SHYRIS Y RIO COCA",
        "address": "AV LOS SHYRIS N44-26 AV RIO COCA LOCAL 6 A UNA CUADRA DE POLLOS DE LA KENNEDY.",
        "latitude": null,
        "longitude": null,
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 09:30 a 17:00 \\n",
        "phone": "0984147799"
      },
      {
        "name": "NOVICOMPU NACIONES UNIDAS",
        "address": "AV. NACIONES UNIDAS Y SHYRIS PB (JUNTO A BCO BOLIVARIANO)",
        "latitude": "-0.17585234749667",
        "longitude": "-78.48272567553",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 09:30 a 17:00 \\n",
        "phone": "0992822369"
      },
      {
        "name": "NOVICOMPU CC RECREO",
        "address": "C.C. EL RECREO: PEDRO VICENTE MALDONADO S11-122 EL RECREO K15",
        "latitude": null,
        "longitude": "-78.486023807073",
        "schedules": "Lunes a Sábado de 10:00 a 20:00 \\nDomingo: de 10:00 a 19:00 \\n",
        "phone": "0993530880"
      },
      {
        "name": "NOVICOMPU AV 6 DE DICIEMBRE",
        "address": "AV 06 DE DICIEMBRE Y COLON LT 2016 N26 BATALLAS ESQ LOCAL 3 ",
        "latitude": "-0.20132822193942",
        "longitude": "-78.485614722888",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 10:00 a 16:00 \\n",
        "phone": "0995450561"
      },
      {
        "name": "NOVICOMPU AV. DEL MAESTRO",
        "address": "AV MAESTRO OE4-202 QUITUMBE",
        "latitude": "-0.12267393778783",
        "longitude": "-78.492179413769",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 10:00 a 16:00 \\n",
        "phone": "0984775228"
      },
      {
        "name": "NOVICOMPU CARACOL",
        "address": "C.C. CARACOL: AV AMAZONAS Y AV NNUU LOCAL 108 (FRENTE AL CC IÑAQUITO)",
        "latitude": "-0.17624900766304",
        "longitude": "-78.486019062303",
        "schedules": "Lunes a Sábado de 10:00 a 19:30 \\nDomingo: de 10:00 a 18:00 \\n",
        "phone": "0958882380"
      },
      {
        "name": "NOVICOMPU EL BOSQUE",
        "address": "ALONSO DE TORRES N44 -98  Y EDMUNDO CARVAJAL DIAGONAL AL C.C EL BOSQUE",
        "latitude": "-0.16078605558042",
        "longitude": "-78.496687809342",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 09:30 a 17:00 \\n",
        "phone": "0991864043"
      },
      {
        "name": "NOVICOMPU CALDERON",
        "address": "9 DE AGOSTO Y LIZARDO BECERRA, DIAGONAL AL DILIPA",
        "latitude": "-0.099724063787827",
        "longitude": "-78.422512672269",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 10:00 a 17:00 \\n",
        "phone": "0998316897"
      },
      {
        "name": "NOVICOMPU VALLE DE LOS CHILLOS",
        "address": "RUMIÑAHUI E ISLA MARCHANA SECTOR SAN RAFAEL. JUNTO A LA GASOLINERA TERPEL",
        "latitude": null,
        "longitude": null,
        "schedules": "Lunes a Viernes de 09:00 a 19:00 \\n Sábado:  09:00 A 18:00  \\nDomingo: de 10:00 a 16:00 \\n",
        "phone": "0989453656"
      },
      {
        "name": "NOVICOMPU CALDERON 2",
        "address": "CALLE CARAPUNGO OE4-173 Y PANAMERICANA NORTE, VIA PRINCIPAL CALDERON",
        "latitude": "-0.10193237265027",
        "longitude": "-78.422745652828",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 10:00 a 17:00 \\n",
        "phone": "0939750382"
      },
      {
        "name": "NOVICOMPU SANGOLQUI",
        "address": "AV. GRAL ENRIQUEZ #2814 SECTOR REDONDEL RIVER MALL",
        "latitude": "-0.32381382205438",
        "longitude": "-78.448321737913",
        "schedules": "Lunes a Sábado de 08:30 a 18:30 \\nDomingo: de 10:00 a 16:00 \\n",
        "phone": "0992936202"
      }
    ],
    "Guayaquil": [
      {
        "name": "NOVICOMPU URDESA Y ÉBANOS",
        "address": "AV. VICTOR EMILIO ESTRADA N. 431 Y ÉBANOS",
        "latitude": "-2.17123903958",
        "longitude": "-79.908912708372",
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \\nDomingo: de 10:00 a 17:00 \\n",
        "phone": "0963850526",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU 9 DE OCTUBRE Y RUMICHACA",
        "address": "EDIF KFC: 09 DE OCTUBRE 910 Y RUMICHACA JUNTO A EDIF MILITARES",
        "latitude": "-2.1900706886559",
        "longitude": "-79.88635402297",
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \\nDomingo: de 09:00 a 16:00 \\n",
        "phone": "0981402235",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      },
      {
        "name": "HIPER NOVICOMPU",
        "address": "KENNEDY NORTE AV. FRANCISCO DE ORELLANA N.30 Y NAHIN ISAIAS  MZ 71 (ALADO DE LA PARRILLADA DEL ÑATO)",
        "latitude": "-2.1609202990807",
        "longitude": "-79.899188354373",
        "schedules": "Lunes a Sábado de 08:30 a 19:30 \\nDomingo: de 10:00 a 17:00 \\n",
        "phone": "0981522266",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU 9 DE OCTUBRE Y ESCOBEDO",
        "address": "9 DE OCTUBRE 515 Y ESCOBEDO LOCAL 2B",
        "latitude": "-2.1913782448514",
        "longitude": "-79.883105672053",
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \\nDomingo: de 09:00 a 16:00 \\n",
        "phone": "0996333117",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU FRANCISCO DE ORELLANA",
        "address": "CIUDADELA KENNEDY NORTE AV. FRANCISCO ORELLANA SOLAR 5 Y EUGENIO ALMAZAN (JUNTO A JUAN MARCET)",
        "latitude": "-2.1670162905976",
        "longitude": "-79.895529374903",
        "schedules": "Lunes a Sábado de 08:30 a 19:30 \\nDomingo: de 10:00 a 17:00 \\n",
        "phone": "0992312276",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU CITY MALL",
        "address": "C.C. CITY MALL: FELIPE PESO S/N BENJAMIN CARRION LOCAL 5",
        "latitude": "-2.1412708301513",
        "longitude": "-79.909282095041",
        "schedules": "Lunes a Sábado de 10:00 a 21:00 \\nDomingo: de 10:00 a 20:00 \\n",
        "phone": "0996532582",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU MALL DEL SUR",
        "address": "C.C. MALL DEL SUR: AV 25 DE JULIO JOSE DE LA CUADRA LOCAL 26",
        "latitude": "-2.2282338602267",
        "longitude": "-79.898456614217",
        "schedules": "Lunes a Sábado de 10:00 a 21:00 \\nDomingo: de 10:00 a 20:00 \\n",
        "phone": "0968973409",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU URDESA 2",
        "address": "VICTOR EMILIO ESTRADA 612A MONJAS Y FICUS JUNTO A PHARMACYS",
        "latitude": "-2.1688102526971",
        "longitude": "-79.910134377286",
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \\nDomingo: de 10:00 a 17:00 \\n",
        "phone": "0978971096",
        "city": {
          "name": "Guayaquil",
          "code": "GYE",
          "country_id": 1
        }
      }
    ],
    "Ambato": [
      {
        "name": "NOVICOMPU AMBATO 2",
        "address": "AV. PEDRO FERMIN CEVALLOS Y JOAQUIN AYLLON",
        "latitude": "-1.2382287796552",
        "longitude": "-78.623315794923",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 09:30 a 15:00 \\n",
        "phone": "0984861330",
        "city": {
          "name": "Ambato",
          "code": "AMB",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU AMBATO ",
        "address": "LALAMA O8-59 ENTRE LAS CALLES JUAN BENIGNO VELA Y AV CEVALLOS",
        "latitude": "-1.2382360818081",
        "longitude": "-78.623314010304",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo:Cerrado",
        "phone": "0958807681",
        "city": {
          "name": "Ambato",
          "code": "AMB",
          "country_id": 1
        }
      }
    ],
    "Loja": [
      {
        "name": "NOVICOMPU LOJA ",
        "address": "BOLIVAR Y ROCAFUERTE ESQ. LOCAL #0942 - PORTAL DEL PARQUE STO DOMINGO",
        "latitude": "-3.9985589813124",
        "longitude": "-79.201925735517",
        "schedules": "Lunes a Sábado de 10:00 a 20:00 \\nDomingo:Cerrado",
        "phone": "0967635895",
        "city": {
          "name": "Loja",
          "code": "Loja",
          "country_id": 1
        }
      }
    ],
    "Machala": [
      {
        "name": "NOVICOMPU BUENAVISTA",
        "address": "BUENAVISTA ENTRE BOLIVAR Y ROCAFUERTE DIAGONAL AL COMERCIO",
        "latitude": "-3.2629681483449",
        "longitude": "-79.955931347275",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 10:00 a 15:00 \\n",
        "phone": "0939023278",
        "city": {
          "name": "Machala",
          "code": "MA",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU MACHALA",
        "address": "ROCAFUERTE ENTRE GUAYAS Y AYACUCHO, JUNTO A CORTE DE JUSTICIA",
        "latitude": "-3.2583470338946",
        "longitude": "-79.960828321781",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 10:00 a 15:00 \\n",
        "phone": "0985220448",
        "city": {
          "name": "Machala",
          "code": "MA",
          "country_id": 1
        }
      }
    ],
    "Santo Domingo de los Tsachilas": [
      {
        "name": "NOVICOMPU SANTO DOMINGO ",
        "address": "Av. Quito 1308 y Abraham Calazacom",
        "latitude": "-0.25029223958332",
        "longitude": "-79.16288364831",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 10:00 a 17:00 \\n",
        "phone": "0985522539",
        "city": {
          "name": "Santo Domingo de los Tsachilas",
          "code": "std",
          "country_id": 1
        }
      }
    ],
    "Quevedo": [
      {
        "name": "NOVICOMPU QUEVEDO",
        "address": "CALLE 7 DE OCTUBRE Y 4TA ESQUINA BCO INTERNACIONAL ",
        "latitude": "-1.0231731417004",
        "longitude": "-79.466178860293",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 09:00 a 15:00 \\n",
        "phone": "0982328203",
        "city": {
          "name": "Quevedo",
          "code": "Quevedo",
          "country_id": 1
        }
      }
    ],
    "Portoviejo": [
      {
        "name": "NOVICOMPU PORTOVIEJO 2",
        "address": "AV MANABI ENTRE PIO MONTUFAR Y ATAHUALPA (DIAGONAL QILONG COMIDAS CHINAS)",
        "latitude": "-1.0538875811479",
        "longitude": "-80.458492901431",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 09:00 a 15:00 \\n",
        "phone": "0994464564",
        "city": {
          "name": "Portoviejo",
          "code": "port",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU PORTOVIEJO ",
        "address": "PORTOVIEJO: PEDRO GUAL 921 Y GARCIA MORENO EDIF ALVERTO GILER DIAGONAL A ORVE HOGAR",
        "latitude": null,
        "longitude": null,
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 09:00 a 15:00 \\n",
        "phone": "0983657452",
        "city": {
          "name": "Portoviejo",
          "code": "port",
          "country_id": 1
        }
      }
    ],
    "Babahoyo": [
      {
        "name": "NOVICOMPU BABAHOYO",
        "address": "AV 5 DE JUNIO SN JUAN MONTALVO",
        "latitude": "-1.7981760617864",
        "longitude": "-79.528744436175",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 09:00 a 16:00 \\n",
        "phone": "0989269395",
        "city": {
          "name": "Babahoyo",
          "code": "baba",
          "country_id": 1
        }
      }
    ],
    "Riobamba": [
      {
        "name": "NOVICOMPU RIOBAMBA",
        "address": "PRIMERA CONSTITUYENTE 26-25 GARCIA MORENO FRENTE BCO GYE",
        "latitude": "-1.6706786480247",
        "longitude": "-78.6513180388",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 09:00 a 16:00 \\n",
        "phone": "0962971217",
        "city": {
          "name": "Riobamba",
          "code": "Riobamba",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU RIOBAMBA 2",
        "address": "AV UNIDAD NACIONAL Y CARABOBO 2915",
        "latitude": null,
        "longitude": null,
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo:Cerrado",
        "phone": "0988476570",
        "city": {
          "name": "Riobamba",
          "code": "Riobamba",
          "country_id": 1
        }
      }
    ],
    "Manta": [
      {
        "name": "NOVICOMPU MANTA",
        "address": "Manta calle TRECE SN avenida 12/13",
        "latitude": "-0.94741243614193",
        "longitude": "-80.725730816936",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 09:00 a 15:00 \\n",
        "phone": "0983894066",
        "city": {
          "name": "Manta",
          "code": "MTN",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU MANTA 2",
        "address": "MANTA CALLE AV 2 #1175 JUNTO AL BCO PICHINCHA",
        "latitude": "-0.94633669261902",
        "longitude": "-80.723060853393",
        "schedules": "Lunes a Viernes de 08:00 a 18:00 \\n Sábado: 08:00 A 16:00 \\nDomingo: Cerrado",
        "phone": "0963380724",
        "city": {
          "name": "Manta",
          "code": "MTN",
          "country_id": 1
        }
      }
    ],
    "Milagro": [
      {
        "name": "NOVICOMPU MILAGRO",
        "address": "AV GABRIEL GARCIA MORENO Y GRAL ELOY ALFARO JUNTO ARTEFACTA",
        "latitude": "-2.1283617041205",
        "longitude": "-79.589916083042",
        "schedules": "Lunes a Sábado de 08:30 a 18:30 \\nDomingo: de 10:00 a 16:00 \\n",
        "phone": "0989312111",
        "city": {
          "name": "Milagro",
          "code": "ml",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU MILAGRO 2",
        "address": "GARCIA MORENO ENTRE 12 DE FEBRERO Y ROCAFUERTE JUNTO A COMPUTRON",
        "latitude": "-2.1277142980568",
        "longitude": "-79.591881532491",
        "schedules": "Lunes a Sábado de 09:00 a 19:00 \\nDomingo: de 09:00 a 17:00 \\n",
        "phone": "0986410261",
        "city": {
          "name": "Milagro",
          "code": "ml",
          "country_id": 1
        }
      }
    ],
    "Ibarra": [
      {
        "name": "NOVICOMPU IBARRA",
        "address": "BOLIVAR 10-90 PEREZ GUERRERO",
        "latitude": "0.34636036857112",
        "longitude": "-78.119236415907",
        "schedules": "Lunes a Sábado de 09:00 a 19:30 \\nDomingo:Cerrado",
        "phone": "0985230763",
        "city": {
          "name": "Ibarra",
          "code": "Ibarra",
          "country_id": 1
        }
      }
    ],
    "Esmeraldas": [
      {
        "name": "NOVICOMPU ESMERALDAS",
        "address": "ROCAFUERTE M44 SL7 AV. SUCRE ESQ CENTRO DE CIUDAD.",
        "latitude": "0.96806935226207",
        "longitude": "-79.653047458312",
        "schedules": "Lunes a Sábado de 09:00 a 18:30 \\nDomingo:Cerrado",
        "phone": "0959204511",
        "city": {
          "name": "Esmeraldas",
          "code": "Esmeraldas",
          "country_id": 1
        }
      }
    ],
    "Cuenca": [
      {
        "name": "NOVICOMPU CUENCA 2",
        "address": "C.C. MALL DEL RIO FELIPE II Y CIRCUNVALACIÓN SUR  PLANTA BAJA LOCAL C 5-6-7-8-9-10",
        "latitude": "-2.9184839356615",
        "longitude": "-79.014465953267",
        "schedules": "Lunes a Jueves de 10:00 A 20:00 \\n Viernes y Sábados de 10:00 A 21:00\\n Domingo: de 10:00 a 20:00",
        "phone": "0978998885",
        "city": {
          "name": "Cuenca",
          "code": "CUE",
          "country_id": 1
        }
      },
      {
        "name": "NOVICOMPU CUENCA",
        "address": "C.C. MALL DEL RIO AV FELIPE CIRCUNVALACIÓN SUR PLANTA BAJA LOCAL S3",
        "latitude": "-2.918502686772",
        "longitude": "-79.01446394161",
        "schedules": "Lunes a Jueves de 10:00 A 20:00 \\n Viernes y Sábados de 10:00 A 21:00\\n Domingo: de 10:00 a 20:00 \\n",
        "phone": "0962962290",
        "city": {
          "name": "Cuenca",
          "code": "CUE",
          "country_id": 1
        }
      }
    ],
    "Naranjal": [
      {
        "name": "NOVICOMPU NARANJAL",
        "address": "CALLE GUAYAQUIL SN DR EUGENIO ESPEJO",
        "latitude": "-2.6748268277451",
        "longitude": "-79.618693695327",
        "schedules": "Lunes a Sábado de 09:00 a 18:30 \\nDomingo:Cerrado",
        "phone": "0963814774",
        "city": {
          "name": "Naranjal",
          "code": "Naj",
          "country_id": 1
        }
      }
    ],
    "Chone": [
      {
        "name": "NOVICOMPU CHONE",
        "address": "CALLE ROCAFUERTE ENTRE COLON Y PICHINCHA JUNTO AL UPC",
        "latitude": "-0.69837683307794",
        "longitude": "-80.093606770205",
        "schedules": "Lunes a Viernes de 09:00 a 18:00 \\n Sábado: 09:00 A 17:00 \\nDomingo:Cerrado",
        "phone": "0967077909",
        "city": {
          "name": "Chone",
          "code": "Chone",
          "country_id": 1
        }
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
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo: de 10:00 a 15:00 \\n",
        "phone": "0959924317",
        "city": {
          "name": "La Libertad",
          "code": "La Libertad",
          "country_id": 1
        }
      }
    ],
    "Latacunga": [
      {
        "name": "NOVICOMPU LATACUNGA",
        "address": "JUAN ABEL ECHEVERRIA Y QUITO.",
        "latitude": "-0.93096919020088",
        "longitude": "-78.615756107718",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\nDomingo:Cerrado",
        "phone": "0987933475",
        "city": {
          "name": "Latacunga",
          "code": "LT",
          "country_id": 1
        }
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
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\n Domingo : Cerrado"
      }
    ],
    "Guayaquil": [
      {
        "name": " GANACELL PLAZA QUIL",
        "address": "C.C. PLAZA QUIL: LUIS PLAZA DAÑIN SN ATRÁS DE SAN MARINO LOCAL 8",
        "latitude": "-2.1689036004471154",
        "longitude": "-79.89972217309558",
        "phone": "null",
        "schedules": "Lunes a Sábado de 08:30 a 19:00 \\n Domingo de 10:00 a 17:00"
      },
      {
        "name": "GANACELL UNICENTRO",
        "address": "C.C. UNICENTRO : ROCAFUERTE AGUIRRE 0411 TM4",
        "latitude": "-2.193890236623272",
        "longitude": "-79.88297616575082",
        "phone": "null",
        "schedules": "Lunes a Viernes 10:00 A 19:00 \\n\nSábado de 10:00 A 18:00 \\n\nDomingo de 11:00 A 18:00"
      },
      {
        "name": " GANACELL LA ROTONDA",
        "address": "C.C. LA ROTONDA AV BENJAMIN CARRION MORA LOCAL 27 JUNTO A DE PRATI",
        "latitude": "-2.1388698908975132",
        "longitude": "-79.90808609939543",
        "phone": "null",
        "schedules": "Lunes a Viernes de 10:00 a 20:00 \\n Domingo de 11:00 a 20:00"
      }
    ],
    "Manta": [
      {
        "name": "GANACELL MANDA",
        "address": "CALLE 13 AV 17 A LADO DE LA FARMACIA DANILO FRENTA A NOVICOMPU",
        "latitude": "-0.9473005871628258",
        "longitude": "-80.72577333202415",
        "phone": "NULL",
        "schedules": "Lunes a Viernes 09:00 a 19:00 \\n Domingo 09:00 a 15:00"
      }
    ],
    "Portoviejo": [
      {
        "name": "GANACELL PORTOVIEJO",
        "address": "AVENIDA MANABI Y CALLE QUITO",
        "latitude": "-1.0542529238598577",
        "longitude": "-80.45768756137316",
        "phone": "null",
        "schedules": "Lunes a Sábado 09:00 a 19:00  /n Domingo de 09:00 a 15:00"
      }
    ],
    "Machala": [
      {
        "nameStore": "GANACELL MACHALA",
        "address": "CC ORO PLAZA: AV 25 DE JUNIO CIUDAD VERDE KM25 SEGUNDA PLANTA LOCAL #230 GANACELL",
        "latitude": "-3.264897472701187",
        "longitude": "-79.95242049958304",
        "phone": "null",
        "schedules": "Lunes a Sábado 09:00 a 19:00 \\n Domingo 10:00 a 15:00"
      }
    ],
    "Santo domingo": [
      {
        "name": "GANACELL SANTO DOMINGO",
        "address": "24 DE MAYO AV 29 DE MAYO COCANIGUAS FRENTE A IMPRENTA STO DOMINGO ",
        "latitude": "-0.25394055618534406",
        "longitude": "-79.16710770580079",
        "phone": "1548",
        "schedules": "Lunes a Viernes de 09:00 a 19:00 \\n Domingo: Cerrado"
      }
    ],
    "Cuenca": [
      {
        "name": "GANACEL CUENCA",
        "address": "AV FRAY VICENTE SOLANO EDIFICIO CICA LOCAL 5",
        "latitude": "-2.9062148457136003",
        "longitude": "-79.0068937660938",
        "phone": "null",
        "schedules": "Lunes a Sabado de 08:30 a 18:30 \\n Domingo: Cerrado"
      }
    ]
  },
  "importadora novoa": {
    "Guayaquil": [{
      name: 'IMPORTADORA ORELLANA',
      schedules: 'Lunes a Sábado de	08:30 a 19:30	\n Domingo de 10:00 a 17:00',
      address: 'KENNEDY NORTE: AV  FCO ORELLANA MZ  12 SL 22 (FRENTE A LA PRIMAX)',
      latitude: '-2.1674663898029656',
      longitude: '-79.89652498800326',
      phone: 'null'

    },
    {
      name: 'IMPORTADORA URDESA',
      schedules: 'Lunes a Sábado de	09:00 a 19:30	\n Domingo de 10:00 a 17:00',
      address: 'VICTOR EMILIO ESTRADA 623 FICUS Y AV LAS MONJAS 3ER PISO',
      latitude: '-2.1680557562193026',
      longitude: '-79.91084556275938',
      phone: 'null'
    },
    {
      name: 'IMPORTADORA CITY MALL',
      schedules: 'Lunes a Sábado de	10:00 a 21:00	\n Domingo de 10:00 a 20:00',
      address: 'C.C. CITY MALL FELIPE PESO Y BENJAMIN CARRION LOCAL 104-105',
      latitude: '-2.140930143359273',
      longitude: '-79.90943863628449',
      phone: 'null'
    }],

    "Portoviejo": [{
      name: 'IMPORTADORA PORTOVIEJO',
      schedules: 'Lunes a Sábado de	09:00 a 19:00	\n Domingo de 10:00 a 15:00',
      address: 'AV MANABI Y CALLE QUITO FRENTE COMERCIAL FATIMA',
      latitude: '-1.054075328543568',
      longitude: '-80.45761315401474',
      phone: 'null'
    }],
    "Manta": [{
      name: 'IMPORTADORA MANTA',
      schedules: 'Lunes a Sábado de	09:00 a 19:00	\n Domingo de 10:00 a 15:00',
      address: 'MANTA: CALLE AV TRECE ENTRE AV 12 y 13 ( FRENTE LICORERIA LOPEZ)',
      latitude: '-0.9474245636900083',
      longitude: '-80.72573955001081',
      phone: 'null'
    }],
    "Quito": [{
      name: 'IMPORTADORA LA PRENSA',
      schedules: 'Lunes a Sábado de	08:30 a 19:00	\n Domingo de 09:00 a 16:00',
      address: 'LA CONCEPCION AV LA PRENSA N47-326 N 48 RIO TOPO ESQ PB LC AEROPUERTO',
      latitude: '-0.15080287889765584',
      longitude: '-78.48974999872145',
      phone: 'null'
    },
    {
      name: 'IMP VALLE DE LOS CHILLOS',
      schedules: 'Lunes a Viernes de 9:00 A 19:00 \n Sábado de 09:00 A 18:00 \n Domingo de	10:00 A 16:00',
      address: 'AV. RUMIÑAHUI E ISLA MARCHENA SECTOR SAN RAFAEL',
      latitude: '-0.30254394105810306',
      longitude: '-78.45534569874702',
      phone: 'null'
    },
    {
      name: 'IMPORTADORA RECREO',
      schedules: 'Lunes a Sábado de	10:00 a 20:00	\n Domingo 10:00 a 19:00',
      address: 'C.C. EL RECREO: PEDRO VICENTE MALDONADO S11-122 EL RECREO LOCAL A50 ETAPA 1',
      latitude: '-0.25229754830931567',
      longitude: '-78.5228991817609',
      phone: 'null'
    }],
    "Babahoyo": [{
      name: 'IMPORTADORA BABAHOYO',
      schedules: 'Lunes a Sábado de	08:30 a 19:00	\n Domingo 09:00 a 15:00',
      address: 'AV 5 DE JUNIO CALDERON ABDON REFERENCIA FRENTE A LA CORTE PROVINCIAL',
      latitude: '-1.7990911519800026',
      longitude: '-79.5307926711615',
      phone: 'null'
    }],
    "Machala": [{
      name: 'IMPORTADORA MACHALA',
      schedules: 'Lunes a Sábado de	09:00 a 19:00	\n Domingo 10:00 a 15:00',
      address: 'PAEZ SN Y AV ROCAFUERTE ESQ JUNTO A COMANDATO',
      latitude: '-3.2578530419325826',
      longitude: '-79.95518182169647',
      phone: 'null'
    }],
    "La Libertad": [{
      name: 'IMPORTADORA LA LIBERTAD',
      schedules: 'Lunes a Sábado de	08:30 a 19:00	\n Domingo 10:00 a 15:00',
      address: 'Calle 21 Edmundo diagonal a la AV 2DA A',
      latitude: '-2.2217183146814223',
      longitude: '-80.90935302495089',
      phone: 'null'
    }],
    "Santo Domingo": [{
      name: 'IMPORTADORA STO DOMINGO',
      schedules: 'Lunes a Sábado de	09:00 a 19:00	\n Domingo CERRADO',
      address: 'URB HNOS GUERRERO 1 SL 105 MZ 132',
      latitude: '-1.2403724779510554',
      longitude: '-78.62916884523472',
      phone: 'null'
    }]
  }
}
