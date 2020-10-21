/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OpenGraphService } from "../open-graph.service";
var LinkPreviewComponent = /** @class */ (function () {
    function LinkPreviewComponent(openGraphService) {
        this.openGraphService = openGraphService;
        this.removable = true;
        this.onLoad = new EventEmitter();
        this.onDelete = new EventEmitter();
        this._hidden = false;
    }
    /**
     * @return {?}
     */
    LinkPreviewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.openGraphService.isLink(this.link)) {
            this.loadPreview();
        }
        else if (this.openGraphData) {
            this.loadImageInfo();
        }
        else {
            this.setHidden(true);
        }
    };
    /**
     * @return {?}
     */
    LinkPreviewComponent.prototype.isPreview = /**
     * @return {?}
     */
    function () {
        return !this.isHidden() && (!!this.link || !!this.openGraphData);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    LinkPreviewComponent.prototype.setData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!data || !data.title) {
            return;
        }
        this.openGraphData = data;
        this.loadImageInfo();
        this.setHidden(false);
    };
    /**
     * @return {?}
     */
    LinkPreviewComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        return this.openGraphData;
    };
    /**
     * @param {?} link
     * @return {?}
     */
    LinkPreviewComponent.prototype.setLink = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        if (this.link === link) {
            return;
        }
        this.link = link;
        this.loadPreview();
    };
    /**
     * @return {?}
     */
    LinkPreviewComponent.prototype.removePreView = /**
     * @return {?}
     */
    function () {
        this.onDelete.emit(this);
        this.clearData();
    };
    /**
     * @param {?} url
     * @return {?}
     */
    LinkPreviewComponent.prototype.getDomain = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (!url) {
            return '';
        }
        /** @type {?} */
        var domain = url.split('/')[2] || '';
        return domain.replace('www.', '');
    };
    /**
     * @return {?}
     */
    LinkPreviewComponent.prototype.clearData = /**
     * @return {?}
     */
    function () {
        this.link = null;
        this.openGraphData = null;
        this.setHidden(true);
    };
    /**
     * @private
     * @return {?}
     */
    LinkPreviewComponent.prototype.loadPreview = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.setHidden(false);
        if (this.openGraphService.isLink(this.link)) {
            this.openGraphService.loadPreviewLink(this.link, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data) {
                    _this.setData(data);
                }
                else {
                    _this.setHidden(true);
                }
            }));
        }
        else {
            this.setHidden(true);
        }
    };
    /**
     * @private
     * @return {?}
     */
    LinkPreviewComponent.prototype.loadImageInfo = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.openGraphData && this.openGraphData.image) {
            this.openGraphService.loadImageInfo(this.openGraphData.image, (/**
             * @param {?} imageInfo
             * @return {?}
             */
            function (imageInfo) {
                _this.openGraphData.imageInfo = imageInfo;
            }));
        }
    };
    /**
     * @private
     * @param {?} hidden
     * @return {?}
     */
    LinkPreviewComponent.prototype.setHidden = /**
     * @private
     * @param {?} hidden
     * @return {?}
     */
    function (hidden) {
        this._hidden = hidden;
    };
    /**
     * @private
     * @return {?}
     */
    LinkPreviewComponent.prototype.isHidden = /**
     * @private
     * @return {?}
     */
    function () {
        return this._hidden;
    };
    LinkPreviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-link-preview',
                    template: "<div *ngIf=\"!_hidden\" class=\"link-preview\">\n    <div *ngIf=\"!openGraphData; else preview\">\n        <i class=\"fa fa-spinner fa-spin link-preview-spinner\"></i>\n        <div class=\"link-preview-content\">\u0110ang t\u1EA3i ch\u1EBF \u0111\u1ED9 xem tr\u01B0\u1EDBc...</div>\n    </div>\n    <ng-template #preview>\n        <div *ngIf=\"openGraphData?.imageInfo?.available\"\n             [ngClass]=\"openGraphData.imageInfo.landscape ? 'landscape mb-0' : 'portrait mb-0'\"\n             class=\"link-preview-image\">\n            <img [src]=\"openGraphData.image\">\n        </div>\n        <div class=\"link-preview-content bg-white\">\n            <div class=\"link-preview-title\">{{openGraphData.title}}</div>\n            <div class=\"link-preview-text\">{{openGraphData.description}}</div>\n            <div class=\"link-preview-url\">{{getDomain(openGraphData.url)}}</div>\n        </div>\n        <a [href]=\"openGraphData.url\" target=\"_blank\" rel=\"noopener nofollow\" class=\"link-preview-anchor\"></a>\n    </ng-template>\n    <i *ngIf=\"removable\" (click)=\"removePreView()\" class=\"fa fa-times link-preview-remove\"></i>\n</div>",
                    styles: [".link-preview{margin-bottom:15px;display:block;overflow:hidden;border:1px solid rgba(0,0,0,.1);position:relative;color:#555;width:300px}.link-preview-spinner{float:left;width:44px;height:44px;font-size:20px;line-height:44px;text-align:center}.link-preview-anchor{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;opacity:0;font-size:10px}.link-preview-remove{position:absolute;top:8px;right:8px;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;z-index:2;cursor:pointer;font-size:14px}.link-preview-remove:hover{background:rgba(0,0,0,.4)}.link-preview-image{overflow:hidden}.link-preview-image.landscape{margin-bottom:5px;border-bottom:1px solid rgba(0,0,0,.1);max-height:250px;width:330px}.link-preview-image.landscape img{width:100%;-o-object-fit:contain;object-fit:contain;height:100%}.link-preview-image.portrait{float:left;width:160px;height:160px;position:relative}.link-preview-image.portrait img{position:absolute;min-width:100%;min-height:100%;top:50%;left:50%;transform:translate3d(-50%,-50%,0)}.link-preview-content{overflow:hidden;padding:10px 30px 10px 15px}.link-preview-title{color:#333;font-size:15px;line-height:22px}.link-preview-text{overflow:hidden;margin-top:7px;font-size:10px;line-height:18px}.link-preview-url{margin-top:7px;text-transform:uppercase;font-size:12px;color:#888}"]
                }] }
    ];
    /** @nocollapse */
    LinkPreviewComponent.ctorParameters = function () { return [
        { type: OpenGraphService }
    ]; };
    LinkPreviewComponent.propDecorators = {
        link: [{ type: Input }],
        openGraphData: [{ type: Input }],
        removable: [{ type: Input }],
        onLoad: [{ type: Output }],
        onDelete: [{ type: Output }]
    };
    return LinkPreviewComponent;
}());
export { LinkPreviewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9vcGVuLWdyYXBoL2xpbmstcHJldmlldy9saW5rLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR3ZEO0lBY0UsOEJBQ1UsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFQbkMsY0FBUyxHQUFZLElBQUksQ0FBQztRQUN6QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4QyxZQUFPLEdBQVksS0FBSyxDQUFDO0lBSXJCLENBQUM7Ozs7SUFFTCx1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjthQUFNLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7YUFBSztZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7O0lBRUQsd0NBQVM7OztJQUFUO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Ozs7SUFFRCxzQ0FBTzs7OztJQUFQLFVB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Ozs7Z0JBUE8sZ0JBQWdCOzs7dUJBU3JCLEtBQUs7Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLE1BQU07MkJBQ04sTUFBTTs7SUE0RlQsMkJBQUM7Q0FBQSxBQXRHRCxJQXNHQztTQWpHWSxvQkFBb0I7OztJQUMvQixvQ0FBc0I7O0lBQ3RCLDZDQUFzQzs7SUFDdEMseUNBQW1DOztJQUNuQyxzQ0FBc0M7O0lBQ3RDLHdDQUF3Qzs7SUFFeEMsdUNBQXlCOzs7OztJQUd2QixnREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPcGVuR3JhcGhTZXJ2aWNlfSBmcm9tIFwiLi4vb3Blbi1ncmFwaC5zZXJ2aWNlXCI7XG5pbXBvcnQge09wZW5HcmFwaERhdGEsIE9wZW5HcmFwaEltYWdlSW5mb30gZnJvbSBcIi4uL21vZGVsL09wZW5HcmFwaERhdGFcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWxpbmstcHJldmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5rLXByZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saW5rLXByZXZpZXcuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpbmtQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbGluazogc3RyaW5nO1xuICBASW5wdXQoKSBvcGVuR3JhcGhEYXRhOiBPcGVuR3JhcGhEYXRhO1xuICBASW5wdXQoKSByZW1vdmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBAT3V0cHV0KCkgb25Mb2FkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25EZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2hpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3BlbkdyYXBoU2VydmljZTogT3BlbkdyYXBoU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm9wZW5HcmFwaFNlcnZpY2UuaXNMaW5rKHRoaXMubGluaykpIHtcbiAgICAgIHRoaXMubG9hZFByZXZpZXcoKTtcbiAgICB9IGVsc2UgaWYodGhpcy5vcGVuR3JhcGhEYXRhKSB7XG4gICAgICB0aGlzLmxvYWRJbWFnZUluZm8oKTtcbiAgICB9IGVsc2V7XG4gICAgICB0aGlzLnNldEhpZGRlbih0cnVlKTtcbiAgICB9XG4gIH1cblxuICBpc1ByZXZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzSGlkZGVuKCkgJiYgKCEhdGhpcy5saW5rIHx8ICEhdGhpcy5vcGVuR3JhcGhEYXRhKTtcbiAgfVxuXG4gIHNldERhdGEoZGF0YTogT3BlbkdyYXBoRGF0YSkge1xuICAgIGlmICghZGF0YSB8fCAhZGF0YS50aXRsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9wZW5HcmFwaERhdGEgPSBkYXRhO1xuICAgIHRoaXMubG9hZEltYWdlSW5mbygpO1xuICAgIHRoaXMuc2V0SGlkZGVuKGZhbHNlKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMub3BlbkdyYXBoRGF0YTtcbiAgfVxuXG4gIHNldExpbmsobGluazogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubGluayA9PT0gbGluaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxpbmsgPSBsaW5rO1xuICAgIHRoaXMubG9hZFByZXZpZXcoKTtcbiAgfVxuXG4gIHJlbW92ZVByZVZpZXcoKSB7XG4gICAgdGhpcy5vbkRlbGV0ZS5lbWl0KHRoaXMpO1xuICAgIHRoaXMuY2xlYXJEYXRhKCk7XG4gIH1cblxuICBnZXREb21haW4odXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghdXJsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBkb21haW4gPSB1cmwuc3BsaXQoJy8nKVsyXSB8fCAnJztcbiAgICByZXR1cm4gZG9tYWluLnJlcGxhY2UoJ3d3dy4nLCAnJyk7XG4gIH1cblxuICBjbGVhckRhdGEoKSB7XG4gICAgdGhpcy5saW5rID0gbnVsbDtcbiAgICB0aGlzLm9wZW5HcmFwaERhdGEgPSBudWxsO1xuICAgIHRoaXMuc2V0SGlkZGVuKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUHJldmlldygpIHtcbiAgICB0aGlzLnNldEhpZGRlbihmYWxzZSk7XG4gICAgaWYgKHRoaXMub3BlbkdyYXBoU2VydmljZS5pc0xpbmsodGhpcy5saW5rKSkge1xuICAgICAgdGhpcy5vcGVuR3JhcGhTZXJ2aWNlLmxvYWRQcmV2aWV3TGluayh0aGlzLmxpbmssIChkYXRhOiBPcGVuR3JhcGhEYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0SGlkZGVuKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRIaWRkZW4odHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSW1hZ2VJbmZvKCkge1xuICAgIGlmICh0aGlzLm9wZW5HcmFwaERhdGEgJiYgdGhpcy5vcGVuR3JhcGhEYXRhLmltYWdlKSB7XG4gICAgICB0aGlzLm9wZW5HcmFwaFNlcnZpY2UubG9hZEltYWdlSW5mbyh0aGlzLm9wZW5HcmFwaERhdGEuaW1hZ2UsIChpbWFnZUluZm86IE9wZW5HcmFwaEltYWdlSW5mbykgPT4ge1xuICAgICAgICB0aGlzLm9wZW5HcmFwaERhdGEuaW1hZ2VJbmZvID0gaW1hZ2VJbmZvO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRIaWRkZW4oaGlkZGVuOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZGVuID0gaGlkZGVuO1xuICB9XG4gIFxuICBwcml2YXRlIGlzSGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9oaWRkZW47XG4gIH1cbn1cbiJdfQ==