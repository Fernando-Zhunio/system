import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditLocationComponent } from './create-or-edit-location.component';

describe('CreateOrEditLocationComponent', () => {
  let component: CreateOrEditLocationComponent;
  let fixture: ComponentFixture<CreateOrEditLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
