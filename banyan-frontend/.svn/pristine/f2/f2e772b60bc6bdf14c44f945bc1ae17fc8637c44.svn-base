/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewerService } from '../file/viewer.service';
import { HttpClientService } from "inet-core";
var ViewerComponent = /** @class */ (function () {
    function ViewerComponent(route, router, location, http, viewerService) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.http = http;
        this.viewerService = viewerService;
    }
    /**
     * @return {?}
     */
    ViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        //this.routerHeight = document.getElementsByTagName('router-outlet')[0].nextElementSibling.scrollHeight;
        this.sub = this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            _this.docId = params.id;
            _this.ext = params.ext;
            if (_this.viewerService.hasView(_this.ext)) {
                _this.url = _this.getViewUrl();
            }
        }));
    };
    /**
     * @return {?}
     */
    ViewerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
    };
    /**
     * @return {?}
     */
    ViewerComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        this.location.back();
    };
    /**
     * @return {?}
     */
    ViewerComponent.prototype.download = /**
     * @return {?}
     */
    function () {
        this.viewerService.downloadById(this.docId);
    };
    /**
     * @return {?}
     */
    ViewerComponent.prototype.getParams = /**
     * @return {?}
     */
    function () {
        return { docID: this.docId };
    };
    /**
     * @param {?=} viewMode
     * @return {?}
     */
    ViewerComponent.prototype.getViewUrl = /**
     * @param {?=} viewMode
     * @return {?}
     */
    function (viewMode) {
        /** @type {?} */
        var __url = this.viewerService.getDownloadUrl();
        /** @type {?} */
        var __viewMode = viewMode || 'pdf';
        /** @type {?} */
        var __params = this.getParams();
        __params['view'] = __viewMode;
        __params['time'] = new Date().valueOf();
        __url = iNet.urlAppend(__url, this.http.convertToHttpParams(__params));
        return __url;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ViewerComponent.prototype.onLoad = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.viewerService.hasView(this.ext)) {
            try {
                /** @type {?} */
                var doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow.document;
                if (doc) {
                    /** @type {?} */
                    var image = doc.getElementsByTagName('img')[0];
                    if (image) {
                        image.style.width = '100%'; //set width of image inside of iframe
                    }
                }
            }
            catch (ex) { }
        }
        this.viewerService.sendEvent($event, this);
    };
    ViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-viewer',
                    template: "\n        <div class=\"viewer-container\">\n            <iframe #iframe [src]=\"url | safe\" allowfullscreen style=\"height: 100%;width: 100%; border: none;\"\n                    (load)=\"onLoad($event)\">\n            </iframe>\n        </div>",
                    styles: ["\n        .viewer-container {\n            height: calc(100vh - 65px);\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            padding: 0;\n            margin: 0;\n            overflow: hidden;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    ViewerComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router },
        { type: Location },
        { type: HttpClientService },
        { type: ViewerService }
    ]; };
    ViewerComponent.propDecorators = {
        iframe: [{ type: ViewChild, args: ['iframe',] }]
    };
    return ViewerComponent;
}());
export { ViewerComponent };
if (false) {
    /** @type {?} */
    ViewerComponent.prototype.url;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.sub;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.docId;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.ext;
    /** @type {?} */
    ViewerComponent.prototype.iframe;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ViewerComponent.prototype.viewerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdmlld2VyL3ZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUs1QztJQTZCSSx5QkFBb0IsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFFBQWtCLEVBQ2xCLElBQXVCLEVBQ3ZCLGFBQTRCO1FBSjVCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBRWhELENBQUM7Ozs7SUFFRCxrQ0FBUTs7O0lBQVI7UUFBQSxpQkFTQztRQVJHLHdHQUF3RztRQUN4RyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLE1BQU07WUFDekMsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN0QixJQUFJLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEMsS0FBSSxDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDaEM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCw4QkFBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxrQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELG1DQUFTOzs7SUFBVDtRQUNJLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsb0NBQVU7Ozs7SUFBVixVQUFXLFFBQWlCOztZQUNwQixLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUU7O1lBQzNDLFVBQVUsR0FBRyxRQUFRLElBQUksS0FBSzs7WUFDOUIsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDL0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsZ0NBQU07Ozs7SUFBTixVQUFPLE1BQU07UUFDVCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QyxJQUFJOztvQkFDTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRO2dCQUN6RyxJQUFJLEdBQUcsRUFBRTs7d0JBQ0MsS0FBSyxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELElBQUksS0FBSyxFQUFFO3dCQUNQLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLHFDQUFxQztxQkFDcEU7aUJBQ0o7YUFDSjtZQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUU7U0FDbEI7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Z0JBeEZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFZdEIsUUFBUSxFQUFFLHVQQUtDOzZCQWhCRiw2UUFVUjtpQkFPSjs7OztnQkEzQk8sY0FBYztnQkFBRSxNQUFNO2dCQUN0QixRQUFRO2dCQUVSLGlCQUFpQjtnQkFEakIsYUFBYTs7O3lCQWlDaEIsU0FBUyxTQUFDLFFBQVE7O0lBa0Z2QixzQkFBQztDQUFBLEFBN0dELElBNkdDO1NBeEZZLGVBQWU7OztJQUN4Qiw4QkFBWTs7Ozs7SUFDWiw4QkFBMEI7Ozs7O0lBQzFCLGdDQUFzQjs7Ozs7SUFDdEIsOEJBQW9COztJQUVwQixpQ0FBd0M7Ozs7O0lBRTVCLGdDQUE2Qjs7Ozs7SUFDN0IsaUNBQXNCOzs7OztJQUN0QixtQ0FBMEI7Ozs7O0lBQzFCLCtCQUErQjs7Ozs7SUFDL0Isd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Vmlld2VyU2VydmljZX0gZnJvbSAnLi4vZmlsZS92aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQge0h0dHBDbGllbnRTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdmlld2VyJyxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC52aWV3ZXItY29udGFpbmVyIHtcbiAgICAgICAgICAgIGhlaWdodDogY2FsYygxMDB2aCAtIDY1cHgpO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB9XG4gICAgYF0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpZnJhbWUgI2lmcmFtZSBbc3JjXT1cInVybCB8IHNhZmVcIiBhbGxvd2Z1bGxzY3JlZW4gc3R5bGU9XCJoZWlnaHQ6IDEwMCU7d2lkdGg6IDEwMCU7IGJvcmRlcjogbm9uZTtcIlxuICAgICAgICAgICAgICAgICAgICAobG9hZCk9XCJvbkxvYWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9pZnJhbWU+XG4gICAgICAgIDwvZGl2PmBcbn0pXG5cbmV4cG9ydCBjbGFzcyBWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGRvY0lkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBleHQ6IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2lmcmFtZScpIGlmcmFtZTogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2VcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy90aGlzLnJvdXRlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdyb3V0ZXItb3V0bGV0JylbMF0ubmV4dEVsZW1lbnRTaWJsaW5nLnNjcm9sbEhlaWdodDtcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jSWQgPSBwYXJhbXMuaWQ7XG4gICAgICAgICAgICB0aGlzLmV4dCA9IHBhcmFtcy5leHQ7XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTZXJ2aWNlLmhhc1ZpZXcodGhpcy5leHQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwgPSB0aGlzLmdldFZpZXdVcmwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgfVxuXG4gICAgZG93bmxvYWQoKSB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5kb3dubG9hZEJ5SWQodGhpcy5kb2NJZCk7XG4gICAgfVxuXG4gICAgZ2V0UGFyYW1zKCkge1xuICAgICAgICByZXR1cm4ge2RvY0lEOiB0aGlzLmRvY0lkfTtcbiAgICB9XG5cbiAgICBnZXRWaWV3VXJsKHZpZXdNb2RlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IF9fdXJsID0gdGhpcy52aWV3ZXJTZXJ2aWNlLmdldERvd25sb2FkVXJsKCk7XG4gICAgICAgIGxldCBfX3ZpZXdNb2RlID0gdmlld01vZGUgfHwgJ3BkZic7XG4gICAgICAgIGxldCBfX3BhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKCk7XG4gICAgICAgIF9fcGFyYW1zWyd2aWV3J10gPSBfX3ZpZXdNb2RlO1xuICAgICAgICBfX3BhcmFtc1sndGltZSddID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XG4gICAgICAgIF9fdXJsID0gaU5ldC51cmxBcHBlbmQoX191cmwsIHRoaXMuaHR0cC5jb252ZXJ0VG9IdHRwUGFyYW1zKF9fcGFyYW1zKSk7XG4gICAgICAgIHJldHVybiBfX3VybDtcbiAgICB9XG5cbiAgICBvbkxvYWQoJGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdlclNlcnZpY2UuaGFzVmlldyh0aGlzLmV4dCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jID0gdGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQgfHwgdGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudC5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICAgICAgICAgICAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLnN0eWxlLndpZHRoID0gJzEwMCUnOyAvL3NldCB3aWR0aCBvZiBpbWFnZSBpbnNpZGUgb2YgaWZyYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChleCkge31cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5zZW5kRXZlbnQoJGV2ZW50LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgZWRpdERvY3VtZW50T25UYWIoYXR0OiBBdHRhY2htZW50LCBjYWxsYmFjaz86IGFueSkge1xuICAgICAgICAgIGxldCBvcHRpb25zID0gPE9ubGluZU9wdGlvbnM+e1xuICAgICAgICAgICAgICBkb2NJRDogYXR0LmNvbnRlbnRVdWlkXG4gICAgICAgICAgfTtcbiAgICAgIC8vIHRoaXMub25saW5lRWRpdG9yLm9wZW5FZGl0VGFiKG9wdGlvbnMsIChtZXNzYWdlOiBPbmxpbmVNZXNzYWdlKSA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgLy8gfSk7XG4gICAgICB0aGlzLm9ubGluZUVkaXRvci5vcGVuRWRpdFRhYihvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICB9XG5cbiAgICAgIGNyZWF0ZUVkaXREb2N1bWVudFVybChhdHQ6IEF0dGFjaG1lbnQsIGNhbGxiYWNrPzogYW55KTogc3RyaW5nIHtcbiAgICAgIGxldCBvcHRpb25zID0gPE9ubGluZU9wdGlvbnM+e1xuICAgICAgICBkb2NJRDogYXR0LmNvbnRlbnRVdWlkXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMub25saW5lRWRpdG9yLmNyZWF0ZURvY1BhdGgob3B0aW9ucywgY2FsbGJhY2spO1xuICAgIH1cbiAgICAqL1xuXG59XG4iXX0=