import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAdsSetComponent } from './facebook-ads-set.component';

describe('FacebookAdsSetComponent', () => {
  let component: FacebookAdsSetComponent;
  let fixture: ComponentFixture<FacebookAdsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookAdsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookAdsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
