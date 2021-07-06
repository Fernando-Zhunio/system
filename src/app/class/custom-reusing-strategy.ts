import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouterModule,
  Routes,
  UrlSegment,
} from "@angular/router";

export class CustomReusingStrategy implements RouteReuseStrategy {
  private cache: { [key: string]: DetachedRouteHandle } = {};

  public clearCache():void{
    this.cache = {};
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig.data && route.routeConfig.data.reuse;
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    if (handler && this.cache) {
      console.log({route:this.getUrl(route)});
      this.cache[this.getUrl(route)] = handler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.cache[this.getUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || route.routeConfig.loadChildren || !this.cache) {
      return null;
    }
    console.log(this.getUrl(route));
    return this.cache[this.getUrl(route)] || null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot,current: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig &&future.routeConfig?.data && future.routeConfig?.data?.reuse) {
      console.log({'name': future.routeConfig.data.name});
      return future.routeConfig.data?.reuse;
    }
    return future.routeConfig === current.routeConfig;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    console.log(route.routeConfig.component.name);
      // return route.routeConfig?.data?.name;
      return route.routeConfig.component.name;
  }
}
