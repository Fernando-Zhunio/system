import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtexPricesComponent } from './vtex-prices.component';

describe('VtexPricesComponent', () => {
  let component: VtexPricesComponent;
  let fixture: ComponentFixture<VtexPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtexPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtexPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
