import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoPersonModalComponent } from './add-info-person-modal.component';

describe('AddInfoPersonModalComponent', () => {
  let component: AddInfoPersonModalComponent;
  let fixture: ComponentFixture<AddInfoPersonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfoPersonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfoPersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
