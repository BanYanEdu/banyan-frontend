/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ViewChild } from '@angular/core';
import { HttpClientService } from "inet-core";
import { ToastrService } from "./toastr/toastr.service";
import { ToastContainerDirective } from "./toastr/toast.directive";
var NotifyService = /** @class */ (function () {
    function NotifyService(http, toastService) {
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
    NotifyService.prototype.count = /**
     * @return {?}
     */
    function () {
        return this.http.getJSON(this.url.list);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    NotifyService.prototype.getMessage = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return this.http.getJSON(this.url.list, params);
    };
    /**
     * @param {?} msg
     * @param {?=} type
     * @param {?=} title
     * @param {?=} config
     * @return {?}
     */
    NotifyService.prototype.showMessage = /**
     * @param {?} msg
     * @param {?=} type
     * @param {?=} title
     * @param {?=} config
     * @return {?}
     */
    function (msg, type, title, config) {
        if (title === void 0) { title = 'Thông báo'; }
        if (config === void 0) { config = {}; }
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
    };
    /**
     * @return {?}
     */
    NotifyService.prototype.getNotifyService = /**
     * @return {?}
     */
    function () {
        return this.toastService;
    };
    NotifyService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NotifyService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: ToastrService }
    ]; };
    NotifyService.propDecorators = {
        toastContainer: [{ type: ViewChild, args: [ToastContainerDirective,] }]
    };
    return NotifyService;
}());
export { NotifyService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL25vdGlmeS9ub3RpZnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJcEQsT0FBTyxFQUFDLGlCQUFpQixFQUFlLE1BQU0sV0FBVyxDQUFDO0FBQzFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTtJQVNJLHVCQUFvQixJQUF1QixFQUN2QixZQUEyQjtRQUQzQixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUx2QyxRQUFHLEdBQUc7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztTQUMvQyxDQUFDO1FBS0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdELENBQUM7Ozs7SUFFRCw2QkFBSzs7O0lBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVcsTUFBb0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7OztJQUVELG1DQUFXOzs7Ozs7O0lBQVgsVUFBWSxHQUFXLEVBQUUsSUFBYSxFQUFFLEtBQW1CLEVBQUUsTUFBZ0I7UUFBckMsc0JBQUEsRUFBQSxtQkFBbUI7UUFBRSx1QkFBQSxFQUFBLFdBQWdCO1FBQ3pFLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzNDLE1BQU07WUFDVixLQUFLLE9BQU87Z0JBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDNUMsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QyxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQzs7OztJQUVELHdDQUFnQjs7O0lBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7O2dCQTFDSixVQUFVOzs7O2dCQUpILGlCQUFpQjtnQkFDakIsYUFBYTs7O2lDQU1oQixTQUFTLFNBQUMsdUJBQXVCOztJQXdDdEMsb0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQTFDWSxhQUFhOzs7SUFFdEIsdUNBQTRFOzs7OztJQUU1RSw0QkFFRTs7Ozs7SUFFVSw2QkFBK0I7Ozs7O0lBQy9CLHFDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZSwgTm90aWZ5UGFyYW1zfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge1RvYXN0clNlcnZpY2V9IGZyb20gXCIuL3RvYXN0ci90b2FzdHIuc2VydmljZVwiO1xuaW1wb3J0IHtUb2FzdENvbnRhaW5lckRpcmVjdGl2ZX0gZnJvbSBcIi4vdG9hc3RyL3RvYXN0LmRpcmVjdGl2ZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZ5U2VydmljZSB7XG5cbiAgICBAVmlld0NoaWxkKFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlKSB0b2FzdENvbnRhaW5lcjogVG9hc3RDb250YWluZXJEaXJlY3RpdmU7XG5cbiAgICBwcml2YXRlIHVybCA9IHtcbiAgICAgICAgbGlzdDogaU5ldC5nZXRQVXJsKCdzb2NpYWwvYWN0aXZpdHkvbm90aWZ5JylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRvYXN0U2VydmljZTogVG9hc3RyU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMudG9hc3RTZXJ2aWNlLm92ZXJsYXlDb250YWluZXIgPSB0aGlzLnRvYXN0Q29udGFpbmVyO1xuICAgIH1cblxuICAgIGNvdW50KCk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0SlNPTih0aGlzLnVybC5saXN0KTtcbiAgICB9XG5cbiAgICBnZXRNZXNzYWdlKHBhcmFtczogTm90aWZ5UGFyYW1zKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmxpc3QsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgc2hvd01lc3NhZ2UobXNnOiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcsIHRpdGxlID0gJ1Row7RuZyBiw6FvJywgY29uZmlnOiBhbnkgPSB7fSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RTZXJ2aWNlLmluZm8obXNnLCB0aXRsZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0U2VydmljZS5lcnJvcihtc2csIHRpdGxlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdFNlcnZpY2Uud2FybmluZyhtc2csIHRpdGxlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RTZXJ2aWNlLnN1Y2Nlc3MobXNnLCB0aXRsZSwgY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE5vdGlmeVNlcnZpY2UoKTogVG9hc3RyU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvYXN0U2VydmljZTtcbiAgICB9XG59XG4iXX0=