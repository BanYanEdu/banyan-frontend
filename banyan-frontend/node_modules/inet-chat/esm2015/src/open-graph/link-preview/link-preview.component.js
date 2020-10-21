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
                template: "<div *ngIf=\"!_hidden\" class=\"link-preview\">\n    <div *ngIf=\"!openGraphData; else preview\">\n        <i class=\"fa fa-spinner fa-spin link-preview-spinner\"></i>\n        <div class=\"link-preview-content\">\u0110ang t\u1EA3i ch\u1EBF \u0111\u1ED9 xem tr\u01B0\u1EDBc...</div>\n    </div>\n    <ng-template #preview>\n        <div *ngIf=\"openGraphData?.imageInfo?.available\"\n             [ngClass]=\"openGraphData.imageInfo.landscape ? 'landscape mb-0' : 'portrait mb-0'\"\n             class=\"link-preview-image\">\n            <img [src]=\"openGraphData.image\">\n        </div>\n        <div class=\"link-preview-content bg-white\">\n            <div class=\"link-preview-title\">{{openGraphData.title}}</div>\n            <div class=\"link-preview-text\">{{openGraphData.description}}</div>\n            <div class=\"link-preview-url\">{{getDomain(openGraphData.url)}}</div>\n        </div>\n        <a [href]=\"openGraphData.url\" target=\"_blank\" rel=\"noopener nofollow\" class=\"link-preview-anchor\"></a>\n    </ng-template>\n    <i *ngIf=\"removable\" (click)=\"removePreView()\" class=\"fa fa-times link-preview-remove\"></i>\n</div>",
                styles: [".link-preview{margin-bottom:15px;display:block;overflow:hidden;border:1px solid rgba(0,0,0,.1);position:relative;color:#555;width:300px}.link-preview-spinner{float:left;width:44px;height:44px;font-size:20px;line-height:44px;text-align:center}.link-preview-anchor{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;opacity:0;font-size:10px}.link-preview-remove{position:absolute;top:8px;right:8px;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;z-index:2;cursor:pointer;font-size:14px}.link-preview-remove:hover{background:rgba(0,0,0,.4)}.link-preview-image{overflow:hidden}.link-preview-image.landscape{margin-bottom:5px;border-bottom:1px solid rgba(0,0,0,.1);max-height:250px;width:330px}.link-preview-image.landscape img{width:100%;-o-object-fit:contain;object-fit:contain;height:100%}.link-preview-image.portrait{float:left;width:160px;height:160px;position:relative}.link-preview-image.portrait img{position:absolute;min-width:100%;min-height:100%;top:50%;left:50%;transform:translate3d(-50%,-50%,0)}.link-preview-content{overflow:hidden;padding:10px 30px 10px 15px}.link-preview-title{color:#333;font-size:15px;line-height:22px}.link-preview-text{overflow:hidden;margin-top:7px;font-size:10px;line-height:18px}.link-preview-url{margin-top:7px;text-transform:uppercase;font-size:12px;color:#888}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9vcGVuLWdyYXBoL2xpbmstcHJldmlldy9saW5rLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBUXZELE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFTL0IsWUFDVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVBuQyxjQUFTLEdBQVksSUFBSSxDQUFDO1FBQ3pCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhDLFlBQU8sR0FBWSxLQUFLLENBQUM7SUFJckIsQ0FBQzs7OztJQUVMLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjthQUFNLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7YUFBSztZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7O0lBRUQsU0FBUztRQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLElB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QUN0Qiw2Q0FBc0M7O0lBQ3RDLHlDQUFtQzs7SUFDbkMsc0NBQXNDOztJQUN0Qyx3Q0FBd0M7O0lBRXhDLHVDQUF5Qjs7Ozs7SUFHdkIsZ0RBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T3BlbkdyYXBoU2VydmljZX0gZnJvbSBcIi4uL29wZW4tZ3JhcGguc2VydmljZVwiO1xuaW1wb3J0IHtPcGVuR3JhcGhEYXRhLCBPcGVuR3JhcGhJbWFnZUluZm99IGZyb20gXCIuLi9tb2RlbC9PcGVuR3JhcGhEYXRhXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1saW5rLXByZXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluay1wcmV2aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGluay1wcmV2aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rUHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGxpbms6IHN0cmluZztcbiAgQElucHV0KCkgb3BlbkdyYXBoRGF0YTogT3BlbkdyYXBoRGF0YTtcbiAgQElucHV0KCkgcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQE91dHB1dCgpIG9uTG9hZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9oaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9wZW5HcmFwaFNlcnZpY2U6IE9wZW5HcmFwaFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5vcGVuR3JhcGhTZXJ2aWNlLmlzTGluayh0aGlzLmxpbmspKSB7XG4gICAgICB0aGlzLmxvYWRQcmV2aWV3KCk7XG4gICAgfSBlbHNlIGlmKHRoaXMub3BlbkdyYXBoRGF0YSkge1xuICAgICAgdGhpcy5sb2FkSW1hZ2VJbmZvKCk7XG4gICAgfSBlbHNle1xuICAgICAgdGhpcy5zZXRIaWRkZW4odHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgaXNQcmV2aWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0hpZGRlbigpICYmICghIXRoaXMubGluayB8fCAhIXRoaXMub3BlbkdyYXBoRGF0YSk7XG4gIH1cblxuICBzZXREYXRhKGRhdGE6IE9wZW5HcmFwaERhdGEpIHtcbiAgICBpZiAoIWRhdGEgfHwgIWRhdGEudGl0bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vcGVuR3JhcGhEYXRhID0gZGF0YTtcbiAgICB0aGlzLmxvYWRJbWFnZUluZm8oKTtcbiAgICB0aGlzLnNldEhpZGRlbihmYWxzZSk7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLm9wZW5HcmFwaERhdGE7XG4gIH1cblxuICBzZXRMaW5rKGxpbms6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmxpbmsgPT09IGxpbmspIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5saW5rID0gbGluaztcbiAgICB0aGlzLmxvYWRQcmV2aWV3KCk7XG4gIH1cblxuICByZW1vdmVQcmVWaWV3KCkge1xuICAgIHRoaXMub25EZWxldGUuZW1pdCh0aGlzKTtcbiAgICB0aGlzLmNsZWFyRGF0YSgpO1xuICB9XG5cbiAgZ2V0RG9tYWluKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgZG9tYWluID0gdXJsLnNwbGl0KCcvJylbMl0gfHwgJyc7XG4gICAgcmV0dXJuIGRvbWFpbi5yZXBsYWNlKCd3d3cuJywgJycpO1xuICB9XG5cbiAgY2xlYXJEYXRhKCkge1xuICAgIHRoaXMubGluayA9IG51bGw7XG4gICAgdGhpcy5vcGVuR3JhcGhEYXRhID0gbnVsbDtcbiAgICB0aGlzLnNldEhpZGRlbih0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFByZXZpZXcoKSB7XG4gICAgdGhpcy5zZXRIaWRkZW4oZmFsc2UpO1xuICAgIGlmICh0aGlzLm9wZW5HcmFwaFNlcnZpY2UuaXNMaW5rKHRoaXMubGluaykpIHtcbiAgICAgIHRoaXMub3BlbkdyYXBoU2VydmljZS5sb2FkUHJldmlld0xpbmsodGhpcy5saW5rLCAoZGF0YTogT3BlbkdyYXBoRGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEhpZGRlbih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0SGlkZGVuKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEltYWdlSW5mbygpIHtcbiAgICBpZiAodGhpcy5vcGVuR3JhcGhEYXRhICYmIHRoaXMub3BlbkdyYXBoRGF0YS5pbWFnZSkge1xuICAgICAgdGhpcy5vcGVuR3JhcGhTZXJ2aWNlLmxvYWRJbWFnZUluZm8odGhpcy5vcGVuR3JhcGhEYXRhLmltYWdlLCAoaW1hZ2VJbmZvOiBPcGVuR3JhcGhJbWFnZUluZm8pID0+IHtcbiAgICAgICAgdGhpcy5vcGVuR3JhcGhEYXRhLmltYWdlSW5mbyA9IGltYWdlSW5mbztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0SGlkZGVuKGhpZGRlbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGRlbiA9IGhpZGRlbjtcbiAgfVxuICBcbiAgcHJpdmF0ZSBpc0hpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZGVuO1xuICB9XG59XG4iXX0=