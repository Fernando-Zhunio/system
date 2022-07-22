import { TestBed } from '@angular/core/testing';

import { NgxBarSearchService } from './ngx-bar-search.service';

describe('NgxBarSearchService', () => {
  let service: NgxBarSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBarSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
