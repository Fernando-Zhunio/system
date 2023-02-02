import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPromotionsComponent } from './index-promotions.component';

describe('PromotionIndexComponent', () => {
  let component: IndexPromotionsComponent;
  let fixture: ComponentFixture<IndexPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPromotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
