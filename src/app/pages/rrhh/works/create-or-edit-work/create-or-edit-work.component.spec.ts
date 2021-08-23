import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditWorkComponent } from './create-or-edit-work.component';

describe('CreateOrEditWorkComponent', () => {
  let component: CreateOrEditWorkComponent;
  let fixture: ComponentFixture<CreateOrEditWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
