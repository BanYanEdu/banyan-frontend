/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * Configuration for an individual toast.
 * @record
 */
export function IndividualConfig() { }
if (false) {
    /**
     * disable both timeOut and extendedTimeOut
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.disableTimeOut;
    /**
     * toast time to live in milliseconds
     * default: 5000
     * @type {?}
     */
    IndividualConfig.prototype.timeOut;
    /**
     * toast show close button
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.closeButton;
    /**
     * time to close after a user hovers over toast
     * default: 1000
     * @type {?}
     */
    IndividualConfig.prototype.extendedTimeOut;
    /**
     * show toast progress bar
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.progressBar;
    /**
     * changes toast progress bar animation
     * default: decreasing
     * @type {?|undefined}
     */
    IndividualConfig.prototype.progressAnimation;
    /**
     * render html in toast message (possibly unsafe)
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.enableHtml;
    /**
     * css class on toast component
     * default: toast
     * @type {?}
     */
    IndividualConfig.prototype.toastClass;
    /**
     * css class on toast container
     * default: toast-top-right
     * @type {?}
     */
    IndividualConfig.prototype.positionClass;
    /**
     * css class on to toast title
     * default: toast-title
     * @type {?}
     */
    IndividualConfig.prototype.titleClass;
    /**
     * css class on to toast title
     * default: toast-title
     * @type {?}
     */
    IndividualConfig.prototype.messageClass;
    /**
     * animation easing on toast
     * default: ease-in
     * @type {?}
     */
    IndividualConfig.prototype.easing;
    /**
     * animation ease time on toast
     * default: 300
     * @type {?}
     */
    IndividualConfig.prototype.easeTime;
    /**
     * clicking on toast dismisses it
     * default: true
     * @type {?}
     */
    IndividualConfig.prototype.tapToDismiss;
    /**
     * Angular toast component to be shown
     * default: Toast
     * @type {?}
     */
    IndividualConfig.prototype.toastComponent;
    /**
     * Helps show toast from a websocket or from event outside Angular
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.onActivateTick;
}
/**
 * @record
 */
export function ToastrIconClasses() { }
if (false) {
    /** @type {?} */
    ToastrIconClasses.prototype.error;
    /** @type {?} */
    ToastrIconClasses.prototype.info;
    /** @type {?} */
    ToastrIconClasses.prototype.success;
    /** @type {?} */
    ToastrIconClasses.prototype.warning;
}
/**
 * Global Toast configuration
 * Includes all IndividualConfig
 * @record
 */
export function GlobalConfig() { }
if (false) {
    /**
     * max toasts opened. Toasts will be queued
     * Zero is unlimited
     * default: 0
     * @type {?}
     */
    GlobalConfig.prototype.maxOpened;
    /**
     * dismiss current toast when max is reached
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.autoDismiss;
    /** @type {?} */
    GlobalConfig.prototype.iconClasses;
    /**
     * New toast placement
     * default: true
     * @type {?}
     */
    GlobalConfig.prototype.newestOnTop;
    /**
     * block duplicate messages
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.preventDuplicates;
}
/**
 * Everything a toast needs to launch
 */
var /**
 * Everything a toast needs to launch
 */
ToastPackage = /** @class */ (function () {
    function ToastPackage(toastId, config, message, title, toastType, toastRef) {
        var _this = this;
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this._onTap = new Subject();
        this._onAction = new Subject();
        this.toastRef.afterClosed().subscribe((/**
         * @return {?}
         */
        function () {
            _this._onAction.complete();
            _this._onTap.complete();
        }));
    }
    /** Fired on click */
    /**
     * Fired on click
     * @return {?}
     */
    ToastPackage.prototype.triggerTap = /**
     * Fired on click
     * @return {?}
     */
    function () {
        this._onTap.next();
        if (this.config.tapToDismiss) {
            this._onTap.complete();
        }
    };
    /**
     * @return {?}
     */
    ToastPackage.prototype.onTap = /**
     * @return {?}
     */
    function () {
        return this._onTap.asObservable();
    };
    /** available for use in custom toast */
    /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    ToastPackage.prototype.triggerAction = /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    function (action) {
        this._onAction.next(action);
    };
    /**
     * @return {?}
     */
    ToastPackage.prototype.onAction = /**
     * @return {?}
     */
    function () {
        return this._onAction.asObservable();
    };
    return ToastPackage;
}());
/**
 * Everything a toast needs to launch
 */
export { ToastPackage };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ToastPackage.prototype._onTap;
    /**
     * @type {?}
     * @private
     */
    ToastPackage.prototype._onAction;
    /** @type {?} */
    ToastPackage.prototype.toastId;
    /** @type {?} */
    ToastPackage.prototype.config;
    /** @type {?} */
    ToastPackage.prototype.message;
    /** @type {?} */
    ToastPackage.prototype.title;
    /** @type {?} */
    ToastPackage.prototype.toastType;
    /** @type {?} */
    ToastPackage.prototype.toastRef;
}
/**
 * @record
 */
export function GlobalToastrConfig() { }
/**
 * @record
 */
export function IndividualToastrConfig() { }
/**
 * @record
 */
export function ToastrConfig() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbm90aWZ5L3RvYXN0ci90b2FzdHItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQVExQyxzQ0FrRkE7Ozs7Ozs7SUE3RUMsMENBQXdCOzs7Ozs7SUFLeEIsbUNBQWdCOzs7Ozs7SUFLaEIsdUNBQXFCOzs7Ozs7SUFLckIsMkNBQXdCOzs7Ozs7SUFLeEIsdUNBQXFCOzs7Ozs7SUFNckIsNkNBQWdEOzs7Ozs7SUFLaEQsc0NBQW9COzs7Ozs7SUFLcEIsc0NBQW1COzs7Ozs7SUFLbkIseUNBQXNCOzs7Ozs7SUFLdEIsc0NBQW1COzs7Ozs7SUFLbkIsd0NBQXFCOzs7Ozs7SUFLckIsa0NBQWU7Ozs7OztJQUtmLG9DQUEwQjs7Ozs7O0lBSzFCLHdDQUFzQjs7Ozs7O0lBS3RCLDBDQUFtQzs7Ozs7O0lBS25DLDBDQUF3Qjs7Ozs7QUFHMUIsdUNBS0M7OztJQUpDLGtDQUFjOztJQUNkLGlDQUFhOztJQUNiLG9DQUFnQjs7SUFDaEIsb0NBQWdCOzs7Ozs7O0FBT2xCLGtDQXVCQzs7Ozs7Ozs7SUFqQkMsaUNBQWtCOzs7Ozs7SUFLbEIsbUNBQXFCOztJQUNyQixtQ0FBd0M7Ozs7OztJQUt4QyxtQ0FBcUI7Ozs7OztJQUtyQix5Q0FBMkI7Ozs7O0FBTTdCOzs7O0lBSUUsc0JBQ1MsT0FBZSxFQUNmLE1BQXdCLEVBQ3hCLE9BQTZDLEVBQzdDLEtBQXlCLEVBQ3pCLFNBQWlCLEVBQ2pCLFFBQXVCO1FBTmhDLGlCQVlDO1FBWFEsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBQzdDLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQVR4QixXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUM1QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQVVyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVM7OztRQUFDO1lBQ3BDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUI7Ozs7O0lBQ3JCLGlDQUFVOzs7O0lBQVY7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7SUFFRCw0QkFBSzs7O0lBQUw7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdDQUF3Qzs7Ozs7O0lBQ3hDLG9DQUFhOzs7OztJQUFiLFVBQWMsTUFBWTtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsK0JBQVE7OztJQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0M7Ozs7Ozs7Ozs7SUFyQ0MsOEJBQW9DOzs7OztJQUNwQyxpQ0FBdUM7O0lBR3JDLCtCQUFzQjs7SUFDdEIsOEJBQStCOztJQUMvQiwrQkFBb0Q7O0lBQ3BELDZCQUFnQzs7SUFDaEMsaUNBQXdCOztJQUN4QixnQ0FBOEI7Ozs7O0FBK0JsQyx3Q0FBMkQ7Ozs7QUFDM0QsNENBQW1FOzs7O0FBQ25FLGtDQUF5RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJy4uL3BvcnRhbC9wb3J0YWwnO1xuaW1wb3J0IHsgVG9hc3RSZWYgfSBmcm9tICcuL3RvYXN0LWluamVjdG9yJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhbiBpbmRpdmlkdWFsIHRvYXN0LlxuICovXG4gZXhwb3J0IGludGVyZmFjZSBJbmRpdmlkdWFsQ29uZmlnIHtcbiAgLyoqXG4gICAqIGRpc2FibGUgYm90aCB0aW1lT3V0IGFuZCBleHRlbmRlZFRpbWVPdXRcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGRpc2FibGVUaW1lT3V0OiBib29sZWFuO1xuICAvKipcbiAgKiB0b2FzdCB0aW1lIHRvIGxpdmUgaW4gbWlsbGlzZWNvbmRzXG4gICogZGVmYXVsdDogNTAwMFxuICAqL1xuICB0aW1lT3V0OiBudW1iZXI7XG4gIC8qKlxuICAqIHRvYXN0IHNob3cgY2xvc2UgYnV0dG9uXG4gICogZGVmYXVsdDogZmFsc2VcbiAgKi9cbiAgY2xvc2VCdXR0b246IGJvb2xlYW47XG4gIC8qKlxuICAqIHRpbWUgdG8gY2xvc2UgYWZ0ZXIgYSB1c2VyIGhvdmVycyBvdmVyIHRvYXN0XG4gICogZGVmYXVsdDogMTAwMFxuICAgKi9cbiAgZXh0ZW5kZWRUaW1lT3V0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBzaG93IHRvYXN0IHByb2dyZXNzIGJhclxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcHJvZ3Jlc3NCYXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGNoYW5nZXMgdG9hc3QgcHJvZ3Jlc3MgYmFyIGFuaW1hdGlvblxuICAgKiBkZWZhdWx0OiBkZWNyZWFzaW5nXG4gICAqL1xuICBwcm9ncmVzc0FuaW1hdGlvbj86ICdpbmNyZWFzaW5nJyB8ICdkZWNyZWFzaW5nJztcbiAgLyoqXG4gICAqIHJlbmRlciBodG1sIGluIHRvYXN0IG1lc3NhZ2UgKHBvc3NpYmx5IHVuc2FmZSlcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGVuYWJsZUh0bWw6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG9hc3QgY29tcG9uZW50XG4gICAqIGRlZmF1bHQ6IHRvYXN0XG4gICAqL1xuICB0b2FzdENsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG9hc3QgY29udGFpbmVyXG4gICAqIGRlZmF1bHQ6IHRvYXN0LXRvcC1yaWdodFxuICAgKi9cbiAgcG9zaXRpb25DbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogY3NzIGNsYXNzIG9uIHRvIHRvYXN0IHRpdGxlXG4gICAqIGRlZmF1bHQ6IHRvYXN0LXRpdGxlXG4gICAqL1xuICB0aXRsZUNsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG8gdG9hc3QgdGl0bGVcbiAgICogZGVmYXVsdDogdG9hc3QtdGl0bGVcbiAgICovXG4gIG1lc3NhZ2VDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogYW5pbWF0aW9uIGVhc2luZyBvbiB0b2FzdFxuICAgKiBkZWZhdWx0OiBlYXNlLWluXG4gICAqL1xuICBlYXNpbmc6IHN0cmluZztcbiAgLyoqXG4gICAqIGFuaW1hdGlvbiBlYXNlIHRpbWUgb24gdG9hc3RcbiAgICogZGVmYXVsdDogMzAwXG4gICAqL1xuICBlYXNlVGltZTogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogY2xpY2tpbmcgb24gdG9hc3QgZGlzbWlzc2VzIGl0XG4gICAqIGRlZmF1bHQ6IHRydWVcbiAgICovXG4gIHRhcFRvRGlzbWlzczogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFuZ3VsYXIgdG9hc3QgY29tcG9uZW50IHRvIGJlIHNob3duXG4gICAqIGRlZmF1bHQ6IFRvYXN0XG4gICAqL1xuICB0b2FzdENvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+O1xuICAvKipcbiAgICogSGVscHMgc2hvdyB0b2FzdCBmcm9tIGEgd2Vic29ja2V0IG9yIGZyb20gZXZlbnQgb3V0c2lkZSBBbmd1bGFyXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBvbkFjdGl2YXRlVGljazogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb2FzdHJJY29uQ2xhc3NlcyB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGluZm86IHN0cmluZztcbiAgc3VjY2Vzczogc3RyaW5nO1xuICB3YXJuaW5nOiBzdHJpbmc7XG59XG5cbi8qKlxuICogR2xvYmFsIFRvYXN0IGNvbmZpZ3VyYXRpb25cbiAqIEluY2x1ZGVzIGFsbCBJbmRpdmlkdWFsQ29uZmlnXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR2xvYmFsQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7XG4gIC8qKlxuICAgKiBtYXggdG9hc3RzIG9wZW5lZC4gVG9hc3RzIHdpbGwgYmUgcXVldWVkXG4gICAqIFplcm8gaXMgdW5saW1pdGVkXG4gICAqIGRlZmF1bHQ6IDBcbiAgICovXG4gIG1heE9wZW5lZDogbnVtYmVyO1xuICAvKipcbiAgICogZGlzbWlzcyBjdXJyZW50IHRvYXN0IHdoZW4gbWF4IGlzIHJlYWNoZWRcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGF1dG9EaXNtaXNzOiBib29sZWFuO1xuICBpY29uQ2xhc3NlczogUGFydGlhbDxUb2FzdHJJY29uQ2xhc3Nlcz47XG4gIC8qKlxuICAgKiBOZXcgdG9hc3QgcGxhY2VtZW50XG4gICAqIGRlZmF1bHQ6IHRydWVcbiAgICovXG4gIG5ld2VzdE9uVG9wOiBib29sZWFuO1xuICAvKipcbiAgICogYmxvY2sgZHVwbGljYXRlIG1lc3NhZ2VzXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBwcmV2ZW50RHVwbGljYXRlczogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBFdmVyeXRoaW5nIGEgdG9hc3QgbmVlZHMgdG8gbGF1bmNoXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2FzdFBhY2thZ2Uge1xuICBwcml2YXRlIF9vblRhcCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBfb25BY3Rpb24gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRvYXN0SWQ6IG51bWJlcixcbiAgICBwdWJsaWMgY29uZmlnOiBJbmRpdmlkdWFsQ29uZmlnLFxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgfCBTYWZlSHRtbCB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgcHVibGljIHRvYXN0VHlwZTogc3RyaW5nLFxuICAgIHB1YmxpYyB0b2FzdFJlZjogVG9hc3RSZWY8YW55PixcbiAgKSB7XG4gICAgdGhpcy50b2FzdFJlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9vbkFjdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5fb25UYXAuY29tcGxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBGaXJlZCBvbiBjbGljayAqL1xuICB0cmlnZ2VyVGFwKCkge1xuICAgIHRoaXMuX29uVGFwLm5leHQoKTtcbiAgICBpZiAodGhpcy5jb25maWcudGFwVG9EaXNtaXNzKSB7XG4gICAgICB0aGlzLl9vblRhcC5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uVGFwKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uVGFwLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqIGF2YWlsYWJsZSBmb3IgdXNlIGluIGN1c3RvbSB0b2FzdCAqL1xuICB0cmlnZ2VyQWN0aW9uKGFjdGlvbj86IGFueSkge1xuICAgIHRoaXMuX29uQWN0aW9uLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIG9uQWN0aW9uKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uQWN0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG5cbi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5LWludGVyZmFjZSAqL1xuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxUb2FzdHJDb25maWcgZXh0ZW5kcyBHbG9iYWxDb25maWcge31cbmV4cG9ydCBpbnRlcmZhY2UgSW5kaXZpZHVhbFRvYXN0ckNvbmZpZyBleHRlbmRzIEluZGl2aWR1YWxDb25maWcge31cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RyQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7fVxuIl19