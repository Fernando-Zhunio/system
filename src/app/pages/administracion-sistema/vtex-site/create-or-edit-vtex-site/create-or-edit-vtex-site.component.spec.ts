import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditVtexSiteComponent } from './create-or-edit-vtex-site.component';

describe('CreateOrEditVtexSiteComponent', () => {
  let component: CreateOrEditVtexSiteComponent;
  let fixture: ComponentFixture<CreateOrEditVtexSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditVtexSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditVtexSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
