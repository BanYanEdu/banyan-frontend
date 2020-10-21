/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from "inet-core";
import { Subject } from "rxjs";
import { FileFormatService } from "./file-format.service";
export class ViewerService {
    /**
     * @param {?} router
     * @param {?} formatService
     * @param {?} http
     */
    constructor(router, formatService, http) {
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
    setRouterPath(v) {
        this.routerPath = v;
    }
    /**
     * @return {?}
     */
    getRouterPath() {
        return this.routerPath;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setDownloadUrl(v) {
        this.downloadUrl = v;
    }
    /**
     * @return {?}
     */
    getDownloadUrl() {
        return this.downloadUrl;
    }
    /**
     * @param {?} ext
     * @param {?} docId
     * @param {?=} extras
     * @return {?}
     */
    open(ext, docId, extras) {
        if (this.hasEdit(ext) || (this.hasView(ext) && this.hasViewerInBrowser())) {
            this.router.navigate([this.getRouterPath(), ext, docId], extras);
        }
        else { //error pages
            this.router.navigate([this.getRouterPath(), docId]);
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    hasNameInPlugin(name) {
        /** @type {?} */
        let plugins = navigator.plugins || [];
        /** @type {?} */
        let plugin = {};
        for (let i = 0; i < plugins.length; i++) {
            plugin = plugins[i] || {};
            if ((plugin['name']).search(name) > -1) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    hasViewerInBrowser() {
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
    }
    /**
     * @param {?} ext
     * @return {?}
     */
    hasEdit(ext) {
        return this.formatService.getEditFormats().indexOf(ext) > -1;
    }
    /**
     * @param {?} ext
     * @return {?}
     */
    hasView(ext) {
        return this.formatService.getViewFormats().indexOf(ext) > -1;
    }
    /**
     * @param {?} docId
     * @return {?}
     */
    downloadById(docId) {
        this.http.downloadFile(this.getDownloadUrl(), { docID: docId });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setFiles(v) {
        ViewerService.files = v;
    }
    /**
     * @return {?}
     */
    getFiles() {
        return ViewerService.files;
    }
    /**
     * Returns true if this url is viewer module, false otherwise
     * @param {?} url - the give URL
     * @return {?}
     */
    isViewerModuleByUrl(url) {
        return (url.indexOf('/' + this.getRouterPath()) === 0);
    }
    /**
     * Fire event when document loaded
     *
     * @param {?} $event
     * @param {?} viewer
     * @return {?}
     */
    sendEvent($event, viewer) {
        this.emitLoadSource.next({ $event, viewer });
    }
}
ViewerService.instance = null;
ViewerService.files = [];
ViewerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ViewerService.ctorParameters = () => [
    { type: Router },
    { type: FileFormatService },
    { type: HttpClientService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2ZpbGUvdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFtQixNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUl4RCxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBV3RCLFlBQW9CLE1BQWMsRUFDZCxhQUFnQyxFQUNoQyxJQUF1QjtRQUZ2QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQW1CO1FBVm5DLGVBQVUsR0FBVyxRQUFRLENBQUMsQ0FBQSwrQkFBK0I7O1FBQzdELGdCQUFXLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7UUFHcEQsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOztRQUU1QyxnQkFBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLN0MsT0FBTyxhQUFhLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQ25FLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLENBQVM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsQ0FBUztR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QUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7Ozs7O0lBS0QsU0FBUyxDQUFDLE1BQVcsRUFBRSxNQUF1QjtRQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7O0FBbkdNLHNCQUFRLEdBQWtCLElBQUksQ0FBQztBQUN2QixtQkFBSyxHQUFVLEVBQUUsQ0FBQzs7WUFIcEMsVUFBVTs7OztZQVBlLE1BQU07WUFJeEIsaUJBQWlCO1lBSGpCLGlCQUFpQjs7OztJQVFyQix1QkFBc0M7Ozs7O0lBQ3RDLG9CQUFpQzs7Ozs7SUFDakMsbUNBQXNDOzs7OztJQUN0QyxvQ0FBNEQ7Ozs7O0lBRzVELHVDQUE0Qzs7SUFFNUMsb0NBQWlEOzs7OztJQUVyQywrQkFBc0I7Ozs7O0lBQ3RCLHNDQUF3Qzs7Ozs7SUFDeEMsNkJBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF2aWdhdGlvbkV4dHJhcywgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtWaWV3ZXJDb21wb25lbnR9IGZyb20gXCIuLi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtGaWxlRm9ybWF0U2VydmljZX0gZnJvbSBcIi4vZmlsZS1mb3JtYXQuc2VydmljZVwiO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlld2VyU2VydmljZSB7XG4gICAgc3RhdGljIGluc3RhbmNlOiBWaWV3ZXJTZXJ2aWNlID0gbnVsbDtcbiAgICBwcml2YXRlIHN0YXRpYyBmaWxlczogYW55W10gPSBbXTtcbiAgICBwcml2YXRlIHJvdXRlclBhdGg6IHN0cmluZyA9ICd2aWV3ZXInOy8vTmF2aWdhdGUgd2l0aCB0aGUgcm91dGVyIHBhdGhcbiAgICBwcml2YXRlIGRvd25sb2FkVXJsOiBzdHJpbmcgPSBpTmV0LmdldFBVcmwoJ2RvY3gvZG93bmxvYWQnKTtcblxuICAgIC8vIE9ic2VydmFibGUgc291cmNlc1xuICAgIHByaXZhdGUgZW1pdExvYWRTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgLy8gT2JzZXJ2YWJsZSB3aGVuIGRvY3VtZW50IGxvYWRlZFxuICAgIGxvYWRFbWl0dGVkID0gdGhpcy5lbWl0TG9hZFNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmb3JtYXRTZXJ2aWNlOiBGaWxlRm9ybWF0U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBWaWV3ZXJTZXJ2aWNlLmluc3RhbmNlID0gVmlld2VyU2VydmljZS5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHNldFJvdXRlclBhdGgodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucm91dGVyUGF0aCA9IHY7XG4gICAgfVxuXG4gICAgZ2V0Um91dGVyUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXJQYXRoO1xuICAgIH1cblxuICAgIHNldERvd25sb2FkVXJsKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRvd25sb2FkVXJsID0gdjtcbiAgICB9XG5cbiAgICBnZXREb3dubG9hZFVybCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kb3dubG9hZFVybDtcbiAgICB9XG5cbiAgICBvcGVuKGV4dDogc3RyaW5nLCBkb2NJZDogc3RyaW5nLCBleHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0VkaXQoZXh0KSB8fCAodGhpcy5oYXNWaWV3KGV4dCkgJiYgdGhpcy5oYXNWaWV3ZXJJbkJyb3dzZXIoKSkpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmdldFJvdXRlclBhdGgoKSwgZXh0LCBkb2NJZF0sIGV4dHJhcyk7XG4gICAgICAgIH0gZWxzZSB7IC8vZXJyb3IgcGFnZXNcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmdldFJvdXRlclBhdGgoKSwgZG9jSWRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc05hbWVJblBsdWdpbihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHBsdWdpbnM6IGFueSA9IG5hdmlnYXRvci5wbHVnaW5zIHx8IFtdO1xuICAgICAgICBsZXQgcGx1Z2luOiBhbnkgPSB7fTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbHVnaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwbHVnaW4gPSBwbHVnaW5zW2ldIHx8IHt9O1xuICAgICAgICAgICAgaWYgKChwbHVnaW5bJ25hbWUnXSkuc2VhcmNoKG5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFzVmlld2VySW5Ccm93c2VyKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaU5ldC5pc1dlYktpdCkgeyAvL0Nocm9tZSBvciBTYWZhcmlcbiAgICAgICAgICAgIGlmIChpTmV0LmlzQ2hyb21lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzTmFtZUluUGx1Z2luKCdQREYgVmlld2VyJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlOZXQuaXNTYWZhcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuaGFzTmFtZUluUGx1Z2luKCdBZG9iZSBBY3JvYmF0JykgfHwgdGhpcy5oYXNOYW1lSW5QbHVnaW4oJ1BERicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpTmV0LmlzR2Vja28pIHsgLy9GaXJlZm94XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNOYW1lSW5QbHVnaW4oJ0Fkb2JlIEFjcm9iYXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFzRWRpdChleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRTZXJ2aWNlLmdldEVkaXRGb3JtYXRzKCkuaW5kZXhPZihleHQpID4gLTE7XG4gICAgfVxuXG4gICAgaGFzVmlldyhleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRTZXJ2aWNlLmdldFZpZXdGb3JtYXRzKCkuaW5kZXhPZihleHQpID4gLTE7XG4gICAgfVxuXG4gICAgZG93bmxvYWRCeUlkKGRvY0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5odHRwLmRvd25sb2FkRmlsZSh0aGlzLmdldERvd25sb2FkVXJsKCksIHtkb2NJRDogZG9jSWR9KTtcbiAgICB9XG5cbiAgICBzZXRGaWxlcyh2OiBhbnkpIHtcbiAgICAgICAgVmlld2VyU2VydmljZS5maWxlcyA9IHY7XG4gICAgfVxuXG4gICAgZ2V0RmlsZXMoKSB7XG4gICAgICAgIHJldHVybiBWaWV3ZXJTZXJ2aWNlLmZpbGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHVybCBpcyB2aWV3ZXIgbW9kdWxlLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKiBAcGFyYW0gdXJsIC0gdGhlIGdpdmUgVVJMXG4gICAgICovXG5cbiAgICBpc1ZpZXdlck1vZHVsZUJ5VXJsKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodXJsLmluZGV4T2YoJy8nICsgdGhpcy5nZXRSb3V0ZXJQYXRoKCkpID09PSAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlIGV2ZW50IHdoZW4gZG9jdW1lbnQgbG9hZGVkXG4gICAgICogKi9cbiAgICBzZW5kRXZlbnQoJGV2ZW50OiBhbnksIHZpZXdlcjogVmlld2VyQ29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMuZW1pdExvYWRTb3VyY2UubmV4dCh7JGV2ZW50LCB2aWV3ZXJ9KTtcbiAgICB9XG59XG4iXX0=