import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionIndexComponent } from './promotion-index.component';

describe('PromotionIndexComponent', () => {
  let component: PromotionIndexComponent;
  let fixture: ComponentFixture<PromotionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
