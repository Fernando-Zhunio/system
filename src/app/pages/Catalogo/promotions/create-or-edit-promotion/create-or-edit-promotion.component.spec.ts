import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditPromotionComponent } from './create-or-edit-promotion.component';

describe('CreateOrEditPromotionComponent', () => {
  let component: CreateOrEditPromotionComponent;
  let fixture: ComponentFixture<CreateOrEditPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
