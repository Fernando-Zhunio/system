import { TestBed } from '@angular/core/testing';

import { MethodsHttpService } from './methods-http.service';

describe('MethodsHttpService', () => {
  let service: MethodsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
