import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { CategoriasComponent } from './categorias.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule, NgxPermissionsService, USE_PERMISSIONS_STORE } from 'ngx-permissions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MethodsHttpService } from '../../../services/methods-http.service';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CategoriasComponent],
      imports: [
        NgxPaginationModule,
        NgxPermissionsModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        // CategoriasService,
      ]
    });
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`Siguiente pagina`, () => {
    expect(component.pageCurrent).toEqual(1);
  });

  // it(`perPage has default value`, () => {
  //   expect(component.perPage).toEqual(10);
  // });

  // it(`totalItem has default value`, () => {
  //   expect(component.totalItem).toEqual(0);
  // });

  // it(`permission has default value`, () => {
  //   expect(component.permissions).toContain({
  //     categories: {
  //       edit: ['super-admin', 'products-admin.categories.edit'],
  //       destroy: ['super-admin', 'products-admin.categories.destroy'],
  //       create: ['super-admin', 'products-admin.categories.create']
  //     }
  //   });
  // });


  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'nextPage').and.callThrough();
      component.ngOnInit();
      expect(component.nextPage).toHaveBeenCalled();
    });
  });
});

describe('httpCategoriesComponent', () => {
  let service: MethodsHttpService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    service = new MethodsHttpService(httpClientSpy as any);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  })

  it( 'nextPage',() =>{
    let page = 1;
    service.methodGet('products-admin/categories',{page})
  })
})
