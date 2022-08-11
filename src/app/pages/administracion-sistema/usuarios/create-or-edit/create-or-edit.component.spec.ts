import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchTemplateModule } from '../../../../Modulos/search-template/search-template.module';
import { SearchesModule } from '../../../../Modulos/searches/searches.module';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { SwalService } from '../../../../services/swal.service';

import { CreateOrEditComponent } from './create-or-edit.component';

describe('CreateOrEditComponent', () => {
  let component: CreateOrEditComponent;
  let fixture: ComponentFixture<CreateOrEditComponent>;
  let httpClient = null;
  let httpTestingController = null;
  let searchWikiService = null;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrEditComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        BrowserAnimationsModule,
        SearchesModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        MethodsHttpService,
        SwalService
      ]
    })
      .compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    searchWikiService = TestBed.get(MethodsHttpService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    // component.roles = mockRoles();
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

function mockRoles() {
  return [
    {
      "id": 1,
      "name": "super-admin",
      "guard_name": "user",
      "title": "Administrador del sistema",
      "description": "Tiene acceso completo al sistema",
      "created_at": "2021-01-04T15:02:09.000000Z",
      "updated_at": "2021-01-04T15:02:09.000000Z"
    },
    {
      "id": 2,
      "name": "seller",
      "guard_name": "user",
      "title": "Vendedor",
      "description": null,
      "created_at": "2021-01-04T15:08:09.000000Z",
      "updated_at": "2021-01-04T15:08:09.000000Z"
    },
    {
      "id": 3,
      "name": "marketing",
      "guard_name": "user",
      "title": "Marketing",
      "description": null,
      "created_at": "2021-01-04T15:09:01.000000Z",
      "updated_at": "2021-01-04T15:09:01.000000Z"
    },
    {
      "id": 4,
      "name": "client-service",
      "guard_name": "user",
      "title": "Servicio al cliente",
      "description": null,
      "created_at": "2021-01-04T15:10:09.000000Z",
      "updated_at": "2021-01-04T15:10:09.000000Z"
    },
    {
      "id": 5,
      "name": "product-manager",
      "guard_name": "user",
      "title": "Administrador de productos",
      "description": null,
      "created_at": "2021-01-04T15:45:59.000000Z",
      "updated_at": "2021-01-04T15:45:59.000000Z"
    },
    {
      "id": 6,
      "name": "publicador",
      "guard_name": "user",
      "title": "Publicador de productos",
      "description": null,
      "created_at": "2021-01-04T16:02:52.000000Z",
      "updated_at": "2021-01-04T16:02:52.000000Z"
    },
    {
      "id": 7,
      "name": "report-exporter",
      "guard_name": "user",
      "title": "Exportador de Reportes",
      "description": null,
      "created_at": "2021-01-05T15:09:08.000000Z",
      "updated_at": "2022-05-18T04:41:09.000000Z"
    },
    {
      "id": 8,
      "name": "facebook-ads-admin",
      "guard_name": "user",
      "title": "Administrador Facebook Ads",
      "description": "Puede ver y editar campañas",
      "created_at": "2021-01-20T18:23:37.000000Z",
      "updated_at": "2021-01-20T18:23:37.000000Z"
    },
    {
      "id": 9,
      "name": "rrhh",
      "guard_name": "user",
      "title": "Recursos Humanos",
      "description": null,
      "created_at": "2021-09-29T17:31:09.000000Z",
      "updated_at": "2021-09-30T13:14:08.000000Z"
    },
    {
      "id": 10,
      "name": "analyst",
      "guard_name": "user",
      "title": "Analista",
      "description": null,
      "created_at": "2021-11-26T15:44:22.000000Z",
      "updated_at": "2022-05-17T16:40:21.000000Z"
    },
    {
      "id": 11,
      "name": "wholesale-price-editor",
      "guard_name": "user",
      "title": "Editor de precios mayoristas",
      "description": null,
      "created_at": "2022-02-07T16:55:00.000000Z",
      "updated_at": "2022-05-17T16:35:45.000000Z"
    },
    {
      "id": 12,
      "name": "Mayoristas",
      "guard_name": "user",
      "title": "Mayoristas",
      "description": null,
      "created_at": "2022-03-15T04:46:13.000000Z",
      "updated_at": "2022-03-15T04:46:13.000000Z"
    },
    {
      "id": 13,
      "name": "retail-seller",
      "guard_name": "user",
      "title": "Vendedor de tienda",
      "description": null,
      "created_at": "2022-05-18T04:41:09.000000Z",
      "updated_at": "2022-05-18T04:41:09.000000Z"
    },
    {
      "id": 19,
      "name": "order-sales-agent",
      "guard_name": "user",
      "title": "Agente de ventas",
      "description": null,
      "created_at": "2022-06-18T16:15:19.000000Z",
      "updated_at": "2022-06-18T16:15:19.000000Z"
    },
    {
      "id": 20,
      "name": "order-biller",
      "guard_name": "user",
      "title": "Facturador",
      "description": null,
      "created_at": "2022-06-18T16:15:19.000000Z",
      "updated_at": "2022-06-18T16:15:19.000000Z"
    },
    {
      "id": 21,
      "name": "order-logistics",
      "guard_name": "user",
      "title": "Logística",
      "description": null,
      "created_at": "2022-06-18T16:15:19.000000Z",
      "updated_at": "2022-06-18T16:15:19.000000Z"
    },
    {
      "id": 22,
      "name": "ticket-responser",
      "guard_name": "user",
      "title": "Responsable de tickets",
      "description": null,
      "created_at": "2022-06-18T16:15:19.000000Z",
      "updated_at": "2022-06-18T16:15:19.000000Z"
    }
  ]
}

function mockPerson() {

}
