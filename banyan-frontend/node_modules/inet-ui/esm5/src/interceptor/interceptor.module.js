/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgModule } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { CoreService, HttpClientService, NotificationService, SecurityService } from "inet-core";
var HttpsRequestInterceptor = /** @class */ (function () {
    function HttpsRequestInterceptor(securityService, coreService, httpClientService, notifyService) {
        this.securityService = securityService;
        this.coreService = coreService;
        this.httpClientService = httpClientService;
        this.notifyService = notifyService;
        return HttpsRequestInterceptor.instance = HttpsRequestInterceptor.instance || this;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    HttpsRequestInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        return next.handle(req).do((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                _this.httpClientService.hideLoading();
                /*
                if (event.status == 200) {
                }
                */
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            if (err instanceof HttpErrorResponse) {
                //console.log('[HttpsRequestInterceptor][error]', err);
                _this.httpClientService.hideLoading();
                if (_this.coreService.getEnvironment().production) {
                    _this.securityService.ping();
                }
                _this.notifyService.showMessage(err.message, 'error', err.statusText);
                //let statusCode = err.status ;
                //console.log('[HttpInterceptor][ErrorResponse]=', err);
                //console.log('[HttpInterceptor][statusCode]=', statusCode);
                /*
                switch (statusCode) {
                  case 0:
                  case 401:
                     this.securityService.ping();
                    break;
                  default:
                    return;
                }
                */
            }
        }));
    };
    HttpsRequestInterceptor.instance = null;
    HttpsRequestInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpsRequestInterceptor.ctorParameters = function () { return [
        { type: SecurityService },
        { type: CoreService },
        { type: HttpClientService },
        { type: NotificationService }
    ]; };
    return HttpsRequestInterceptor;
}());
export { HttpsRequestInterceptor };
if (false) {
    /** @type {?} */
    HttpsRequestInterceptor.instance;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.securityService;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.httpClientService;
    /**
     * @type {?}
     * @private
     */
    HttpsRequestInterceptor.prototype.notifyService;
}
var InterceptorModule = /** @class */ (function () {
    function InterceptorModule() {
    }
    InterceptorModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
                    ]
                },] }
    ];
    return InterceptorModule;
}());
export { InterceptorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9pbnRlcmNlcHRvci9pbnRlcmNlcHRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFLSCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUUvRjtJQUdJLGlDQUFvQixlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsYUFBa0M7UUFIbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBQ2xELE9BQU8sdUJBQXVCLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDdkYsQ0FBQzs7Ozs7O0lBRUQsMkNBQVM7Ozs7O0lBQVQsVUFBVSxHQUFxQixFQUFFLElBQWlCO1FBQWxELGlCQWlDQztRQWhDRyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs7OztRQUFDLFVBQUMsS0FBcUI7WUFDN0MsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFO2dCQUMvQixxQ0FBcUM7Z0JBQ3JDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDckM7OztrQkFHRTthQUNMO1FBQ0wsQ0FBQzs7OztRQUFFLFVBQUMsR0FBUTtZQUNSLElBQUksR0FBRyxZQUFZLGlCQUFpQixFQUFFO2dCQUNsQyx1REFBdUQ7Z0JBQ3ZELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLFVBQVUsRUFBRTtvQkFDOUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDL0I7Z0JBQ0QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRSwrQkFBK0I7Z0JBQy9CLHdEQUF3RDtnQkFDeEQsNERBQTREO2dCQUM1RDs7Ozs7Ozs7O2tCQVNFO2FBQ0w7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUF6Q00sZ0NBQVEsR0FBNEIsSUFBSSxDQUFDOztnQkFGbkQsVUFBVTs7OztnQkFGa0QsZUFBZTtnQkFBcEUsV0FBVztnQkFBRSxpQkFBaUI7Z0JBQUUsbUJBQW1COztJQThDM0QsOEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTNDWSx1QkFBdUI7OztJQUNoQyxpQ0FBZ0Q7Ozs7O0lBQ3BDLGtEQUF3Qzs7Ozs7SUFDeEMsOENBQWdDOzs7OztJQUNoQyxvREFBNEM7Ozs7O0lBQzVDLGdEQUEwQzs7QUF3QzFEO0lBQUE7SUFNQSxDQUFDOztnQkFOQSxRQUFRLFNBQUM7b0JBQ04sU0FBUyxFQUFFO3dCQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO3FCQUMvRTtpQkFDSjs7SUFFRCx3QkFBQztDQUFBLEFBTkQsSUFNQztTQURZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtcbiAgICBIdHRwRXZlbnQsXG4gICAgSHR0cEludGVyY2VwdG9yLFxuICAgIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBSZXF1ZXN0LFxuICAgIEh0dHBSZXNwb25zZSxcbiAgICBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0hUVFBfSU5URVJDRVBUT1JTfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RvJztcbmltcG9ydCB7Q29yZVNlcnZpY2UsIEh0dHBDbGllbnRTZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlLCBTZWN1cml0eVNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBzUmVxdWVzdEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IEh0dHBzUmVxdWVzdEludGVyY2VwdG9yID0gbnVsbDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlY3VyaXR5U2VydmljZTogU2VjdXJpdHlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHR0cENsaWVudFNlcnZpY2U6IEh0dHBDbGllbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZ5U2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgICAgICByZXR1cm4gSHR0cHNSZXF1ZXN0SW50ZXJjZXB0b3IuaW5zdGFuY2UgPSBIdHRwc1JlcXVlc3RJbnRlcmNlcHRvci5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cblxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5kbygoZXZlbnQ6IEh0dHBFdmVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBkbyBzdHVmZiB3aXRoIHJlc3BvbnNlIGlmIHlvdSB3YW50XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50U2VydmljZS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdbSHR0cHNSZXF1ZXN0SW50ZXJjZXB0b3JdW2Vycm9yXScsIGVycik7XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50U2VydmljZS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvcmVTZXJ2aWNlLmdldEVudmlyb25tZW50KCkucHJvZHVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY3VyaXR5U2VydmljZS5waW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5U2VydmljZS5zaG93TWVzc2FnZShlcnIubWVzc2FnZSwgJ2Vycm9yJywgZXJyLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgICAgIC8vbGV0IHN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzIDtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdbSHR0cEludGVyY2VwdG9yXVtFcnJvclJlc3BvbnNlXT0nLCBlcnIpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1tIdHRwSW50ZXJjZXB0b3JdW3N0YXR1c0NvZGVdPScsIHN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdGF0dXNDb2RlKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICBjYXNlIDQwMTpcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnBpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogSHR0cHNSZXF1ZXN0SW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JNb2R1bGUge1xufVxuIl19