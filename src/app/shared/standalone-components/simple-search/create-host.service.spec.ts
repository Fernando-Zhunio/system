/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimpleSearchSelectorService } from './simple-search-selector.service';

describe('Service: CreateHost', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleSearchSelectorService]
    });
  });

  it('should ...', inject([SimpleSearchSelectorService], (service: SimpleSearchSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
