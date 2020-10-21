/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * enable or disable toolbar based on configuration
 *
 * @param {?} value toolbar item
 * @param {?} toolbar toolbar configuration object
 * @return {?}
 */
export function canEnableToolbarOptions(value, toolbar) {
    if (value) {
        if (toolbar['length'] === 0) {
            return true;
        }
        else {
            /** @type {?} */
            var found = toolbar.filter((/**
             * @param {?} array
             * @return {?}
             */
            function (array) {
                return array.indexOf(value) !== -1;
            }));
            return found.length ? true : false;
        }
    }
    else {
        return false;
    }
}
/**
 * set editor configuration
 *
 * @param {?} value configuration via [config] property
 * @param {?} ngxEditorConfig default editor configuration
 * @param {?} input direct configuration inputs via directives
 * @return {?}
 */
export function getEditorConfiguration(value, ngxEditorConfig, input) {
    for (var i in ngxEditorConfig) {
        if (i) {
            if (input[i] !== undefined) {
                value[i] = input[i];
            }
            if (!value.hasOwnProperty(i)) {
                value[i] = ngxEditorConfig[i];
            }
        }
    }
    return value;
}
/**
 * return vertical if the element is the resizer property is set to basic
 *
 * @param {?} resizer type of resizer, either basic or stack
 * @return {?}
 */
export function canResize(resizer) {
    if (resizer === 'basic') {
        return 'vertical';
    }
    return false;
}
/**
 * save selection when the editor is focussed out
 * @return {?}
 */
export function saveSelection() {
    if (window.getSelection) {
        /** @type {?} */
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    }
    else if (document.getSelection && document.createRange) {
        return document.createRange();
    }
    return null;
}
/**
 * restore selection when the editor is focussed in
 *
 * @param {?} range saved selection when the editor is focussed out
 * @return {?}
 */
export function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            /** @type {?} */
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
        }
        else if (document.getSelection && range.select) {
            range.select();
            return true;
        }
    }
    else {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVkaXRvci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbmd4LWVkaXRvci9jb21tb24vdXRpbHMvbmd4LWVkaXRvci51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU1BLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxLQUFhLEVBQUUsT0FBWTtJQUNqRSxJQUFJLEtBQUssRUFBRTtRQUNULElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07O2dCQUNDLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsS0FBSztnQkFDaEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsRUFBQztZQUVGLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDcEM7S0FDRjtTQUFNO1FBQ0wsT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUM7Ozs7Ozs7OztBQVNELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxLQUFVLEVBQUUsZUFBb0IsRUFBRSxLQUFVO0lBQ2pGLEtBQUssSUFBTSxDQUFDLElBQUksZUFBZSxFQUFFO1FBQy9CLElBQUksQ0FBQyxFQUFFO1lBQ0wsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0I7U0FDRjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLFNBQVMsQ0FBQyxPQUFlO0lBQ3ZDLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtRQUN2QixPQUFPLFVBQVUsQ0FBQztLQUNuQjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQzs7Ozs7QUFLRCxNQUFNLFVBQVUsYUFBYTtJQUMzQixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1lBQ2pCLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ2pDLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDeEQsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDL0I7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FBSztJQUNwQyxJQUFJLEtBQUssRUFBRTtRQUNULElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTs7Z0JBQ2pCLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBlbmFibGUgb3IgZGlzYWJsZSB0b29sYmFyIGJhc2VkIG9uIGNvbmZpZ3VyYXRpb25cbiAqXG4gKiBAcGFyYW0gdmFsdWUgdG9vbGJhciBpdGVtXG4gKiBAcGFyYW0gdG9vbGJhciB0b29sYmFyIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5FbmFibGVUb29sYmFyT3B0aW9ucyh2YWx1ZTogc3RyaW5nLCB0b29sYmFyOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKHRvb2xiYXJbJ2xlbmd0aCddID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZm91bmQgPSB0b29sYmFyLmZpbHRlcihhcnJheSA9PiB7XG4gICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZvdW5kLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogc2V0IGVkaXRvciBjb25maWd1cmF0aW9uXG4gKlxuICogQHBhcmFtIHZhbHVlIGNvbmZpZ3VyYXRpb24gdmlhIFtjb25maWddIHByb3BlcnR5XG4gKiBAcGFyYW0gbmd4RWRpdG9yQ29uZmlnIGRlZmF1bHQgZWRpdG9yIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSBpbnB1dCBkaXJlY3QgY29uZmlndXJhdGlvbiBpbnB1dHMgdmlhIGRpcmVjdGl2ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVkaXRvckNvbmZpZ3VyYXRpb24odmFsdWU6IGFueSwgbmd4RWRpdG9yQ29uZmlnOiBhbnksIGlucHV0OiBhbnkpOiBhbnkge1xuICBmb3IgKGNvbnN0IGkgaW4gbmd4RWRpdG9yQ29uZmlnKSB7XG4gICAgaWYgKGkpIHtcbiAgICAgIGlmIChpbnB1dFtpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlW2ldID0gaW5wdXRbaV07XG4gICAgICB9XG4gICAgICBpZiAoIXZhbHVlLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhbHVlW2ldID0gbmd4RWRpdG9yQ29uZmlnW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiByZXR1cm4gdmVydGljYWwgaWYgdGhlIGVsZW1lbnQgaXMgdGhlIHJlc2l6ZXIgcHJvcGVydHkgaXMgc2V0IHRvIGJhc2ljXG4gKlxuICogQHBhcmFtIHJlc2l6ZXIgdHlwZSBvZiByZXNpemVyLCBlaXRoZXIgYmFzaWMgb3Igc3RhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblJlc2l6ZShyZXNpemVyOiBzdHJpbmcpOiBhbnkge1xuICBpZiAocmVzaXplciA9PT0gJ2Jhc2ljJykge1xuICAgIHJldHVybiAndmVydGljYWwnO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBzYXZlIHNlbGVjdGlvbiB3aGVuIHRoZSBlZGl0b3IgaXMgZm9jdXNzZWQgb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYXZlU2VsZWN0aW9uKCk6IGFueSB7XG4gIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWwuZ2V0UmFuZ2VBdCAmJiBzZWwucmFuZ2VDb3VudCkge1xuICAgICAgcmV0dXJuIHNlbC5nZXRSYW5nZUF0KDApO1xuICAgIH1cbiAgfSBlbHNlIGlmIChkb2N1bWVudC5nZXRTZWxlY3Rpb24gJiYgZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiByZXN0b3JlIHNlbGVjdGlvbiB3aGVuIHRoZSBlZGl0b3IgaXMgZm9jdXNzZWQgaW5cbiAqXG4gKiBAcGFyYW0gcmFuZ2Ugc2F2ZWQgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVTZWxlY3Rpb24ocmFuZ2UpOiBib29sZWFuIHtcbiAgaWYgKHJhbmdlKSB7XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldFNlbGVjdGlvbiAmJiByYW5nZS5zZWxlY3QpIHtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19