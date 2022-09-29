/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoryPricesProductComponent } from './dialog-history-prices-product.component';

describe('DialogHistoryPricesProductComponent', () => {
  let component: DialogHistoryPricesProductComponent;
  let fixture: ComponentFixture<DialogHistoryPricesProductComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHistoryPricesProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistoryPricesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
