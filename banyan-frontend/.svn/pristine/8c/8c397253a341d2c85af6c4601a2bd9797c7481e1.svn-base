/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Inspired from: https://stevepapa.com/ng-autosize/
 */
import { Input, ElementRef, HostListener, Directive } from '@angular/core';
export class AutoSizeDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.el = element.nativeElement;
        this._clientWidth = this.el.clientWidth;
    }
    /**
     * @return {?}
     */
    get minHeight() {
        return this._minHeight;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set minHeight(val) {
        this._minHeight = val;
        this.updateMinHeight();
    }
    /**
     * @return {?}
     */
    get maxHeight() {
        return this._maxHeight;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set maxHeight(val) {
        this._maxHeight = val;
        this.updateMaxHeight();
    }
    /**
     * @return {?}
     */
    onResize() {
        //Only apply adjustment if element width had changed.
        if (this.el.clientWidth === this._clientWidth)
            return;
        this._clientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    }
    /**
     * @return {?}
     */
    onInput() {
        this.adjust();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // set element resize allowed manually by user
        /** @type {?} */
        const style = window.getComputedStyle(this.el, null);
        if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        }
        else if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }
        // run first adjust
        this.adjust();
    }
    /**
     * @return {?}
     */
    adjust() {
        // perform height adjustments after input changes, if height is different
        // if (this.el.style.height == this.element.nativeElement.scrollHeight + "px") return;
        this.el.style.overflow = 'hidden';
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + "px";
    }
    /**
     * @return {?}
     */
    updateMinHeight() {
        // Set textarea min height if input defined
        this.el.style.minHeight = this._minHeight + 'px';
    }
    /**
     * @return {?}
     */
    updateMaxHeight() {
        // Set textarea max height if input defined
        this.el.style.maxHeight = this._maxHeight + 'px';
    }
}
AutoSizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[appAutoSize]',
                exportAs: 'appAutoSize'
            },] }
];
/** @nocollapse */
AutoSizeDirective.ctorParameters = () => [
    { type: ElementRef }
];
AutoSizeDirective.propDecorators = {
    minHeight: [{ type: Input, args: ['minHeight',] }],
    maxHeight: [{ type: Input, args: ['maxHeight',] }],
    onResize: [{ type: HostListener, args: ['window:resize',] }],
    onInput: [{ type: HostListener, args: ['input',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL2F1dG9zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFPekYsTUFBTSxPQUFPLGlCQUFpQjs7OztJQXVDNUIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNwQyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxDQUFDOzs7O0lBbENELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUNELElBQUksU0FBUyxDQUFDLEdBQVc7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxJQUNJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFNBQVMsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBR0QsUUFBUTtRQUNOLHFEQUFxRDtRQUNyRCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7OztJQUdELE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7OztJQU9ELGVBQWU7OztjQUVQLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7UUFDcEQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1NBQ3JDO2FBQ0ksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUNwQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQy9CO1FBQ0QsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLHlFQUF5RTtRQUN6RSxzRkFBc0Y7UUFDdEYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELGVBQWU7UUFDYiwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ25ELENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNuRCxDQUFDOzs7WUE5RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7O1lBTDhCLFVBQVU7Ozt3QkFldEMsS0FBSyxTQUFDLFdBQVc7d0JBU2pCLEtBQUssU0FBQyxXQUFXO3VCQVNqQixZQUFZLFNBQUMsZUFBZTtzQkFRNUIsWUFBWSxTQUFDLE9BQU87Ozs7Ozs7SUFoQ3JCLCtCQUF3Qjs7Ozs7SUFDeEIsdUNBQTJCOzs7OztJQUMzQix1Q0FBMkI7Ozs7O0lBQzNCLHdDQUE0Qjs7Ozs7SUFDNUIseUNBQTZCOztJQWlDakIsb0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBJbnNwaXJlZCBmcm9tOiBodHRwczovL3N0ZXZlcGFwYS5jb20vbmctYXV0b3NpemUvXG4gKi9cbmltcG9ydCB7IElucHV0LCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIERpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RleHRhcmVhW2FwcEF1dG9TaXplXScsXG4gIGV4cG9ydEFzOiAnYXBwQXV0b1NpemUnXG59KVxuXG5leHBvcnQgY2xhc3MgQXV0b1NpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfbWluSGVpZ2h0OiBzdHJpbmc7XG4gIHByaXZhdGUgX21heEhlaWdodDogc3RyaW5nO1xuICBwcml2YXRlIF9sYXN0SGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgX2NsaWVudFdpZHRoOiBudW1iZXI7XG5cbiAgQElucHV0KCdtaW5IZWlnaHQnKVxuICBnZXQgbWluSGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLl9taW5IZWlnaHQ7XG4gIH1cbiAgc2V0IG1pbkhlaWdodCh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX21pbkhlaWdodCA9IHZhbDtcbiAgICB0aGlzLnVwZGF0ZU1pbkhlaWdodCgpO1xuICB9XG5cbiAgQElucHV0KCdtYXhIZWlnaHQnKVxuICBnZXQgbWF4SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLl9tYXhIZWlnaHQ7XG4gIH1cbiAgc2V0IG1heEhlaWdodCh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX21heEhlaWdodCA9IHZhbDtcbiAgICB0aGlzLnVwZGF0ZU1heEhlaWdodCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uUmVzaXplKCkge1xuICAgIC8vT25seSBhcHBseSBhZGp1c3RtZW50IGlmIGVsZW1lbnQgd2lkdGggaGFkIGNoYW5nZWQuXG4gICAgaWYgKHRoaXMuZWwuY2xpZW50V2lkdGggPT09IHRoaXMuX2NsaWVudFdpZHRoKSByZXR1cm47XG4gICAgdGhpcy5fY2xpZW50V2lkdGggPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB0aGlzLmFkanVzdCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnKVxuICBvbklucHV0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRqdXN0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZil7XG4gICAgdGhpcy5lbCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9jbGllbnRXaWR0aCA9IHRoaXMuZWwuY2xpZW50V2lkdGg7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZHtcbiAgICAvLyBzZXQgZWxlbWVudCByZXNpemUgYWxsb3dlZCBtYW51YWxseSBieSB1c2VyXG4gICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsLCBudWxsKTtcbiAgICBpZiAoc3R5bGUucmVzaXplID09PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZWwuc3R5bGUucmVzaXplID0gJ2hvcml6b250YWwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdHlsZS5yZXNpemUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHRoaXMuZWwuc3R5bGUucmVzaXplID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBydW4gZmlyc3QgYWRqdXN0XG4gICAgdGhpcy5hZGp1c3QoKTtcbiAgfVxuXG4gIGFkanVzdCgpOiB2b2lke1xuICAgIC8vIHBlcmZvcm0gaGVpZ2h0IGFkanVzdG1lbnRzIGFmdGVyIGlucHV0IGNoYW5nZXMsIGlmIGhlaWdodCBpcyBkaWZmZXJlbnRcbiAgICAvLyBpZiAodGhpcy5lbC5zdHlsZS5oZWlnaHQgPT0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiKSByZXR1cm47XG4gICAgdGhpcy5lbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gdGhpcy5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gIH1cblxuICB1cGRhdGVNaW5IZWlnaHQoKTogdm9pZHtcbiAgICAvLyBTZXQgdGV4dGFyZWEgbWluIGhlaWdodCBpZiBpbnB1dCBkZWZpbmVkXG4gICAgdGhpcy5lbC5zdHlsZS5taW5IZWlnaHQgPSB0aGlzLl9taW5IZWlnaHQgKyAncHgnO1xuICB9XG5cbiAgdXBkYXRlTWF4SGVpZ2h0KCk6IHZvaWR7XG4gICAgLy8gU2V0IHRleHRhcmVhIG1heCBoZWlnaHQgaWYgaW5wdXQgZGVmaW5lZFxuICAgIHRoaXMuZWwuc3R5bGUubWF4SGVpZ2h0ID0gdGhpcy5fbWF4SGVpZ2h0ICsgJ3B4JztcbiAgfVxuXG59Il19