/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, inject } from '@angular/core/testing';
import { FakerMethodsHttpService } from './faker-methods-http.service';

describe('Service: FakerMethodsHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakerMethodsHttpService]
    });
  });

  it('should ...', inject([FakerMethodsHttpService], (service: FakerMethodsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
