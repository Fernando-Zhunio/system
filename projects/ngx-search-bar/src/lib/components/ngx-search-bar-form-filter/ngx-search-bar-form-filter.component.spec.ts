/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxSearchBarFormFilterComponent } from './ngx-search-bar-form-filter.component';

describe('NgxSearchBarFormFilterComponent', () => {
  let component: NgxSearchBarFormFilterComponent;
  let fixture: ComponentFixture<NgxSearchBarFormFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSearchBarFormFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchBarFormFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
