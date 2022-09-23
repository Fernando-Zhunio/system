import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMbaItemComponent } from './payment-mba-item.component';

describe('PaymentMbaItemComponent', () => {
  let component: PaymentMbaItemComponent;
  let fixture: ComponentFixture<PaymentMbaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMbaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMbaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
