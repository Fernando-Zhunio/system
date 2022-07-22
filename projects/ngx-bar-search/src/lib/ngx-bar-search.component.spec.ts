import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBarSearchComponent } from './ngx-bar-search.component';

describe('NgxBarSearchComponent', () => {
  let component: NgxBarSearchComponent;
  let fixture: ComponentFixture<NgxBarSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBarSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
