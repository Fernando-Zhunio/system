import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditRequestComponent } from './create-or-edit-request.component';

describe('CreateOrEditRequestComponent', () => {
  let component: CreateOrEditRequestComponent;
  let fixture: ComponentFixture<CreateOrEditRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
