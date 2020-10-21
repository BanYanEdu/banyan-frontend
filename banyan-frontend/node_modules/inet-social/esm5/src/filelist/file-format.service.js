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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1mb3JtYXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2ZpbGVsaXN0L2ZpbGUtZm9ybWF0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0lBSW5DLFlBQVksR0FBRztJQUNqQixTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTztJQUM5QyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztJQUN0RCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0lBQ3JFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztJQUNuQixLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLO0lBQ3pCLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztJQUN4QyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUs7SUFDekMsS0FBSyxFQUFFLEtBQUs7Q0FDZjs7SUFFSyxpQkFBaUIsR0FBRztJQUN0QixLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU07SUFDMUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLEtBQUssRUFBRSxNQUFNO0lBQzFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUcsS0FBSztDQUFDOztJQUcxQyxpQkFBaUIsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRyxLQUFLLENBQUM7O0lBRXpELE9BQU8sR0FBRyxTQUFTO0FBRXpCO0lBR0k7SUFBZSxDQUFDOzs7O0lBRWhCLHdDQUFZOzs7SUFBWjs7WUFDUSxJQUFJLEdBQUksSUFBSSxDQUFDLGlCQUFpQjs7WUFDNUIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsNkNBQWlCOzs7SUFBakI7UUFDSSxPQUFVLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBUyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsdUNBQVc7Ozs7SUFBWCxVQUFZLEdBQVc7O1lBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtRQUNyQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDaEMsT0FBVSxJQUFJLFNBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFNLENBQUE7U0FDNUM7UUFDRCxPQUFVLElBQUksU0FBSSxPQUFPLFNBQU0sQ0FBQTtJQUNuQyxDQUFDOzs7OztJQUVELHdDQUFZOzs7O0lBQVosVUFBYSxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7SUFFRCx3Q0FBWTs7OztJQUFaLFVBQWEsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksT0FBTyxDQUFDO0lBQzFELENBQUM7Ozs7SUFFRCwwQ0FBYzs7O0lBQWQ7UUFDSSxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCwwQ0FBYzs7O0lBQWQ7UUFDSSxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7O2dCQXhDSixVQUFVOzs7O0lBMENYLHdCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0F6Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5jb25zdCBGSUxFU19GT1JNQVQgPSBbXG4gICAgJ3Vua25vd24nLCAndGV4dCcsICdhcmNoaXZlJywgJ2F1ZGlvJywgJ3ZpZGVvJyxcbiAgICAncG5nJywgJ2pwZycsICdnaWYnLCAndGlmZicsICdzdmcnLCAnYWknLCAncHNkJywgJ2R3ZycsXG4gICAgJ2F2aScsICdmbGEnLCAnbXAyJywgJ21wMycsICdtcDQnLCAnYWFjJywgJ2ZsYWMnLCAnd21hJywgJ3dhdicsICdteGYnLFxuICAgICdpc28nLCAnbWRmJywgJ25yZycsXG4gICAgJ3ppcCcsICc3eicsICdhcmonLCAncmFyJyxcbiAgICAncGRmJywgJ2RvYycsICdydGYnLCAndHh0JywgJ3hscycsICdwcHQnLFxuICAgICdjc3MnLCAnY3N2JywgJ2h0bWwnLCAnanNvbicsICdqcycsICd4bWwnLFxuICAgICdkYmYnLCAnZXhlJ1xuXTtcblxuY29uc3QgRklMRVNfRURJVF9GT1JNQVQgPSBbXG4gICAgJ2RvYycsICdkb2N4JywgJ29kdCcsICdvZHMnLCAneGxzJywgJ3hsc3gnLFxuICAgICdwcHQnLCAncHBzJywgJ3BwdG0nLCAncHB0eCcsJ3BvdCcsICdwb3R4JyxcbiAgICAnZG90JywgJ2RvdHgnLCAnZG9jbScsJ2RvdHgnLCAnY3N2JyAsICdzeHcnXVxuO1xuXG5jb25zdCBGSUxFU19WSUVXX0ZPUk1BVCA9IFsncGRmJywgJ3BuZycsICdqcGcnICwnanBlZycgLCAnZ2lmJ107XG5cbmNvbnN0IFVOS05PV04gPSAndW5rbm93bic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWxlRm9ybWF0U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBnZXRJbWFnZVBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHBhdGggPSAgaU5ldC5jb21tb25JbWFnZUZvbGRlcjtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICBpZiAobGFzdEluZGV4ID09PSBwYXRoLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoLnN1YnN0cmluZygwLCBsYXN0SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cblxuICAgIGdldEZpbGVGb3JtYXRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldEltYWdlUGF0aCgpfS9mb3JtYXRgO1xuICAgIH1cblxuICAgIGdldFVybEJ5RXh0KGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldEZpbGVGb3JtYXRQYXRoKCk7XG4gICAgICAgIGlmIChGSUxFU19GT1JNQVQuaW5kZXhPZihleHQpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtwYXRofS8ke2V4dC50b0xvd2VyQ2FzZSgpfS5zdmdgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3BhdGh9LyR7VU5LTk9XTn0uc3ZnYFxuICAgIH1cblxuICAgIGdldFVybEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsQnlFeHQodGhpcy5nZXRFeHRCeU5hbWUobmFtZSkpO1xuICAgIH1cblxuICAgIGdldEV4dEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5hbWUuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpIHx8IFVOS05PV047XG4gICAgfVxuXG4gICAgZ2V0RWRpdEZvcm1hdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gRklMRVNfRURJVF9GT1JNQVQ7XG4gICAgfVxuXG4gICAgZ2V0Vmlld0Zvcm1hdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gRklMRVNfVklFV19GT1JNQVQ7XG4gICAgfVxuXG59XG4iXX0=