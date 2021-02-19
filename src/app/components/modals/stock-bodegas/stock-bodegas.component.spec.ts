import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBodegasComponent } from './stock-bodegas.component';

describe('StockBodegasComponent', () => {
  let component: StockBodegasComponent;
  let fixture: ComponentFixture<StockBodegasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockBodegasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockBodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
