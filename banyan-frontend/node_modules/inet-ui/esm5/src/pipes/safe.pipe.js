/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    SafePipe.prototype.transform = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'safe'
                },] }
    ];
    /** @nocollapse */
    SafePipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return SafePipe;
}());
export { SafePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SafePipe.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9waXBlcy9zYWZlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxZQUFZLEVBQVUsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRTtJQUlFLGtCQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQzs7Ozs7SUFDL0MsNEJBQVM7Ozs7SUFBVCxVQUFVLEdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7O2dCQVBGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsTUFBTTtpQkFDYjs7OztnQkFKTyxZQUFZOztJQVdwQixlQUFDO0NBQUEsQUFURCxJQVNDO1NBTlksUUFBUTs7Ozs7O0lBQ1AsNkJBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzYWZlJ1xufSlcbmV4cG9ydCBjbGFzcyBTYWZlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcpOiBTYWZlVXJsIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHVybCk7XG4gIH1cblxufVxuIl19