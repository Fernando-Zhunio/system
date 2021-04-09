import { TestBed } from '@angular/core/testing';

import { ConfirmCodeGuard } from './confirm-code.guard';

describe('ConfirmCodeGuard', () => {
  let guard: ConfirmCodeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmCodeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
