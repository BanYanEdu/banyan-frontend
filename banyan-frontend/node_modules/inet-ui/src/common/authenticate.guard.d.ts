import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SecurityService } from "inet-core";
export declare class AuthenticateGuard implements CanActivate {
    private securityService;
    constructor(securityService: SecurityService);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
