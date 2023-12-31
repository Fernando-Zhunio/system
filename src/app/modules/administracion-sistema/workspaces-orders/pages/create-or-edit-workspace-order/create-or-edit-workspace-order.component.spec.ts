/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditWorkspaceOrderComponent } from './create-or-edit-workspace-order.component';

describe('CreateOrEditWorkspaceOrderComponent', () => {
  let component: CreateOrEditWorkspaceOrderComponent;
  let fixture: ComponentFixture<CreateOrEditWorkspaceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditWorkspaceOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditWorkspaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
