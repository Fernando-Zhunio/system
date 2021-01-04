import { TestBed } from '@angular/core/testing';

import { PrefijoService } from './prefijo.service';

describe('PrefijoService', () => {
  let service: PrefijoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefijoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
