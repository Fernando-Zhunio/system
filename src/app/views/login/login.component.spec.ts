// import { RouterTestingModule } from '@angular/router/testing';
// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { AuthService } from '../../services/auth.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { NgxPermissionsModule } from 'ngx-permissions';
// import { StorageService } from '../../services/storage.service';
// import { HttpClientModule } from '@angular/common/http';
// import { of } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let auth_service: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         LoginComponent
//       ],
//       imports: [
//         HttpClientModule,
//         RouterTestingModule,
//         HttpClientTestingModule,
//         HttpClientModule,
//         NgxPermissionsModule.forRoot(), ],
//       providers: [
//         AuthService,
//         StorageService,
//         RouterTestingModule
//       ]
//     }).compileComponents();
//     auth_service = TestBed.inject(AuthService);
//   });
//   // it('should create the app', (() => {
//   //   fixture = TestBed.createComponent(LoginComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // }));

//   it('login method - login component', (() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     component.formLogin.get('email')?.setValue('fzhunio@hotmail.com');
//     component.formLogin.get('password')?.setValue('123456');
//     const response = mockDataResponseLogin();
//     spyOn(auth_service, 'login').and.returnValue(of(response));
//     component.login();
//     fixture.detectChanges();
//     expect().toEqual('/authetication/codigo-confirmacion/' + response.data.token);
//   }));
// });

// function mockDataResponseLogin(): any {
//   return {
//     token: "Zg3rmCXcu5aYYGqjgDnchkhBSNNNNutd",
//     active: "2022-08-25T16:52:51.000000Z",
//     user: {
//       "id": 116,
//       "name": "Fernando Zhunio",
//       "email": "fzhunio@novicompu.com",
//       "api_token": null,
//       "admin": 0,
//       "last_activity": "2022-08-25T16:27:46.000000Z",
//       "created_at": "2020-10-27T12:16:30.000000Z",
//       "updated_at": "2020-12-01T10:07:02.000000Z",
//       "deleted_at": null,
//       "person": {
//         "id": 5,
//         "status": "working",
//         "first_name": "Fernando",
//         "last_name": "Zhunio Reyes",
//         "identification_type": "ci",
//         "identification_number": "0941160483",
//         "birthday": "1991-07-30T05:00:00.000000Z",
//         "sex": "male",
//         "start_date": "2020-08-26",
//         "end_date": null,
//         "city_id": 1,
//         "department_position_id": 3,
//         "location_id": 1,
//         "user_id": 116,
//         "created_at": "2021-10-04T12:35:03.000000Z",
//         "updated_at": "2022-01-03T16:02:21.000000Z",
//         "compact_name": "Fernando Zhunio",
//         "position": {
//           "id": 3,
//           "name": "Desarrollador de Software",
//           "department_id": 1,
//           "employe_type": "other",
//           "hierarchy_type": "subordinate",
//           "created_at": "2018-11-01T04:48:08.000000Z",
//           "updated_at": "2021-12-16T22:58:01.000000Z",
//           "deleted_at": null
//         },
//         "photo": {
//           "id": 9,
//           "type": "image",
//           "file": "photos/F8qVtr301dpBvkgzMH1zRA8l16CpoZ1633368903.png",
//           "original_name": null,
//           "mime_type": "image/png",
//           "attributes": {
//             "width": 600,
//             "height": 600
//           },
//           "created_at": "2021-10-04T12:35:04.000000Z",
//           "updated_at": "2021-10-04T12:35:04.000000Z",
//           "ext": "png",
//           "permalink": "/photos/F8qVtr301dpBvkgzMH1zRA8l16CpoZ1633368903.png"
//         }
//       }
//     }
//   }
// }
