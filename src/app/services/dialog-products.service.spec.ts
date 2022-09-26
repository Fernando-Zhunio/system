/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogProductsService } from './dialog-products.service';

describe('Service: DialogProducts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogProductsService]
    });
  });

  it('should ...', inject([DialogProductsService], (service: DialogProductsService) => {
    expect(service).toBeTruthy();
  }));
});
