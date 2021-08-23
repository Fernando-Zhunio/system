import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecuperationPasswordComponent } from './form-recuperation-password.component';

describe('FormRecuperationPasswordComponent', () => {
  let component: FormRecuperationPasswordComponent;
  let fixture: ComponentFixture<FormRecuperationPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRecuperationPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecuperationPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
