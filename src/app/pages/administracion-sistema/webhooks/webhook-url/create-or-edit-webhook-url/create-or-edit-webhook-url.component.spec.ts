import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditWebhookUrlComponent } from './create-or-edit-webhook-url.component';

describe('CreateOrEditWebhookUrlComponent', () => {
  let component: CreateOrEditWebhookUrlComponent;
  let fixture: ComponentFixture<CreateOrEditWebhookUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditWebhookUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditWebhookUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
