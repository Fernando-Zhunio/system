/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonDataComponent } from './person-data.component';

describe('PersonDataComponent', () => {
  let component: PersonDataComponent;
  let fixture: ComponentFixture<PersonDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
