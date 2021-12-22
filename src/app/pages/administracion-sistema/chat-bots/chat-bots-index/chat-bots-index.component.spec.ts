import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotsIndexComponent } from './chat-bots-index.component';

describe('ChatBotsIndexComponent', () => {
  let component: ChatBotsIndexComponent;
  let fixture: ComponentFixture<ChatBotsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBotsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBotsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
