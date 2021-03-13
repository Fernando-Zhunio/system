import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditRolesComponent } from './create-or-edit-roles.component';

describe('CreateOrEditRolesComponent', () => {
  let component: CreateOrEditRolesComponent;
  let fixture: ComponentFixture<CreateOrEditRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
