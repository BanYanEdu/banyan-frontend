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
var ActivityPostComponent = /** @class */ (function () {
    function ActivityPostComponent(socialService) {
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
    ActivityPostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.postEl = this.postElement.nativeElement;
        // on paste detect link
        this.messageEl.nativeElement.addEventListener('paste', (/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.detectLink();
            }), 0);
        }));
        this.focusOutHideForm = this.focusOutHideForm.bind(this);
        document.addEventListener('click', this.focusOutHideForm);
        if (this.activity) {
            this.editActivity(this.activity);
        }
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        document.removeEventListener('click', this.focusOutHideForm);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ActivityPostComponent.prototype.focusOutHideForm = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
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
        function () {
            _this._clickOut = false;
        }), 500);
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.isFocusForm = /**
     * @return {?}
     */
    function () {
        return $(this.postEl).find(':focus').length > 0;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ActivityPostComponent.prototype.enterPostForm = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.enterPost) {
            e.preventDefault();
            this.postActivity();
        }
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.postActivity = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = this.getData();
        if (!params.message) {
            this.focusMessage();
            return;
        }
        this.onPost.emit(params);
        this.indicator.show();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            message: this.message
        };
        // File upload
        for (var i = 0; i < this.files.length; i++) {
            if (!this.files[i].id) {
                params['file-' + i] = this.files[i];
            }
        }
        // File removed
        /** @type {?} */
        var fileRemoved = this.getUuidFileRemoved();
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
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.hasData = /**
     * @return {?}
     */
    function () {
        return this.message || this.files.length;
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityPostComponent.prototype.editActivity = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
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
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.resetForm = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.typeMessage = /**
     * @return {?}
     */
    function () {
        if (this.message.trim() && this.message.slice(-1) === ' ') {
            this.detectLink();
        }
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.closeForm = /**
     * @return {?}
     */
    function () {
        this.resetForm();
        this.hideForm(true);
        if (this.activity) {
            this.onCancel.emit(this.activity);
            this.activity = null;
        }
    };
    /**
     * @param {?=} noTransition
     * @return {?}
     */
    ActivityPostComponent.prototype.showForm = /**
     * @param {?=} noTransition
     * @return {?}
     */
    function (noTransition) {
        var _this = this;
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
            function () {
                _this.setFormHeight('auto');
                _this.postEl.style.overflow = 'visible';
            }), 400);
        }
        this.focusMessage();
        this.postEl.isShow = true;
    };
    /**
     * @param {?=} noTransition
     * @return {?}
     */
    ActivityPostComponent.prototype.hideForm = /**
     * @param {?=} noTransition
     * @return {?}
     */
    function (noTransition) {
        var _this = this;
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
            function () {
                _this.setFormHeight('');
            }), 0);
        }
        this.postEl.style.overflow = 'hidden';
        this.postEl.isShow = false;
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.isShareMemberOpening = /**
     * @return {?}
     */
    function () {
        return this.shareMember && this.shareMember.isOpening();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.focusMessage = /**
     * @return {?}
     */
    function () {
        this.messageEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.resizeInput = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.messageAutoSize.adjust();
        }), 0);
    };
    /**
     * @private
     * @return {?}
     */
    ActivityPostComponent.prototype.detectLink = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.linkPreviewEnable || !this.linkPreview) {
            return;
        }
        // Only one link preview
        if (this.linkPreview.isPreview()) {
            return;
        }
        /** @type {?} */
        var links = this.linkRegex.exec(this.message);
        if (links && links.length > 0) {
            this.linkPreview.setLink(links[0]);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ActivityPostComponent.prototype.setPostHeight = /**
     * @private
     * @return {?}
     */
    function () {
        this.setFormHeight(this.postEl.scrollHeight + 'px');
    };
    /**
     * @private
     * @param {?} height
     * @return {?}
     */
    ActivityPostComponent.prototype.setFormHeight = /**
     * @private
     * @param {?} height
     * @return {?}
     */
    function (height) {
        this.postEl.style.height = height;
    };
    /**
     * @private
     * @return {?}
     */
    ActivityPostComponent.prototype.getUuidFileRemoved = /**
     * @private
     * @return {?}
     */
    function () {
        return this.removeFiles.filter((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return file.id; })).map((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return file.id; })).join(',');
    };
    ActivityPostComponent.decorators = [
        { type: Component, args: [{
                    selector: '[activityPost]',
                    template: "<div class=\"message-post\" #postElement>\n    <textarea class=\"text-secondary\"\n            rows=\"1\"\n            [placeholder]=\"placeHolder\"\n            #messageEl\n            appAutoSize\n            (input)=\"typeMessage()\"\n            (keydown.esc)=\"closeForm()\"\n            (keydown.enter)=\"enterPostForm($event)\"\n            [(ngModel)]=\"message\"\n            (click)=\"showForm()\"></textarea>\n\n    <app-link-preview *ngIf=\"linkPreviewEnable\"></app-link-preview>\n\n    <file-list class=\"social-block\" [fileEl]=\"fileEl\" [files]=\"files\" (onRemove)=\"removeFiles.push($event)\"></file-list>\n\n    <div class=\"message-post__bottom\">\n        <button class=\"btn btn-light btn-sm active post-action__btn\" tabindex=\"-1\">\n            <i class=\"fa fa-image\"></i>\n            <input #fileEl type=\"file\" multiple class=\"file-post\">\n        </button>\n\n        <div class=\"message-post__share\" *ngIf=\"shareMemberEnable\"\n             socialShareMember\n             [activity]=\"activity\"\n             [companyMode]=\"companyMode\"></div>\n\n        <div>\n            <button class=\"btn btn-light btn-sm active\" (click)=\"closeForm()\">\u0110\u00D3NG</button>\n            <button class=\"btn btn-primary btn-sm ml-1\" (click)=\"postActivity()\">\n                {{activity ? 'C\u1EACP NH\u1EACT' : '\u0110\u0102NG'}}\n            </button>\n        </div>\n    </div>\n</div>\n\n<progress-indicator></progress-indicator>\n",
                    styles: [".social-block{display:block;margin-top:10px}:host{position:relative}.message-post{overflow:hidden;transition-duration:.3s;height:32px}.message-post__bottom{display:flex;flex-wrap:wrap;margin-top:-10px;margin-bottom:2px}.message-post__bottom>*{margin-top:10px}.message-post__share{margin-left:5px;margin-right:10px;flex-grow:1;display:inline-block}.post-action__btn{position:relative;overflow:hidden;min-width:34px}.post-avatar{float:left;height:40px;width:40px;border-radius:50%;margin-right:10px}textarea{border:0;width:100%;padding:5px 0;outline:0;background:inherit;resize:none;color:#6c757d;min-height:30px}.textarea-comment{padding:7px;background:#e3e5e5;border-radius:4px}file-chooser-list{margin:10px 0;display:block}.file-post{position:absolute;-webkit-appearance:none;-moz-appearance:none;appearance:none;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0;z-index:100}"]
                }] }
    ];
    /** @nocollapse */
    ActivityPostComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
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
    return ActivityPostComponent;
}());
export { ActivityPostComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktcG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9hY3Rpdml0eS1wb3N0L2FjdGl2aXR5LXBvc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLG9CQUFvQixFQUFlLE1BQU0sU0FBUyxDQUFDO0FBRzNEO0lBa0NJLCtCQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQTFCdkMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyxnQkFBVyxHQUFXLHFCQUFxQixDQUFDO1FBQzVDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTNCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ25DLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBUzNDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDOztRQUd6Qixj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OUIsU0FBUyxTQUFDLGlCQUFpQjs7SUFnUWhDLDRCQUFDO0NBQUEsQUF2UkQsSUF1UkM7U0FqUlkscUJBQXFCOzs7SUFDOUIseUNBQWtDOztJQUNsQyxrREFBNEM7O0lBQzVDLGtEQUE0Qzs7SUFDNUMsMENBQW9DOztJQUNwQyxrREFBNEM7O0lBQzVDLDRDQUFxRDs7SUFDckQsNENBQXFDOztJQUVyQyx5Q0FBNkM7O0lBQzdDLHVDQUEyQzs7SUFFM0MsNENBQWtEOztJQUNsRCwwQ0FBOEM7O0lBQzlDLDRDQUFtRTs7SUFDbkUsZ0RBQWlFOztJQUNqRSw0Q0FBbUU7O0lBQ25FLDBDQUEyRDs7SUFFM0Qsd0NBQXFCOztJQUNyQixzQ0FBMkI7O0lBQzNCLDRDQUFpQzs7Ozs7SUFHakMsMENBQTBDOzs7OztJQUMxQyx1Q0FBZTs7Ozs7SUFDZiwwQ0FBbUM7Ozs7O0lBRXZCLDhDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgSW5wdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25Jbml0LFxuICAgIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsQWN0aXZpdHl9IGZyb20gJy4uL21vZGVsL0FjdGl2aXR5JztcbmltcG9ydCB7U29jaWFsQ29tbWVudH0gZnJvbSAnLi4vbW9kZWwvQ29tbWVudCc7XG5pbXBvcnQge1NoYXJlTWVtYmVyQ29tcG9uZW50fSBmcm9tICcuLi9zaGFyZS1tZW1iZXIvc2hhcmUtbWVtYmVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0F1dG9TaXplRGlyZWN0aXZlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tIFwiLi4vc29jaWFsLnNlcnZpY2VcIjtcbmltcG9ydCB7UHJvZ3Jlc3NDb21wb25lbnR9IGZyb20gXCIuLi9wcm9ncmVzcy9wcm9ncmVzcy5jb21wb25lbnRcIjtcbmltcG9ydCB7TGlua1ByZXZpZXdDb21wb25lbnQsIEZpbGVMaXN0SXRlbX0gZnJvbSBcImluZXQtdWlcIjtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbYWN0aXZpdHlQb3N0XScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FjdGl2aXR5LXBvc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FjdGl2aXR5LXBvc3QuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlQb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eTtcbiAgICBASW5wdXQoKSBzaGFyZU1lbWJlckVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGxpbmtQcmV2aWV3RW5hYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZW50ZXJQb3N0OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd1dpdGhBbmltYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwbGFjZUhvbGRlcjogc3RyaW5nID0gJ07hu5lpIGR1bmcgY2hpYSBz4bq7Li4uJztcbiAgICBASW5wdXQoKSBjb21wYW55TW9kZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAT3V0cHV0KCkgb25DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgb25Qb3N0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdwb3N0RWxlbWVudCcpIHBvc3RFbGVtZW50OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ21lc3NhZ2VFbCcpIG1lc3NhZ2VFbDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFNoYXJlTWVtYmVyQ29tcG9uZW50KSBzaGFyZU1lbWJlcjogU2hhcmVNZW1iZXJDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChBdXRvU2l6ZURpcmVjdGl2ZSkgbWVzc2FnZUF1dG9TaXplOiBBdXRvU2l6ZURpcmVjdGl2ZTtcbiAgICBAVmlld0NoaWxkKExpbmtQcmV2aWV3Q29tcG9uZW50KSBsaW5rUHJldmlldzogTGlua1ByZXZpZXdDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChQcm9ncmVzc0NvbXBvbmVudCkgaW5kaWNhdG9yOiBQcm9ncmVzc0NvbXBvbmVudDtcblxuICAgIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICAgIGZpbGVzOiBGaWxlTGlzdEl0ZW1bXSA9IFtdO1xuICAgIHJlbW92ZUZpbGVzOiBGaWxlTGlzdEl0ZW1bXSA9IFtdO1xuXG4gICAgLy8gRGV0ZWN0IGxpbmsgd2l0aCBzcGFjZSBhdCBlbmQgXCJodHRwOi8vaW5uZXRjbG91ZC52biBcIlxuICAgIHByaXZhdGUgbGlua1JlZ2V4ID0gLyhodHRwcz86XFwvXFwvW15cXHNdKykvO1xuICAgIHByaXZhdGUgcG9zdEVsO1xuICAgIHByaXZhdGUgX2NsaWNrT3V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucG9zdEVsID0gdGhpcy5wb3N0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIG9uIHBhc3RlIGRldGVjdCBsaW5rXG4gICAgICAgIHRoaXMubWVzc2FnZUVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdExpbmsoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzT3V0SGlkZUZvcm0gPSB0aGlzLmZvY3VzT3V0SGlkZUZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmZvY3VzT3V0SGlkZUZvcm0pO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRBY3Rpdml0eSh0aGlzLmFjdGl2aXR5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZm9jdXNPdXRIaWRlRm9ybSk7XG4gICAgfVxuXG4gICAgZm9jdXNPdXRIaWRlRm9ybShlKSB7XG4gICAgICAgIC8vIENsaWNrIGluc2lkZVxuICAgICAgICBpZiAoZS50YXJnZXQuaXNTYW1lTm9kZSh0aGlzLnBvc3RFbCkgfHwgdGhpcy5wb3N0RWwuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NsaWNrT3V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jbGlja091dCA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5pc0ZvY3VzRm9ybSgpICYmICF0aGlzLmhhc0RhdGEoKSAmJiAhdGhpcy5pc1NoYXJlTWVtYmVyT3BlbmluZygpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2xpY2tPdXQgPSBmYWxzZTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9XG5cbiAgICBpc0ZvY3VzRm9ybSgpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcy5wb3N0RWwpLmZpbmQoJzpmb2N1cycpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZW50ZXJQb3N0Rm9ybShlKSB7XG4gICAgICAgIGlmICh0aGlzLmVudGVyUG9zdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5wb3N0QWN0aXZpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvc3RBY3Rpdml0eSgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5nZXREYXRhKCk7XG4gICAgICAgIGlmICghcGFyYW1zLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNNZXNzYWdlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblBvc3QuZW1pdChwYXJhbXMpO1xuICAgICAgICB0aGlzLmluZGljYXRvci5zaG93KCk7XG4gICAgfVxuXG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gRmlsZSB1cGxvYWRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsZXNbaV0uaWQpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNbJ2ZpbGUtJyArIGldID0gdGhpcy5maWxlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGUgcmVtb3ZlZFxuICAgICAgICBjb25zdCBmaWxlUmVtb3ZlZCA9IHRoaXMuZ2V0VXVpZEZpbGVSZW1vdmVkKCk7XG4gICAgICAgIGlmIChmaWxlUmVtb3ZlZCkge1xuICAgICAgICAgICAgcGFyYW1zLmdyaWRmc1VVSUQgPSBmaWxlUmVtb3ZlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5KSB7XG4gICAgICAgICAgICBwYXJhbXMuYWN0aXZpdHkgPSB0aGlzLmFjdGl2aXR5LnV1aWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaGFyZU1lbWJlcikge1xuICAgICAgICAgICAgdGhpcy5zaGFyZU1lbWJlci5pbmplY3RQb2xpY2llcyhwYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGlua1ByZXZpZXcgJiYgdGhpcy5saW5rUHJldmlldy5nZXREYXRhKCkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5vcGVuR3JhcGggPSB0aGlzLmxpbmtQcmV2aWV3LmdldERhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgaGFzRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZSB8fCB0aGlzLmZpbGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBlZGl0QWN0aXZpdHkoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5IHwgU29jaWFsQ29tbWVudCkge1xuICAgICAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZpdHkgPSBhY3Rpdml0eTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBhY3Rpdml0eS5tZXNzYWdlO1xuXG4gICAgICAgIHRoaXMuZmlsZXMgPSB0aGlzLnNvY2lhbFNlcnZpY2UuYXR0YWNobWVudFRvRmlsZXMoYWN0aXZpdHkuYXR0YWNobWVudHMpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNZXNzYWdlKCk7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuc2hhcmVNZW1iZXIpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc2hhcmVNZW1iZXIuc2V0UG9saWNpZXMoYWN0aXZpdHkuX3BvbGljaWVzKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChhY3Rpdml0eS5fb3BlbkdyYXBoICYmIHRoaXMubGlua1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMubGlua1ByZXZpZXcuc2V0RGF0YShhY3Rpdml0eS5fb3BlbkdyYXBoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvd0Zvcm0odHJ1ZSk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBpbnB1dCB0byBhZGp1c3Qgc2l6ZVxuICAgICAgICB0aGlzLnJlc2l6ZUlucHV0KCk7XG5cbiAgICB9XG5cbiAgICByZXNldEZvcm0oKSB7XG5cbiAgICAgICAgLy8gQ2xlYXIgZGF0YVxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICAgICAgdGhpcy5maWxlcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJlbW92ZUZpbGVzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMubGlua1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMubGlua1ByZXZpZXcuY2xlYXJEYXRhKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzaXplSW5wdXQoKTtcbiAgICB9XG5cbiAgICB0eXBlTWVzc2FnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZS50cmltKCkgJiYgdGhpcy5tZXNzYWdlLnNsaWNlKC0xKSA9PT0gJyAnKSB7XG4gICAgICAgICAgICB0aGlzLmRldGVjdExpbmsoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlRm9ybSgpIHtcbiAgICAgICAgdGhpcy5yZXNldEZvcm0oKTtcbiAgICAgICAgdGhpcy5oaWRlRm9ybSh0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5hY3Rpdml0eSkge1xuICAgICAgICAgICAgdGhpcy5vbkNhbmNlbC5lbWl0KHRoaXMuYWN0aXZpdHkpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9ybShub1RyYW5zaXRpb24/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc3RFbC5pc1Nob3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zaG93V2l0aEFuaW1hdGlvbiAmJiAhbm9UcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICBub1RyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRGb3JtSGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgICB0aGlzLnBvc3RFbC5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UG9zdEhlaWdodCgpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGb3JtSGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0RWwuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9LCA0MDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9jdXNNZXNzYWdlKCk7XG4gICAgICAgIHRoaXMucG9zdEVsLmlzU2hvdyA9IHRydWU7XG4gICAgfVxuXG4gICAgaGlkZUZvcm0obm9UcmFuc2l0aW9uPzogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXRoaXMucG9zdEVsLmlzU2hvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnNob3dXaXRoQW5pbWF0aW9uICYmICFub1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIG5vVHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9UcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvcm1IZWlnaHQoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRQb3N0SGVpZ2h0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvcm1IZWlnaHQoJycpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3N0RWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5wb3N0RWwuaXNTaG93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNTaGFyZU1lbWJlck9wZW5pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlTWVtYmVyICYmIHRoaXMuc2hhcmVNZW1iZXIuaXNPcGVuaW5nKCk7XG4gICAgfVxuXG4gICAgZm9jdXNNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVzaXplSW5wdXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQXV0b1NpemUuYWRqdXN0KCk7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGV0ZWN0TGluaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxpbmtQcmV2aWV3RW5hYmxlIHx8ICF0aGlzLmxpbmtQcmV2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPbmx5IG9uZSBsaW5rIHByZXZpZXdcbiAgICAgICAgaWYgKHRoaXMubGlua1ByZXZpZXcuaXNQcmV2aWV3KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsaW5rcyA9IHRoaXMubGlua1JlZ2V4LmV4ZWModGhpcy5tZXNzYWdlKTtcbiAgICAgICAgaWYgKGxpbmtzICYmIGxpbmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlua1ByZXZpZXcuc2V0TGluayhsaW5rc1swXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBvc3RIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMuc2V0Rm9ybUhlaWdodCh0aGlzLnBvc3RFbC5zY3JvbGxIZWlnaHQgKyAncHgnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEZvcm1IZWlnaHQoaGVpZ2h0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wb3N0RWwuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VXVpZEZpbGVSZW1vdmVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUZpbGVzLmZpbHRlcihmaWxlID0+IGZpbGUuaWQpLm1hcChmaWxlID0+IGZpbGUuaWQpLmpvaW4oJywnKTtcbiAgICB9XG59XG4iXX0=