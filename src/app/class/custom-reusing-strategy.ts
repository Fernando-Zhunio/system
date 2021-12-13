import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouterModule,
  Routes,
  UrlSegment,
} from '@angular/router';

export class CustomReusingStrategy implements RouteReuseStrategy {
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




//   // Specify the routes to reuse/cache in an array.
routesToCache: string[] = ['/recursos-humanos/appointments', '/home/dashboard', '/recursos-humanos/dashboard', '/recursos-humanos/works'];
storedRouteHandles = new Map<string, DetachedRouteHandle>();
// Decides if the route should be stored
// Decide si la ruta debe almacenarse
shouldDetach(route: ActivatedRouteSnapshot): boolean {
console.log({shouldDetach: this.getPath(route), save: this.routesToCache.indexOf(this.getPath(route)) > -1});
return this.routesToCache.indexOf(this.getPath(route)) > -1;
}

// Store the information for the route we're destructing
store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
  if (this.routesToCache.indexOf(this.getPath(route)) > -1) {
    console.log('storing');
    const path = this.getPath(route);
    console.log({storing: path});
    this.storedRouteHandles.set(path, handle);
    console.log(this.storedRouteHandles.entries());
  }
}

// Return true if we have a stored route object for the next route
// Devuelve verdadero si tenemos un objeto de ruta almacenado para la siguiente ruta
shouldAttach(route: ActivatedRouteSnapshot): boolean {
return this.storedRouteHandles.has(this.getPath(route));
}

// If we returned true in shouldAttach(), now return the actual route data for restoration
// Si devolvimos verdadero en shouldAttach (), ahora devolvemos los datos de la ruta real para la restauración
retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
}
// Reuse the route if we're going to and from the same route
// Reutilizar la ruta si vamos hacia y desde la misma ruta
shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
// if (future.component && (<any>future.component).name == 'ShowComponent' ) {
// return false;
// }
return future.routeConfig === curr.routeConfig;
}
// Helper method to return a path,
// since javascript map object returns an object or undefined.
private getPath(route: ActivatedRouteSnapshot): string {
  const __path = route.pathFromRoot
  .map(v => v.url.map(segment => segment.toString()).join('/'))
  .join('/').replace(/\/\//g, '/');
  console.log( __path);
  return __path;
// let path = '';
// console.log(route.routeConfig);

// console.log(document.location.hash.replace('#', ''));
// let path = '';



  // if (route.routeConfig != null && route.routeConfig.path != null) {
// path = route.routeConfig.path;
// }
// return path;
}


}
