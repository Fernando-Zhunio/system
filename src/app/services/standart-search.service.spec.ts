import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
// import { RouterTestingModule } from '@angular/router/testing';

import { StandartSearchService } from './standart-search.service';

describe('StandartSearchService', () => {
  let service: StandartSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule ],
    });
    service = TestBed.inject(StandartSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
