import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetFzComponent } from './sheet-fz.component';

describe('SheetFzComponent', () => {
  let component: SheetFzComponent;
  let fixture: ComponentFixture<SheetFzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetFzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetFzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
