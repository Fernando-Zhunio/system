import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsPermissionsIndexComponent } from './groups-permissions-index.component';

describe('GroupsPermissionsIndexComponent', () => {
  let component: GroupsPermissionsIndexComponent;
  let fixture: ComponentFixture<GroupsPermissionsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsPermissionsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsPermissionsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
