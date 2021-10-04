import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditVtexWarehousesComponent } from './create-or-edit-vtex-warehouses.component';

describe('CreateOrEditVtexWarehousesComponent', () => {
  let component: CreateOrEditVtexWarehousesComponent;
  let fixture: ComponentFixture<CreateOrEditVtexWarehousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditVtexWarehousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditVtexWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
