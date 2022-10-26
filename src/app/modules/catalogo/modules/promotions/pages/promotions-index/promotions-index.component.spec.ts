import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsIndexComponent } from './promotions-index.component';

describe('PromotionsIndexComponent', () => {
  let component: PromotionsIndexComponent;
  let fixture: ComponentFixture<PromotionsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
