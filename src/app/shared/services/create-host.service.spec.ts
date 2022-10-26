/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateHostService } from './create-host.service';

describe('Service: CreateHost', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateHostService]
    });
  });

  it('should ...', inject([CreateHostService], (service: CreateHostService) => {
    expect(service).toBeTruthy();
  }));
});
