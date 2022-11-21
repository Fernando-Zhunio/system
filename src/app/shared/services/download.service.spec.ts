/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DownloadAndRedirectService } from './download.service';

describe('Service: Download', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadAndRedirectService]
    });
  });

  it('should ...', inject([DownloadAndRedirectService], (service: DownloadAndRedirectService) => {
    expect(service).toBeTruthy();
  }));
});
