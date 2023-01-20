import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddInfoPersonModalComponent } from './add-info-person-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { StorageService } from '../../../services/storage.service';
import { environment } from '../../../../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddInfoPersonModalComponent', () => {
    let component: AddInfoPersonModalComponent;
    let fixture: ComponentFixture<AddInfoPersonModalComponent>;
    let httpMock: HttpTestingController;
    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [
                AddInfoPersonModalComponent,
            ],
            imports: [
                MatDialogModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                MatFormFieldModule,
                MatInputModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatButtonModule,
                BrowserAnimationsModule,
                MatSelectModule,
                HttpClientTestingModule,

            ],
            providers: [
                StorageService,
                {
                    provide: MatDialogRef,
                    useValue: {}
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        user: {
                            name: 'test',
                            id: 91
                        },


                    }
                },
                
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddInfoPersonModalComponent);
        component = fixture.componentInstance;
        component.setDataDefault(MockData.data);
        fixture.detectChanges();
        httpMock = TestBed.inject(HttpTestingController);
        const request = httpMock.expectOne( `${environment.server}user/people/create`);
        request.flush(MockData);
    });

    it('Send Data - createFormData', () => {
        const dataForm = fillForm();
        component.form_person.patchValue(dataForm);
        let formData = {}
        component.createFormData().forEach((value, key) => {
            expect(value).toEqual(dataForm[key]);
            formData[key] = value;
        });
        expect(formData).toEqual(dataForm);
    });

    it('Send Data to Server - saveInServer', () => {
        const dataForm = fillForm();
        component.form_person.patchValue(dataForm);
        component.saveInServer();
        const request = httpMock.expectOne( `${environment.server}user/91/people`);
        request.flush({success:true, data: 'MockProducts'});
        expect(request.request.method).toBe('POST');

    });
});

const MockData = {
    "success": true,
    "data": {
        "cities": {
            "1": "Guayaquil",
            "2": "Quito",
            "3": "Cuenca",
            "4": "Ambato",
            "5": "Manta",
            "6": "Machala",
            "7": "Milagro",
            "8": "Portoviejo",
            "9": "Manta",
            "10": "Babahoyo",
            "11": "Machala",
            "12": "Santo Domingo de los Tsachilas",
            "13": "Loja",
            "14": "Quevedo",
            "15": "Riobamba",
            "16": "Ibarra",
            "17": "La Libertad",
            "18": "Milagro",
            "19": "Esmeraldas",
            "20": "Naranjal",
            "21": "Chone",
            "22": "Tena",
            "24": "Latacunga",
            "25": "Sangolquí"
        },
        "positions": {
            "1": "Jefe de Marketing - Marketing - Novicompu",
            "2": "Diseñador Gráfico - Marketing - Novicompu",
            "3": "Desarrollador de Software - Marketing - Novicompu",
            "4": "Gestor de Productos - Comercial - Novicompu",
            "5": "Cordinadora Comercial - Comercial - Novicompu",
            "6": "Jefe de E-commerce - E-commerce - Novicompu",
            "7": "Servicio al cliente - E-commerce - Novicompu",
            "8": "Vendedor Retail - Comercial - Novicompu",
            "9": "Administrador de tienda retail - Comercial - Novicompu",
            "10": "Importaciones - Compras - Novicompu",
            "11": "Presidente - Presidencia - Novicompu",
            "12": "Asistente de Presidencia - Presidencia - Novicompu",
            "13": "Inventarios - Contabilidad - Novicompu",
            "14": "Asistente Recursos Humanos - Recursos Humanos - Novicompu",
            "15": "Asistente de Inventarios - Inventarios - Novicompu",
            "16": "Planner - Marketing - Novicompu",
            "17": "Chofer - Mayoristas - Novicompu",
            "18": "Influencer - Marketing - Novicompu",
            "19": "Vendedor mayorista - Mayoristas - Novicompu",
            "20": "Jefe Mayoristas - Mayoristas - Novicompu"
        },
        "locations": {
            "1": "Oficinas Orellana - Guayaquil",
            "7": "IMPORTADORA NOVOA PORTOVIEJO - Portoviejo",
            "8": "NOVICOMPU CC EL RECREO 23 - Quito",
            "9": "NOVICOMPU URDESA Y ÉBANOS - Guayaquil",
            "10": "AV. 9 DE OCTUBRE 910 Y RUMICHACA - Guayaquil",
            "11": "NOVICOMPU AV. REPUBLICA - Quito",
            "12": "NOVICOMPU AMBATO 2 - Ambato",
            "13": "NOVICOMPU LOJA - Loja",
            "14": "IMPORTADORA MACHALA - Machala",
            "15": "NOVICOMPU BUENAVISTA - Machala",
            "16": "IMPORTADORA NOVOA BABAHOYO - Babahoyo",
            "17": "HIPER NOVICOMPU - Guayaquil",
            "18": "IMPORTADORA NOVOA MANTA - Manta",
            "19": "NOVICOMPU SANTO DOMINGO TSACHILAS - Santo Domingo de los Tsachilas",
            "20": "Ganacell Santo Domingo - Santo Domingo de los Tsachilas",
            "21": "NOVICOMPU QUEVEDO - Quevedo",
            "22": "055 NOVICOMPU 2 - 18OCT PTOVIEJO - Portoviejo",
            "23": "NOVICOMPU BABAHOYO - Babahoyo",
            "24": "IMPORTADORA NOVOA ORELLANA - Guayaquil",
            "25": "NOVICOMPU ESCOBEDO - Guayaquil",
            "26": "Ganacell Manta - Manta",
            "27": "NOVICOMPU RIOBAMBA - Riobamba",
            "28": "NOVICOMPU NACIONES UNIDAS - Quito",
            "29": "Ganacell Machala - Machala",
            "30": "IMPORTADORA URDESA - Guayaquil",
            "31": "NOVICOMPU MANTA - Manta",
            "32": "NOVICOMPU CC RECREO - Quito",
            "33": "NOVICOMPU PORTOVIEJO - Portoviejo",
            "34": "NOVICOMPU AMBATO - Ambato",
            "35": "NOVICOMPU MILAGRO - Milagro",
            "36": "NOVICOMPU SHYRIS Y RIO COCA - Quito",
            "37": "NOVICOMPU AV 6 DE DICIEMBRE - Quito",
            "38": "NOVICOMPU FRANCISCO DE ORELLANA - Guayaquil",
            "39": "NOVICOMPU CITY MALL - Guayaquil",
            "40": "IMPORTADORA NOVOA CITY MALL - Guayaquil",
            "41": "NOVICOMPU IBARRA - Ibarra",
            "42": "NOVICOMPU MILAGRO 2 - Milagro",
            "43": "IMPORTADORA NOVOA QUITO RECREO - Quito",
            "44": "NOVICOMPU MALL DEL SUR - Guayaquil",
            "45": "NOVICOMPU CORDOVA - Guayaquil",
            "46": "IMPORTADORA SANTO DOMINGO - Santo Domingo de los Tsachilas",
            "47": "NOVICOMPU ESMERALDAS - Esmeraldas",
            "48": "NOVICOMPU URDESA - Guayaquil",
            "49": "NOVICOMPU CUENCA 2 - Cuenca",
            "50": "NOVICOMPU CUENCA - Cuenca",
            "51": "Ganacell C.C. PLAZA QUIL - Guayaquil",
            "52": "IMPORTADORA LA LIBERTAD - La Libertad",
            "53": "NOVICOMPU AV. DEL MAESTRO - Quito",
            "54": "GANACELL  C.C. LA ROTONDA - Guayaquil",
            "55": "GANACELL C.C. Unicentro - Guayaquil",
            "56": "NOVICOMPU CARACOL - Quito",
            "57": "NOVICOMPU EL BOSQUE - Quito",
            "58": "IMPORTADORA NOVOA LA PRENSA - Quito",
            "59": "Ganacell Portoviejo - Portoviejo",
            "60": "NOVICOMPU MANTA 2 - Manta",
            "61": "Ganacell Espiral - Quito",
            "62": "026 C.LOG QUITO - Quito",
            "63": "Ganacell Cuenca - Cuenca",
            "64": "Ganacell CITY CENTER - Quito",
            "65": "E-commerce - Guayaquil",
            "66": "027 C LOGISTICO GYE - Guayaquil",
            "67": "031 ADMIN UIO - Quito",
            "68": "046 NOVI  P. TRIANGULO - Guayaquil",
            "69": "051 LA PIAZZA - Guayaquil",
            "70": "074 IMP LA BAHÍA - Guayaquil",
            "71": "Novicompu Naranjal - Naranjal",
            "72": "NOVICOMPU MACHA - Machala",
            "73": "Importadora riobamba - Riobamba",
            "74": "Novicompu Chone - Chone",
            "75": "NOVICOMPU CALDERON - Quito",
            "76": "NOVICOMPU VALLE DE LOS CHILLOS - Quito",
            "77": "NOVICOMPU TENA - Tena",
            "78": "NV LA LIBERTAD - La Libertad",
            "79": "Quevedo 2 - Quevedo",
            "80": "NOVICOMPU CALDERON 2 - Quito",
            "81": "IMP V. CHILLOS - Quito",
            "82": "SANGOLQUI - Sangolquí",
            "83": "LATACUNGA - Latacunga",
            "84": "MALL DEL FORTIN 1 - Guayaquil",
            "85": "Novicompu Magdalena - Guayaquil",
            "86": "090 - Guayaquil",
            "87": "091 - Guayaquil",
            "89": "fer - Guayaquil"
        },
        "sexes": {
            "male": "Masculino",
            "female": "Femenino"
        },
        "id_types": {
            "ci": "Cédula",
            "passport": "Pasaporte"
        }
    }
}

function fillForm() {
    return {
        first_name: 'test first_name',
        last_name: 'test last_name',
        identification_type: Object.keys(MockData.data.id_types)[0],
        identification_number: '123456789',
        birthday: '1990-01-01',
        sex: Object.keys(MockData.data.sexes)[0],
        start_date: '1990-01-01',
        department_position_id: Object.keys(MockData.data.positions)[0],
        location_id: Object.keys(MockData.data.locations)[0],
        city_id: Object.keys(MockData.data.cities)[0],
    }
}

