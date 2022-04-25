import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProductsShippingComponent } from './modal-add-products-shipping.component';

describe('ModalAddProductsShippingComponent', () => {
  let component: ModalAddProductsShippingComponent;
  let fixture: ComponentFixture<ModalAddProductsShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddProductsShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddProductsShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
