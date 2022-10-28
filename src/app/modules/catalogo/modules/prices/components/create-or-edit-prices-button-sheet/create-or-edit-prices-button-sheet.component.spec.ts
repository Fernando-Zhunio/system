/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateOrEditPricesButtonSheetComponent } from './create-or-edit-prices-button-sheet.component';

describe('CreateOrEditPricesButtonSheetComponent', () => {
  let component: CreateOrEditPricesButtonSheetComponent;
  let fixture: ComponentFixture<CreateOrEditPricesButtonSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditPricesButtonSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditPricesButtonSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
