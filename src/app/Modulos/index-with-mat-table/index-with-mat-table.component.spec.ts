import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexWithMatTableComponent } from './index-with-mat-table.component';

describe('IndexWithMatTableComponent', () => {
  let component: IndexWithMatTableComponent;
  let fixture: ComponentFixture<IndexWithMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexWithMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexWithMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
