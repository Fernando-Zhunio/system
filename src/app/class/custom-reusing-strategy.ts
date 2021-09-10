import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouterModule,
  Routes,
  UrlSegment,
} from "@angular/router";

export class CustomReusingStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}

  /** Returns `false`, meaning the route (and its subtree) is never reattached */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /** Returns `null` because this strategy does not store routes for later re-use. */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    return null;
  }

  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and current route config are
   * identical.
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  // private cache: { [key: string]: DetachedRouteHandle } = {};

  // public clearCache():void{
  //   this.cache = {};
  // }
  // shouldDetach(route: ActivatedRouteSnapshot): boolean {
  //   console.log('shouldDetach');

  //   return route.routeConfig.data && route.routeConfig.data.reuse;
  // }

  // store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
  //   console.log('store');

  //   if (handler && this.cache) {
  //     console.log({route:this.getUrl(route)});
  //     this.cache[this.getUrl(route)] = handler;
  //   }
  // }

  // shouldAttach(route: ActivatedRouteSnapshot): boolean {
  //   console.log('shouldAttach');
  //   if(this.getUrl(route) in this.cache){
  //     return true;
  //   }
  //   return false;
  //   // return !!this.cache[this.getUrl(route)];
  // }

  // retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
  //   console.log('retrieve');

  //   if (!route.routeConfig || route.routeConfig.loadChildren || !this.cache) {
  //     return null;
  //   }
  //   console.log(this.getUrl(route));
  //   return this.cache[this.getUrl(route)] || null;
  // }

  // shouldReuseRoute(future: ActivatedRouteSnapshot,current: ActivatedRouteSnapshot): boolean {
  //   console.log( 'shouldReuseRoute');

  //   if (future.routeConfig &&future.routeConfig?.data && future.routeConfig?.data?.reuse) {
  //     console.log({'name': future.routeConfig.data.name});
  //     return future.routeConfig.data?.reuse;
  //   }
  //   return future.routeConfig === current.routeConfig;
  // }

  // getUrl(route: ActivatedRouteSnapshot): string {
  //   console.log( route.url);
  //     return route.routeConfig?.data?.name || null;
  //     // return route.routeConfig.component.name;
  // }


}
