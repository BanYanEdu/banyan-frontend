/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
const FILES_FORMAT = [
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
const FILES_EDIT_FORMAT = [
    'doc', 'docx', 'odt', 'ods', 'xls', 'xlsx',
    'ppt', 'pps', 'pptm', 'pptx', 'pot', 'potx',
    'dot', 'dotx', 'docm', 'dotx', 'csv', 'sxw'
];
/** @type {?} */
const FILES_VIEW_FORMAT = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];
/** @type {?} */
const UNKNOWN = 'unknown';
export class FileFormatService {
    constructor() { }
    /**
     * @return {?}
     */
    getImagePath() {
        /** @type {?} */
        let path = iNet.commonImageFolder;
        /** @type {?} */
        const lastIndex = path.lastIndexOf('/');
        if (lastIndex === path.length - 1) {
            return path.substring(0, lastIndex);
        }
        return path;
    }
    /**
     * @return {?}
     */
    getFileFormatPath() {
        return `${this.getImagePath()}/format`;
    }
    /**
     * @param {?} ext
     * @return {?}
     */
    getUrlByExt(ext) {
        /** @type {?} */
        const path = this.getFileFormatPath();
        if (FILES_FORMAT.indexOf(ext) > -1) {
            return `${path}/${ext.toLowerCase()}.svg`;
        }
        return `${path}/${UNKNOWN}.svg`;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getUrlByName(name) {
        return this.getUrlByExt(this.getExtByName(name));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getExtByName(name) {
        return name.split('.').pop().toLowerCase() || UNKNOWN;
    }
    /**
     * @return {?}
     */
    getEditFormats() {
        return FILES_EDIT_FORMAT;
    }
    /**
     * @return {?}
     */
    getViewFormats() {
        return FILES_VIEW_FORMAT;
    }
}
FileFormatService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FileFormatService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1mb3JtYXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2ZpbGVsaXN0L2ZpbGUtZm9ybWF0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O01BSW5DLFlBQVksR0FBRztJQUNqQixTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTztJQUM5QyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztJQUN0RCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0lBQ3JFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztJQUNuQixLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLO0lBQ3pCLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztJQUN4QyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUs7SUFDekMsS0FBSyxFQUFFLEtBQUs7Q0FDZjs7TUFFSyxpQkFBaUIsR0FBRztJQUN0QixLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU07SUFDMUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLEtBQUssRUFBRSxNQUFNO0lBQzFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUcsS0FBSztDQUFDOztNQUcxQyxpQkFBaUIsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRyxLQUFLLENBQUM7O01BRXpELE9BQU8sR0FBRyxTQUFTO0FBR3pCLE1BQU0sT0FBTyxpQkFBaUI7SUFFMUIsZ0JBQWUsQ0FBQzs7OztJQUVoQixZQUFZOztZQUNKLElBQUksR0FBSSxJQUFJLENBQUMsaUJBQWlCOztjQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDdkMsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDYixPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsR0FBVzs7Y0FDYixJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQ3JDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNoQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFBO1NBQzVDO1FBQ0QsT0FBTyxHQUFHLElBQUksSUFBSSxPQUFPLE1BQU0sQ0FBQTtJQUNuQyxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksT0FBTyxDQUFDO0lBQzFELENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsY0FBYztRQUNWLE9BQU8saUJBQWlCLENBQUM7SUFDN0IsQ0FBQzs7O1lBeENKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbmNvbnN0IEZJTEVTX0ZPUk1BVCA9IFtcbiAgICAndW5rbm93bicsICd0ZXh0JywgJ2FyY2hpdmUnLCAnYXVkaW8nLCAndmlkZW8nLFxuICAgICdwbmcnLCAnanBnJywgJ2dpZicsICd0aWZmJywgJ3N2ZycsICdhaScsICdwc2QnLCAnZHdnJyxcbiAgICAnYXZpJywgJ2ZsYScsICdtcDInLCAnbXAzJywgJ21wNCcsICdhYWMnLCAnZmxhYycsICd3bWEnLCAnd2F2JywgJ214ZicsXG4gICAgJ2lzbycsICdtZGYnLCAnbnJnJyxcbiAgICAnemlwJywgJzd6JywgJ2FyaicsICdyYXInLFxuICAgICdwZGYnLCAnZG9jJywgJ3J0ZicsICd0eHQnLCAneGxzJywgJ3BwdCcsXG4gICAgJ2NzcycsICdjc3YnLCAnaHRtbCcsICdqc29uJywgJ2pzJywgJ3htbCcsXG4gICAgJ2RiZicsICdleGUnXG5dO1xuXG5jb25zdCBGSUxFU19FRElUX0ZPUk1BVCA9IFtcbiAgICAnZG9jJywgJ2RvY3gnLCAnb2R0JywgJ29kcycsICd4bHMnLCAneGxzeCcsXG4gICAgJ3BwdCcsICdwcHMnLCAncHB0bScsICdwcHR4JywncG90JywgJ3BvdHgnLFxuICAgICdkb3QnLCAnZG90eCcsICdkb2NtJywnZG90eCcsICdjc3YnICwgJ3N4dyddXG47XG5cbmNvbnN0IEZJTEVTX1ZJRVdfRk9STUFUID0gWydwZGYnLCAncG5nJywgJ2pwZycgLCdqcGVnJyAsICdnaWYnXTtcblxuY29uc3QgVU5LTk9XTiA9ICd1bmtub3duJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpbGVGb3JtYXRTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGdldEltYWdlUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcGF0aCA9ICBpTmV0LmNvbW1vbkltYWdlRm9sZGVyO1xuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgICAgIGlmIChsYXN0SW5kZXggPT09IHBhdGgubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyaW5nKDAsIGxhc3RJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgZ2V0RmlsZUZvcm1hdFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0SW1hZ2VQYXRoKCl9L2Zvcm1hdGA7XG4gICAgfVxuXG4gICAgZ2V0VXJsQnlFeHQoZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0RmlsZUZvcm1hdFBhdGgoKTtcbiAgICAgICAgaWYgKEZJTEVTX0ZPUk1BVC5pbmRleE9mKGV4dCkgPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3BhdGh9LyR7ZXh0LnRvTG93ZXJDYXNlKCl9LnN2Z2BcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7cGF0aH0vJHtVTktOT1dOfS5zdmdgXG4gICAgfVxuXG4gICAgZ2V0VXJsQnlOYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmxCeUV4dCh0aGlzLmdldEV4dEJ5TmFtZShuYW1lKSk7XG4gICAgfVxuXG4gICAgZ2V0RXh0QnlOYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmFtZS5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCkgfHwgVU5LTk9XTjtcbiAgICB9XG5cbiAgICBnZXRFZGl0Rm9ybWF0cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBGSUxFU19FRElUX0ZPUk1BVDtcbiAgICB9XG5cbiAgICBnZXRWaWV3Rm9ybWF0cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBGSUxFU19WSUVXX0ZPUk1BVDtcbiAgICB9XG5cbn1cbiJdfQ==