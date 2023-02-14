/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocketsManagerService } from './sockets-manager.service';

describe('Service: SocketsManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketsManagerService]
    });
  });

  it('should ...', inject([SocketsManagerService], (service: SocketsManagerService) => {
    expect(service).toBeTruthy();
  }));
});
