import { TestBed } from '@angular/core/testing';

import { Notification.EffectService } from './notification.effect.service';

describe('Notification.EffectService', () => {
  let service: Notification.EffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notification.EffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
