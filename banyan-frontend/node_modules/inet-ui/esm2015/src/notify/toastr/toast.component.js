/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { Component, HostBinding, HostListener, NgZone, } from '@angular/core';
import { ToastPackage } from './toastr-config';
import { ToastrService } from './toastr.service';
export class Toast {
    /**
     * @param {?} toastrService
     * @param {?} toastPackage
     * @param {?=} ngZone
     */
    constructor(toastrService, toastPackage, ngZone) {
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
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe((/**
         * @return {?}
         */
        () => {
            this.activateToast();
        }));
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe((/**
         * @return {?}
         */
        () => {
            this.remove();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    }
    /**
     * activates toast and sets timeout
     * @return {?}
     */
    activateToast() {
        this.state = Object.assign({}, this.state, { value: 'active' });
        if (!this.options.disableTimeOut && this.options.timeOut) {
            this.outsideTimeout((/**
             * @return {?}
             */
            () => this.remove()), this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.outsideInterval((/**
                 * @return {?}
                 */
                () => this.updateProgress()), 10);
            }
        }
    }
    /**
     * updates progress bar width
     * @return {?}
     */
    updateProgress() {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        /** @type {?} */
        const now = new Date().getTime();
        /** @type {?} */
        const remaining = this.hideTime - now;
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
    }
    /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    remove() {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = Object.assign({}, this.state, { value: 'removed' });
        this.outsideTimeout((/**
         * @return {?}
         */
        () => this.toastrService.remove(this.toastPackage.toastId)), +this.toastPackage.config.easeTime);
    }
    /**
     * @return {?}
     */
    tapToast() {
        if (this.state.value === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    }
    /**
     * @return {?}
     */
    stickAround() {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    }
    /**
     * @return {?}
     */
    delayedHideToast() {
        if (this.options.disableTimeOut
            || this.options.extendedTimeOut === 0
            || this.state.value === 'removed') {
            return;
        }
        this.outsideTimeout((/**
         * @return {?}
         */
        () => this.remove()), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval((/**
             * @return {?}
             */
            () => this.updateProgress()), 10);
        }
    }
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    outsideTimeout(func, timeout) {
        if (this.ngZone) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => this.timeout = setTimeout((/**
             * @return {?}
             */
            () => this.runInsideAngular(func)), timeout)));
        }
        else {
            this.timeout = setTimeout((/**
             * @return {?}
             */
            () => func()), timeout);
        }
    }
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    outsideInterval(func, timeout) {
        if (this.ngZone) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => this.intervalId = setInterval((/**
             * @return {?}
             */
            () => this.runInsideAngular(func)), timeout)));
        }
        else {
            this.intervalId = setInterval((/**
             * @return {?}
             */
            () => func()), timeout);
        }
    }
    /**
     * @private
     * @param {?} func
     * @return {?}
     */
    runInsideAngular(func) {
        if (this.ngZone) {
            this.ngZone.run((/**
             * @return {?}
             */
            () => func()));
        }
        else {
            func();
        }
    }
}
Toast.decorators = [
    { type: Component, args: [{
                selector: '[toast-component]',
                template: `
        <button *ngIf="options.closeButton" (click)="remove()" class="toast-close-button" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
            {{ title }}
        </div>
        <div *ngIf="message && options.enableHtml" role="alertdialog" aria-live="polite"
             [class]="options.messageClass" [innerHTML]="message">
        </div>
        <div *ngIf="message && !options.enableHtml" role="alertdialog" aria-live="polite"
             [class]="options.messageClass" [attr.aria-label]="message">
            {{ message }}
        </div>
        <div *ngIf="options.progressBar">
            <div class="toast-progress" [style.width]="width + '%'"></div>
        </div>
    `,
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
Toast.ctorParameters = () => [
    { type: ToastrService },
    { type: ToastPackage },
    { type: NgZone }
];
Toast.propDecorators = {
    toastClasses: [{ type: HostBinding, args: ['class',] }],
    state: [{ type: HostBinding, args: ['@flyInOut',] }],
    tapToast: [{ type: HostListener, args: ['click',] }],
    stickAround: [{ type: HostListener, args: ['mouseenter',] }],
    delayedHideToast: [{ type: HostListener, args: ['mouseleave',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9ub3RpZnkvdG9hc3RyL3RvYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1YsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE9BQU8sRUFBbUIsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBd0MvQyxNQUFNLE9BQU8sS0FBSzs7Ozs7O0lBc0JkLFlBQ2MsYUFBNEIsRUFDL0IsWUFBMEIsRUFDdkIsTUFBZTtRQUZmLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQy9CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVM7Ozs7UUFwQjdCLFVBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzs7OztRQUVXLGlCQUFZLEdBQUcsRUFBRSxDQUFDOzs7O1FBRWQsVUFBSyxHQUFHO1lBQzlCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLE1BQU0sRUFBRTtnQkFDSixRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUTtnQkFDM0MsTUFBTSxFQUFFLFNBQVM7YUFDcEI7U0FDSixDQUFDO1FBWUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVks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QkF1REwsV0FBVyxTQUFDLE9BQU87b0JBRW5CLFdBQVcsU0FBQyxXQUFXO3VCQXVGdkIsWUFBWSxTQUFDLE9BQU87MEJBV3BCLFlBQVksU0FBQyxZQUFZOytCQWN6QixZQUFZLFNBQUMsWUFBWTs7OztJQXhIMUIsd0JBQW1DOztJQUNuQyxzQkFBZTs7SUFDZix3QkFBMEI7Ozs7O0lBRTFCLHNCQUFXOzs7OztJQUVYLDZCQUF3Qzs7Ozs7SUFFeEMsc0JBTUU7Ozs7O0lBQ0Ysd0JBQXFCOzs7OztJQUNyQiwyQkFBd0I7Ozs7O0lBQ3hCLHlCQUF5Qjs7Ozs7SUFDekIsb0JBQTBCOzs7OztJQUMxQixxQkFBMkI7Ozs7O0lBR3ZCLDhCQUFzQzs7SUFDdEMsNkJBQWlDOzs7OztJQUNqQyx1QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGFuaW1hdGUsXG4gICAgc3RhdGUsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7SW5kaXZpZHVhbENvbmZpZywgVG9hc3RQYWNrYWdlfSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuaW1wb3J0IHtUb2FzdHJTZXJ2aWNlfSBmcm9tICcuL3RvYXN0ci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbdG9hc3QtY29tcG9uZW50XScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm9wdGlvbnMuY2xvc2VCdXR0b25cIiAoY2xpY2spPVwicmVtb3ZlKClcIiBjbGFzcz1cInRvYXN0LWNsb3NlLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0aXRsZVwiIFtjbGFzc109XCJvcHRpb25zLnRpdGxlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlXCI+XG4gICAgICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UgJiYgb3B0aW9ucy5lbmFibGVIdG1sXCIgcm9sZT1cImFsZXJ0ZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucy5tZXNzYWdlQ2xhc3NcIiBbaW5uZXJIVE1MXT1cIm1lc3NhZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXNzYWdlICYmICFvcHRpb25zLmVuYWJsZUh0bWxcIiByb2xlPVwiYWxlcnRkaWFsb2dcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zLm1lc3NhZ2VDbGFzc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwibWVzc2FnZVwiPlxuICAgICAgICAgICAge3sgbWVzc2FnZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnMucHJvZ3Jlc3NCYXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1wcm9ncmVzc1wiIFtzdHlsZS53aWR0aF09XCJ3aWR0aCArICclJ1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZmx5SW5PdXQnLCBbXG4gICAgICAgICAgICBzdGF0ZSgnaW5hY3RpdmUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoe30pKSxcbiAgICAgICAgICAgIHN0YXRlKCdyZW1vdmVkJywgc3R5bGUoe29wYWNpdHk6IDB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiBhY3RpdmUnLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7IGVhc2VUaW1lIH19bXMge3sgZWFzaW5nIH19JylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gcmVtb3ZlZCcsXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3sgZWFzZVRpbWUgfX1tcyB7eyBlYXNpbmcgfX0nKSxcbiAgICAgICAgICAgICksXG4gICAgICAgIF0pLFxuICAgIF0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIG1lc3NhZ2U/OiBzdHJpbmcgfCBTYWZlSHRtbCB8IG51bGw7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgb3B0aW9uczogSW5kaXZpZHVhbENvbmZpZztcbiAgICAvKiogd2lkdGggb2YgcHJvZ3Jlc3MgYmFyICovXG4gICAgd2lkdGggPSAtMTtcbiAgICAvKiogYSBjb21iaW5hdGlvbiBvZiB0b2FzdCB0eXBlIGFuZCBvcHRpb25zLnRvYXN0Q2xhc3MgKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgdG9hc3RDbGFzc2VzID0gJyc7XG4gICAgLyoqIGNvbnRyb2xzIGFuaW1hdGlvbiAqL1xuICAgIEBIb3N0QmluZGluZygnQGZseUluT3V0Jykgc3RhdGUgPSB7XG4gICAgICAgIHZhbHVlOiAnaW5hY3RpdmUnLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGVhc2VUaW1lOiB0aGlzLnRvYXN0UGFja2FnZS5jb25maWcuZWFzZVRpbWUsXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlLWluJyxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHByaXZhdGUgdGltZW91dDogYW55O1xuICAgIHByaXZhdGUgaW50ZXJ2YWxJZDogYW55O1xuICAgIHByaXZhdGUgaGlkZVRpbWU6IG51bWJlcjtcbiAgICBwcml2YXRlIHN1YjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0b2FzdHJTZXJ2aWNlOiBUb2FzdHJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXG4gICAgICAgIHByb3RlY3RlZCBuZ1pvbmU/OiBOZ1pvbmUsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRvYXN0UGFja2FnZS5tZXNzYWdlO1xuICAgICAgICB0aGlzLnRpdGxlID0gdG9hc3RQYWNrYWdlLnRpdGxlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0b2FzdFBhY2thZ2UuY29uZmlnO1xuICAgICAgICB0aGlzLnRvYXN0Q2xhc3NlcyA9IGAke3RvYXN0UGFja2FnZS50b2FzdFR5cGV9ICR7dG9hc3RQYWNrYWdlLmNvbmZpZy50b2FzdENsYXNzfWA7XG4gICAgICAgIHRoaXMuc3ViID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLmFmdGVyQWN0aXZhdGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZVRvYXN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1YjEgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYubWFudWFsQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhY3RpdmF0ZXMgdG9hc3QgYW5kIHNldHMgdGltZW91dFxuICAgICAqL1xuICAgIGFjdGl2YXRlVG9hc3QoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7Li4udGhpcy5zdGF0ZSwgdmFsdWU6ICdhY3RpdmUnfTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgJiYgdGhpcy5vcHRpb25zLnRpbWVPdXQpIHtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZVRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmUoKSwgdGhpcy5vcHRpb25zLnRpbWVPdXQpO1xuICAgICAgICAgICAgdGhpcy5oaWRlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdGhpcy5vcHRpb25zLnRpbWVPdXQ7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRzaWRlSW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGVzIHByb2dyZXNzIGJhciB3aWR0aFxuICAgICAqL1xuICAgIHVwZGF0ZVByb2dyZXNzKCkge1xuICAgICAgICBpZiAodGhpcy53aWR0aCA9PT0gMCB8fCB0aGlzLndpZHRoID09PSAxMDAgfHwgIXRoaXMub3B0aW9ucy50aW1lT3V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuaGlkZVRpbWUgLSBub3c7XG4gICAgICAgIHRoaXMud2lkdGggPSAocmVtYWluaW5nIC8gdGhpcy5vcHRpb25zLnRpbWVPdXQpICogMTAwO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQW5pbWF0aW9uID09PSAnaW5jcmVhc2luZycpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAxMDAgLSB0aGlzLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpZHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpZHRoID49IDEwMCkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDEwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRlbGxzIHRvYXN0clNlcnZpY2UgdG8gcmVtb3ZlIHRoaXMgdG9hc3QgYWZ0ZXIgYW5pbWF0aW9uIHRpbWVcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ3JlbW92ZWQnfTtcbiAgICAgICAgdGhpcy5vdXRzaWRlVGltZW91dCgoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RyU2VydmljZS5yZW1vdmUodGhpcy50b2FzdFBhY2thZ2UudG9hc3RJZCksXG4gICAgICAgICAgICArdGhpcy50b2FzdFBhY2thZ2UuY29uZmlnLmVhc2VUaW1lLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgICB0YXBUb2FzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9hc3RQYWNrYWdlLnRyaWdnZXJUYXAoKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50YXBUb0Rpc21pc3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgICBzdGlja0Fyb3VuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IDA7XG4gICAgICAgIHRoaXMuaGlkZVRpbWUgPSAwO1xuXG4gICAgICAgIC8vIGRpc2FibGUgcHJvZ3Jlc3NCYXJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICBkZWxheWVkSGlkZVRvYXN0KCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0XG4gICAgICAgICAgICB8fCB0aGlzLm9wdGlvbnMuZXh0ZW5kZWRUaW1lT3V0ID09PSAwXG4gICAgICAgICAgICB8fCB0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm91dHNpZGVUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQpO1xuICAgICAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQ7XG4gICAgICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICh0aGlzLm9wdGlvbnMudGltZU91dCB8fCAwKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IC0xO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzKCksIDEwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG91dHNpZGVUaW1lb3V0KGZ1bmM6IEZ1bmN0aW9uLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMubmdab25lKSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5ydW5JbnNpZGVBbmd1bGFyKGZ1bmMpLCB0aW1lb3V0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYygpLCB0aW1lb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG91dHNpZGVJbnRlcnZhbChmdW5jOiBGdW5jdGlvbiwgdGltZW91dDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLm5nWm9uZSkge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnJ1bkluc2lkZUFuZ3VsYXIoZnVuYyksIHRpbWVvdXQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gZnVuYygpLCB0aW1lb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcnVuSW5zaWRlQW5ndWxhcihmdW5jOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiBmdW5jKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=