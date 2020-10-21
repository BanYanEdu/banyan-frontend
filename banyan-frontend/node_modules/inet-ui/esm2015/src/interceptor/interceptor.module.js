/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgModule } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { CoreService, HttpClientService, NotificationService, SecurityService } from "inet-core";
export class HttpsRequestInterceptor {
    /**
     * @param {?} securityService
     * @param {?} coreService
     * @param {?} httpClientService
     * @param {?} notifyService
     */
    constructor(securityService, coreService, httpClientService, notifyService) {
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
    intercept(req, next) {
        return next.handle(req).do((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                this.httpClientService.hideLoading();
                /*
                if (event.status == 200) {
                }
                */
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if (err instanceof HttpErrorResponse) {
                //console.log('[HttpsRequestInterceptor][error]', err);
                this.httpClientService.hideLoading();
                if (this.coreService.getEnvironment().production) {
                    this.securityService.ping();
                }
                this.notifyService.showMessage(err.message, 'error', err.statusText);
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
    }
}
HttpsRequestInterceptor.instance = null;
HttpsRequestInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpsRequestInterceptor.ctorParameters = () => [
    { type: SecurityService },
    { type: CoreService },
    { type: HttpClientService },
    { type: NotificationService }
];
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
export class InterceptorModule {
}
InterceptorModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9pbnRlcmNlcHRvci9pbnRlcmNlcHRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFLSCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUcvRixNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7O0lBRWhDLFlBQW9CLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxhQUFrQztRQUhsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFDbEQsT0FBTyx1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUN2RixDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBcUIsRUFBRSxJQUFpQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs7OztRQUFDLENBQUMsS0FBcUIsRUFBRSxFQUFFO1lBQ2pELElBQUksS0FBSyxZQUFZLFlBQVksRUFBRTtnQkFDL0IscUNBQXFDO2dCQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JDOzs7a0JBR0U7YUFDTDtRQUNMLENBQUM7Ozs7UUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ1osSUFBSSxHQUFHLFlBQVksaUJBQWlCLEVBQUU7Z0JBQ2xDLHVEQUF1RDtnQkFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsVUFBVSxFQUFFO29CQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMvQjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JFLCtCQUErQjtnQkFDL0Isd0RBQXdEO2dCQUN4RCw0REFBNEQ7Z0JBQzVEOzs7Ozs7Ozs7a0JBU0U7YUFDTDtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF6Q00sZ0NBQVEsR0FBNEIsSUFBSSxDQUFDOztZQUZuRCxVQUFVOzs7O1lBRmtELGVBQWU7WUFBcEUsV0FBVztZQUFFLGlCQUFpQjtZQUFFLG1CQUFtQjs7OztJQUl2RCxpQ0FBZ0Q7Ozs7O0lBQ3BDLGtEQUF3Qzs7Ozs7SUFDeEMsOENBQWdDOzs7OztJQUNoQyxvREFBNEM7Ozs7O0lBQzVDLGdEQUEwQzs7QUE2QzFELE1BQU0sT0FBTyxpQkFBaUI7OztZQUw3QixRQUFRLFNBQUM7Z0JBQ04sU0FBUyxFQUFFO29CQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2lCQUMvRTthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1xuICAgIEh0dHBFdmVudCxcbiAgICBIdHRwSW50ZXJjZXB0b3IsXG4gICAgSHR0cEhhbmRsZXIsXG4gICAgSHR0cFJlcXVlc3QsXG4gICAgSHR0cFJlc3BvbnNlLFxuICAgIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7SFRUUF9JTlRFUkNFUFRPUlN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nO1xuaW1wb3J0IHtDb3JlU2VydmljZSwgSHR0cENsaWVudFNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2UsIFNlY3VyaXR5U2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cHNSZXF1ZXN0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICAgIHN0YXRpYyBpbnN0YW5jZTogSHR0cHNSZXF1ZXN0SW50ZXJjZXB0b3IgPSBudWxsO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBTZWN1cml0eVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb3JlU2VydmljZTogQ29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50U2VydmljZTogSHR0cENsaWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZnlTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBIdHRwc1JlcXVlc3RJbnRlcmNlcHRvci5pbnN0YW5jZSA9IEh0dHBzUmVxdWVzdEludGVyY2VwdG9yLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLmRvKChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vIGRvIHN0dWZmIHdpdGggcmVzcG9uc2UgaWYgeW91IHdhbnRcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHBDbGllbnRTZXJ2aWNlLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1tIdHRwc1JlcXVlc3RJbnRlcmNlcHRvcl1bZXJyb3JdJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHBDbGllbnRTZXJ2aWNlLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29yZVNlcnZpY2UuZ2V0RW52aXJvbm1lbnQoKS5wcm9kdWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnBpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlTZXJ2aWNlLnNob3dNZXNzYWdlKGVyci5tZXNzYWdlLCAnZXJyb3InLCBlcnIuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgLy9sZXQgc3RhdHVzQ29kZSA9IGVyci5zdGF0dXMgO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1tIdHRwSW50ZXJjZXB0b3JdW0Vycm9yUmVzcG9uc2VdPScsIGVycik7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnW0h0dHBJbnRlcmNlcHRvcl1bc3RhdHVzQ29kZV09Jywgc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXR1c0NvZGUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWN1cml0eVNlcnZpY2UucGluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBIdHRwc1JlcXVlc3RJbnRlcmNlcHRvciwgbXVsdGk6IHRydWV9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvck1vZHVsZSB7XG59XG4iXX0=