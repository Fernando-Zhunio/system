import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProviderOrContactComponent } from './create-provider-or-contact.component';

describe('CreateProviderOrContactComponent', () => {
  let component: CreateProviderOrContactComponent;
  let fixture: ComponentFixture<CreateProviderOrContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProviderOrContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProviderOrContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
