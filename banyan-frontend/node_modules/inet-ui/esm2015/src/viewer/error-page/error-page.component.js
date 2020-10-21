/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientService } from "inet-core";
import { ViewerService } from "../../file/viewer.service";
export class ErrorPageComponent {
    /**
     * @param {?} route
     * @param {?} http
     * @param {?} viewerService
     * @param {?} location
     */
    constructor(route, http, viewerService, location) {
        this.route = route;
        this.http = http;
        this.viewerService = viewerService;
        this.location = location;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.sub = this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        params => {
            this.docId = params.id;
        }));
    }
    /**
     * @return {?}
     */
    download() {
        this.viewerService.downloadById(this.docId);
    }
    /**
     * @return {?}
     */
    back() {
        this.location.back();
    }
}
ErrorPageComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-error-page',
                template: "<div class=\"error-page\">\n  <div class=\"error-content text-center\">\n    <div>\n      <div class=\"error-subtitle\" [innerHTML]=\"'COMMON.MODULE.VIEWER.UNSUPPORTED' | translate\"></div>\n      <button class=\"btn btn-primary\" (click)=\"download()\"> <i class=\"fa fa-download\"></i> {{'TOOLBAR.DOWNLOAD' | translate}}</button>\n      <button class=\"btn btn-danger ml-1\" (click)=\"back()\"> <i class=\"fa fa-remove\"></i> {{'TOOLBAR.CLOSE' | translate}}</button>\n    </div>\n  </div>\n</div>",
                styles: [".error-page{position:relative}.error-content{padding:40px 1rem}.error-subtitle{font-size:20px;font-weight:300;padding-bottom:10px}"]
            }] }
];
/** @nocollapse */
ErrorPageComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: HttpClientService },
    { type: ViewerService },
    { type: Location }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.sub;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.docId;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.viewerService;
    /**
     * @type {?}
     * @private
     */
    ErrorPageComponent.prototype.location;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3ZpZXdlci9lcnJvci1wYWdlL2Vycm9yLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzVDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQU94RCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7O0lBSzNCLFlBQW9CLEtBQXFCLEVBQ3JCLElBQXVCLEVBQ3ZCLGFBQTRCLEVBQzVCLFFBQWtCO1FBSGxCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDdEMsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDMUIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7O1lBNUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQiw4ZkFBMEM7O2FBRTdDOzs7O1lBVE8sY0FBYztZQUVkLGlCQUFpQjtZQUNqQixhQUFhO1lBRmIsUUFBUTs7Ozs7OztJQVdaLGlDQUFpQjs7Ozs7SUFDakIsbUNBQXNCOzs7OztJQUVWLG1DQUE2Qjs7Ozs7SUFDN0Isa0NBQStCOzs7OztJQUMvQiwyQ0FBb0M7Ozs7O0lBQ3BDLHNDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge1ZpZXdlclNlcnZpY2V9IGZyb20gXCIuLi8uLi9maWxlL3ZpZXdlci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWVycm9yLXBhZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9lcnJvci1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9lcnJvci1wYWdlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvclBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBzdWI6IGFueTtcbiAgICBwcml2YXRlIGRvY0lkOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb2NJZCA9IHBhcmFtcy5pZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3dubG9hZCgpIHtcbiAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmRvd25sb2FkQnlJZCh0aGlzLmRvY0lkKTtcbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICB9XG5cbn1cbiJdfQ==