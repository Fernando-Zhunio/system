import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListPricesComponent } from './modal-list-prices.component';

describe('ModalListPricesComponent', () => {
  let component: ModalListPricesComponent;
  let fixture: ComponentFixture<ModalListPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
