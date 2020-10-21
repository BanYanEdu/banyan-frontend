/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
var CustomPaginationComponent = /** @class */ (function () {
    function CustomPaginationComponent() {
        this.pageSize = 10;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.firstLoad = true;
        this.params = {};
        this.pageCount = 0;
        this.onLoad = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    CustomPaginationComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.processOnTotalChanged();
    };
    /**
     * @return {?}
     */
    CustomPaginationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.firstLoad) {
            this.load();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomPaginationComponent.prototype.changeToFirstPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomPaginationComponent.prototype.changeToLastPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomPaginationComponent.prototype.changeToNextPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomPaginationComponent.prototype.changeToPreviousPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pageNumber > 1) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomPaginationComponent.prototype.changeToCurrentPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        event.currentTarget.value = this.pageNumber;
        this.onPageChanged(event, this.pageNumber);
    };
    Object.defineProperty(CustomPaginationComponent.prototype, "maxPage", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.ceil(this.totalItems / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CustomPaginationComponent.prototype.getQuery = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var query = {
            pageNumber: (this.pageNumber < 1) ? 0 : this.pageNumber - 1,
            pageSize: this.pageSize
        };
        query = tslib_1.__assign({}, this.getParams(), query);
        return query;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    CustomPaginationComponent.prototype.setTotalItems = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.totalItems = v;
        this.processOnTotalChanged();
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    CustomPaginationComponent.prototype.setParams = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        if (params === void 0) { params = {}; }
        this.params = params;
    };
    /**
     * @return {?}
     */
    CustomPaginationComponent.prototype.getParams = /**
     * @return {?}
     */
    function () {
        return this.params || {};
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    CustomPaginationComponent.prototype.reload = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        this.onLoad.emit(this.getQuery());
    };
    /**
     * @return {?}
     */
    CustomPaginationComponent.prototype.load = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var query = { newPage: 1, pageSize: this.pageSize };
        query = tslib_1.__assign({}, this.getParams(), query);
        this.processOnPaginationChanged(null, query);
    };
    /**
     * @param {?=} event
     * @param {?=} pageNumber
     * @return {?}
     */
    CustomPaginationComponent.prototype.onPageChanged = /**
     * @param {?=} event
     * @param {?=} pageNumber
     * @return {?}
     */
    function (event, pageNumber) {
        this.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: -1 });
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    CustomPaginationComponent.prototype.processOnPaginationChanged = /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        this.pageNumber = args.newPage;
        this.onLoad.emit(this.getQuery());
        return 'onPaginationChanged';
    };
    /**
     * @return {?}
     */
    CustomPaginationComponent.prototype.processOnTotalChanged = /**
     * @return {?}
     */
    function () {
        this.pageCount = this.maxPage || 0;
        this.pageNumber = this.pageCount > 0 ? 1 : 0;
        this.query = this.getQuery();
    };
    CustomPaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-custom-pagination',
                    template: "<div class=\"pagination-box\">\n    <div class=\"pagination-range\">\n        <ng-template [ngTemplateOutlet]=\"basicSearch\"></ng-template>\n    </div>\n    <div class=\"pagination-controllers\">\n        <div class=\"pagination-pages mr-1\" >\n            <button [disabled]=\"pageNumber === 1 || totalItems === 0\" class=\"btn btn-sm btn-default pagination-firstpage\"\n                    [title]=\"'grid.firstText' | translate\"\n                    (click)=\"changeToFirstPage($event)\">\n                <i class=\"fa fa-step-backward\"></i>\n            </button>\n            <button [disabled]=\"pageNumber === 1 || totalItems === 0\" class=\"btn btn-sm btn-default pagination-prevpage ml-1\"\n                    [title]=\"'grid.prevText' | translate\"\n                    (click)=\"changeToPreviousPage($event)\">\n                <i class=\"fa fa-chevron-left\"></i>\n            </button>\n            <div class=\"pagination-page ml-1\" >\n                <div class=\"input-group input-group-sm\">\n                    <input #pageInput value=\"{{pageNumber}}\" [disabled]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\" type=\"number\" class=\"form-control\" min=\"0\" step=\"1\"/>\n                    <div class=\"input-group-append\">\n                        <span class=\"input-group-text\"><span>/</span><span>{{pageCount}}</span></span>\n                    </div>\n                </div>\n            </div>\n            <button [disabled]=\"pageNumber === pageCount || totalItems === 0\" class=\"btn btn-sm btn-default pagination-nextpage ml-1\"\n                    [title]=\"'grid.nextText' | translate\"\n                    (click)=\"changeToNextPage($event)\">\n                <i class=\"fa fa-chevron-right\"></i>\n            </button>\n            <button [disabled]=\"pageNumber === pageCount || totalItems === 0\"  (click)=\"changeToLastPage($event)\"\n                    [title]=\"'grid.lastText' | translate\"\n                    class=\"btn btn-sm btn-default pagination-lastpage ml-1\">\n                <i class=\"fa fa-step-forward\"></i>\n            </button>\n            <button   [title]=\"'grid.refreshText' | translate\"  (click)=\"reload($event)\" type=\"button\" class=\"btn btn-sm btn-default pagination-reload ml-1\">\n                <i class=\"fa fa-refresh\"></i>\n            </button>\n        </div>\n    </div>\n    <ng-template [ngTemplateOutlet]=\"advanceSearch\"></ng-template>\n</div>\n",
                    styles: [".pagination-box{position:relative;display:block;min-height:37px;background-color:#e9ecef;border:1px solid #ced4da;padding:2px}.pagination-range{margin-left:3px;display:inline-block;max-width:calc(100vw - 35%)}.pagination-controllers{float:right}.pagination-controllers input{min-width:60px;text-align:right;max-width:80px}.pagination-limit{margin-right:10px;display:inline-table;width:180px;float:left}.pagination-pages{display:inline-block}.pagination-page{display:inline-table}.pagination-box button{outline:0!important}.column-selector-button,.pagination-firstpage,.pagination-lastpage,.pagination-nextpage,.pagination-prevpage,.pagination-reload{vertical-align:top}"]
                }] }
    ];
    /** @nocollapse */
    CustomPaginationComponent.ctorParameters = function () { return []; };
    CustomPaginationComponent.propDecorators = {
        pageSize: [{ type: Input, args: ["pageSize",] }],
        pageNumber: [{ type: Input, args: ["pageNumber",] }],
        totalItems: [{ type: Input, args: ["totalItems",] }],
        firstLoad: [{ type: Input, args: ["firstLoad",] }],
        params: [{ type: Input, args: ["params",] }],
        basicSearch: [{ type: ContentChild, args: ['basicSearch',] }],
        advanceSearch: [{ type: ContentChild, args: ['advanceSearch',] }],
        onLoad: [{ type: Output }]
    };
    return CustomPaginationComponent;
}());
export { CustomPaginationComponent };
if (false) {
    /** @type {?} */
    CustomPaginationComponent.prototype.pageSize;
    /** @type {?} */
    CustomPaginationComponent.prototype.pageNumber;
    /** @type {?} */
    CustomPaginationComponent.prototype.totalItems;
    /** @type {?} */
    CustomPaginationComponent.prototype.firstLoad;
    /** @type {?} */
    CustomPaginationComponent.prototype.params;
    /** @type {?} */
    CustomPaginationComponent.prototype.basicSearch;
    /** @type {?} */
    CustomPaginationComponent.prototype.advanceSearch;
    /** @type {?} */
    CustomPaginationComponent.prototype.query;
    /** @type {?} */
    CustomPaginationComponent.prototype.pageCount;
    /** @type {?} */
    CustomPaginationComponent.prototype.onLoad;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXBhZ2luYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9jdXN0b20tcGFnaW5hdGlvbi9jdXN0b20tcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkI7SUFrQkk7UUFYbUIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNaLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDcEIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUk3QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ0osV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFJM0MsQ0FBQzs7Ozs7SUFFRCwrQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELDRDQUFROzs7SUFBUjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7Ozs7O0lBRUQscURBQWlCOzs7O0lBQWpCLFVBQWtCLEtBQVU7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBRUQsb0RBQWdCOzs7O0lBQWhCLFVBQWlCLEtBQVU7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFh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QUNsQyw2Q0FBaUM7O0lBQ2pDLCtDQUFvQzs7SUFDcEMsK0NBQW9DOztJQUNwQyw4Q0FBcUM7O0lBQ3JDLDJDQUE2Qjs7SUFDN0IsZ0RBQWtFOztJQUNsRSxrREFBc0U7O0lBQ3RFLDBDQUFXOztJQUNYLDhDQUFjOztJQUNkLDJDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtY3VzdG9tLXBhZ2luYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jdXN0b20tcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3VzdG9tLXBhZ2luYXRpb24uY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tUGFnaW5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoXCJwYWdlU2l6ZVwiKSBwYWdlU2l6ZSA9IDEwO1xuICAgIEBJbnB1dChcInBhZ2VOdW1iZXJcIikgcGFnZU51bWJlciA9IDE7XG4gICAgQElucHV0KFwidG90YWxJdGVtc1wiKSB0b3RhbEl0ZW1zID0gMDtcbiAgICBASW5wdXQoXCJmaXJzdExvYWRcIikgZmlyc3RMb2FkID0gdHJ1ZTtcbiAgICBASW5wdXQoXCJwYXJhbXNcIikgcGFyYW1zID0ge307XG4gICAgQENvbnRlbnRDaGlsZCgnYmFzaWNTZWFyY2gnKSBiYXNpY1NlYXJjaDogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQENvbnRlbnRDaGlsZCgnYWR2YW5jZVNlYXJjaCcpIGFkdmFuY2VTZWFyY2g6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIHF1ZXJ5OiBhbnk7XG4gICAgcGFnZUNvdW50ID0gMDtcbiAgICBAT3V0cHV0KCkgb25Mb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzT25Ub3RhbENoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyc3RMb2FkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZVRvRmlyc3RQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcbiAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xuICAgIH1cblxuICAgIGNoYW5nZVRvTGFzdFBhZ2UoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudDtcbiAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xuICAgIH1cblxuICAgIGNoYW5nZVRvTmV4dFBhZ2UoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgdGhpcy5wYWdlQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlcisrO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlVG9QcmV2aW91c1BhZ2UoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyLS07XG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VUb0N1cnJlbnRQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlTnVtYmVyID4gdGhpcy5wYWdlQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSB0aGlzLnBhZ2VOdW1iZXI7XG5cbiAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xuICAgIH1cblxuICAgIGdldCBtYXhQYWdlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMucGFnZVNpemUpO1xuICAgIH1cblxuICAgIGdldFF1ZXJ5KCk6IGFueSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHtcbiAgICAgICAgICAgIHBhZ2VOdW1iZXI6ICh0aGlzLnBhZ2VOdW1iZXIgPCAxKSA/IDAgOiB0aGlzLnBhZ2VOdW1iZXIgLSAxLFxuICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemVcbiAgICAgICAgfTtcbiAgICAgICAgcXVlcnkgPSB7Li4udGhpcy5nZXRQYXJhbXMoKSwgLi4ucXVlcnl9O1xuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuXG4gICAgc2V0VG90YWxJdGVtcyh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zID0gdjtcbiAgICAgICAgdGhpcy5wcm9jZXNzT25Ub3RhbENoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBzZXRQYXJhbXMocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB9XG5cbiAgICBnZXRQYXJhbXMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zIHx8IHt9O1xuICAgIH1cblxuICAgIHJlbG9hZChldmVudD86IGFueSkge1xuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHRoaXMuZ2V0UXVlcnkoKSk7XG4gICAgfVxuXG4gICAgbG9hZCgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge25ld1BhZ2U6IDEsIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplfTtcbiAgICAgICAgcXVlcnkgPSB7Li4udGhpcy5nZXRQYXJhbXMoKSwgLi4ucXVlcnl9O1xuICAgICAgICB0aGlzLnByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKG51bGwsIHF1ZXJ5KTtcbiAgICB9XG5cbiAgICBvblBhZ2VDaGFuZ2VkKGV2ZW50PzogRXZlbnQsIHBhZ2VOdW1iZXI/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZChldmVudCwge25ld1BhZ2U6IHBhZ2VOdW1iZXIsIHBhZ2VTaXplOiAtMX0pO1xuICAgIH1cblxuICAgIHByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogYW55KTogc3RyaW5nIHtcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gYXJncy5uZXdQYWdlO1xuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHRoaXMuZ2V0UXVlcnkoKSk7XG4gICAgICAgIHJldHVybiAnb25QYWdpbmF0aW9uQ2hhbmdlZCc7XG4gICAgfVxuXG4gICAgcHJvY2Vzc09uVG90YWxDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLnBhZ2VDb3VudCA9IHRoaXMubWF4UGFnZSB8fCAwO1xuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudCA+IDAgPyAxIDogMDtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuZ2V0UXVlcnkoKTtcbiAgICB9XG59XG4iXX0=