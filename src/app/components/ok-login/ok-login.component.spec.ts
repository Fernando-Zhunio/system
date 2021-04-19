import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkLoginComponent } from './ok-login.component';

describe('OkLoginComponent', () => {
  let component: OkLoginComponent;
  let fixture: ComponentFixture<OkLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
