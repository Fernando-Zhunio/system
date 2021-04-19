import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAdsManagerComponent } from './facebook-ads-manager.component';

describe('FacebookAdsManagerComponent', () => {
  let component: FacebookAdsManagerComponent;
  let fixture: ComponentFixture<FacebookAdsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookAdsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookAdsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
