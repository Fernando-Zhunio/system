import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[createHost]'
})
export class CreateHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
