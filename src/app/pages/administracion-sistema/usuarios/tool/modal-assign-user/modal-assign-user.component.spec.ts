import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignUserComponent } from './modal-assign-user.component';

describe('ModalAssignUserComponent', () => {
  let component: ModalAssignUserComponent;
  let fixture: ComponentFixture<ModalAssignUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAssignUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
