/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var PixelConverter = /** @class */ (function () {
    function PixelConverter() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    PixelConverter.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === undefined) {
            return;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            return value + 'px';
        }
    };
    PixelConverter.decorators = [
        { type: Pipe, args: [{
                    name: 'px'
                },] }
    ];
    return PixelConverter;
}());
export { PixelConverter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2dyaWQvdXRpbHMvcHgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFlQSxDQUFDOzs7OztJQVhDLGtDQUFTOzs7O0lBQVQsVUFBVSxLQUFzQjtRQUM5QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDckIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDOztnQkFkRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLElBQUk7aUJBQ1g7O0lBYUQscUJBQUM7Q0FBQSxBQWZELElBZUM7U0FaWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBQaXBlKHtcbiAgbmFtZTogJ3B4J1xufSlcbmV4cG9ydCBjbGFzcyBQaXhlbENvbnZlcnRlciBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyB8IG51bWJlcik6IGFueSB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSArICdweCc7XG4gICAgfVxuICB9XG59XG4iXX0=