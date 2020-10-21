/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var SSOUrlPipe = /** @class */ (function () {
    function SSOUrlPipe() {
    }
    /**
     * @param {?} url
     * @return {?}
     */
    SSOUrlPipe.prototype.transform = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return iNet.getSSOUrl(url);
    };
    SSOUrlPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'ssoUrl'
                },] }
    ];
    return SSOUrlPipe;
}());
export { SSOUrlPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NvdXJsLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvc3NvdXJsLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBEO0lBQUE7SUFTQSxDQUFDOzs7OztJQUpDLDhCQUFTOzs7O0lBQVQsVUFBVSxHQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDOztnQkFQRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7O0lBT0QsaUJBQUM7Q0FBQSxBQVRELElBU0M7U0FOWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuQFBpcGUoe1xuICBuYW1lOiAnc3NvVXJsJ1xufSlcbmV4cG9ydCBjbGFzcyBTU09VcmxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaU5ldC5nZXRTU09VcmwodXJsKTtcbiAgfVxuXG59XG4iXX0=