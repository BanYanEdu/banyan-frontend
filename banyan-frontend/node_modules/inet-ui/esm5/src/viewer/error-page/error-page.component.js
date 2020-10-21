/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientService } from "inet-core";
import { ViewerService } from "../../file/viewer.service";
var ErrorPageComponent = /** @class */ (function () {
    function ErrorPageComponent(route, http, viewerService, location) {
        this.route = route;
        this.http = http;
        this.viewerService = viewerService;
        this.location = location;
    }
    /**
     * @return {?}
     */
    ErrorPageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.sub = this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            _this.docId = params.id;
        }));
    };
    /**
     * @return {?}
     */
    ErrorPageComponent.prototype.download = /**
     * @return {?}
     */
    function () {
        this.viewerService.downloadById(this.docId);
    };
    /**
     * @return {?}
     */
    ErrorPageComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        this.location.back();
    };
    ErrorPageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-error-page',
                    template: "<div class=\"error-page\">\n  <div class=\"error-content text-center\">\n    <div>\n      <div class=\"error-subtitle\" [innerHTML]=\"'COMMON.MODULE.VIEWER.UNSUPPORTED' | translate\"></div>\n      <button class=\"btn btn-primary\" (click)=\"download()\"> <i class=\"fa fa-download\"></i> {{'TOOLBAR.DOWNLOAD' | translate}}</button>\n      <button class=\"btn btn-danger ml-1\" (click)=\"back()\"> <i class=\"fa fa-remove\"></i> {{'TOOLBAR.CLOSE' | translate}}</button>\n    </div>\n  </div>\n</div>",
                    styles: [".error-page{position:relative}.error-content{padding:40px 1rem}.error-subtitle{font-size:20px;font-weight:300;padding-bottom:10px}"]
                }] }
    ];
    /** @nocollapse */
    ErrorPageComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: HttpClientService },
        { type: ViewerService },
        { type: Location }
    ]; };
    return ErrorPageComponent;
}());
export { ErrorPageComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3ZpZXdlci9lcnJvci1wYWdlL2Vycm9yLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzVDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RDtJQVVJLDRCQUFvQixLQUFxQixFQUNyQixJQUF1QixFQUN2QixhQUE0QixFQUM1QixRQUFrQjtRQUhsQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3RDLENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsTUFBTTtZQUN6QyxLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDMUIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQscUNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxpQ0FBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7O2dCQTVCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsOGZBQTBDOztpQkFFN0M7Ozs7Z0JBVE8sY0FBYztnQkFFZCxpQkFBaUI7Z0JBQ2pCLGFBQWE7Z0JBRmIsUUFBUTs7SUFrQ2hCLHlCQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0F6Qlksa0JBQWtCOzs7Ozs7SUFFM0IsaUNBQWlCOzs7OztJQUNqQixtQ0FBc0I7Ozs7O0lBRVYsbUNBQTZCOzs7OztJQUM3QixrQ0FBK0I7Ozs7O0lBQy9CLDJDQUFvQzs7Ozs7SUFDcEMsc0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7Vmlld2VyU2VydmljZX0gZnJvbSBcIi4uLy4uL2ZpbGUvdmlld2VyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtZXJyb3ItcGFnZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Vycm9yLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Vycm9yLXBhZ2UuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIHN1YjogYW55O1xuICAgIHByaXZhdGUgZG9jSWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvY0lkID0gcGFyYW1zLmlkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRvd25sb2FkKCkge1xuICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZG93bmxvYWRCeUlkKHRoaXMuZG9jSWQpO1xuICAgIH1cblxuICAgIGJhY2soKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgIH1cblxufVxuIl19