/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxSearchBarButtonsSetComponent } from './ngx-search-bar-buttons-set.component';

describe('NgxSearchBarButtonsSetComponent', () => {
  let component: NgxSearchBarButtonsSetComponent;
  let fixture: ComponentFixture<NgxSearchBarButtonsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSearchBarButtonsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchBarButtonsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
