import { TestBed } from '@angular/core/testing';

import { NotificationEffectService } from './notification.effect.service';

describe('Notification.EffectService', () => {
  let service: NotificationEffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationEffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
