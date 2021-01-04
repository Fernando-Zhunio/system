import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoLibreCreateOrEditComponent } from './mercado-libre-create-or-edit.component';

describe('MercadoLibreCreateOrEditComponent', () => {
  let component: MercadoLibreCreateOrEditComponent;
  let fixture: ComponentFixture<MercadoLibreCreateOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoLibreCreateOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoLibreCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
