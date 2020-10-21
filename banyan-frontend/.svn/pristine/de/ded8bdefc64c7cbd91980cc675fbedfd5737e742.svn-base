/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} event
 * @param {?} __1
 * @return {?}
 */
export function drag(event, _a) {
    var move = _a.move, up = _a.up;
    /** @type {?} */
    var startX = event.pageX;
    /** @type {?} */
    var startY = event.pageY;
    /** @type {?} */
    var x = startX;
    /** @type {?} */
    var y = startY;
    /** @type {?} */
    var moved = false;
    /**
     * @param {?} event
     * @return {?}
     */
    function mouseMoveHandler(event) {
        /** @type {?} */
        var dx = event.pageX - x;
        /** @type {?} */
        var dy = event.pageY - y;
        x = event.pageX;
        y = event.pageY;
        if (dx || dy)
            moved = true;
        move(event, dx, dy, x, y);
        event.preventDefault(); // to avoid text selection
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function mouseUpHandler(event) {
        x = event.pageX;
        y = event.pageY;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        if (up)
            up(event, x, y, moved);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC91dGlscy9kcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLE1BQU0sVUFBVSxJQUFJLENBQUMsS0FBaUIsRUFBRSxFQUEyRDtRQUExRCxjQUFVLEVBQUUsVUFBTTs7UUFFbkQsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLOztRQUNwQixNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUs7O1FBQ3BCLENBQUMsR0FBRyxNQUFNOztRQUNWLENBQUMsR0FBRyxNQUFNOztRQUNWLEtBQUssR0FBRyxLQUFLOzs7OztJQUVqQixTQUFTLGdCQUFnQixDQUFDLEtBQWlCOztZQUNuQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDOztZQUNwQixFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDO1FBQ3hCLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2hCLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2hCLElBQUksRUFBRSxJQUFJLEVBQUU7WUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRTNCLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFMUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsMEJBQTBCO0lBQ3RELENBQUM7Ozs7O0lBRUQsU0FBUyxjQUFjLENBQUMsS0FBaUI7UUFDckMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDaEIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFFaEIsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFeEQsSUFBSSxFQUFFO1lBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDekQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgTW92ZUhhbmRsZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgVXBIYW5kbGVyID0gKGV2ZW50OiBNb3VzZUV2ZW50LCB4OiBudW1iZXIsIHk6IG51bWJlciwgbW92ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnKGV2ZW50OiBNb3VzZUV2ZW50LCB7bW92ZTogbW92ZSwgdXA6IHVwfTogeyBtb3ZlOiBNb3ZlSGFuZGxlciwgdXA/OiBVcEhhbmRsZXIgfSkge1xuXG4gICAgbGV0IHN0YXJ0WCA9IGV2ZW50LnBhZ2VYO1xuICAgIGxldCBzdGFydFkgPSBldmVudC5wYWdlWTtcbiAgICBsZXQgeCA9IHN0YXJ0WDtcbiAgICBsZXQgeSA9IHN0YXJ0WTtcbiAgICBsZXQgbW92ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG1vdXNlTW92ZUhhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IGR4ID0gZXZlbnQucGFnZVggLSB4O1xuICAgICAgICBsZXQgZHkgPSBldmVudC5wYWdlWSAtIHk7XG4gICAgICAgIHggPSBldmVudC5wYWdlWDtcbiAgICAgICAgeSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICBpZiAoZHggfHwgZHkpIG1vdmVkID0gdHJ1ZTtcblxuICAgICAgICBtb3ZlKGV2ZW50LCBkeCwgZHksIHgsIHkpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHRvIGF2b2lkIHRleHQgc2VsZWN0aW9uXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2VVcEhhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgeCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICB5ID0gZXZlbnQucGFnZVk7XG5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG5cbiAgICAgICAgaWYgKHVwKSB1cChldmVudCwgeCwgeSwgbW92ZWQpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG59XG4iXX0=