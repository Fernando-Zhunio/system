import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsIndexComponent } from './positions-index.component';

describe('PositionsIndexComponent', () => {
  let component: PositionsIndexComponent;
  let fixture: ComponentFixture<PositionsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
