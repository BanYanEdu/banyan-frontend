/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { FileFormatService } from "./file-format.service";
export class FileIconPipe {
    /**
     * @param {?} formatService
     */
    constructor(formatService) {
        this.formatService = formatService;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    transform(name) {
        return this.formatService.getUrlByName(name);
    }
}
FileIconPipe.decorators = [
    { type: Pipe, args: [{
                name: 'fileIcon'
            },] }
];
/** @nocollapse */
FileIconPipe.ctorParameters = () => [
    { type: FileFormatService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileIconPipe.prototype.formatService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pY29uLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9maWxlbGlzdC9maWxlLWljb24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFLeEQsTUFBTSxPQUFPLFlBQVk7Ozs7SUFFckIsWUFBb0IsYUFBZ0M7UUFBaEMsa0JBQWEsR0FBYixhQUFhLENBQW1CO0lBRXBELENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLElBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7WUFYSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7YUFDbkI7Ozs7WUFKTyxpQkFBaUI7Ozs7Ozs7SUFPVCxxQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGaWxlRm9ybWF0U2VydmljZX0gZnJvbSBcIi4vZmlsZS1mb3JtYXQuc2VydmljZVwiO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZpbGVJY29uJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWxlSWNvblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybWF0U2VydmljZTogRmlsZUZvcm1hdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHRyYW5zZm9ybShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRTZXJ2aWNlLmdldFVybEJ5TmFtZShuYW1lKTtcbiAgICB9XG5cbn1cbiJdfQ==