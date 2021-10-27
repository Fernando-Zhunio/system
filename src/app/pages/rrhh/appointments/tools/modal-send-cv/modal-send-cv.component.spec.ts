import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendCvComponent } from './modal-send-cv.component';

describe('ModalSendCvComponent', () => {
  let component: ModalSendCvComponent;
  let fixture: ComponentFixture<ModalSendCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSendCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSendCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
