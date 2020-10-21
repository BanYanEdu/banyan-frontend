/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} event
 * @param {?} __1
 * @return {?}
 */
export function drag(event, { move: move, up: up }) {
    /** @type {?} */
    let startX = event.pageX;
    /** @type {?} */
    let startY = event.pageY;
    /** @type {?} */
    let x = startX;
    /** @type {?} */
    let y = startY;
    /** @type {?} */
    let moved = false;
    /**
     * @param {?} event
     * @return {?}
     */
    function mouseMoveHandler(event) {
        /** @type {?} */
        let dx = event.pageX - x;
        /** @type {?} */
        let dy = event.pageY - y;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC91dGlscy9kcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLE1BQU0sVUFBVSxJQUFJLENBQUMsS0FBaUIsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBd0M7O1FBRTNGLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSzs7UUFDcEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLOztRQUNwQixDQUFDLEdBQUcsTUFBTTs7UUFDVixDQUFDLEdBQUcsTUFBTTs7UUFDVixLQUFLLEdBQUcsS0FBSzs7Ozs7SUFFakIsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFpQjs7WUFDbkMsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQzs7WUFDcEIsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQztRQUN4QixDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoQixDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoQixJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQUUsS0FBSyxHQUFHLElBQUksQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQjtJQUN0RCxDQUFDOzs7OztJQUVELFNBQVMsY0FBYyxDQUFDLEtBQWlCO1FBQ3JDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2hCLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRWhCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXhELElBQUksRUFBRTtZQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIE1vdmVIYW5kbGVyID0gKGV2ZW50OiBNb3VzZUV2ZW50LCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIFVwSGFuZGxlciA9IChldmVudDogTW91c2VFdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIG1vdmVkOiBib29sZWFuKSA9PiB2b2lkO1xuXG5leHBvcnQgZnVuY3Rpb24gZHJhZyhldmVudDogTW91c2VFdmVudCwge21vdmU6IG1vdmUsIHVwOiB1cH06IHsgbW92ZTogTW92ZUhhbmRsZXIsIHVwPzogVXBIYW5kbGVyIH0pIHtcblxuICAgIGxldCBzdGFydFggPSBldmVudC5wYWdlWDtcbiAgICBsZXQgc3RhcnRZID0gZXZlbnQucGFnZVk7XG4gICAgbGV0IHggPSBzdGFydFg7XG4gICAgbGV0IHkgPSBzdGFydFk7XG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBtb3VzZU1vdmVIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCBkeCA9IGV2ZW50LnBhZ2VYIC0geDtcbiAgICAgICAgbGV0IGR5ID0gZXZlbnQucGFnZVkgLSB5O1xuICAgICAgICB4ID0gZXZlbnQucGFnZVg7XG4gICAgICAgIHkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgaWYgKGR4IHx8IGR5KSBtb3ZlZCA9IHRydWU7XG5cbiAgICAgICAgbW92ZShldmVudCwgZHgsIGR5LCB4LCB5KTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyB0byBhdm9pZCB0ZXh0IHNlbGVjdGlvblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNlVXBIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHggPSBldmVudC5wYWdlWDtcbiAgICAgICAgeSA9IGV2ZW50LnBhZ2VZO1xuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEhhbmRsZXIpO1xuXG4gICAgICAgIGlmICh1cCkgdXAoZXZlbnQsIHgsIHksIG1vdmVkKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEhhbmRsZXIpO1xufVxuIl19