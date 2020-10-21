/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SecurityService } from "inet-core";
var AuthenticateGuard = /** @class */ (function () {
    function AuthenticateGuard(securityService) {
        this.securityService = securityService;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    AuthenticateGuard.prototype.canActivate = /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    function (next, state) {
        /** @type {?} */
        var roles = (/** @type {?} */ (next.data["roles"]));
        //console.log('[canActivate][with roles]', roles);
        return this.securityService.hasRole(roles.join(','));
    };
    AuthenticateGuard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthenticateGuard.ctorParameters = function () { return [
        { type: SecurityService }
    ]; };
    return AuthenticateGuard;
}());
export { AuthenticateGuard };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthenticateGuard.prototype.securityService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlLmd1YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9jb21tb24vYXV0aGVudGljYXRlLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFMUM7SUFFRSwyQkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBRXBELENBQUM7Ozs7OztJQUNELHVDQUFXOzs7OztJQUFYLFVBQ0UsSUFBNEIsRUFDNUIsS0FBMEI7O1lBQ3RCLEtBQUssR0FBRyxtQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFpQjtRQUMvQyxrREFBa0Q7UUFDbEQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Z0JBWEYsVUFBVTs7OztnQkFGSCxlQUFlOztJQWN2Qix3QkFBQztDQUFBLEFBWkQsSUFZQztTQVhZLGlCQUFpQjs7Ozs7O0lBQ2hCLDRDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtTZWN1cml0eVNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0ZUd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlY3VyaXR5U2VydmljZTogU2VjdXJpdHlTZXJ2aWNlKSB7XG5cbiAgfVxuICBjYW5BY3RpdmF0ZShcbiAgICBuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuIHtcbiAgICBsZXQgcm9sZXMgPSBuZXh0LmRhdGFbXCJyb2xlc1wiXSBhcyBBcnJheTxzdHJpbmc+O1xuICAgIC8vY29uc29sZS5sb2coJ1tjYW5BY3RpdmF0ZV1bd2l0aCByb2xlc10nLCByb2xlcyk7XG4gICAgcmV0dXJuIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmhhc1JvbGUocm9sZXMuam9pbignLCcpKTtcbiAgfVxufVxuIl19