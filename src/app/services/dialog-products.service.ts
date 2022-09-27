import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { SearchProductsDialogComponent } from '../shared/search-products-dialog/search-products-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogProductsService {

  dialogComponentRef: ComponentRef<any>
  dialogObservable: Subject<any> = new Subject<any>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

  open( url, options: { data: { isMultiple: boolean, productsSelected?: Map<number, any> }} | null = null) {
    const componentFactory: any = this.componentFactoryResolver.resolveComponentFactory(SearchProductsDialogComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.url = url;
    if (options && options.data) {
      componentRef.instance.onlyOne = options.data.isMultiple;
      componentRef.instance.productsSelected = options.data?.productsSelected || new Map<number, any>();
    }
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;
    return this.dialogObservable.pipe(
      first()
    );
  }

  close(data: any = null) {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
    if (data) {
      this.dialogObservable.next(data);
    }
  }
}
