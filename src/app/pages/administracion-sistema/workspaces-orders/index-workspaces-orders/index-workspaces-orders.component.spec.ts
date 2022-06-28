/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndexWorkspacesOrdersComponent } from './index-workspaces-orders.component';

describe('IndexWorkspacesOrdersComponent', () => {
  let component: IndexWorkspacesOrdersComponent;
  let fixture: ComponentFixture<IndexWorkspacesOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexWorkspacesOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexWorkspacesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
