import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesOrderComponent } from './invoices-order.component';

describe('InvoicesOrderComponent', () => {
  let component: InvoicesOrderComponent;
  let fixture: ComponentFixture<InvoicesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
