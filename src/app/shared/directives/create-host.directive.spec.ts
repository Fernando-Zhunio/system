/* tslint:disable:no-unused-variable */

// import { ViewContainerRef } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
import { CreateHostDirective } from './create-host.directive';

describe('Directive: CreateHost', () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [
  //       {
  //         provide: ViewContainerRef,
  //       }
  //     ]
  //   });   
  // });
  it('should create an instance', () => {
    const directive = new CreateHostDirective(MockViewContainerRef as any);
    expect(directive).toBeTruthy();
  });
});

class MockViewContainerRef {
  createComponent() {}
}