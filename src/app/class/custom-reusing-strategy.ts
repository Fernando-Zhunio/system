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

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig.data && route.routeConfig.data.reuse;
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    if (handler) {
      console.log(this.getUrl(route));
      this.cache[this.getUrl(route)] = handler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.cache[this.getUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }
    console.log(this.cache);

    return this.cache[this.getUrl(route)];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot,current: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig &&future.routeConfig?.data && future.routeConfig?.data?.reuse !== undefined) {
      console.log(future.routeConfig.data.reuse);
      return future.routeConfig.data?.reuse;
    }
    return future.routeConfig === current.routeConfig;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
      return route.routeConfig?.data?.name;
  }
}
