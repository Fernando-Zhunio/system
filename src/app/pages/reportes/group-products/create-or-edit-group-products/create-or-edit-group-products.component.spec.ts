import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditGroupProductsComponent } from './create-or-edit-group-products.component';

describe('CreateOrEditGroupProductsComponent', () => {
  let component: CreateOrEditGroupProductsComponent;
  let fixture: ComponentFixture<CreateOrEditGroupProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditGroupProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditGroupProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
