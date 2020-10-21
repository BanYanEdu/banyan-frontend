import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import {ROUTES_TO_CACHE} from "../model/app-constants";

export class CustomCacheRouteReuseStrategy implements RouteReuseStrategy {
    routesToCache: string[] = ROUTES_TO_CACHE;

    handlers: { [key: string]: DetachedRouteHandle } = {};
    private shouldDelete: boolean;
    private shouldAttachPath: string;

    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route) {
            return false;
        }
        const path = this.getPath(route);
        return this.routesToCache.indexOf(path) > -1;
    }

    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const path = this.getPath(route);
        this.handlers[path] = handle;
    }

    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getPath(route);
        this.shouldAttachPath = path;
        return !!route.routeConfig && !!this.handlers[path];
    }

    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }
        if (this.shouldDelete) {
            this.deleteRouteSnapshot(this.getPath(route));
        }
        const path = this.getPath(route);

        if (this.handlers[path] && this.shouldAttachPath !== path) {
            const component = this.handlers[path]['componentRef']['instance'];
            if (component) {
                window.dispatchEvent(new Event('resize'));
                if (component['reload']) {
                    const reloadFn = component['reload'].bind(component);
                    if (reloadFn && iNet.isFunction(reloadFn)) {
                        reloadFn();
                    }
                }
            }
        }
        return this.handlers[path];
    }

    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        this.shouldDelete = future.routeConfig && curr.routeConfig && future.routeConfig.loadChildren !== curr.routeConfig.loadChildren;
        return future.routeConfig === curr.routeConfig;
    }

    private getPath(route: ActivatedRouteSnapshot, parentPath?: string): string {
        let path = '';
        if (route.routeConfig != null && route.routeConfig.path != null) {
            path = route.routeConfig.path;
        }
        if (parentPath != null && parentPath !== '') {
            path = `${path}/${parentPath}`;
        }
        if (route.parent != null) {
            return this.getPath(route.parent, path);
        }
        path = path.indexOf('/') === 0 ? path.substring(1, path.length) : path;
        return path;
    }

    private deleteRouteSnapshot(name: string): void {
        if (this.handlers.hasOwnProperty(name)) {
            delete this.handlers[name];
        }
    }
}
