/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxSearchBarPaginatorComponent } from './ngx-search-bar-paginator.component';

describe('NgxSearchBarPaginatorComponent', () => {
  let component: NgxSearchBarPaginatorComponent;
  let fixture: ComponentFixture<NgxSearchBarPaginatorComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSearchBarPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchBarPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate buttons', () => {
    
  })
});
