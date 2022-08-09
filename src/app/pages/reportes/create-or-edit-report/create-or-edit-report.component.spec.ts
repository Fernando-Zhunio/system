import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditReportComponent } from './create-or-edit-report.component';

describe('CreateOrEditReportComponent', () => {
  let component: CreateOrEditReportComponent;
  let fixture: ComponentFixture<CreateOrEditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
