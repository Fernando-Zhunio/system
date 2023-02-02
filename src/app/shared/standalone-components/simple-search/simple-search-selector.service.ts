import { TemplateRef } from '@angular/core';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SimpleSearchDialogRef } from './simple-search-dialog-ref';
import { CreateHostDirective } from '../../directives/create-host.directive';
import { SimpleSearchComponent } from './simple-search.component';

export class SimpleSearchSelectorDialogData {
  path: string;
  data?: any;
  isMultiSelection?: boolean;
  loadInit?: boolean;
  placeholder?: string;
  columns?: number;
  itemTemplateRef?: TemplateRef<any>;
  currentItemSelect?: any[];
  key?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SimpleSearchSelectorService {

  private createHostDirective: CreateHostDirective;
  componentRefMap: Map<Symbol, { componentRef: ComponentRef<any>, beforeClose: Subject<any> }> = new Map<Symbol, { componentRef: ComponentRef<any>, beforeClose: Subject<any> }>();

  constructor() { }

  setCreateHostDirective(createHostDirective: CreateHostDirective) {
    this.createHostDirective = createHostDirective;
  }

  openDialogSelector(data: SimpleSearchSelectorDialogData | {data: any} | null = null, customHost: CreateHostDirective | null = null) {
    return this.openDialog(SimpleSearchComponent, data, customHost);
  }

  openDialog(component: any, data: SimpleSearchSelectorDialogData | {data: any} | null = null, customHost: CreateHostDirective | null = null) {
    const host: CreateHostDirective = customHost ?? this.createHostDirective;
    const { id, componentRef } = this.createComponent(component, host, data);

    return {
      componentRef,
      close: () => {
        this.close(id);
      },
      beforeClose: (): Observable<any> => {
        return this.componentRefMap.get(id)!.beforeClose.pipe(take(1));
      }
    }
  }

  private createComponent(component, host: CreateHostDirective, data): { id: Symbol, componentRef: ComponentRef<any> } {
    const id = Symbol();
    const componentRef = host.viewContainerRef
      .createComponent(component, { injector: this.generateInjector(id, data) });
    // componentRef.injector.get(CreateHostRef).componentRef = componentRef;
    this.componentRefMap.set(id, { componentRef, beforeClose: new Subject<any>() });
    // this.assignData(data, componentRef);
    return { id, componentRef };
  }

  generateInjector(id, info?: SimpleSearchSelectorDialogData): Injector {
    const SimpleSearchDialogRefOverride = new SimpleSearchDialogRef(this, id)
    const providers: {provide: any, [key:string]: any}[] = [
      {
        provide: SimpleSearchDialogRef,
        useValue: SimpleSearchDialogRefOverride
      },
    ]
    if (info) {
      providers.push({
        provide: SimpleSearchSelectorDialogData,
        useValue: info
      })
    }

    return Injector.create({
      providers
    });
  }

  destroyAllComponents() {
    this.createHostDirective.viewContainerRef.clear();
  }

  close(id: any, data: any = null) {
    const { componentRef, beforeClose } = this.componentRefMap.get(id)!;
    beforeClose.next(data);
    componentRef?.destroy();
    this.componentRefMap.delete(id);
  }
}
