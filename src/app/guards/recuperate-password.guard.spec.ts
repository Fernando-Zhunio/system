import { TestBed } from '@angular/core/testing';

import { RecuperatePasswordGuard } from './recuperate-password.guard';

describe('RecuperatePasswordGuard', () => {
  let guard: RecuperatePasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecuperatePasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
