/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ViewChild } from '@angular/core';
import { HttpClientService } from "inet-core";
import { ToastrService } from "./toastr/toastr.service";
import { ToastContainerDirective } from "./toastr/toast.directive";
export class NotifyService {
    /**
     * @param {?} http
     * @param {?} toastService
     */
    constructor(http, toastService) {
        this.http = http;
        this.toastService = toastService;
        this.url = {
            list: iNet.getPUrl('social/activity/notify')
        };
        this.toastService.overlayContainer = this.toastContainer;
    }
    /**
     * @return {?}
     */
    count() {
        return this.http.getJSON(this.url.list);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    getMessage(params) {
        return this.http.getJSON(this.url.list, params);
    }
    /**
     * @param {?} msg
     * @param {?=} type
     * @param {?=} title
     * @param {?=} config
     * @return {?}
     */
    showMessage(msg, type, title = 'Thông báo', config = {}) {
        switch (type) {
            case 'info':
                this.toastService.info(msg, title, config);
                break;
            case 'error':
                this.toastService.error(msg, title, config);
                break;
            case 'warning':
                this.toastService.warning(msg, title, config);
                break;
            case 'success':
            default:
                this.toastService.success(msg, title, config);
        }
    }
    /**
     * @return {?}
     */
    getNotifyService() {
        return this.toastService;
    }
}
NotifyService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotifyService.ctorParameters = () => [
    { type: HttpClientService },
    { type: ToastrService }
];
NotifyService.propDecorators = {
    toastContainer: [{ type: ViewChild, args: [ToastContainerDirective,] }]
};
if (false) {
    /** @type {?} */
    NotifyService.prototype.toastContainer;
    /**
     * @type {?}
     * @private
     */
    NotifyService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    NotifyService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    NotifyService.prototype.toastService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL25vdGlmeS9ub3RpZnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJcEQsT0FBTyxFQUFDLGlCQUFpQixFQUFlLE1BQU0sV0FBVyxDQUFDO0FBQzFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUdqRSxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFRdEIsWUFBb0IsSUFBdUIsRUFDdkIsWUFBMkI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWU7UUFMdkMsUUFBRyxHQUFHO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7U0FDL0MsQ0FBQztRQUtFLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3RCxDQUFDOzs7O0lBRUQsS0FBSztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxNQUFvQjtRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7Ozs7O0lBRUQsV0FBVyxDQUFDLEdBQVcsRUFBRSxJQUFhLEVBQUUsS0FBSyxHQUFHLFdBQVcsRUFBRSxTQUFjLEVBQUU7UUFDekUsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDM0MsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLE1BQU07WUFDVixLQUFLLFNBQVMsQ0FBQztZQUNmO2dCQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7OztZQTFDSixVQUFVOzs7O1lBSkgsaUJBQWlCO1lBQ2pCLGFBQWE7Ozs2QkFNaEIsU0FBUyxTQUFDLHVCQUF1Qjs7OztJQUFsQyx1Q0FBNEU7Ozs7O0lBRTVFLDRCQUVFOzs7OztJQUVVLDZCQUErQjs7Ozs7SUFDL0IscUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlLCBOb3RpZnlQYXJhbXN9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7VG9hc3RyU2VydmljZX0gZnJvbSBcIi4vdG9hc3RyL3RvYXN0ci5zZXJ2aWNlXCI7XG5pbXBvcnQge1RvYXN0Q29udGFpbmVyRGlyZWN0aXZlfSBmcm9tIFwiLi90b2FzdHIvdG9hc3QuZGlyZWN0aXZlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZnlTZXJ2aWNlIHtcblxuICAgIEBWaWV3Q2hpbGQoVG9hc3RDb250YWluZXJEaXJlY3RpdmUpIHRvYXN0Q29udGFpbmVyOiBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZTtcblxuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICBsaXN0OiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9hY3Rpdml0eS9ub3RpZnknKVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdG9hc3RTZXJ2aWNlOiBUb2FzdHJTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy50b2FzdFNlcnZpY2Uub3ZlcmxheUNvbnRhaW5lciA9IHRoaXMudG9hc3RDb250YWluZXI7XG4gICAgfVxuXG4gICAgY291bnQoKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3QpO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2UocGFyYW1zOiBOb3RpZnlQYXJhbXMpOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldEpTT04odGhpcy51cmwubGlzdCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBzaG93TWVzc2FnZShtc2c6IHN0cmluZywgdHlwZT86IHN0cmluZywgdGl0bGUgPSAnVGjDtG5nIGLDoW8nLCBjb25maWc6IGFueSA9IHt9KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdFNlcnZpY2UuaW5mbyhtc2csIHRpdGxlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RTZXJ2aWNlLmVycm9yKG1zZywgdGl0bGUsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0U2VydmljZS53YXJuaW5nKG1zZywgdGl0bGUsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdFNlcnZpY2Uuc3VjY2Vzcyhtc2csIHRpdGxlLCBjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Tm90aWZ5U2VydmljZSgpOiBUb2FzdHJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9hc3RTZXJ2aWNlO1xuICAgIH1cbn1cbiJdfQ==