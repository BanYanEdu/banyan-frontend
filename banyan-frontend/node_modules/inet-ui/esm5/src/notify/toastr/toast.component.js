/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { Component, HostBinding, HostListener, NgZone, } from '@angular/core';
import { ToastPackage } from './toastr-config';
import { ToastrService } from './toastr.service';
var Toast = /** @class */ (function () {
    function Toast(toastrService, toastPackage, ngZone) {
        var _this = this;
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.ngZone = ngZone;
        /**
         * width of progress bar
         */
        this.width = -1;
        /**
         * a combination of toast type and options.toastClass
         */
        this.toastClasses = '';
        /**
         * controls animation
         */
        this.state = {
            value: 'inactive',
            params: {
                easeTime: this.toastPackage.config.easeTime,
                easing: 'ease-in',
            },
        };
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
        this.sub = toastPackage.toastRef.afterActivate().subscribe((/**
         * @return {?}
         */
        function () {
            _this.activateToast();
        }));
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe((/**
         * @return {?}
         */
        function () {
            _this.remove();
        }));
    }
    /**
     * @return {?}
     */
    Toast.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    };
    /**
     * activates toast and sets timeout
     */
    /**
     * activates toast and sets timeout
     * @return {?}
     */
    Toast.prototype.activateToast = /**
     * activates toast and sets timeout
     * @return {?}
     */
    function () {
        var _this = this;
        this.state = tslib_1.__assign({}, this.state, { value: 'active' });
        if (!this.options.disableTimeOut && this.options.timeOut) {
            this.outsideTimeout((/**
             * @return {?}
             */
            function () { return _this.remove(); }), this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.outsideInterval((/**
                 * @return {?}
                 */
                function () { return _this.updateProgress(); }), 10);
            }
        }
    };
    /**
     * updates progress bar width
     */
    /**
     * updates progress bar width
     * @return {?}
     */
    Toast.prototype.updateProgress = /**
     * updates progress bar width
     * @return {?}
     */
    function () {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        /** @type {?} */
        var now = new Date().getTime();
        /** @type {?} */
        var remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    };
    /**
     * tells toastrService to remove this toast after animation time
     */
    /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    Toast.prototype.remove = /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = tslib_1.__assign({}, this.state, { value: 'removed' });
        this.outsideTimeout((/**
         * @return {?}
         */
        function () {
            return _this.toastrService.remove(_this.toastPackage.toastId);
        }), +this.toastPackage.config.easeTime);
    };
    /**
     * @return {?}
     */
    Toast.prototype.tapToast = /**
     * @return {?}
     */
    function () {
        if (this.state.value === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    /**
     * @return {?}
     */
    Toast.prototype.stickAround = /**
     * @return {?}
     */
    function () {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    };
    /**
     * @return {?}
     */
    Toast.prototype.delayedHideToast = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.options.disableTimeOut
            || this.options.extendedTimeOut === 0
            || this.state.value === 'removed') {
            return;
        }
        this.outsideTimeout((/**
         * @return {?}
         */
        function () { return _this.remove(); }), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval((/**
             * @return {?}
             */
            function () { return _this.updateProgress(); }), 10);
        }
    };
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    Toast.prototype.outsideTimeout = /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    function (func, timeout) {
        var _this = this;
        if (this.ngZone) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                return _this.timeout = setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.runInsideAngular(func); }), timeout);
            }));
        }
        else {
            this.timeout = setTimeout((/**
             * @return {?}
             */
            function () { return func(); }), timeout);
        }
    };
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    Toast.prototype.outsideInterval = /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    function (func, timeout) {
        var _this = this;
        if (this.ngZone) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                return _this.intervalId = setInterval((/**
                 * @return {?}
                 */
                function () { return _this.runInsideAngular(func); }), timeout);
            }));
        }
        else {
            this.intervalId = setInterval((/**
             * @return {?}
             */
            function () { return func(); }), timeout);
        }
    };
    /**
     * @private
     * @param {?} func
     * @return {?}
     */
    Toast.prototype.runInsideAngular = /**
     * @private
     * @param {?} func
     * @return {?}
     */
    function (func) {
        if (this.ngZone) {
            this.ngZone.run((/**
             * @return {?}
             */
            function () { return func(); }));
        }
        else {
            func();
        }
    };
    Toast.decorators = [
        { type: Component, args: [{
                    selector: '[toast-component]',
                    template: "\n        <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n            {{ title }}\n        </div>\n        <div *ngIf=\"message && options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n             [class]=\"options.messageClass\" [innerHTML]=\"message\">\n        </div>\n        <div *ngIf=\"message && !options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n             [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n            {{ message }}\n        </div>\n        <div *ngIf=\"options.progressBar\">\n            <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n        </div>\n    ",
                    animations: [
                        trigger('flyInOut', [
                            state('inactive', style({
                                display: 'none',
                                opacity: 0,
                            })),
                            state('active', style({})),
                            state('removed', style({ opacity: 0 })),
                            transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
                            transition('active => removed', animate('{{ easeTime }}ms {{ easing }}')),
                        ]),
                    ],
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    Toast.ctorParameters = function () { return [
        { type: ToastrService },
        { type: ToastPackage },
        { type: NgZone }
    ]; };
    Toast.propDecorators = {
        toastClasses: [{ type: HostBinding, args: ['class',] }],
        state: [{ type: HostBinding, args: ['@flyInOut',] }],
        tapToast: [{ type: HostListener, args: ['click',] }],
        stickAround: [{ type: HostListener, args: ['mouseenter',] }],
        delayedHideToast: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return Toast;
}());
export { Toast };
if (false) {
    /** @type {?} */
    Toast.prototype.message;
    /** @type {?} */
    Toast.prototype.title;
    /** @type {?} */
    Toast.prototype.options;
    /**
     * width of progress bar
     * @type {?}
     */
    Toast.prototype.width;
    /**
     * a combination of toast type and options.toastClass
     * @type {?}
     */
    Toast.prototype.toastClasses;
    /**
     * controls animation
     * @type {?}
     */
    Toast.prototype.state;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.timeout;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.intervalId;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.hideTime;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.sub;
    /**
     * @type {?}
     * @private
     */
    Toast.prototype.sub1;
    /**
     * @type {?}
     * @protected
     */
    Toast.prototype.toastrService;
    /** @type {?} */
    Toast.prototype.toastPackage;
    /**
     * @type {?}
     * @protected
     */
    Toast.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9ub3RpZnkvdG9hc3RyL3RvYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNWLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNILFNBQVMsRUFDVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sR0FFVCxNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQW1CLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUUvQztJQTRESSxlQUNjLGFBQTRCLEVBQy9CLFlBQTBCLEVBQ3ZCLE1BQWU7UUFIN0IsaUJBZUM7UUFkYSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFTOzs7O1FBcEI3QixVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Ozs7UUFFVyxpQkFBWSxHQUFHLEVBQUUsQ0FBQzs7OztRQUVkLFVBQUssR0FBRztZQUM5QixLQUFLLEVBQUUsVUFBVTtZQUNqQixNQUFNLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQzNDLE1BQU0sRUFBRSxTQUFTO2FBQ3BCO1NBQ0osQ0FBQztRQVlFLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQU0sWUFB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Q0FBQzs0QkFDckMsVUFBVSxDQUFDLG9CQUFvQixFQUMzQixPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FDM0M7NEJBQ0QsVUFBVSxDQUFDLG1CQUFtQixFQUMxQixPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FDM0M7eUJBQ0osQ0FBQztxQkFDTDtvQkFDRCxtQkFBbUIsRUFBRSxLQUFLO2lCQUM3Qjs7OztnQkF2Q08sYUFBYTtnQkFESyxZQUFZO2dCQVBsQyxNQUFNOzs7K0JBdURMLFdBQVcsU0FBQyxPQUFPO3dCQUVuQixXQUFXLFNBQUMsV0FBVzsyQkF1RnZCLFlBQVksU0FBQyxPQUFPOzhCQVdwQixZQUFZLFNBQUMsWUFBWTttQ0FjekIsWUFBWSxTQUFDLFlBQVk7O0lBNEM5QixZQUFDO0NBQUEsQUEzTUQsSUEyTUM7U0FyS1ksS0FBSzs7O0lBQ2Qsd0JBQW1DOztJQUNuQyxzQkFBZTs7SUFDZix3QkFBMEI7Ozs7O0lBRTFCLHNCQUFXOzs7OztJQUVYLDZCQUF3Qzs7Ozs7SUFFeEMsc0JBTUU7Ozs7O0lBQ0Ysd0JBQXFCOzs7OztJQUNyQiwyQkFBd0I7Ozs7O0lBQ3hCLHlCQUF5Qjs7Ozs7SUFDekIsb0JBQTBCOzs7OztJQUMxQixxQkFBMkI7Ozs7O0lBR3ZCLDhCQUFzQzs7SUFDdEMsNkJBQWlDOzs7OztJQUNqQyx1QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGFuaW1hdGUsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7SW5kaXZpZHVhbENvbmZpZywgVG9hc3RQYWNrYWdlfSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuaW1wb3J0IHtUb2FzdHJTZXJ2aWNlfSBmcm9tICcuL3RvYXN0ci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbdG9hc3QtY29tcG9uZW50XScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm9wdGlvbnMuY2xvc2VCdXR0b25cIiAoY2xpY2spPVwicmVtb3ZlKClcIiBjbGFzcz1cInRvYXN0LWNsb3NlLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0aXRsZVwiIFtjbGFzc109XCJvcHRpb25zLnRpdGxlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlXCI+XG4gICAgICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UgJiYgb3B0aW9ucy5lbmFibGVIdG1sXCIgcm9sZT1cImFsZXJ0ZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucy5tZXNzYWdlQ2xhc3NcIiBbaW5uZXJIVE1MXT1cIm1lc3NhZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXNzYWdlICYmICFvcHRpb25zLmVuYWJsZUh0bWxcIiByb2xlPVwiYWxlcnRkaWFsb2dcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zLm1lc3NhZ2VDbGFzc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwibWVzc2FnZVwiPlxuICAgICAgICAgICAge3sgbWVzc2FnZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnMucHJvZ3Jlc3NCYXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1wcm9ncmVzc1wiIFtzdHlsZS53aWR0aF09XCJ3aWR0aCArICclJ1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZmx5SW5PdXQnLCBbXG4gICAgICAgICAgICBzdGF0ZSgnaW5hY3RpdmUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoe30pKSxcbiAgICAgICAgICAgIHN0YXRlKCdyZW1vdmVkJywgc3R5bGUoe29wYWNpdHk6IDB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiBhY3RpdmUnLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7IGVhc2VUaW1lIH19bXMge3sgZWFzaW5nIH19JylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gcmVtb3ZlZCcsXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3sgZWFzZVRpbWUgfX1tcyB7eyBlYXNpbmcgfX0nKSxcbiAgICAgICAgICAgICksXG4gICAgICAgIF0pLFxuICAgIF0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIG1lc3NhZ2U/OiBzdHJpbmcgfCBTYWZlSHRtbCB8IG51bGw7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgb3B0aW9uczogSW5kaXZpZHVhbENvbmZpZztcbiAgICAvKiogd2lkdGggb2YgcHJvZ3Jlc3MgYmFyICovXG4gICAgd2lkdGggPSAtMTtcbiAgICAvKiogYSBjb21iaW5hdGlvbiBvZiB0b2FzdCB0eXBlIGFuZCBvcHRpb25zLnRvYXN0Q2xhc3MgKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgdG9hc3RDbGFzc2VzID0gJyc7XG4gICAgLyoqIGNvbnRyb2xzIGFuaW1hdGlvbiAqL1xuICAgIEBIb3N0QmluZGluZygnQGZseUluT3V0Jykgc3RhdGUgPSB7XG4gICAgICAgIHZhbHVlOiAnaW5hY3RpdmUnLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGVhc2VUaW1lOiB0aGlzLnRvYXN0UGFja2FnZS5jb25maWcuZWFzZVRpbWUsXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlLWluJyxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHByaXZhdGUgdGltZW91dDogYW55O1xuICAgIHByaXZhdGUgaW50ZXJ2YWxJZDogYW55O1xuICAgIHByaXZhdGUgaGlkZVRpbWU6IG51bWJlcjtcbiAgICBwcml2YXRlIHN1YjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0b2FzdHJTZXJ2aWNlOiBUb2FzdHJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXG4gICAgICAgIHByb3RlY3RlZCBuZ1pvbmU/OiBOZ1pvbmUsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRvYXN0UGFja2FnZS5tZXNzYWdlO1xuICAgICAgICB0aGlzLnRpdGxlID0gdG9hc3RQYWNrYWdlLnRpdGxlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0b2FzdFBhY2thZ2UuY29uZmlnO1xuICAgICAgICB0aGlzLnRvYXN0Q2xhc3NlcyA9IGAke3RvYXN0UGFja2FnZS50b2FzdFR5cGV9ICR7dG9hc3RQYWNrYWdlLmNvbmZpZy50b2FzdENsYXNzfWA7XG4gICAgICAgIHRoaXMuc3ViID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLmFmdGVyQWN0aXZhdGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZVRvYXN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1YjEgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYubWFudWFsQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhY3RpdmF0ZXMgdG9hc3QgYW5kIHNldHMgdGltZW91dFxuICAgICAqL1xuICAgIGFjdGl2YXRlVG9hc3QoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7Li4udGhpcy5zdGF0ZSwgdmFsdWU6ICdhY3RpdmUnfTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgJiYgdGhpcy5vcHRpb25zLnRpbWVPdXQpIHtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZVRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmUoKSwgdGhpcy5vcHRpb25zLnRpbWVPdXQpO1xuICAgICAgICAgICAgdGhpcy5oaWRlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdGhpcy5vcHRpb25zLnRpbWVPdXQ7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRzaWRlSW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGVzIHByb2dyZXNzIGJhciB3aWR0aFxuICAgICAqL1xuICAgIHVwZGF0ZVByb2dyZXNzKCkge1xuICAgICAgICBpZiAodGhpcy53aWR0aCA9PT0gMCB8fCB0aGlzLndpZHRoID09PSAxMDAgfHwgIXRoaXMub3B0aW9ucy50aW1lT3V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuaGlkZVRpbWUgLSBub3c7XG4gICAgICAgIHRoaXMud2lkdGggPSAocmVtYWluaW5nIC8gdGhpcy5vcHRpb25zLnRpbWVPdXQpICogMTAwO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQW5pbWF0aW9uID09PSAnaW5jcmVhc2luZycpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAxMDAgLSB0aGlzLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpZHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpZHRoID49IDEwMCkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDEwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRlbGxzIHRvYXN0clNlcnZpY2UgdG8gcmVtb3ZlIHRoaXMgdG9hc3QgYWZ0ZXIgYW5pbWF0aW9uIHRpbWVcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ3JlbW92ZWQnfTtcbiAgICAgICAgdGhpcy5vdXRzaWRlVGltZW91dCgoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RyU2VydmljZS5yZW1vdmUodGhpcy50b2FzdFBhY2thZ2UudG9hc3RJZCksXG4gICAgICAgICAgICArdGhpcy50b2FzdFBhY2thZ2UuY29uZmlnLmVhc2VUaW1lLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgICB0YXBUb2FzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9hc3RQYWNrYWdlLnRyaWdnZXJUYXAoKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50YXBUb0Rpc21pc3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgICBzdGlja0Fyb3VuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IDA7XG4gICAgICAgIHRoaXMuaGlkZVRpbWUgPSAwO1xuXG4gICAgICAgIC8vIGRpc2FibGUgcHJvZ3Jlc3NCYXJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICBkZWxheWVkSGlkZVRvYXN0KCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0XG4gICAgICAgICAgICB8fCB0aGlzLm9wdGlvbnMuZXh0ZW5kZWRUaW1lT3V0ID09PSAwXG4gICAgICAgICAgICB8fCB0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm91dHNpZGVUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQpO1xuICAgICAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQ7XG4gICAgICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICh0aGlzLm9wdGlvbnMudGltZU91dCB8fCAwKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IC0xO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzKCksIDEwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG91dHNpZGVUaW1lb3V0KGZ1bmM6IEZ1bmN0aW9uLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMubmdab25lKSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5ydW5JbnNpZGVBbmd1bGFyKGZ1bmMpLCB0aW1lb3V0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYygpLCB0aW1lb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG91dHNpZGVJbnRlcnZhbChmdW5jOiBGdW5jdGlvbiwgdGltZW91dDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLm5nWm9uZSkge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnJ1bkluc2lkZUFuZ3VsYXIoZnVuYyksIHRpbWVvdXQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gZnVuYygpLCB0aW1lb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcnVuSW5zaWRlQW5ndWxhcihmdW5jOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiBmdW5jKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=