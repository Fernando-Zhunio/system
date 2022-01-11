import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesIndexComponent } from './cities-index.component';

describe('CitiesIndexComponent', () => {
  let component: CitiesIndexComponent;
  let fixture: ComponentFixture<CitiesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
