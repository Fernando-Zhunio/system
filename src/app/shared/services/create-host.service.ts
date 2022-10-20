import { ComponentRef, Injectable } from '@angular/core';
import { CreateHostDirective } from '../directives/create-host.directive';

type DataComponent = {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CreateHostService {

  private createHostDirective: CreateHostDirective;
  componentRef: ComponentRef<any>;
  counterImplements = 0
  constructor() { }

  setCreateHostDirective(createHostDirective: CreateHostDirective) {
    this.createHostDirective = createHostDirective;
  }
  
  createComponent(component, data: DataComponent | null = null, multi: boolean = true) {
    if(!multi && this.counterImplements > 0) {
      this.counterImplements++;
      return;
    }
    const componentRef = this.createHostDirective
      .viewContainerRef.createComponent<any>(component);
    
    if (data) {
      Object.keys(data).forEach(key => {
        componentRef.instance[key] = data[key];
      });
    }
    this.counterImplements++;
    return componentRef;
  }

  destroyComponent() {
    this.createHostDirective.viewContainerRef.clear();
    this.counterImplements--;
    console.log(this.componentRef);
  }
}
