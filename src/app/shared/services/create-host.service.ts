import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
// import { take } from 'rxjs/operators';
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
  componentRefMap: Map<Symbol, {componentRef: ComponentRef<any>, beforeClose: Subject<any>}> = new Map<Symbol, {componentRef: ComponentRef<any>, beforeClose:  Subject<any>}>();

  // data: any = null;
  constructor() { }

  setCreateHostDirective(createHostDirective: CreateHostDirective) {
    this.createHostDirective = createHostDirective;
  }

  injectComponent<T = any>(component: any, data: DataComponent | null = null, _multi: boolean = true, customHost: CreateHostDirective | null = null) {
    const host: CreateHostDirective = customHost ?? this.createHostDirective;
     const {id, componentRef} = this.createComponent(component, host, data);
    return {
      componentRef,
      close: () => {
        this.close(id);
      },
      beforeClose: (): Observable<{data:T} | null> => {
        return this.componentRefMap.get(id)!.beforeClose.pipe(take(1));
      }
    }
  }

  assignData(data: DataComponent | null, componentRef) {
    if (data) {
      Object.keys(data).forEach(key => {
        componentRef.instance[key] = data[key];
      });
    }
  }

  private createComponent(component, host: CreateHostDirective, data): { id: Symbol, componentRef: ComponentRef<any> } {
    const id = Symbol();
    const componentRef = host.viewContainerRef
      .createComponent<any>(component, { injector: this.generateInjector(id) });
    componentRef.injector.get(CreateHostRef).componentRef = componentRef;
    this.componentRefMap.set(id, {componentRef, beforeClose:  new Subject<any>()});
    this.assignData(data, componentRef);
    return {id, componentRef};
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
    const {componentRef, beforeClose} = this.componentRefMap.get(id)!;
    beforeClose.next(data);
    componentRef?.destroy();
    this.componentRefMap.delete(id);
  }
}
