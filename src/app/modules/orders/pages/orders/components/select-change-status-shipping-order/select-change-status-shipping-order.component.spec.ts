import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChangeStatusShippingOrderComponent } from './select-change-status-shipping-order.component';

describe('SelectChangeStatusShippingOrderComponent', () => {
  let component: SelectChangeStatusShippingOrderComponent;
  let fixture: ComponentFixture<SelectChangeStatusShippingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectChangeStatusShippingOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectChangeStatusShippingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
