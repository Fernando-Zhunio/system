import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWebRrhhComponent } from './users-web-rrhh.component';

describe('UsersWebRrhhComponent', () => {
  let component: UsersWebRrhhComponent;
  let fixture: ComponentFixture<UsersWebRrhhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersWebRrhhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersWebRrhhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
