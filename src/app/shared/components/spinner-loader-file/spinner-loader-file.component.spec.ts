/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpinnerLoaderFileComponent } from './spinner-loader-file.component';

describe('SpinnerLoaderFileComponent', () => {
  let component: SpinnerLoaderFileComponent;
  let fixture: ComponentFixture<SpinnerLoaderFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerLoaderFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerLoaderFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
