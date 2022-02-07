import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditPermissionComponent } from './create-or-edit-permission.component';

describe('CreateOrEditPermissionComponent', () => {
  let component: CreateOrEditPermissionComponent;
  let fixture: ComponentFixture<CreateOrEditPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
