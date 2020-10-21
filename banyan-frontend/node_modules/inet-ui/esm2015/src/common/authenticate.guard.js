/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SecurityService } from "inet-core";
export class AuthenticateGuard {
    /**
     * @param {?} securityService
     */
    constructor(securityService) {
        this.securityService = securityService;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        let roles = (/** @type {?} */ (next.data["roles"]));
        //console.log('[canActivate][with roles]', roles);
        return this.securityService.hasRole(roles.join(','));
    }
}
AuthenticateGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthenticateGuard.ctorParameters = () => [
    { type: SecurityService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthenticateGuard.prototype.securityService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlLmd1YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9jb21tb24vYXV0aGVudGljYXRlLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFHMUMsTUFBTSxPQUFPLGlCQUFpQjs7OztJQUM1QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFFcEQsQ0FBQzs7Ozs7O0lBQ0QsV0FBVyxDQUNULElBQTRCLEVBQzVCLEtBQTBCOztZQUN0QixLQUFLLEdBQUcsbUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBaUI7UUFDL0Msa0RBQWtEO1FBQ2xELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OztZQVhGLFVBQVU7Ozs7WUFGSCxlQUFlOzs7Ozs7O0lBSVQsNENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1NlY3VyaXR5U2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRlR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBTZWN1cml0eVNlcnZpY2UpIHtcblxuICB9XG4gIGNhbkFjdGl2YXRlKFxuICAgIG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHwgUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4ge1xuICAgIGxldCByb2xlcyA9IG5leHQuZGF0YVtcInJvbGVzXCJdIGFzIEFycmF5PHN0cmluZz47XG4gICAgLy9jb25zb2xlLmxvZygnW2NhbkFjdGl2YXRlXVt3aXRoIHJvbGVzXScsIHJvbGVzKTtcbiAgICByZXR1cm4gdGhpcy5zZWN1cml0eVNlcnZpY2UuaGFzUm9sZShyb2xlcy5qb2luKCcsJykpO1xuICB9XG59XG4iXX0=