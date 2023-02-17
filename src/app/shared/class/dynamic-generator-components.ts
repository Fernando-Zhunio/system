import { ComponentRef, Injector } from "@angular/core";
import { CreateHostDirective } from "../directives/create-host.directive";

export class DynamicGeneratorComponent {
    createHostDirective: CreateHostDirective;

    // constructor(createHostDirective?: CreateHostDirective) {
    //     if (createHostDirective)
    //         this.createHostDirective = createHostDirective;
    // }
    setCreateHostDirective(createHostDirective: CreateHostDirective) {
        this.createHostDirective = createHostDirective;
    }

    createComponent(component: any, injector?: Injector, customHost?: CreateHostDirective): ComponentRef<any> {
        const host = customHost || this.createHostDirective;
        const componentRef = host.viewContainerRef
            .createComponent(component, { injector });
        return componentRef 
    }

}