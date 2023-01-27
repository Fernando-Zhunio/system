import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DATA_FOR_SEARCH_BAR } from '../public-api';

import { NgxSearchBarService } from './ngx-search-bar.service';

describe('NgxSearchBarService', () => {
  let service: NgxSearchBarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: DATA_FOR_SEARCH_BAR,
          useValue: {
            ROUTER: { navigate(_a: never[], _b: { queryParams: { [x: string]: any; }; replaceUrl: true; }): void { alert('Please inject provider de Router with token DATA_FOR_SEARCH_BAR for use input isChangeUrl to true, in component NgxSearchBarComponent'); throw 'Please inject provider de Router with token DATA_FOR_SEARCH_BAR' } },
            BASE_URL: 'http://localhost:3000/',
            OPTIONS: {
              disabled: false,
              sizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],

            }
          }
        },
        NgxSearchBarService
      ]
    });
    service = TestBed.inject(NgxSearchBarService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable', () => {
    const dummyUsers = [
      { login: 'John' },
      { login: 'Doe' }
    ];

    service.search('search/test', {}).subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/search/test');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should return an observable with errors', () => {
    const typeErrorName = 'TypeErrorControlled';

    service.search('search/test', {}).subscribe(users => {
    }, error => {
      expect(error.error.type).toEqual(typeErrorName);
    });

    const req = httpMock.expectOne('http://localhost:3000/search/test');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent(typeErrorName, {message: 'error de Fernando'}));
  })

  it('should return an observable with params', () => {
    const dummyUsers = [
      { login: 'John' },
      { login: 'Doe' }
    ];

    service.search('search/test', {param1: 'value1', param2: 'value2'}).subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/search/test?param1=value1&param2=value2');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });


});
