/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OpenGraphService } from "../open-graph.service";
export class LinkPreviewComponent {
    /**
     * @param {?} openGraphService
     */
    constructor(openGraphService) {
        this.openGraphService = openGraphService;
        this.removable = true;
        this.onLoad = new EventEmitter();
        this.onDelete = new EventEmitter();
        this._hidden = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.openGraphService.isLink(this.link)) {
            this.loadPreview();
        }
        else if (this.openGraphData) {
            this.loadImageInfo();
        }
        else {
            this.setHidden(true);
        }
    }
    /**
     * @return {?}
     */
    isPreview() {
        return !this.isHidden() && (!!this.link || !!this.openGraphData);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        if (!data || !data.title) {
            return;
        }
        this.openGraphData = data;
        this.loadImageInfo();
        this.setHidden(false);
    }
    /**
     * @return {?}
     */
    getData() {
        return this.openGraphData;
    }
    /**
     * @param {?} link
     * @return {?}
     */
    setLink(link) {
        if (this.link === link) {
            return;
        }
        this.link = link;
        this.loadPreview();
    }
    /**
     * @return {?}
     */
    removePreView() {
        this.onDelete.emit(this);
        this.clearData();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getDomain(url) {
        if (!url) {
            return '';
        }
        /** @type {?} */
        let domain = url.split('/')[2] || '';
        return domain.replace('www.', '');
    }
    /**
     * @return {?}
     */
    clearData() {
        this.link = null;
        this.openGraphData = null;
        this.setHidden(true);
    }
    /**
     * @private
     * @return {?}
     */
    loadPreview() {
        this.setHidden(false);
        if (this.openGraphService.isLink(this.link)) {
            this.openGraphService.loadPreviewLink(this.link, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (data) {
                    this.setData(data);
                }
                else {
                    this.setHidden(true);
                }
            }));
        }
        else {
            this.setHidden(true);
        }
    }
    /**
     * @private
     * @return {?}
     */
    loadImageInfo() {
        if (this.openGraphData && this.openGraphData.image) {
            this.openGraphService.loadImageInfo(this.openGraphData.image, (/**
             * @param {?} imageInfo
             * @return {?}
             */
            (imageInfo) => {
                this.openGraphData.imageInfo = imageInfo;
            }));
        }
    }
    /**
     * @private
     * @param {?} hidden
     * @return {?}
     */
    setHidden(hidden) {
        this._hidden = hidden;
    }
    /**
     * @private
     * @return {?}
     */
    isHidden() {
        return this._hidden;
    }
}
LinkPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-link-preview',
                template: "<div *ngIf=\"!_hidden\" class=\"link-preview\">\n    <div *ngIf=\"!openGraphData; else preview\">\n        <i class=\"fa fa-spinner fa-spin link-preview-spinner\"></i>\n        <div class=\"link-preview-content\">\u0110ang t\u1EA3i ch\u1EBF \u0111\u1ED9 xem tr\u01B0\u1EDBc...</div>\n    </div>\n    <ng-template #preview>\n        <div *ngIf=\"openGraphData?.imageInfo?.available\"\n             [ngClass]=\"openGraphData.imageInfo.landscape ? 'landscape' : 'portrait'\"\n             class=\"link-preview-image\">\n            <img [src]=\"openGraphData.image\">\n        </div>\n        <div class=\"link-preview-content\">\n            <div class=\"link-preview-title\">{{openGraphData.title}}</div>\n            <div class=\"link-preview-text\">{{openGraphData.description}}</div>\n            <div class=\"link-preview-url\">{{getDomain(openGraphData.url)}}</div>\n        </div>\n        <a [href]=\"openGraphData.url\" target=\"_blank\" rel=\"noopener nofollow\" class=\"link-preview-anchor\"></a>\n    </ng-template>\n    <i *ngIf=\"removable\" (click)=\"removePreView()\" class=\"fa fa-times link-preview-remove\"></i>\n</div>",
                styles: [".link-preview{margin-bottom:15px;display:block;overflow:hidden;border:1px solid rgba(0,0,0,.1);position:relative;color:#555}.link-preview-spinner{float:left;width:44px;height:44px;font-size:20px;line-height:44px;text-align:center}.link-preview-anchor{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;opacity:0}.link-preview-remove{position:absolute;top:8px;right:8px;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;z-index:2;cursor:pointer;font-size:14px}.link-preview-remove:hover{background:rgba(0,0,0,.4)}.link-preview-image{overflow:hidden}.link-preview-image.landscape{margin-bottom:5px;border-bottom:1px solid rgba(0,0,0,.1);max-height:250px}.link-preview-image.landscape img{width:100%}.link-preview-image.portrait{float:left;width:160px;height:160px;position:relative}.link-preview-image.portrait img{position:absolute;min-width:100%;min-height:100%;top:50%;left:50%;transform:translate3d(-50%,-50%,0)}.link-preview-content{overflow:hidden;padding:10px 30px 10px 15px}.link-preview-title{color:#333;font-size:18px;line-height:22px}.link-preview-text{overflow:hidden;margin-top:7px;font-size:14px;line-height:18px}.link-preview-url{margin-top:7px;text-transform:uppercase;font-size:12px;color:#888}"]
            }] }
];
/** @nocollapse */
LinkPreviewComponent.ctorParameters = () => [
    { type: OpenGraphService }
];
LinkPreviewComponent.propDecorators = {
    link: [{ type: Input }],
    openGraphData: [{ type: Input }],
    removable: [{ type: Input }],
    onLoad: [{ type: Output }],
    onDelete: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    LinkPreviewComponent.prototype.link;
    /** @type {?} */
    LinkPreviewComponent.prototype.openGraphData;
    /** @type {?} */
    LinkPreviewComponent.prototype.removable;
    /** @type {?} */
    LinkPreviewComponent.prototype.onLoad;
    /** @type {?} */
    LinkPreviewComponent.prototype.onDelete;
    /** @type {?} */
    LinkPreviewComponent.prototype._hidden;
    /**
     * @type {?}
     * @private
     */
    LinkPreviewComponent.prototype.openGraphService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvb3Blbi1ncmFwaC9saW5rLXByZXZpZXcvbGluay1wcmV2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQVF2RCxNQUFNLE9BQU8sb0JBQW9COzs7O0lBUy9CLFlBQ1UsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFQbkMsY0FBUyxHQUFZLElBQUksQ0FBQztRQUN6QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4QyxZQUFPLEdBQVksS0FBSyxDQUFDO0lBSXJCLENBQUM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7YUFBTSxJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO2FBQUs7WUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7OztJQUVELFNBQVM7UUFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFt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dEIsNkNBQXNDOztJQUN0Qyx5Q0FBbUM7O0lBQ25DLHNDQUFzQzs7SUFDdEMsd0NBQXdDOztJQUV4Qyx1Q0FBeUI7Ozs7O0lBR3ZCLGdEQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09wZW5HcmFwaFNlcnZpY2V9IGZyb20gXCIuLi9vcGVuLWdyYXBoLnNlcnZpY2VcIjtcbmltcG9ydCB7T3BlbkdyYXBoRGF0YSwgT3BlbkdyYXBoSW1hZ2VJbmZvfSBmcm9tIFwiLi4vbW9kZWwvT3BlbkdyYXBoRGF0YVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbGluay1wcmV2aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xpbmstcHJldmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpbmstcHJldmlldy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlua1ByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBsaW5rOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wZW5HcmFwaERhdGE6IE9wZW5HcmFwaERhdGE7XG4gIEBJbnB1dCgpIHJlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSBvbkxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfaGlkZGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvcGVuR3JhcGhTZXJ2aWNlOiBPcGVuR3JhcGhTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMub3BlbkdyYXBoU2VydmljZS5pc0xpbmsodGhpcy5saW5rKSkge1xuICAgICAgdGhpcy5sb2FkUHJldmlldygpO1xuICAgIH0gZWxzZSBpZih0aGlzLm9wZW5HcmFwaERhdGEpIHtcbiAgICAgIHRoaXMubG9hZEltYWdlSW5mbygpO1xuICAgIH0gZWxzZXtcbiAgICAgIHRoaXMuc2V0SGlkZGVuKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGlzUHJldmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNIaWRkZW4oKSAmJiAoISF0aGlzLmxpbmsgfHwgISF0aGlzLm9wZW5HcmFwaERhdGEpO1xuICB9XG5cbiAgc2V0RGF0YShkYXRhOiBPcGVuR3JhcGhEYXRhKSB7XG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLnRpdGxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3BlbkdyYXBoRGF0YSA9IGRhdGE7XG4gICAgdGhpcy5sb2FkSW1hZ2VJbmZvKCk7XG4gICAgdGhpcy5zZXRIaWRkZW4oZmFsc2UpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcGVuR3JhcGhEYXRhO1xuICB9XG5cbiAgc2V0TGluayhsaW5rOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5saW5rID09PSBsaW5rKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubGluayA9IGxpbms7XG4gICAgdGhpcy5sb2FkUHJldmlldygpO1xuICB9XG5cbiAgcmVtb3ZlUHJlVmlldygpIHtcbiAgICB0aGlzLm9uRGVsZXRlLmVtaXQodGhpcyk7XG4gICAgdGhpcy5jbGVhckRhdGEoKTtcbiAgfVxuXG4gIGdldERvbWFpbih1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgbGV0IGRvbWFpbiA9IHVybC5zcGxpdCgnLycpWzJdIHx8ICcnO1xuICAgIHJldHVybiBkb21haW4ucmVwbGFjZSgnd3d3LicsICcnKTtcbiAgfVxuXG4gIGNsZWFyRGF0YSgpIHtcbiAgICB0aGlzLmxpbmsgPSBudWxsO1xuICAgIHRoaXMub3BlbkdyYXBoRGF0YSA9IG51bGw7XG4gICAgdGhpcy5zZXRIaWRkZW4odHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRQcmV2aWV3KCkge1xuICAgIHRoaXMuc2V0SGlkZGVuKGZhbHNlKTtcbiAgICBpZiAodGhpcy5vcGVuR3JhcGhTZXJ2aWNlLmlzTGluayh0aGlzLmxpbmspKSB7XG4gICAgICB0aGlzLm9wZW5HcmFwaFNlcnZpY2UubG9hZFByZXZpZXdMaW5rKHRoaXMubGluaywgKGRhdGE6IE9wZW5HcmFwaERhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRIaWRkZW4odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEhpZGRlbih0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRJbWFnZUluZm8oKSB7XG4gICAgaWYgKHRoaXMub3BlbkdyYXBoRGF0YSAmJiB0aGlzLm9wZW5HcmFwaERhdGEuaW1hZ2UpIHtcbiAgICAgIHRoaXMub3BlbkdyYXBoU2VydmljZS5sb2FkSW1hZ2VJbmZvKHRoaXMub3BlbkdyYXBoRGF0YS5pbWFnZSwgKGltYWdlSW5mbzogT3BlbkdyYXBoSW1hZ2VJbmZvKSA9PiB7XG4gICAgICAgIHRoaXMub3BlbkdyYXBoRGF0YS5pbWFnZUluZm8gPSBpbWFnZUluZm87XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEhpZGRlbihoaWRkZW46IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRkZW4gPSBoaWRkZW47XG4gIH1cbiAgXG4gIHByaXZhdGUgaXNIaWRkZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGRlbjtcbiAgfVxufVxuIl19