/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
var FILES_FORMAT = [
    'unknown', 'text', 'archive', 'audio', 'video',
    'png', 'jpg', 'gif', 'tiff', 'svg', 'ai', 'psd', 'dwg',
    'avi', 'fla', 'mp2', 'mp3', 'mp4', 'aac', 'flac', 'wma', 'wav', 'mxf',
    'iso', 'mdf', 'nrg',
    'zip', '7z', 'arj', 'rar',
    'pdf', 'doc', 'rtf', 'txt', 'xls', 'ppt',
    'css', 'csv', 'html', 'json', 'js', 'xml',
    'dbf', 'exe'
];
/** @type {?} */
var FILES_EDIT_FORMAT = [
    'doc', 'docx', 'odt', 'ods', 'xls', 'xlsx',
    'ppt', 'pps', 'pptm', 'pptx', 'pot', 'potx',
    'dot', 'dotx', 'docm', 'dotx', 'csv', 'sxw'
];
/** @type {?} */
var FILES_VIEW_FORMAT = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];
/** @type {?} */
var UNKNOWN = 'unknown';
var FileFormatService = /** @class */ (function () {
    function FileFormatService() {
    }
    /**
     * @return {?}
     */
    FileFormatService.prototype.getImagePath = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var path = iNet.commonImageFolder;
        /** @type {?} */
        var lastIndex = path.lastIndexOf('/');
        if (lastIndex === path.length - 1) {
            return path.substring(0, lastIndex);
        }
        return path;
    };
    /**
     * @return {?}
     */
    FileFormatService.prototype.getFileFormatPath = /**
     * @return {?}
     */
    function () {
        return this.getImagePath() + "/format";
    };
    /**
     * @param {?} ext
     * @return {?}
     */
    FileFormatService.prototype.getUrlByExt = /**
     * @param {?} ext
     * @return {?}
     */
    function (ext) {
        /** @type {?} */
        var path = this.getFileFormatPath();
        if (FILES_FORMAT.indexOf(ext) > -1) {
            return path + "/" + ext.toLowerCase() + ".svg";
        }
        return path + "/" + UNKNOWN + ".svg";
    };
    /**
     * @param {?} name
     * @return {?}
     */
    FileFormatService.prototype.getUrlByName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.getUrlByExt(this.getExtByName(name));
    };
    /**
     * @param {?} name
     * @return {?}
     */
    FileFormatService.prototype.getExtByName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return name.split('.').pop().toLowerCase() || UNKNOWN;
    };
    /**
     * @return {?}
     */
    FileFormatService.prototype.getEditFormats = /**
     * @return {?}
     */
    function () {
        return FILES_EDIT_FORMAT;
    };
    /**
     * @return {?}
     */
    FileFormatService.prototype.getViewFormats = /**
     * @return {?}
     */
    function () {
        return FILES_VIEW_FORMAT;
    };
    FileFormatService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FileFormatService.ctorParameters = function () { return []; };
    return FileFormatService;
}());
export { FileFormatService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1mb3JtYXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS9maWxlLWZvcm1hdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztJQUluQyxZQUFZLEdBQUc7SUFDakIsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDOUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDdEQsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztJQUNyRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDbkIsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztJQUN6QixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDeEMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLO0lBQ3pDLEtBQUssRUFBRSxLQUFLO0NBQ2Y7O0lBRUssaUJBQWlCLEdBQUc7SUFDdEIsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNO0lBQzFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxLQUFLLEVBQUUsTUFBTTtJQUMxQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFHLEtBQUs7Q0FBQzs7SUFHMUMsaUJBQWlCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUcsS0FBSyxDQUFDOztJQUV6RCxPQUFPLEdBQUcsU0FBUztBQUV6QjtJQUdJO0lBQWUsQ0FBQzs7OztJQUVoQix3Q0FBWTs7O0lBQVo7O1lBQ1EsSUFBSSxHQUFJLElBQUksQ0FBQyxpQkFBaUI7O1lBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUN2QyxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVELDZDQUFpQjs7O0lBQWpCO1FBQ0ksT0FBVSxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQVMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxHQUFXOztZQUNiLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7UUFDckMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLE9BQVUsSUFBSSxTQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBTSxDQUFBO1NBQzVDO1FBQ0QsT0FBVSxJQUFJLFNBQUksT0FBTyxTQUFNLENBQUE7SUFDbkMsQ0FBQzs7Ozs7SUFFRCx3Q0FBWTs7OztJQUFaLFVBQWEsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsd0NBQVk7Ozs7SUFBWixVQUFhLElBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLE9BQU8sQ0FBQztJQUMxRCxDQUFDOzs7O0lBRUQsMENBQWM7OztJQUFkO1FBQ0ksT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsMENBQWM7OztJQUFkO1FBQ0ksT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDOztnQkF4Q0osVUFBVTs7OztJQTBDWCx3QkFBQztDQUFBLEFBMUNELElBMENDO1NBekNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuY29uc3QgRklMRVNfRk9STUFUID0gW1xuICAgICd1bmtub3duJywgJ3RleHQnLCAnYXJjaGl2ZScsICdhdWRpbycsICd2aWRlbycsXG4gICAgJ3BuZycsICdqcGcnLCAnZ2lmJywgJ3RpZmYnLCAnc3ZnJywgJ2FpJywgJ3BzZCcsICdkd2cnLFxuICAgICdhdmknLCAnZmxhJywgJ21wMicsICdtcDMnLCAnbXA0JywgJ2FhYycsICdmbGFjJywgJ3dtYScsICd3YXYnLCAnbXhmJyxcbiAgICAnaXNvJywgJ21kZicsICducmcnLFxuICAgICd6aXAnLCAnN3onLCAnYXJqJywgJ3JhcicsXG4gICAgJ3BkZicsICdkb2MnLCAncnRmJywgJ3R4dCcsICd4bHMnLCAncHB0JyxcbiAgICAnY3NzJywgJ2NzdicsICdodG1sJywgJ2pzb24nLCAnanMnLCAneG1sJyxcbiAgICAnZGJmJywgJ2V4ZSdcbl07XG5cbmNvbnN0IEZJTEVTX0VESVRfRk9STUFUID0gW1xuICAgICdkb2MnLCAnZG9jeCcsICdvZHQnLCAnb2RzJywgJ3hscycsICd4bHN4JyxcbiAgICAncHB0JywgJ3BwcycsICdwcHRtJywgJ3BwdHgnLCdwb3QnLCAncG90eCcsXG4gICAgJ2RvdCcsICdkb3R4JywgJ2RvY20nLCdkb3R4JywgJ2NzdicgLCAnc3h3J11cbjtcblxuY29uc3QgRklMRVNfVklFV19GT1JNQVQgPSBbJ3BkZicsICdwbmcnLCAnanBnJyAsJ2pwZWcnICwgJ2dpZiddO1xuXG5jb25zdCBVTktOT1dOID0gJ3Vua25vd24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZUZvcm1hdFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZ2V0SW1hZ2VQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBwYXRoID0gIGlOZXQuY29tbW9uSW1hZ2VGb2xkZXI7XG4gICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHBhdGgubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgICAgaWYgKGxhc3RJbmRleCA9PT0gcGF0aC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHJpbmcoMCwgbGFzdEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG5cbiAgICBnZXRGaWxlRm9ybWF0UGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRJbWFnZVBhdGgoKX0vZm9ybWF0YDtcbiAgICB9XG5cbiAgICBnZXRVcmxCeUV4dChleHQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRGaWxlRm9ybWF0UGF0aCgpO1xuICAgICAgICBpZiAoRklMRVNfRk9STUFULmluZGV4T2YoZXh0KSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7cGF0aH0vJHtleHQudG9Mb3dlckNhc2UoKX0uc3ZnYFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHtwYXRofS8ke1VOS05PV059LnN2Z2BcbiAgICB9XG5cbiAgICBnZXRVcmxCeU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVybEJ5RXh0KHRoaXMuZ2V0RXh0QnlOYW1lKG5hbWUpKTtcbiAgICB9XG5cbiAgICBnZXRFeHRCeU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuYW1lLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKSB8fCBVTktOT1dOO1xuICAgIH1cblxuICAgIGdldEVkaXRGb3JtYXRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIEZJTEVTX0VESVRfRk9STUFUO1xuICAgIH1cblxuICAgIGdldFZpZXdGb3JtYXRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIEZJTEVTX1ZJRVdfRk9STUFUO1xuICAgIH1cblxufVxuIl19