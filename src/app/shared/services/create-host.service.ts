import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CreateHostRef } from '../class/create-host-ref';
import { CreateHostDirective } from '../directives/create-host.directive';

type DataComponent = {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CreateHostService {

  private createHostDirective: CreateHostDirective;
  componentRefMap: Map<Symbol, ComponentRef<any>> = new Map<Symbol, ComponentRef<any>>();

  data: any = null;
  observerComponent: Subject<any> = new Subject();
  constructor() { }

  setCreateHostDirective(createHostDirective: CreateHostDirective) {
    this.createHostDirective = createHostDirective;
  }

  injectComponent(component: any, data: DataComponent | null = null, _multi: boolean = true, customHost: CreateHostDirective | null = null) {
    const host: CreateHostDirective = customHost ? customHost : this.createHostDirective;
    const id = Symbol();
    const componentRef = host.viewContainerRef
      .createComponent<any>(component, { injector: this.generateInjector(id) });
    this.componentRefMap.set(id, componentRef);

    this.assignData(data, componentRef);
    return this.observerComponent.pipe(take(1));
  }

  assignData(data: DataComponent | null, componentRef) {
    if (data) {
      Object.keys(data).forEach(key => {
        componentRef.instance[key] = data[key];
      });
    }
  }

  generateInjector(id): Injector {
    const overrideClass = new CreateHostRef(this)
    overrideClass.setId(id)
    return Injector.create({
      providers: [
        {
          provide: CreateHostRef,
          useValue: overrideClass
        }
      ]
    });
  }

  destroyAllComponents() {
    this.createHostDirective.viewContainerRef.clear();
  }

  close(id: any, data: any = null) {
    this.componentRefMap.get(id)?.destroy();
    this.observerComponent.next(data);
  }
}
