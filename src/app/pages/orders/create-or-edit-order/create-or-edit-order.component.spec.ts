import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditOrderComponent } from './create-or-edit-order.component';

describe('CreateOrEditOrderComponent', () => {
  let component: CreateOrEditOrderComponent;
  let fixture: ComponentFixture<CreateOrEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
