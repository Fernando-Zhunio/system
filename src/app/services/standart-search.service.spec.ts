import { TestBed } from '@angular/core/testing';

import { StandartSearchService } from './standart-search.service';

describe('StandartSearchService', () => {
  let service: StandartSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandartSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
