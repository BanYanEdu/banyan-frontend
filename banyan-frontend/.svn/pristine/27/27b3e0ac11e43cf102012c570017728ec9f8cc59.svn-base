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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1mb3JtYXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvcmVtb3RlLW1vZHVsZS9maWxlbGlzdC9maWxlLWZvcm1hdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztNQUluQyxZQUFZLEdBQUc7SUFDakIsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDOUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDdEQsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztJQUNyRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDbkIsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztJQUN6QixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDeEMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLO0lBQ3pDLEtBQUssRUFBRSxLQUFLO0NBQ2Y7O01BRUssaUJBQWlCLEdBQUc7SUFDdEIsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNO0lBQzFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxLQUFLLEVBQUUsTUFBTTtJQUMxQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFHLEtBQUs7Q0FBQzs7TUFHMUMsaUJBQWlCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUcsS0FBSyxDQUFDOztNQUV6RCxPQUFPLEdBQUcsU0FBUztBQUd6QixNQUFNLE9BQU8saUJBQWlCO0lBRTFCLGdCQUFlLENBQUM7Ozs7SUFFaEIsWUFBWTs7WUFDSixJQUFJLEdBQUksSUFBSSxDQUFDLGlCQUFpQjs7Y0FDNUIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEdBQVc7O2NBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtRQUNyQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxHQUFHLElBQUksSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQTtTQUM1QztRQUNELE9BQU8sR0FBRyxJQUFJLElBQUksT0FBTyxNQUFNLENBQUE7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLE9BQU8sQ0FBQztJQUMxRCxDQUFDOzs7O0lBRUQsY0FBYztRQUNWLE9BQU8saUJBQWlCLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELGNBQWM7UUFDVixPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7OztZQXhDSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5jb25zdCBGSUxFU19GT1JNQVQgPSBbXG4gICAgJ3Vua25vd24nLCAndGV4dCcsICdhcmNoaXZlJywgJ2F1ZGlvJywgJ3ZpZGVvJyxcbiAgICAncG5nJywgJ2pwZycsICdnaWYnLCAndGlmZicsICdzdmcnLCAnYWknLCAncHNkJywgJ2R3ZycsXG4gICAgJ2F2aScsICdmbGEnLCAnbXAyJywgJ21wMycsICdtcDQnLCAnYWFjJywgJ2ZsYWMnLCAnd21hJywgJ3dhdicsICdteGYnLFxuICAgICdpc28nLCAnbWRmJywgJ25yZycsXG4gICAgJ3ppcCcsICc3eicsICdhcmonLCAncmFyJyxcbiAgICAncGRmJywgJ2RvYycsICdydGYnLCAndHh0JywgJ3hscycsICdwcHQnLFxuICAgICdjc3MnLCAnY3N2JywgJ2h0bWwnLCAnanNvbicsICdqcycsICd4bWwnLFxuICAgICdkYmYnLCAnZXhlJ1xuXTtcblxuY29uc3QgRklMRVNfRURJVF9GT1JNQVQgPSBbXG4gICAgJ2RvYycsICdkb2N4JywgJ29kdCcsICdvZHMnLCAneGxzJywgJ3hsc3gnLFxuICAgICdwcHQnLCAncHBzJywgJ3BwdG0nLCAncHB0eCcsJ3BvdCcsICdwb3R4JyxcbiAgICAnZG90JywgJ2RvdHgnLCAnZG9jbScsJ2RvdHgnLCAnY3N2JyAsICdzeHcnXVxuO1xuXG5jb25zdCBGSUxFU19WSUVXX0ZPUk1BVCA9IFsncGRmJywgJ3BuZycsICdqcGcnICwnanBlZycgLCAnZ2lmJ107XG5cbmNvbnN0IFVOS05PV04gPSAndW5rbm93bic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWxlRm9ybWF0U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBnZXRJbWFnZVBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHBhdGggPSAgaU5ldC5jb21tb25JbWFnZUZvbGRlcjtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICBpZiAobGFzdEluZGV4ID09PSBwYXRoLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoLnN1YnN0cmluZygwLCBsYXN0SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cblxuICAgIGdldEZpbGVGb3JtYXRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldEltYWdlUGF0aCgpfS9mb3JtYXRgO1xuICAgIH1cblxuICAgIGdldFVybEJ5RXh0KGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldEZpbGVGb3JtYXRQYXRoKCk7XG4gICAgICAgIGlmIChGSUxFU19GT1JNQVQuaW5kZXhPZihleHQpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtwYXRofS8ke2V4dC50b0xvd2VyQ2FzZSgpfS5zdmdgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3BhdGh9LyR7VU5LTk9XTn0uc3ZnYFxuICAgIH1cblxuICAgIGdldFVybEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsQnlFeHQodGhpcy5nZXRFeHRCeU5hbWUobmFtZSkpO1xuICAgIH1cblxuICAgIGdldEV4dEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5hbWUuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpIHx8IFVOS05PV047XG4gICAgfVxuXG4gICAgZ2V0RWRpdEZvcm1hdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gRklMRVNfRURJVF9GT1JNQVQ7XG4gICAgfVxuXG4gICAgZ2V0Vmlld0Zvcm1hdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gRklMRVNfVklFV19GT1JNQVQ7XG4gICAgfVxuXG59XG4iXX0=