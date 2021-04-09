import { TestBed } from '@angular/core/testing';

import { NewPasswordGuard } from './new-password.guard';

describe('NewPasswordGuard', () => {
  let guard: NewPasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
