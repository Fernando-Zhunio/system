import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesChartComponent } from './locales-chart.component';

describe('LocalesChartComponent', () => {
  let component: LocalesChartComponent;
  let fixture: ComponentFixture<LocalesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
