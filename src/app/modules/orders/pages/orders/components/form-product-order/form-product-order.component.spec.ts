/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormProductOrderComponent } from './form-product-order.component';

describe('FormProductOrderComponent', () => {
  let component: FormProductOrderComponent;
  let fixture: ComponentFixture<FormProductOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
