/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { FileFormatService } from "./file-format.service";
var FileExtPipe = /** @class */ (function () {
    function FileExtPipe(formatService) {
        this.formatService = formatService;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    FileExtPipe.prototype.transform = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.formatService.getExtByName(name);
    };
    FileExtPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'fileExt'
                },] }
    ];
    /** @nocollapse */
    FileExtPipe.ctorParameters = function () { return [
        { type: FileFormatService }
    ]; };
    return FileExtPipe;
}());
export { FileExtPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileExtPipe.prototype.formatService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1leHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS9maWxlLWV4dC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RDtJQUlJLHFCQUFvQixhQUFnQztRQUFoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7SUFDcEQsQ0FBQzs7Ozs7SUFFRCwrQkFBUzs7OztJQUFULFVBQVUsSUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7O2dCQVRKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsU0FBUztpQkFDbEI7Ozs7Z0JBSk8saUJBQWlCOztJQVl6QixrQkFBQztDQUFBLEFBVkQsSUFVQztTQVBZLFdBQVc7Ozs7OztJQUNSLG9DQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0ZpbGVGb3JtYXRTZXJ2aWNlfSBmcm9tIFwiLi9maWxlLWZvcm1hdC5zZXJ2aWNlXCI7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZmlsZUV4dCdcbn0pXG5leHBvcnQgY2xhc3MgRmlsZUV4dFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1hdFNlcnZpY2U6IEZpbGVGb3JtYXRTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgdHJhbnNmb3JtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFNlcnZpY2UuZ2V0RXh0QnlOYW1lKG5hbWUpO1xuICAgIH1cbn1cbiJdfQ==