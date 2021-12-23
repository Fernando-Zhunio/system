import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotsCreateOrEditComponent } from './chat-bots-create-or-edit.component';

describe('ChatBotsCreateOrEditComponent', () => {
  let component: ChatBotsCreateOrEditComponent;
  let fixture: ComponentFixture<ChatBotsCreateOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBotsCreateOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBotsCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
