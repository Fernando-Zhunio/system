/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogHistoryPricesProductComponent } from './dialog-history-prices-product.component';

describe('DialogHistoryPricesProductComponent', () => {
  let component: DialogHistoryPricesProductComponent;
  let fixture: ComponentFixture<DialogHistoryPricesProductComponent>;

  beforeEach(async(() => {
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
