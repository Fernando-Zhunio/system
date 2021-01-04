import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasCreateOrEditComponent } from './categorias-create-or-edit.component';

describe('CategoriasCreateOrEditComponent', () => {
  let component: CategoriasCreateOrEditComponent;
  let fixture: ComponentFixture<CategoriasCreateOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasCreateOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
