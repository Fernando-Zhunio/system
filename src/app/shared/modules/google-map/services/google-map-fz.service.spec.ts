/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleMapFzService } from './google-map-fz.service';

describe('Service: GoogleMapFz', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapFzService]
    });
  });

  it('should ...', inject([GoogleMapFzService], (service: GoogleMapFzService) => {
    expect(service).toBeTruthy();
  }));
});
