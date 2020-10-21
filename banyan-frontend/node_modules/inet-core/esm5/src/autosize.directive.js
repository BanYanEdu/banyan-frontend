/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Inspired from: https://stevepapa.com/ng-autosize/
 */
import { Input, ElementRef, HostListener, Directive } from '@angular/core';
var AutoSizeDirective = /** @class */ (function () {
    function AutoSizeDirective(element) {
        this.element = element;
        this.el = element.nativeElement;
        this._clientWidth = this.el.clientWidth;
    }
    Object.defineProperty(AutoSizeDirective.prototype, "minHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minHeight;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._minHeight = val;
            this.updateMinHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoSizeDirective.prototype, "maxHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxHeight;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._maxHeight = val;
            this.updateMaxHeight();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.onResize = /**
     * @return {?}
     */
    function () {
        //Only apply adjustment if element width had changed.
        if (this.el.clientWidth === this._clientWidth)
            return;
        this._clientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.onInput = /**
     * @return {?}
     */
    function () {
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // set element resize allowed manually by user
        /** @type {?} */
        var style = window.getComputedStyle(this.el, null);
        if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        }
        else if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }
        // run first adjust
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.adjust = /**
     * @return {?}
     */
    function () {
        // perform height adjustments after input changes, if height is different
        // if (this.el.style.height == this.element.nativeElement.scrollHeight + "px") return;
        this.el.style.overflow = 'hidden';
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + "px";
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.updateMinHeight = /**
     * @return {?}
     */
    function () {
        // Set textarea min height if input defined
        this.el.style.minHeight = this._minHeight + 'px';
    };
    /**
     * @return {?}
     */
    AutoSizeDirective.prototype.updateMaxHeight = /**
     * @return {?}
     */
    function () {
        // Set textarea max height if input defined
        this.el.style.maxHeight = this._maxHeight + 'px';
    };
    AutoSizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'textarea[appAutoSize]',
                    exportAs: 'appAutoSize'
                },] }
    ];
    /** @nocollapse */
    AutoSizeDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AutoSizeDirective.propDecorators = {
        minHeight: [{ type: Input, args: ['minHeight',] }],
        maxHeight: [{ type: Input, args: ['maxHeight',] }],
        onResize: [{ type: HostListener, args: ['window:resize',] }],
        onInput: [{ type: HostListener, args: ['input',] }]
    };
    return AutoSizeDirective;
}());
export { AutoSizeDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._minHeight;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._maxHeight;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._lastHeight;
    /**
     * @type {?}
     * @private
     */
    AutoSizeDirective.prototype._clientWidth;
    /** @type {?} */
    AutoSizeDirective.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2F1dG9zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekY7SUE0Q0UsMkJBQW1CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDcEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDMUMsQ0FBQztJQWxDRCxzQkFDSSx3Q0FBUzs7OztRQURiO1lBRUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBQ0QsVUFBYyxHQUFXO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixDQUFDOzs7T0FKQTtJQU1ELHNCQUNJLHdDQUFTOzs7O1FBRGI7WUFFRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFDRCxVQUFjLEdBQVc7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7OztPQUpBOzs7O0lBT0Qsb0NBQVE7OztJQURSO1FBRUUscURBQXFEO1FBQ3JELElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBR0QsbUNBQU87OztJQURQO1FBRUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFPRCwyQ0FBZTs7O0lBQWY7OztZQUVRLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7UUFDcEQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1NBQ3JDO2FBQ0ksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUNwQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQy9CO1FBQ0QsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsa0NBQU07OztJQUFOO1FBQ0UseUVBQXlFO1FBQ3pFLHNGQUFzRjtRQUN0RixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNuRCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNuRCxDQUFDOztnQkE5RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjs7OztnQkFMOEIsVUFBVTs7OzRCQWV0QyxLQUFLLFNBQUMsV0FBVzs0QkFTakIsS0FBSyxTQUFDLFdBQVc7MkJBU2pCLFlBQVksU0FBQyxlQUFlOzBCQVE1QixZQUFZLFNBQUMsT0FBTzs7SUF5Q3ZCLHdCQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0EzRVksaUJBQWlCOzs7Ozs7SUFFNUIsK0JBQXdCOzs7OztJQUN4Qix1Q0FBMkI7Ozs7O0lBQzNCLHVDQUEyQjs7Ozs7SUFDM0Isd0NBQTRCOzs7OztJQUM1Qix5Q0FBNkI7O0lBaUNqQixvQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEluc3BpcmVkIGZyb206IGh0dHBzOi8vc3RldmVwYXBhLmNvbS9uZy1hdXRvc2l6ZS9cbiAqL1xuaW1wb3J0IHsgSW5wdXQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgRGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGV4dGFyZWFbYXBwQXV0b1NpemVdJyxcbiAgZXhwb3J0QXM6ICdhcHBBdXRvU2l6ZSdcbn0pXG5cbmV4cG9ydCBjbGFzcyBBdXRvU2l6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9taW5IZWlnaHQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfbWF4SGVpZ2h0OiBzdHJpbmc7XG4gIHByaXZhdGUgX2xhc3RIZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY2xpZW50V2lkdGg6IG51bWJlcjtcblxuICBASW5wdXQoJ21pbkhlaWdodCcpXG4gIGdldCBtaW5IZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21pbkhlaWdodDtcbiAgfVxuICBzZXQgbWluSGVpZ2h0KHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWluSGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMudXBkYXRlTWluSGVpZ2h0KCk7XG4gIH1cblxuICBASW5wdXQoJ21heEhlaWdodCcpXG4gIGdldCBtYXhIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21heEhlaWdodDtcbiAgfVxuICBzZXQgbWF4SGVpZ2h0KHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWF4SGVpZ2h0ID0gdmFsO1xuICAgIHRoaXMudXBkYXRlTWF4SGVpZ2h0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgb25SZXNpemUoKSB7XG4gICAgLy9Pbmx5IGFwcGx5IGFkanVzdG1lbnQgaWYgZWxlbWVudCB3aWR0aCBoYWQgY2hhbmdlZC5cbiAgICBpZiAodGhpcy5lbC5jbGllbnRXaWR0aCA9PT0gdGhpcy5fY2xpZW50V2lkdGgpIHJldHVybjtcbiAgICB0aGlzLl9jbGllbnRXaWR0aCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIHRoaXMuYWRqdXN0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcpXG4gIG9uSW5wdXQoKTogdm9pZCB7XG4gICAgdGhpcy5hZGp1c3QoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKXtcbiAgICB0aGlzLmVsID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX2NsaWVudFdpZHRoID0gdGhpcy5lbC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lke1xuICAgIC8vIHNldCBlbGVtZW50IHJlc2l6ZSBhbGxvd2VkIG1hbnVhbGx5IGJ5IHVzZXJcbiAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwsIG51bGwpO1xuICAgIGlmIChzdHlsZS5yZXNpemUgPT09ICdib3RoJykge1xuICAgICAgdGhpcy5lbC5zdHlsZS5yZXNpemUgPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0eWxlLnJlc2l6ZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy5lbC5zdHlsZS5yZXNpemUgPSAnbm9uZSc7XG4gICAgfVxuICAgIC8vIHJ1biBmaXJzdCBhZGp1c3RcbiAgICB0aGlzLmFkanVzdCgpO1xuICB9XG5cbiAgYWRqdXN0KCk6IHZvaWR7XG4gICAgLy8gcGVyZm9ybSBoZWlnaHQgYWRqdXN0bWVudHMgYWZ0ZXIgaW5wdXQgY2hhbmdlcywgaWYgaGVpZ2h0IGlzIGRpZmZlcmVudFxuICAgIC8vIGlmICh0aGlzLmVsLnN0eWxlLmhlaWdodCA9PSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCIpIHJldHVybjtcbiAgICB0aGlzLmVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSB0aGlzLmVsLnNjcm9sbEhlaWdodCArIFwicHhcIjtcbiAgfVxuXG4gIHVwZGF0ZU1pbkhlaWdodCgpOiB2b2lke1xuICAgIC8vIFNldCB0ZXh0YXJlYSBtaW4gaGVpZ2h0IGlmIGlucHV0IGRlZmluZWRcbiAgICB0aGlzLmVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMuX21pbkhlaWdodCArICdweCc7XG4gIH1cblxuICB1cGRhdGVNYXhIZWlnaHQoKTogdm9pZHtcbiAgICAvLyBTZXQgdGV4dGFyZWEgbWF4IGhlaWdodCBpZiBpbnB1dCBkZWZpbmVkXG4gICAgdGhpcy5lbC5zdHlsZS5tYXhIZWlnaHQgPSB0aGlzLl9tYXhIZWlnaHQgKyAncHgnO1xuICB9XG5cbn0iXX0=