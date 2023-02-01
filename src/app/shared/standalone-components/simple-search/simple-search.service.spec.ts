/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimpleSearchService } from './simple-search.service';

describe('Service: SimpleSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleSearchService]
    });
  });

  it('should ...', inject([SimpleSearchService], (service: SimpleSearchService) => {
    expect(service).toBeTruthy();
  }));
});
