import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NGX_SEARCH_BAR_DATA } from '../../utils/DATA_FOR_SEARCH_BAR';
import { NgxSearchBarComponent } from './ngx-search-bar.component';

describe('NgxSearchBarComponent', () => {
  let component: NgxSearchBarComponent;
  let fixture: ComponentFixture<NgxSearchBarComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxSearchBarComponent],
      imports: [
        HttpClientTestingModule,
        MatMenuModule,
        MatBadgeModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: NGX_SEARCH_BAR_DATA,
          useValue: {
            BASE_URL: 'http://localhost:3000/',
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#search', () => {
    component.path = 'posts'
    component.nameInputSearch = 'search2';
    component.search();
    spyOn(component.data, 'emit');

    const req = httpMock.expectOne('http://localhost:3000/posts?search2=&fernando=fer&fernando2=fer2');
    expect(req.request.method).toBe('GET');
    req.flush('test');

    expect(component.data.emit).toHaveBeenCalledWith('test');

  })

  it('#search with paginator', () => {
    component.withParamsClean = false;
    component.path = 'posts'
    component.nameInputSearch = 'search2';
    component.auxfilters = {
      "fernando": {
        friendlyName: 'Fernando',
        value: 'fer',
      }, 
      "fernando2": {
        friendlyName: 'Fernando2',
        value: 'fer2',
      },
    }
    component.search();
    spyOn(component.data, 'emit');

    const req = httpMock.expectOne('http://localhost:3000/posts?search2=&fernando=fer&fernando2=fer2&pageIndex=1&pageSize=15');
    expect(req.request.method).toBe('GET');
    req.flush('test');

    expect(component.data.emit).toHaveBeenCalledWith('test');
  })

  it('#validate options', () => {
    
    fixture.detectChanges();

    expect(component).toBeTrue();
  });

  it('#validate callback overrideRecibePaginateParams', () => {
    component.search();
    const req = httpMock.expectOne('http://localhost:3000/posts?search=&pageIndex=1&pageSize=15');
    expect(req.request.method).toBe('GET');
    req.flush({length: 100, pageIndex: 1, pageSize: 15});
    console.log({component: component['dataInject']})
  });

  it('#handlePageEvent', () => {
    const req = httpMock.expectOne('http://localhost:3000/posts?search=&pageIndex=1&pageSize=15');
    expect(req.request.method).toBe('GET');
    req.flush({length: 100, pageIndex: 1, pageSize: 15});
    console.log({component: component['dataInject']})

    const req2 = httpMock.expectOne('http://localhost:3000/posts?search=&pageIndex=2&pageSize=15');
    expect(req2.request.method).toBe('GET');
    req2.flush({length: 100, pageIndex: 2, pageSize: 15});
    console.log({component: component['dataInject']})
  });
});
