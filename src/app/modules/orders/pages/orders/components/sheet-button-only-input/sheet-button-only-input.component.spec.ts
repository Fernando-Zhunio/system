/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetButtonOnlyInputComponent } from './sheet-button-only-input.component';

describe('SheetButtonOnlyInputComponent', () => {
  let component: SheetButtonOnlyInputComponent;
  let fixture: ComponentFixture<SheetButtonOnlyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetButtonOnlyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetButtonOnlyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
