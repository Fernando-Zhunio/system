import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPricesComponent } from './modal-prices.component';

describe('ModalPricesComponent', () => {
  let component: ModalPricesComponent;
  let fixture: ComponentFixture<ModalPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
