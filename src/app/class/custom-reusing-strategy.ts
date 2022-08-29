import { ComponentRef } from '@angular/core';
import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';
import { instanceOfReuseComponent, ReuseComponent } from '../interfaces/reuse-component';

export class CustomReusingStrategy implements RouteReuseStrategy {
  private storeRoutes = new Map<string, DetachedRouteHandle>();
  countForLoad = 0;
  acuForLoad = 0;
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const { reuse } = route?.data;
    if (reuse) {
      return true;
    }
    return false;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (this.loadNow(route)) {
      const key = this.generateKey(route);
      this.storeRoutes.set(key, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storeRoutes.has(this.generateKey(route));
  }



  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const handle = this.storeRoutes.get(this.generateKey(route)) as { componentRef: ComponentRef<ReuseComponent> };
    if (instanceOfReuseComponent(handle.componentRef.instance)) {
      if (this.loadNow(route)) {
        handle.componentRef.instance.loadInfo();
      }
    }
    return handle;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig === curr.routeConfig) {
      return true;
    }
    if (future.routeConfig?.data?.['reuse']) {
      return false;
    }
    return false;
  }

  private generateKey(route: ActivatedRouteSnapshot): string {
    const segments = route.pathFromRoot
      .map(segment => segment.url.join('/'))
      .filter(Boolean)
      .join('/');
    return '/' + segments;
  }

  private loadNow(route: ActivatedRouteSnapshot): boolean {
    this.countForLoad = route.pathFromRoot.length - 2;
    this.acuForLoad++;
    const isLoad = this.acuForLoad === this.countForLoad;
    if (isLoad) {
      this.acuForLoad = 0;
    }
    return isLoad;
  }



  // shouldDetach(route: ActivatedRouteSnapshot): boolean {
  //   return false;
  // }

  // /**
  //  * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
  //  */
  // store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}

  // /** Returns `false`, meaning the route (and its subtree) is never reattached */
  // shouldAttach(route: ActivatedRouteSnapshot): boolean {
  //   return false;
  // }

  // /** Returns `null` because this strategy does not store routes for later re-use. */
  // retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
  //   return null;
  // }

  // /**
  //  * Determines if a route should be reused.
  //  * This strategy returns `true` when the future route config and current route config are
  //  * identical.
  //  */
  // shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
  //   return future.routeConfig === curr.routeConfig;
  // }
}
