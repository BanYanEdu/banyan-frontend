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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1leHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2ZpbGVsaXN0L2ZpbGUtZXh0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRXhEO0lBSUkscUJBQW9CLGFBQWdDO1FBQWhDLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtJQUNwRCxDQUFDOzs7OztJQUVELCtCQUFTOzs7O0lBQVQsVUFBVSxJQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Z0JBVEosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxTQUFTO2lCQUNsQjs7OztnQkFKTyxpQkFBaUI7O0lBWXpCLGtCQUFDO0NBQUEsQUFWRCxJQVVDO1NBUFksV0FBVzs7Ozs7O0lBQ1Isb0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RmlsZUZvcm1hdFNlcnZpY2V9IGZyb20gXCIuL2ZpbGUtZm9ybWF0LnNlcnZpY2VcIjtcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdmaWxlRXh0J1xufSlcbmV4cG9ydCBjbGFzcyBGaWxlRXh0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybWF0U2VydmljZTogRmlsZUZvcm1hdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0obmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0U2VydmljZS5nZXRFeHRCeU5hbWUobmFtZSk7XG4gICAgfVxufVxuIl19