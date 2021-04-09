import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepublicarCuentasModalComponent } from './republicar-cuentas-modal.component';

describe('RepublicarCuentasModalComponent', () => {
  let component: RepublicarCuentasModalComponent;
  let fixture: ComponentFixture<RepublicarCuentasModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepublicarCuentasModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepublicarCuentasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
