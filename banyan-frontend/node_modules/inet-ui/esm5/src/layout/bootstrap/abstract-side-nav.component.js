/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
var AbstractSideNavComponent = /** @class */ (function () {
    function AbstractSideNavComponent(elementRef) {
        this.elementRef = elementRef;
        this.opened = false;
        this.onClose = new EventEmitter();
        this.onClear = new EventEmitter();
        this.onLoad = new EventEmitter();
        this.overflowCls = 'overflow-hidden';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    AbstractSideNavComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var currentValue = changes['opened']["currentValue"];
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (currentValue) {
                _this.open();
            }
            else if (changes['opened']['previousValue'] != currentValue) {
                _this.close();
            }
        }), 1);
    };
    /**
     * @return {?}
     */
    AbstractSideNavComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        if (!document.body.classList.contains(this.overflowCls)) {
            document.body.classList.add(this.overflowCls);
        }
    };
    /**
     * @return {?}
     */
    AbstractSideNavComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        if (document.body.classList.contains(this.overflowCls)) {
            document.body.classList.remove(this.overflowCls);
        }
        this.opened = false;
        this.onClose.emit(this.opened);
    };
    /**
     * @return {?}
     */
    AbstractSideNavComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AbstractSideNavComponent.prototype.clickOut = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.elementRef.nativeElement.contains(event.target)
            && this.opened && !event.target.closest('.nav-item') &&
            !event.target.closest('.search-input__icon')) {
            this.close();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AbstractSideNavComponent.prototype.clickInside = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.elementRef.nativeElement.contains(event.target)) {
        }
    };
    AbstractSideNavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-admin-side-nav',
                    template: ""
                }] }
    ];
    /** @nocollapse */
    AbstractSideNavComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AbstractSideNavComponent.propDecorators = {
        opened: [{ type: Input }],
        onClose: [{ type: Output }],
        onClear: [{ type: Output }],
        onLoad: [{ type: Output }],
        clickOut: [{ type: HostListener, args: ['document:click', ['$event'],] }],
        clickInside: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return AbstractSideNavComponent;
}());
export { AbstractSideNavComponent };
if (false) {
    /** @type {?} */
    AbstractSideNavComponent.prototype.opened;
    /** @type {?} */
    AbstractSideNavComponent.prototype.onClose;
    /** @type {?} */
    AbstractSideNavComponent.prototype.onClear;
    /** @type {?} */
    AbstractSideNavComponent.prototype.onLoad;
    /**
     * @type {?}
     * @private
     */
    AbstractSideNavComponent.prototype.overflowCls;
    /** @type {?} */
    AbstractSideNavComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtc2lkZS1uYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9sYXlvdXQvYm9vdHN0cmFwL2Fic3RyYWN0LXNpZGUtbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCO0lBV0ksa0NBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFMaEMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN2QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN2QyxnQkFBVyxHQUFHLGlCQUFpQixDQUFDO0lBQ0ssQ0FBQzs7Ozs7SUFFOUMsOENBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQWxDLGlCQVNDOztZQVJTLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ3RELFVBQVU7OztRQUFDO1lBQ1AsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2Y7aUJBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksWUFBWSxFQUFFO2dCQUMzRCxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEI7UUFDTCxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUE7SUFDVCxDQUFDOzs7O0lBRUQsdUNBQUk7OztJQUFKO1FBQ0ksSUFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7Ozs7SUFFRCx3Q0FBSzs7O0lBQUw7UUFDSSxJQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsOENBQVc7OztJQUFYO0lBQ0EsQ0FBQzs7Ozs7SUFHRCwyQ0FBUTs7OztJQURSLFVBQ1MsS0FBSztRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztlQUNsRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3BELENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDOzs7OztJQUVELDhDQUFXOzs7O0lBRFgsVUFDWSxLQUFLO1FBQ2IsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1NBRXhEO0lBQ0wsQ0FBQzs7Z0JBdERKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsRUFBRTtpQkFDZjs7OztnQkFaRyxVQUFVOzs7eUJBZVQsS0FBSzswQkFDTCxNQUFNOzBCQUNOLE1BQU07eUJBQ04sTUFBTTsyQkFnQ04sWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOzhCQVF6QyxZQUFZLFNBQUMsT0FBTyxFQUFHLENBQUMsUUFBUSxDQUFDOztJQU10QywrQkFBQztDQUFBLEFBdkRELElBdURDO1NBbERZLHdCQUF3Qjs7O0lBQ2pDLDBDQUFpQzs7SUFDakMsMkNBQWdEOztJQUNoRCwyQ0FBZ0Q7O0lBQ2hELDBDQUErQzs7Ozs7SUFDL0MsK0NBQXdDOztJQUM1Qiw4Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtYWRtaW4tc2lkZS1uYXYnLFxuICAgIHRlbXBsYXRlOiBgYFxufSlcblxuZXhwb3J0IGNsYXNzIEFic3RyYWN0U2lkZU5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBAT3V0cHV0KCkgb25DbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBAT3V0cHV0KCkgb25Mb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIHByaXZhdGUgb3ZlcmZsb3dDbHMgPSAnb3ZlcmZsb3ctaGlkZGVuJztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ29wZW5lZCddW1wiY3VycmVudFZhbHVlXCJdO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlc1snb3BlbmVkJ11bJ3ByZXZpb3VzVmFsdWUnXSAhPSBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgaWYoIWRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMub3ZlcmZsb3dDbHMpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQodGhpcy5vdmVyZmxvd0Nscyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5vdmVyZmxvd0NscykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm92ZXJmbG93Q2xzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrT3V0KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KVxuICAgICAgICAgICAgJiYgdGhpcy5vcGVuZWQgJiYgIWV2ZW50LnRhcmdldC5jbG9zZXN0KCcubmF2LWl0ZW0nKSAmJlxuICAgICAgICAgICAgIWV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2VhcmNoLWlucHV0X19pY29uJykpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsICBbJyRldmVudCddKVxuICAgIGNsaWNrSW5zaWRlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcblxuICAgICAgICB9XG4gICAgfVxufVxuIl19