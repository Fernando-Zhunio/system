import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTemplateOnlyInputComponent } from './custom-template-only-input.component';

describe('CustomTemplateOnlyInputComponent', () => {
  let component: CustomTemplateOnlyInputComponent;
  let fixture: ComponentFixture<CustomTemplateOnlyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTemplateOnlyInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTemplateOnlyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
