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
    console.log('shouldDetach');

    return route.routeConfig.data && route.routeConfig.data.reuse;
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    console.log('store');

    if (handler && this.cache) {
      console.log({route:this.getUrl(route)});
      this.cache[this.getUrl(route)] = handler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('shouldAttach');
    if(this.getUrl(route) in this.cache){
      return true;
    }
    return false;
    // return !!this.cache[this.getUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log('retrieve');

    if (!route.routeConfig || route.routeConfig.loadChildren || !this.cache) {
      return null;
    }
    console.log(this.getUrl(route));
    return this.cache[this.getUrl(route)] || null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot,current: ActivatedRouteSnapshot): boolean {
    console.log( 'shouldReuseRoute');

    if (future.routeConfig &&future.routeConfig?.data && future.routeConfig?.data?.reuse) {
      console.log({'name': future.routeConfig.data.name});
      return future.routeConfig.data?.reuse;
    }
    return future.routeConfig === current.routeConfig;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    console.log( route.url);
      return route.routeConfig?.data?.name || null;
      // return route.routeConfig.component.name;
  }
}
