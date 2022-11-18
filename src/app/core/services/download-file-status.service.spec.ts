import { TestBed } from '@angular/core/testing';

import { DownloadFileStatusService } from './download-file-status.service';

describe('DownloadFileStatusService', () => {
  let service: DownloadFileStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadFileStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
