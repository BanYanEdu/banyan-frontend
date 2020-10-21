/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { SocialActivity } from '../model/Activity';
import { ShareMemberComponent } from '../share-member/share-member.component';
import { AutoSizeDirective } from 'inet-core';
import { SocialService } from "../social.service";
import { ProgressComponent } from "../progress/progress.component";
import { LinkPreviewComponent } from "inet-ui";
export class ActivityPostComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
        this.socialService = socialService;
        this.shareMemberEnable = false;
        this.linkPreviewEnable = false;
        this.enterPost = false;
        this.showWithAnimation = false;
        this.placeHolder = 'Nội dung chia sẻ...';
        this.companyMode = true;
        this.onCancel = new EventEmitter();
        this.onPost = new EventEmitter();
        this.message = '';
        this.files = [];
        this.removeFiles = [];
        // Detect link with space at end "http://innetcloud.vn "
        this.linkRegex = /(https?:\/\/[^\s]+)/;
        this._clickOut = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.postEl = this.postElement.nativeElement;
        // on paste detect link
        this.messageEl.nativeElement.addEventListener('paste', (/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.detectLink();
            }), 0);
        }));
        this.focusOutHideForm = this.focusOutHideForm.bind(this);
        document.addEventListener('click', this.focusOutHideForm);
        if (this.activity) {
            this.editActivity(this.activity);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        document.removeEventListener('click', this.focusOutHideForm);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    focusOutHideForm(e) {
        // Click inside
        if (e.target.isSameNode(this.postEl) || this.postEl.contains(e.target)) {
            return;
        }
        if (this._clickOut) {
            return;
        }
        this._clickOut = true;
        if (!this.isFocusForm() && !this.hasData() && !this.isShareMemberOpening()) {
            this.closeForm();
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._clickOut = false;
        }), 500);
    }
    /**
     * @return {?}
     */
    isFocusForm() {
        return $(this.postEl).find(':focus').length > 0;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    enterPostForm(e) {
        if (this.enterPost) {
            e.preventDefault();
            this.postActivity();
        }
    }
    /**
     * @return {?}
     */
    postActivity() {
        /** @type {?} */
        const params = this.getData();
        if (!params.message) {
            this.focusMessage();
            return;
        }
        this.onPost.emit(params);
        this.indicator.show();
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        let params = {
            message: this.message
        };
        // File upload
        for (let i = 0; i < this.files.length; i++) {
            if (!this.files[i].id) {
                params['file-' + i] = this.files[i];
            }
        }
        // File removed
        /** @type {?} */
        const fileRemoved = this.getUuidFileRemoved();
        if (fileRemoved) {
            params.gridfsUUID = fileRemoved;
        }
        if (this.activity) {
            params.activity = this.activity.uuid;
        }
        if (this.shareMember) {
            this.shareMember.injectPolicies(params);
        }
        if (this.linkPreview && this.linkPreview.getData()) {
            params.openGraph = this.linkPreview.getData();
        }
        return params;
    }
    /**
     * @return {?}
     */
    hasData() {
        return this.message || this.files.length;
    }
    /**
     * @param {?} activity
     * @return {?}
     */
    editActivity(activity) {
        this.resetForm();
        this.activity = activity;
        this.message = activity.message;
        this.files = this.socialService.attachmentToFiles(activity.attachments);
        this.focusMessage();
        // if (this.shareMember) {
        //     this.shareMember.setPolicies(activity._policies);
        // }
        if (activity._openGraph && this.linkPreview) {
            this.linkPreview.setData(activity._openGraph);
        }
        this.showForm(true);
        // Trigger input to adjust size
        this.resizeInput();
    }
    /**
     * @return {?}
     */
    resetForm() {
        // Clear data
        this.message = '';
        this.files.length = 0;
        this.removeFiles.length = 0;
        if (this.linkPreview) {
            this.linkPreview.clearData();
        }
        if (this.indicator) {
            this.indicator.hide();
        }
        this.resizeInput();
    }
    /**
     * @return {?}
     */
    typeMessage() {
        if (this.message.trim() && this.message.slice(-1) === ' ') {
            this.detectLink();
        }
    }
    /**
     * @return {?}
     */
    closeForm() {
        this.resetForm();
        this.hideForm(true);
        if (this.activity) {
            this.onCancel.emit(this.activity);
            this.activity = null;
        }
    }
    /**
     * @param {?=} noTransition
     * @return {?}
     */
    showForm(noTransition) {
        if (this.postEl.isShow) {
            return;
        }
        if (!this.showWithAnimation && !noTransition) {
            noTransition = true;
        }
        if (noTransition) {
            this.setFormHeight('auto');
            this.postEl.style.overflow = 'visible';
        }
        else {
            this.setPostHeight();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.setFormHeight('auto');
                this.postEl.style.overflow = 'visible';
            }), 400);
        }
        this.focusMessage();
        this.postEl.isShow = true;
    }
    /**
     * @param {?=} noTransition
     * @return {?}
     */
    hideForm(noTransition) {
        if (!this.postEl.isShow) {
            return;
        }
        if (!this.showWithAnimation && !noTransition) {
            noTransition = true;
        }
        if (noTransition) {
            this.setFormHeight('');
        }
        else {
            this.setPostHeight();
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.setFormHeight('');
            }), 0);
        }
        this.postEl.style.overflow = 'hidden';
        this.postEl.isShow = false;
    }
    /**
     * @return {?}
     */
    isShareMemberOpening() {
        return this.shareMember && this.shareMember.isOpening();
    }
    /**
     * @return {?}
     */
    focusMessage() {
        this.messageEl.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    resizeInput() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.messageAutoSize.adjust();
        }), 0);
    }
    /**
     * @private
     * @return {?}
     */
    detectLink() {
        if (!this.linkPreviewEnable || !this.linkPreview) {
            return;
        }
        // Only one link preview
        if (this.linkPreview.isPreview()) {
            return;
        }
        /** @type {?} */
        let links = this.linkRegex.exec(this.message);
        if (links && links.length > 0) {
            this.linkPreview.setLink(links[0]);
        }
    }
    /**
     * @private
     * @return {?}
     */
    setPostHeight() {
        this.setFormHeight(this.postEl.scrollHeight + 'px');
    }
    /**
     * @private
     * @param {?} height
     * @return {?}
     */
    setFormHeight(height) {
        this.postEl.style.height = height;
    }
    /**
     * @private
     * @return {?}
     */
    getUuidFileRemoved() {
        return this.removeFiles.filter((/**
         * @param {?} file
         * @return {?}
         */
        file => file.id)).map((/**
         * @param {?} file
         * @return {?}
         */
        file => file.id)).join(',');
    }
}
ActivityPostComponent.decorators = [
    { type: Component, args: [{
                selector: '[activityPost]',
                template: "<div class=\"message-post\" #postElement>\n    <textarea class=\"text-secondary\"\n            rows=\"1\"\n            [placeholder]=\"placeHolder\"\n            #messageEl\n            appAutoSize\n            (input)=\"typeMessage()\"\n            (keydown.esc)=\"closeForm()\"\n            (keydown.enter)=\"enterPostForm($event)\"\n            [(ngModel)]=\"message\"\n            (click)=\"showForm()\"></textarea>\n\n    <app-link-preview *ngIf=\"linkPreviewEnable\"></app-link-preview>\n\n    <file-list class=\"social-block\" [fileEl]=\"fileEl\" [files]=\"files\" (onRemove)=\"removeFiles.push($event)\"></file-list>\n\n    <div class=\"message-post__bottom\">\n        <button class=\"btn btn-light btn-sm active post-action__btn\" tabindex=\"-1\">\n            <i class=\"fa fa-image\"></i>\n            <input #fileEl type=\"file\" multiple class=\"file-post\">\n        </button>\n\n        <div class=\"message-post__share\" *ngIf=\"shareMemberEnable\"\n             socialShareMember\n             [activity]=\"activity\"\n             [companyMode]=\"companyMode\"></div>\n\n        <div>\n            <button class=\"btn btn-light btn-sm active\" (click)=\"closeForm()\">\u0110\u00D3NG</button>\n            <button class=\"btn btn-primary btn-sm ml-1\" (click)=\"postActivity()\">\n                {{activity ? 'C\u1EACP NH\u1EACT' : '\u0110\u0102NG'}}\n            </button>\n        </div>\n    </div>\n</div>\n\n<progress-indicator></progress-indicator>\n",
                styles: [".social-block{display:block;margin-top:10px}:host{position:relative}.message-post{overflow:hidden;transition-duration:.3s;height:32px}.message-post__bottom{display:flex;flex-wrap:wrap;margin-top:-10px;margin-bottom:2px}.message-post__bottom>*{margin-top:10px}.message-post__share{margin-left:5px;margin-right:10px;flex-grow:1;display:inline-block}.post-action__btn{position:relative;overflow:hidden;min-width:34px}.post-avatar{float:left;height:40px;width:40px;border-radius:50%;margin-right:10px}textarea{border:0;width:100%;padding:5px 0;outline:0;background:inherit;resize:none;color:#6c757d;min-height:30px}.textarea-comment{padding:7px;background:#e3e5e5;border-radius:4px}file-chooser-list{margin:10px 0;display:block}.file-post{position:absolute;-webkit-appearance:none;-moz-appearance:none;appearance:none;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0;z-index:100}"]
            }] }
];
/** @nocollapse */
ActivityPostComponent.ctorParameters = () => [
    { type: SocialService }
];
ActivityPostComponent.propDecorators = {
    activity: [{ type: Input }],
    shareMemberEnable: [{ type: Input }],
    linkPreviewEnable: [{ type: Input }],
    enterPost: [{ type: Input }],
    showWithAnimation: [{ type: Input }],
    placeHolder: [{ type: Input }],
    companyMode: [{ type: Input }],
    onCancel: [{ type: Output }],
    onPost: [{ type: Output }],
    postElement: [{ type: ViewChild, args: ['postElement',] }],
    messageEl: [{ type: ViewChild, args: ['messageEl',] }],
    shareMember: [{ type: ViewChild, args: [ShareMemberComponent,] }],
    messageAutoSize: [{ type: ViewChild, args: [AutoSizeDirective,] }],
    linkPreview: [{ type: ViewChild, args: [LinkPreviewComponent,] }],
    indicator: [{ type: ViewChild, args: [ProgressComponent,] }]
};
if (false) {
    /** @type {?} */
    ActivityPostComponent.prototype.activity;
    /** @type {?} */
    ActivityPostComponent.prototype.shareMemberEnable;
    /** @type {?} */
    ActivityPostComponent.prototype.linkPreviewEnable;
    /** @type {?} */
    ActivityPostComponent.prototype.enterPost;
    /** @type {?} */
    ActivityPostComponent.prototype.showWithAnimation;
    /** @type {?} */
    ActivityPostComponent.prototype.placeHolder;
    /** @type {?} */
    ActivityPostComponent.prototype.companyMode;
    /** @type {?} */
    ActivityPostComponent.prototype.onCancel;
    /** @type {?} */
    ActivityPostComponent.prototype.onPost;
    /** @type {?} */
    ActivityPostComponent.prototype.postElement;
    /** @type {?} */
    ActivityPostComponent.prototype.messageEl;
    /** @type {?} */
    ActivityPostComponent.prototype.shareMember;
    /** @type {?} */
    ActivityPostComponent.prototype.messageAutoSize;
    /** @type {?} */
    ActivityPostComponent.prototype.linkPreview;
    /** @type {?} */
    ActivityPostComponent.prototype.indicator;
    /** @type {?} */
    ActivityPostComponent.prototype.message;
    /** @type {?} */
    ActivityPostComponent.prototype.files;
    /** @type {?} */
    ActivityPostComponent.prototype.removeFiles;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype.linkRegex;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype.postEl;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype._clickOut;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktcG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9hY3Rpdml0eS1wb3N0L2FjdGl2aXR5LXBvc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLG9CQUFvQixFQUFlLE1BQU0sU0FBUyxDQUFDO0FBUzNELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUE0QjlCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBMUJ2QyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGdCQUFXLEdBQVcscUJBQXFCLENBQUM7UUFDNUMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFM0IsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFTM0MsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQUMzQixnQkFBVyxHQUFt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NENBQW1FOztJQUNuRSxnREFBaUU7O0lBQ2pFLDRDQUFtRTs7SUFDbkUsMENBQTJEOztJQUUzRCx3Q0FBcUI7O0lBQ3JCLHNDQUEyQjs7SUFDM0IsNENBQWlDOzs7OztJQUdqQywwQ0FBMEM7Ozs7O0lBQzFDLHVDQUFlOzs7OztJQUNmLDBDQUFtQzs7Ozs7SUFFdkIsOENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE91dHB1dCxcbiAgICBJbnB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkluaXQsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxBY3Rpdml0eX0gZnJvbSAnLi4vbW9kZWwvQWN0aXZpdHknO1xuaW1wb3J0IHtTb2NpYWxDb21tZW50fSBmcm9tICcuLi9tb2RlbC9Db21tZW50JztcbmltcG9ydCB7U2hhcmVNZW1iZXJDb21wb25lbnR9IGZyb20gJy4uL3NoYXJlLW1lbWJlci9zaGFyZS1tZW1iZXIuY29tcG9uZW50JztcbmltcG9ydCB7QXV0b1NpemVEaXJlY3RpdmV9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gXCIuLi9zb2NpYWwuc2VydmljZVwiO1xuaW1wb3J0IHtQcm9ncmVzc0NvbXBvbmVudH0gZnJvbSBcIi4uL3Byb2dyZXNzL3Byb2dyZXNzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtMaW5rUHJldmlld0NvbXBvbmVudCwgRmlsZUxpc3RJdGVtfSBmcm9tIFwiaW5ldC11aVwiO1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1thY3Rpdml0eVBvc3RdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWN0aXZpdHktcG9zdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWN0aXZpdHktcG9zdC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBBY3Rpdml0eVBvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5O1xuICAgIEBJbnB1dCgpIHNoYXJlTWVtYmVyRW5hYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgbGlua1ByZXZpZXdFbmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBlbnRlclBvc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93V2l0aEFuaW1hdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHBsYWNlSG9sZGVyOiBzdHJpbmcgPSAnTuG7mWkgZHVuZyBjaGlhIHPhursuLi4nO1xuICAgIEBJbnB1dCgpIGNvbXBhbnlNb2RlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBvbkNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvblBvc3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3Bvc3RFbGVtZW50JykgcG9zdEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbWVzc2FnZUVsJykgbWVzc2FnZUVsOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoU2hhcmVNZW1iZXJDb21wb25lbnQpIHNoYXJlTWVtYmVyOiBTaGFyZU1lbWJlckNvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKEF1dG9TaXplRGlyZWN0aXZlKSBtZXNzYWdlQXV0b1NpemU6IEF1dG9TaXplRGlyZWN0aXZlO1xuICAgIEBWaWV3Q2hpbGQoTGlua1ByZXZpZXdDb21wb25lbnQpIGxpbmtQcmV2aWV3OiBMaW5rUHJldmlld0NvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKFByb2dyZXNzQ29tcG9uZW50KSBpbmRpY2F0b3I6IFByb2dyZXNzQ29tcG9uZW50O1xuXG4gICAgbWVzc2FnZTogc3RyaW5nID0gJyc7XG4gICAgZmlsZXM6IEZpbGVMaXN0SXRlbVtdID0gW107XG4gICAgcmVtb3ZlRmlsZXM6IEZpbGVMaXN0SXRlbVtdID0gW107XG5cbiAgICAvLyBEZXRlY3QgbGluayB3aXRoIHNwYWNlIGF0IGVuZCBcImh0dHA6Ly9pbm5ldGNsb3VkLnZuIFwiXG4gICAgcHJpdmF0ZSBsaW5rUmVnZXggPSAvKGh0dHBzPzpcXC9cXC9bXlxcc10rKS87XG4gICAgcHJpdmF0ZSBwb3N0RWw7XG4gICAgcHJpdmF0ZSBfY2xpY2tPdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3N0RWwgPSB0aGlzLnBvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgLy8gb24gcGFzdGUgZGV0ZWN0IGxpbmtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsICgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0TGluaygpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9jdXNPdXRIaWRlRm9ybSA9IHRoaXMuZm9jdXNPdXRIaWRlRm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZm9jdXNPdXRIaWRlRm9ybSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdEFjdGl2aXR5KHRoaXMuYWN0aXZpdHkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5mb2N1c091dEhpZGVGb3JtKTtcbiAgICB9XG5cbiAgICBmb2N1c091dEhpZGVGb3JtKGUpIHtcbiAgICAgICAgLy8gQ2xpY2sgaW5zaWRlXG4gICAgICAgIGlmIChlLnRhcmdldC5pc1NhbWVOb2RlKHRoaXMucG9zdEVsKSB8fCB0aGlzLnBvc3RFbC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2xpY2tPdXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NsaWNrT3V0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRm9jdXNGb3JtKCkgJiYgIXRoaXMuaGFzRGF0YSgpICYmICF0aGlzLmlzU2hhcmVNZW1iZXJPcGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jbGlja091dCA9IGZhbHNlO1xuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIGlzRm9jdXNGb3JtKCkge1xuICAgICAgICByZXR1cm4gJCh0aGlzLnBvc3RFbCkuZmluZCgnOmZvY3VzJykubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBlbnRlclBvc3RGb3JtKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZW50ZXJQb3N0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnBvc3RBY3Rpdml0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9zdEFjdGl2aXR5KCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgaWYgKCFwYXJhbXMubWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c01lc3NhZ2UoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUG9zdC5lbWl0KHBhcmFtcyk7XG4gICAgICAgIHRoaXMuaW5kaWNhdG9yLnNob3coKTtcbiAgICB9XG5cbiAgICBnZXREYXRhKCkge1xuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2VcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBGaWxlIHVwbG9hZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5maWxlc1tpXS5pZCkge1xuICAgICAgICAgICAgICAgIHBhcmFtc1snZmlsZS0nICsgaV0gPSB0aGlzLmZpbGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsZSByZW1vdmVkXG4gICAgICAgIGNvbnN0IGZpbGVSZW1vdmVkID0gdGhpcy5nZXRVdWlkRmlsZVJlbW92ZWQoKTtcbiAgICAgICAgaWYgKGZpbGVSZW1vdmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMuZ3JpZGZzVVVJRCA9IGZpbGVSZW1vdmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hY3Rpdml0eSA9IHRoaXMuYWN0aXZpdHkudXVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNoYXJlTWVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlTWVtYmVyLmluamVjdFBvbGljaWVzKHBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saW5rUHJldmlldyAmJiB0aGlzLmxpbmtQcmV2aWV3LmdldERhdGEoKSkge1xuICAgICAgICAgICAgcGFyYW1zLm9wZW5HcmFwaCA9IHRoaXMubGlua1ByZXZpZXcuZ2V0RGF0YSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBoYXNEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlIHx8IHRoaXMuZmlsZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGVkaXRBY3Rpdml0eShhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkgfCBTb2NpYWxDb21tZW50KSB7XG4gICAgICAgIHRoaXMucmVzZXRGb3JtKCk7XG5cbiAgICAgICAgdGhpcy5hY3Rpdml0eSA9IGFjdGl2aXR5O1xuXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGFjdGl2aXR5Lm1lc3NhZ2U7XG5cbiAgICAgICAgdGhpcy5maWxlcyA9IHRoaXMuc29jaWFsU2VydmljZS5hdHRhY2htZW50VG9GaWxlcyhhY3Rpdml0eS5hdHRhY2htZW50cyk7XG5cbiAgICAgICAgdGhpcy5mb2N1c01lc3NhZ2UoKTtcblxuICAgICAgICAvLyBpZiAodGhpcy5zaGFyZU1lbWJlcikge1xuICAgICAgICAvLyAgICAgdGhpcy5zaGFyZU1lbWJlci5zZXRQb2xpY2llcyhhY3Rpdml0eS5fcG9saWNpZXMpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKGFjdGl2aXR5Ll9vcGVuR3JhcGggJiYgdGhpcy5saW5rUHJldmlldykge1xuICAgICAgICAgICAgdGhpcy5saW5rUHJldmlldy5zZXREYXRhKGFjdGl2aXR5Ll9vcGVuR3JhcGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93Rm9ybSh0cnVlKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGlucHV0IHRvIGFkanVzdCBzaXplXG4gICAgICAgIHRoaXMucmVzaXplSW5wdXQoKTtcblxuICAgIH1cblxuICAgIHJlc2V0Rm9ybSgpIHtcblxuICAgICAgICAvLyBDbGVhciBkYXRhXG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICB0aGlzLmZpbGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucmVtb3ZlRmlsZXMubGVuZ3RoID0gMDtcblxuICAgICAgICBpZiAodGhpcy5saW5rUHJldmlldykge1xuICAgICAgICAgICAgdGhpcy5saW5rUHJldmlldy5jbGVhckRhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmluZGljYXRvcikge1xuICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3IuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNpemVJbnB1dCgpO1xuICAgIH1cblxuICAgIHR5cGVNZXNzYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5tZXNzYWdlLnRyaW0oKSAmJiB0aGlzLm1lc3NhZ2Uuc2xpY2UoLTEpID09PSAnICcpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0TGluaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VGb3JtKCkge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuICAgICAgICB0aGlzLmhpZGVGb3JtKHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5KSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2FuY2VsLmVtaXQodGhpcy5hY3Rpdml0eSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3JtKG5vVHJhbnNpdGlvbj86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMucG9zdEVsLmlzU2hvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnNob3dXaXRoQW5pbWF0aW9uICYmICFub1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIG5vVHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9UcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvcm1IZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgIHRoaXMucG9zdEVsLnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRQb3N0SGVpZ2h0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvcm1IZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RFbC5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIH0sIDQwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2N1c01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5wb3N0RWwuaXNTaG93ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoaWRlRm9ybShub1RyYW5zaXRpb24/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy5wb3N0RWwuaXNTaG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc2hvd1dpdGhBbmltYXRpb24gJiYgIW5vVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgbm9UcmFuc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9ybUhlaWdodCgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFBvc3RIZWlnaHQoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9ybUhlaWdodCgnJyk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc3RFbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLnBvc3RFbC5pc1Nob3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1NoYXJlTWVtYmVyT3BlbmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVNZW1iZXIgJiYgdGhpcy5zaGFyZU1lbWJlci5pc09wZW5pbmcoKTtcbiAgICB9XG5cbiAgICBmb2N1c01lc3NhZ2UoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZXNpemVJbnB1dCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VBdXRvU2l6ZS5hZGp1c3QoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXRlY3RMaW5rKCkge1xuICAgICAgICBpZiAoIXRoaXMubGlua1ByZXZpZXdFbmFibGUgfHwgIXRoaXMubGlua1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgb25lIGxpbmsgcHJldmlld1xuICAgICAgICBpZiAodGhpcy5saW5rUHJldmlldy5pc1ByZXZpZXcoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxpbmtzID0gdGhpcy5saW5rUmVnZXguZXhlYyh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICBpZiAobGlua3MgJiYgbGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5saW5rUHJldmlldy5zZXRMaW5rKGxpbmtzWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UG9zdEhlaWdodCgpIHtcbiAgICAgICAgdGhpcy5zZXRGb3JtSGVpZ2h0KHRoaXMucG9zdEVsLnNjcm9sbEhlaWdodCArICdweCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Rm9ybUhlaWdodChoZWlnaHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBvc3RFbC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRVdWlkRmlsZVJlbW92ZWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlRmlsZXMuZmlsdGVyKGZpbGUgPT4gZmlsZS5pZCkubWFwKGZpbGUgPT4gZmlsZS5pZCkuam9pbignLCcpO1xuICAgIH1cbn1cbiJdfQ==