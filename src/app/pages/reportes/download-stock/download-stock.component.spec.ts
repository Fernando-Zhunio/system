import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadStockComponent } from './download-stock.component';

describe('DownloadStockComponent', () => {
  let component: DownloadStockComponent;
  let fixture: ComponentFixture<DownloadStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
