/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function ItemsDimensions() { }
if (false) {
    /** @type {?} */
    ItemsDimensions.prototype.itemsLength;
    /** @type {?} */
    ItemsDimensions.prototype.viewWidth;
    /** @type {?} */
    ItemsDimensions.prototype.viewHeight;
    /** @type {?} */
    ItemsDimensions.prototype.childWidth;
    /** @type {?} */
    ItemsDimensions.prototype.childHeight;
    /** @type {?} */
    ItemsDimensions.prototype.itemsPerCol;
}
/**
 * @record
 */
export function ItemsRangeResult() { }
if (false) {
    /** @type {?} */
    ItemsRangeResult.prototype.scrollHeight;
    /** @type {?} */
    ItemsRangeResult.prototype.topPadding;
    /** @type {?} */
    ItemsRangeResult.prototype.start;
    /** @type {?} */
    ItemsRangeResult.prototype.end;
}
var VirtualScrollService = /** @class */ (function () {
    function VirtualScrollService() {
    }
    /**
     * @param {?} d
     * @param {?} dropdownEl
     * @param {?} bufferAmount
     * @return {?}
     */
    VirtualScrollService.prototype.calculateItems = /**
     * @param {?} d
     * @param {?} dropdownEl
     * @param {?} bufferAmount
     * @return {?}
     */
    function (d, dropdownEl, bufferAmount) {
        /** @type {?} */
        var scrollHeight = d.childHeight * d.itemsLength;
        if (dropdownEl.scrollTop > scrollHeight) {
            dropdownEl.scrollTop = scrollHeight;
        }
        /** @type {?} */
        var scrollTop = Math.max(0, dropdownEl.scrollTop);
        /** @type {?} */
        var indexByScrollTop = scrollTop / scrollHeight * d.itemsLength;
        /** @type {?} */
        var end = Math.min(d.itemsLength, Math.ceil(indexByScrollTop) + (d.itemsPerCol + 1));
        /** @type {?} */
        var maxStartEnd = end;
        /** @type {?} */
        var maxStart = Math.max(0, maxStartEnd - d.itemsPerCol - 1);
        /** @type {?} */
        var start = Math.min(maxStart, Math.floor(indexByScrollTop));
        /** @type {?} */
        var topPadding = d.childHeight * Math.ceil(start) - (d.childHeight * Math.min(start, bufferAmount));
        topPadding = !isNaN(topPadding) ? topPadding : 0;
        start = !isNaN(start) ? start : -1;
        end = !isNaN(end) ? end : -1;
        start -= bufferAmount;
        start = Math.max(0, start);
        end += bufferAmount;
        end = Math.min(d.itemsLength, end);
        return {
            topPadding: topPadding,
            scrollHeight: scrollHeight,
            start: start,
            end: end
        };
    };
    /**
     * @param {?} itemsLength
     * @param {?} index
     * @param {?} panelEl
     * @param {?} contentEl
     * @return {?}
     */
    VirtualScrollService.prototype.calculateDimensions = /**
     * @param {?} itemsLength
     * @param {?} index
     * @param {?} panelEl
     * @param {?} contentEl
     * @return {?}
     */
    function (itemsLength, index, panelEl, contentEl) {
        /** @type {?} */
        var panelRect = panelEl.getBoundingClientRect();
        /** @type {?} */
        var itemRect = contentEl.children[index] ? contentEl.children[index].getBoundingClientRect() : {
            width: panelRect.width,
            height: panelRect.height,
            top: 0,
        };
        /** @type {?} */
        var itemsPerCol = Math.max(1, Math.floor(panelRect.height / itemRect.height));
        return {
            itemsLength: itemsLength,
            viewWidth: panelRect.width,
            viewHeight: panelRect.height,
            childWidth: itemRect.width,
            childHeight: itemRect.height,
            itemsPerCol: itemsPerCol,
        };
    };
    VirtualScrollService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ VirtualScrollService.ngInjectableDef = i0.defineInjectable({ factory: function VirtualScrollService_Factory() { return new VirtualScrollService(); }, token: VirtualScrollService, providedIn: "root" });
    return VirtualScrollService;
}());
export { VirtualScrollService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbmctc2VsZWN0L3NlcnZpY2UvdmlydHVhbC1zY3JvbGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFFM0MscUNBT0M7OztJQU5HLHNDQUFvQjs7SUFDcEIsb0NBQWtCOztJQUNsQixxQ0FBbUI7O0lBQ25CLHFDQUFtQjs7SUFDbkIsc0NBQW9COztJQUNwQixzQ0FBb0I7Ozs7O0FBR3hCLHNDQUtDOzs7SUFKRyx3Q0FBcUI7O0lBQ3JCLHNDQUFtQjs7SUFDbkIsaUNBQWM7O0lBQ2QsK0JBQVk7O0FBR2hCO0lBQUE7S0FvREM7Ozs7Ozs7SUFqREcsNkNBQWM7Ozs7OztJQUFkLFVBQWUsQ0FBa0IsRUFBRSxVQUF1QixFQUFFLFlBQW9COztZQUN0RSxZQUFZLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsV0FBVztRQUNsRCxJQUFJLFVBQVUsQ0FBQyxTQUFTLEdBQUcsWUFBWSxFQUFFO1lBQ3JDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQ3ZDOztZQUVLLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDOztZQUM3QyxnQkFBZ0IsR0FBRyxTQUFTLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxXQUFXOztZQUM3RCxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1lBRTlFLFdBQVcsR0FBRyxHQUFHOztZQUNqQixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztZQUN6RCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztZQUV4RCxVQUFVLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNuRyxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxJQUFJLFlBQVksQ0FBQztRQUN0QixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsR0FBRyxJQUFJLFlBQVksQ0FBQztRQUNwQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLE9BQU87WUFDSCxVQUFVLEVBQUUsVUFBVTtZQUN0QixZQUFZLEVBQUUsWUFBWTtZQUMxQixLQUFLLEVBQUUsS0FBSztZQUNaLEdBQUcsRUFBRSxHQUFHO1NBQ1gsQ0FBQTtJQUNMLENBQUM7Ozs7Ozs7O0lBRUQsa0RBQW1COzs7Ozs7O0lBQW5CLFVBQW9CLFdBQW1CLEVBQUUsS0FBYSxFQUFFLE9BQW9CLEVBQUUsU0FBc0I7O1lBQzFGLFNBQVMsR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUU7O1lBQzNDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdGLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztZQUN0QixNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU07WUFDeEIsR0FBRyxFQUFFLENBQUM7U0FDVDs7WUFDSyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvRSxPQUFPO1lBQ0gsV0FBVyxFQUFFLFdBQVc7WUFDeEIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLO1lBQzFCLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTTtZQUM1QixVQUFVLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDMUIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQzVCLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUM7SUFDTixDQUFDOztnQkFuREosVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OytCQWxCbEM7Q0FzRUMsQUFwREQsSUFvREM7U0FuRFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW1zRGltZW5zaW9ucyB7XG4gICAgaXRlbXNMZW5ndGg6IG51bWJlcjtcbiAgICB2aWV3V2lkdGg6IG51bWJlcjtcbiAgICB2aWV3SGVpZ2h0OiBudW1iZXI7XG4gICAgY2hpbGRXaWR0aDogbnVtYmVyO1xuICAgIGNoaWxkSGVpZ2h0OiBudW1iZXI7XG4gICAgaXRlbXNQZXJDb2w6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJdGVtc1JhbmdlUmVzdWx0IHtcbiAgICBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcbiAgICB0b3BQYWRkaW5nOiBudW1iZXI7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsU2VydmljZSB7XG5cbiAgICBjYWxjdWxhdGVJdGVtcyhkOiBJdGVtc0RpbWVuc2lvbnMsIGRyb3Bkb3duRWw6IEhUTUxFbGVtZW50LCBidWZmZXJBbW91bnQ6IG51bWJlcik6IEl0ZW1zUmFuZ2VSZXN1bHQge1xuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBkLmNoaWxkSGVpZ2h0ICogZC5pdGVtc0xlbmd0aDtcbiAgICAgICAgaWYgKGRyb3Bkb3duRWwuc2Nyb2xsVG9wID4gc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgICBkcm9wZG93bkVsLnNjcm9sbFRvcCA9IHNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IE1hdGgubWF4KDAsIGRyb3Bkb3duRWwuc2Nyb2xsVG9wKTtcbiAgICAgICAgY29uc3QgaW5kZXhCeVNjcm9sbFRvcCA9IHNjcm9sbFRvcCAvIHNjcm9sbEhlaWdodCAqIGQuaXRlbXNMZW5ndGg7XG4gICAgICAgIGxldCBlbmQgPSBNYXRoLm1pbihkLml0ZW1zTGVuZ3RoLCBNYXRoLmNlaWwoaW5kZXhCeVNjcm9sbFRvcCkgKyAoZC5pdGVtc1BlckNvbCArIDEpKTtcblxuICAgICAgICBjb25zdCBtYXhTdGFydEVuZCA9IGVuZDtcbiAgICAgICAgY29uc3QgbWF4U3RhcnQgPSBNYXRoLm1heCgwLCBtYXhTdGFydEVuZCAtIGQuaXRlbXNQZXJDb2wgLSAxKTtcbiAgICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5taW4obWF4U3RhcnQsIE1hdGguZmxvb3IoaW5kZXhCeVNjcm9sbFRvcCkpO1xuXG4gICAgICAgIGxldCB0b3BQYWRkaW5nID0gZC5jaGlsZEhlaWdodCAqIE1hdGguY2VpbChzdGFydCkgLSAoZC5jaGlsZEhlaWdodCAqIE1hdGgubWluKHN0YXJ0LCBidWZmZXJBbW91bnQpKTtcbiAgICAgICAgdG9wUGFkZGluZyA9ICFpc05hTih0b3BQYWRkaW5nKSA/IHRvcFBhZGRpbmcgOiAwO1xuICAgICAgICBzdGFydCA9ICFpc05hTihzdGFydCkgPyBzdGFydCA6IC0xO1xuICAgICAgICBlbmQgPSAhaXNOYU4oZW5kKSA/IGVuZCA6IC0xO1xuICAgICAgICBzdGFydCAtPSBidWZmZXJBbW91bnQ7XG4gICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgc3RhcnQpO1xuICAgICAgICBlbmQgKz0gYnVmZmVyQW1vdW50O1xuICAgICAgICBlbmQgPSBNYXRoLm1pbihkLml0ZW1zTGVuZ3RoLCBlbmQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3BQYWRkaW5nOiB0b3BQYWRkaW5nLFxuICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlRGltZW5zaW9ucyhpdGVtc0xlbmd0aDogbnVtYmVyLCBpbmRleDogbnVtYmVyLCBwYW5lbEVsOiBIVE1MRWxlbWVudCwgY29udGVudEVsOiBIVE1MRWxlbWVudCk6IEl0ZW1zRGltZW5zaW9ucyB7XG4gICAgICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGl0ZW1SZWN0ID0gY29udGVudEVsLmNoaWxkcmVuW2luZGV4XSA/IGNvbnRlbnRFbC5jaGlsZHJlbltpbmRleF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiB7XG4gICAgICAgICAgICB3aWR0aDogcGFuZWxSZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBwYW5lbFJlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBpdGVtc1BlckNvbCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocGFuZWxSZWN0LmhlaWdodCAvIGl0ZW1SZWN0LmhlaWdodCkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpdGVtc0xlbmd0aDogaXRlbXNMZW5ndGgsXG4gICAgICAgICAgICB2aWV3V2lkdGg6IHBhbmVsUmVjdC53aWR0aCxcbiAgICAgICAgICAgIHZpZXdIZWlnaHQ6IHBhbmVsUmVjdC5oZWlnaHQsXG4gICAgICAgICAgICBjaGlsZFdpZHRoOiBpdGVtUmVjdC53aWR0aCxcbiAgICAgICAgICAgIGNoaWxkSGVpZ2h0OiBpdGVtUmVjdC5oZWlnaHQsXG4gICAgICAgICAgICBpdGVtc1BlckNvbDogaXRlbXNQZXJDb2wsXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19