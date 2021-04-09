import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailModalComponent } from './create-email-modal.component';

describe('CreateEmailModalComponent', () => {
  let component: CreateEmailModalComponent;
  let fixture: ComponentFixture<CreateEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
