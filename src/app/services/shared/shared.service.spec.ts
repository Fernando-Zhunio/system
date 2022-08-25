// import { TestBed } from '@angular/core/testing';
// import { SharedService } from './shared.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { StorageService } from '../storage.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

// class StorageServiceClass extends StorageService { }
// class NgxPermissionsServiceClass extends NgxPermissionsService { }

// describe('SharedService', () => {
//     let service: SharedService;


//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 HttpClientTestingModule,
//                 RouterTestingModule,
//                 NgxPermissionsModule
//             ],
//             providers: [{
//                 provide: StorageService,
//                 useClass: StorageServiceClass
//             },
//             {
//                 provide: NgxPermissionsService,
//                 useClass: NgxPermissionsServiceClass
//             }]
//         });
//         service = TestBed.inject(SharedService);
//     });

//     it('Metodo estatico groupBy', () => {
//         const array = [
//             {
//                 'name': 'Empleos',
//                 'url': '/recursos-humanos/works',
//                 'icon': 'icon-star',
//                 'permission': 'rrhh-works',
//                 'group': 'rrhh'
//             },
//             {
//                 'name': 'Citas',
//                 'url': '/recursos-humanos/appointments',
//                 'icon': 'icon-star',
//                 'permission': 'rrhh-appointments',
//                 'group': 'rrhh'
//             },
//             {
//                 'name': 'Vtex Productos',
//                 'url': '/admin-products/vtex-products',
//                 'icon': 'icon-basket',
//                 'permission': 'products-admin.products.index',
//                 'group': 'admin_products'
//             }

//         ];
//         const result = SharedService.groupBy(array, 'group');
//         console.log(result);

//         const isObject = result instanceof Object;

//         expect(isObject).toBeTrue();
//     });
// });
