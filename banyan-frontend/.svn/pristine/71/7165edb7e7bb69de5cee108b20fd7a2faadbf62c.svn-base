/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from "inet-core";
import { Subject } from "rxjs";
import { FileFormatService } from "./file-format.service";
var ViewerService = /** @class */ (function () {
    function ViewerService(router, formatService, http) {
        this.router = router;
        this.formatService = formatService;
        this.http = http;
        this.routerPath = 'viewer'; //Navigate with the router path
        //Navigate with the router path
        this.downloadUrl = iNet.getPUrl('docx/download');
        // Observable sources
        this.emitLoadSource = new Subject();
        // Observable when document loaded
        this.loadEmitted = this.emitLoadSource.asObservable();
        return ViewerService.instance = ViewerService.instance || this;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    ViewerService.prototype.setRouterPath = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.routerPath = v;
    };
    /**
     * @return {?}
     */
    ViewerService.prototype.getRouterPath = /**
     * @return {?}
     */
    function () {
        return this.routerPath;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    ViewerService.prototype.setDownloadUrl = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.downloadUrl = v;
    };
    /**
     * @return {?}
     */
    ViewerService.prototype.getDownloadUrl = /**
     * @return {?}
     */
    function () {
        return this.downloadUrl;
    };
    /**
     * @param {?} ext
     * @param {?} docId
     * @param {?=} extras
     * @return {?}
     */
    ViewerService.prototype.open = /**
     * @param {?} ext
     * @param {?} docId
     * @param {?=} extras
     * @return {?}
     */
    function (ext, docId, extras) {
        if (this.hasEdit(ext) || (this.hasView(ext) && this.hasViewerInBrowser())) {
            this.router.navigate([this.getRouterPath(), ext, docId], extras);
        }
        else { //error pages
            this.router.navigate([this.getRouterPath(), docId]);
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ViewerService.prototype.hasNameInPlugin = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var plugins = navigator.plugins || [];
        /** @type {?} */
        var plugin = {};
        for (var i = 0; i < plugins.length; i++) {
            plugin = plugins[i] || {};
            if ((plugin['name']).search(name) > -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * @return {?}
     */
    ViewerService.prototype.hasViewerInBrowser = /**
     * @return {?}
     */
    function () {
        if (iNet.isWebKit) { //Chrome or Safari
            if (iNet.isChrome) {
                return this.hasNameInPlugin('PDF Viewer');
            }
            else if (iNet.isSafari) {
                return (this.hasNameInPlugin('Adobe Acrobat') || this.hasNameInPlugin('PDF'));
            }
        }
        else if (iNet.isGecko) { //Firefox
            return this.hasNameInPlugin('Adobe Acrobat');
        }
        return false;
    };
    /**
     * @param {?} ext
     * @return {?}
     */
    ViewerService.prototype.hasEdit = /**
     * @param {?} ext
     * @return {?}
     */
    function (ext) {
        return this.formatService.getEditFormats().indexOf(ext) > -1;
    };
    /**
     * @param {?} ext
     * @return {?}
     */
    ViewerService.prototype.hasView = /**
     * @param {?} ext
     * @return {?}
     */
    function (ext) {
        return this.formatService.getViewFormats().indexOf(ext) > -1;
    };
    /**
     * @param {?} docId
     * @return {?}
     */
    ViewerService.prototype.downloadById = /**
     * @param {?} docId
     * @return {?}
     */
    function (docId) {
        this.http.downloadFile(this.getDownloadUrl(), { docID: docId });
    };
    /**
     * @param {?} v
     * @return {?}
     */
    ViewerService.prototype.setFiles = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        ViewerService.files = v;
    };
    /**
     * @return {?}
     */
    ViewerService.prototype.getFiles = /**
     * @return {?}
     */
    function () {
        return ViewerService.files;
    };
    /**
     * Returns true if this url is viewer module, false otherwise
     * @param url - the give URL
     */
    /**
     * Returns true if this url is viewer module, false otherwise
     * @param {?} url - the give URL
     * @return {?}
     */
    ViewerService.prototype.isViewerModuleByUrl = /**
     * Returns true if this url is viewer module, false otherwise
     * @param {?} url - the give URL
     * @return {?}
     */
    function (url) {
        return (url.indexOf('/' + this.getRouterPath()) === 0);
    };
    /**
     * Fire event when document loaded
     * */
    /**
     * Fire event when document loaded
     *
     * @param {?} $event
     * @param {?} viewer
     * @return {?}
     */
    ViewerService.prototype.sendEvent = /**
     * Fire event when document loaded
     *
     * @param {?} $event
     * @param {?} viewer
     * @return {?}
     */
    function ($event, viewer) {
        this.emitLoadSource.next({ $event: $event, viewer: viewer });
    };
    ViewerService.instance = null;
    ViewerService.files = [];
    ViewerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ViewerService.ctorParameters = function () { return [
        { type: Router },
        { type: FileFormatService },
        { type: HttpClientService }
    ]; };
    return ViewerService;
}());
export { ViewerService };
if (false) {
    /** @type {?} */
    ViewerService.instance;
    /**
     * @type {?}
     * @private
     */
    ViewerService.files;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.routerPath;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.downloadUrl;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.emitLoadSource;
    /** @type {?} */
    ViewerService.prototype.loadEmitted;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.router;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.formatService;
    /**
     * @type {?}
     * @private
     */
    ViewerService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2ZpbGUvdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFtQixNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUd4RDtJQVlJLHVCQUFvQixNQUFjLEVBQ2QsYUFBZ0MsRUFDaEMsSUFBdUI7UUFGdkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQVZuQyxlQUFVLEdBQVcsUUFBUSxDQUFDLENBQUEsK0JBQStCOztRQUM3RCxnQkFBVyxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7O1FBR3BELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQzs7UUFFNUMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSzdDLE9BQU8sYUFBYSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUNuRSxDQUFDOzs7OztJQUVELHFDQUFhOzs7O0lBQWIsVUFBYyxDQUFTO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxxQ0FBYTs7O0lBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxzQ0FBYzs7OztJQUFkLFVBQWUs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O1FBQ0ksT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUVILDJDQUFtQjs7Ozs7SUFBbkIsVUFBb0IsR0FBVztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOztTQUVLOzs7Ozs7OztJQUNMLGlDQUFTOzs7Ozs7O0lBQVQsVUFBVSxNQUFXLEVBQUUsTUFBdUI7UUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQW5HTSxzQkFBUSxHQUFrQixJQUFJLENBQUM7SUFDdkIsbUJBQUssR0FBVSxFQUFFLENBQUM7O2dCQUhwQyxVQUFVOzs7O2dCQVBlLE1BQU07Z0JBSXhCLGlCQUFpQjtnQkFIakIsaUJBQWlCOztJQTRHekIsb0JBQUM7Q0FBQSxBQXRHRCxJQXNHQztTQXJHWSxhQUFhOzs7SUFDdEIsdUJBQXNDOzs7OztJQUN0QyxvQkFBaUM7Ozs7O0lBQ2pDLG1DQUFzQzs7Ozs7SUFDdEMsb0NBQTREOzs7OztJQUc1RCx1Q0FBNEM7O0lBRTVDLG9DQUFpRDs7Ozs7SUFFckMsK0JBQXNCOzs7OztJQUN0QixzQ0FBd0M7Ozs7O0lBQ3hDLDZCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25FeHRyYXMsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7U3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7Vmlld2VyQ29tcG9uZW50fSBmcm9tIFwiLi4vdmlld2VyL3ZpZXdlci5jb21wb25lbnRcIjtcbmltcG9ydCB7RmlsZUZvcm1hdFNlcnZpY2V9IGZyb20gXCIuL2ZpbGUtZm9ybWF0LnNlcnZpY2VcIjtcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZpZXdlclNlcnZpY2Uge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogVmlld2VyU2VydmljZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBzdGF0aWMgZmlsZXM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSByb3V0ZXJQYXRoOiBzdHJpbmcgPSAndmlld2VyJzsvL05hdmlnYXRlIHdpdGggdGhlIHJvdXRlciBwYXRoXG4gICAgcHJpdmF0ZSBkb3dubG9hZFVybDogc3RyaW5nID0gaU5ldC5nZXRQVXJsKCdkb2N4L2Rvd25sb2FkJyk7XG5cbiAgICAvLyBPYnNlcnZhYmxlIHNvdXJjZXNcbiAgICBwcml2YXRlIGVtaXRMb2FkU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIC8vIE9ic2VydmFibGUgd2hlbiBkb2N1bWVudCBsb2FkZWRcbiAgICBsb2FkRW1pdHRlZCA9IHRoaXMuZW1pdExvYWRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZm9ybWF0U2VydmljZTogRmlsZUZvcm1hdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSkge1xuICAgICAgICByZXR1cm4gVmlld2VyU2VydmljZS5pbnN0YW5jZSA9IFZpZXdlclNlcnZpY2UuaW5zdGFuY2UgfHwgdGhpcztcbiAgICB9XG5cbiAgICBzZXRSb3V0ZXJQYXRoKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJvdXRlclBhdGggPSB2O1xuICAgIH1cblxuICAgIGdldFJvdXRlclBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyUGF0aDtcbiAgICB9XG5cbiAgICBzZXREb3dubG9hZFVybCh2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kb3dubG9hZFVybCA9IHY7XG4gICAgfVxuXG4gICAgZ2V0RG93bmxvYWRVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG93bmxvYWRVcmw7XG4gICAgfVxuXG4gICAgb3BlbihleHQ6IHN0cmluZywgZG9jSWQ6IHN0cmluZywgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcykge1xuICAgICAgICBpZiAodGhpcy5oYXNFZGl0KGV4dCkgfHwgKHRoaXMuaGFzVmlldyhleHQpICYmIHRoaXMuaGFzVmlld2VySW5Ccm93c2VyKCkpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5nZXRSb3V0ZXJQYXRoKCksIGV4dCwgZG9jSWRdLCBleHRyYXMpO1xuICAgICAgICB9IGVsc2UgeyAvL2Vycm9yIHBhZ2VzXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5nZXRSb3V0ZXJQYXRoKCksIGRvY0lkXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNOYW1lSW5QbHVnaW4obmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBwbHVnaW5zOiBhbnkgPSBuYXZpZ2F0b3IucGx1Z2lucyB8fCBbXTtcbiAgICAgICAgbGV0IHBsdWdpbjogYW55ID0ge307XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGx1Z2luID0gcGx1Z2luc1tpXSB8fCB7fTtcbiAgICAgICAgICAgIGlmICgocGx1Z2luWyduYW1lJ10pLnNlYXJjaChuYW1lKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGhhc1ZpZXdlckluQnJvd3NlcigpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlOZXQuaXNXZWJLaXQpIHsgLy9DaHJvbWUgb3IgU2FmYXJpXG4gICAgICAgICAgICBpZiAoaU5ldC5pc0Nocm9tZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc05hbWVJblBsdWdpbignUERGIFZpZXdlcicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpTmV0LmlzU2FmYXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmhhc05hbWVJblBsdWdpbignQWRvYmUgQWNyb2JhdCcpIHx8IHRoaXMuaGFzTmFtZUluUGx1Z2luKCdQREYnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaU5ldC5pc0dlY2tvKSB7IC8vRmlyZWZveFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzTmFtZUluUGx1Z2luKCdBZG9iZSBBY3JvYmF0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGhhc0VkaXQoZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0U2VydmljZS5nZXRFZGl0Rm9ybWF0cygpLmluZGV4T2YoZXh0KSA+IC0xO1xuICAgIH1cblxuICAgIGhhc1ZpZXcoZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0U2VydmljZS5nZXRWaWV3Rm9ybWF0cygpLmluZGV4T2YoZXh0KSA+IC0xO1xuICAgIH1cblxuICAgIGRvd25sb2FkQnlJZChkb2NJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaHR0cC5kb3dubG9hZEZpbGUodGhpcy5nZXREb3dubG9hZFVybCgpLCB7ZG9jSUQ6IGRvY0lkfSk7XG4gICAgfVxuXG4gICAgc2V0RmlsZXModjogYW55KSB7XG4gICAgICAgIFZpZXdlclNlcnZpY2UuZmlsZXMgPSB2O1xuICAgIH1cblxuICAgIGdldEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gVmlld2VyU2VydmljZS5maWxlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB1cmwgaXMgdmlld2VyIG1vZHVsZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICogQHBhcmFtIHVybCAtIHRoZSBnaXZlIFVSTFxuICAgICAqL1xuXG4gICAgaXNWaWV3ZXJNb2R1bGVCeVVybCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHVybC5pbmRleE9mKCcvJyArIHRoaXMuZ2V0Um91dGVyUGF0aCgpKSA9PT0gMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZSBldmVudCB3aGVuIGRvY3VtZW50IGxvYWRlZFxuICAgICAqICovXG4gICAgc2VuZEV2ZW50KCRldmVudDogYW55LCB2aWV3ZXI6IFZpZXdlckNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmVtaXRMb2FkU291cmNlLm5leHQoeyRldmVudCwgdmlld2VyfSk7XG4gICAgfVxufVxuIl19