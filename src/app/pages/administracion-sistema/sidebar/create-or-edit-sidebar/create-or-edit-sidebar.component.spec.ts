import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditSidebarComponent } from './create-or-edit-sidebar.component';

describe('CreateOrEditSidebarComponent', () => {
  let component: CreateOrEditSidebarComponent;
  let fixture: ComponentFixture<CreateOrEditSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
