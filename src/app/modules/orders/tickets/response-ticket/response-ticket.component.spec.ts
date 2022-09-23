import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTicketComponent } from './response-ticket.component';

describe('ResponseTicketComponent', () => {
  let component: ResponseTicketComponent;
  let fixture: ComponentFixture<ResponseTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
