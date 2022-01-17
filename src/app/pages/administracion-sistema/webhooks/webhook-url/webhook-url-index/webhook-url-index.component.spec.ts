import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookUrlIndexComponent } from './webhook-url-index.component';

describe('WebhookUrlIndexComponent', () => {
  let component: WebhookUrlIndexComponent;
  let fixture: ComponentFixture<WebhookUrlIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhookUrlIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookUrlIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
