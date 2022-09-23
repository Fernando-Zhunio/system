import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsIndexComponent } from './tickets-index.component';

describe('TicketsIndexComponent', () => {
  let component: TicketsIndexComponent;
  let fixture: ComponentFixture<TicketsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
