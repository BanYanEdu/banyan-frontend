/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { SocialComment } from '../model/Comment';
import { AutoSizeDirective } from 'inet-core';
import { SocialService } from "../social.service";
import { ProgressComponent } from "../progress/progress.component";
var CommentPostComponent = /** @class */ (function () {
    function CommentPostComponent(socialService) {
        this.socialService = socialService;
        this.placeholder = 'Nội dung thảo luận..';
        this.onCancel = new EventEmitter();
        this.onPost = new EventEmitter();
        this.message = '';
        this.files = [];
        this.removeFiles = [];
    }
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.commentEdit) {
            this.editComment(this.commentEdit);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CommentPostComponent.prototype.enterPost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.doPost();
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.doPost = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = this.getData();
        if (!params.message) {
            return this.focusMessage();
        }
        this.onPost.emit(params);
        this.indicator.show();
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.doCancel = /**
     * @return {?}
     */
    function () {
        this.onCancel.emit(this.commentEdit);
        if (this.commentEdit) {
            this.resetForm();
        }
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            message: this.message
        };
        for (var i = 0; i < this.files.length; i++) {
            if (!this.files[i].id) {
                params['file-' + i] = this.files[i];
            }
        }
        if (this.commentEdit) {
            params.activity = this.commentEdit.activityID;
            params.comment = this.commentEdit.uuid;
            params.gridfsUUID = this._getRemoveFiles();
        }
        return params;
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    CommentPostComponent.prototype.editComment = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.resetForm();
        this.commentEdit = comment;
        this.files = this.socialService.attachmentToFiles(comment.attachments);
        this.message = comment.message;
        this.focusMessage();
        // Trigger input to adjust size
        this._resizeInput();
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.resetForm = /**
     * @return {?}
     */
    function () {
        // Clear data
        this.message = '';
        this.files.length = 0;
        this.removeFiles.length = 0;
        this._resizeInput();
        if (this.indicator) {
            this.indicator.hide();
        }
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.focusMessage = /**
     * @return {?}
     */
    function () {
        this.messageEl.nativeElement.focus();
    };
    /**
     * @private
     * @return {?}
     */
    CommentPostComponent.prototype._getRemoveFiles = /**
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
    /**
     * @private
     * @return {?}
     */
    CommentPostComponent.prototype._resizeInput = /**
     * @private
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
    CommentPostComponent.decorators = [
        { type: Component, args: [{
                    selector: '[commentPost]',
                    template: "<div class=\"comment-input\">\n    <textarea class=\"comment-textarea\"\n              rows=\"1\"\n              [placeholder]=\"placeholder\"\n              #messageEl\n              appAutoSize\n              (keydown.esc)=\"doCancel()\"\n              (keydown.enter)=\"enterPost($event)\"\n              [(ngModel)]=\"message\"></textarea>\n    <i class=\"comment-file__icon fa fa-image\">\n        <input #fileEl type=\"file\" multiple class=\"file-post\">\n    </i>\n</div>\n\n<file-list class=\"social-block\" [files]=\"files\" [fileEl]=\"fileEl\" (onRemove)=\"removeFiles.push($event)\"></file-list>\n\n<div *ngIf=\"commentEdit\">\n    <button class=\"btn btn-primary btn-sm mr-1\" (click)=\"doPost()\">C\u1EACP NH\u1EACT</button>\n    <button class=\"btn btn-light btn-sm active\" (click)=\"doCancel()\">HU\u1EF6</button>\n</div>\n\n<progress-indicator></progress-indicator>\n",
                    styles: [".social-block{display:block;margin-top:10px}:host{position:relative}.comment-input{position:relative;background:#e3e5e5;border-radius:4px;padding:7px 10px 3px;margin-bottom:10px}.comment-textarea{border:0;padding:0 40px 0 0;line-height:16px;margin:0;outline:0!important;width:100%;background:0 0}.comment-file__icon{position:absolute;right:0;top:0;width:30px;height:30px;line-height:30px;text-align:center;cursor:pointer}.file-post{position:absolute;-webkit-appearance:none;-moz-appearance:none;appearance:none;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0;z-index:100}"]
                }] }
    ];
    /** @nocollapse */
    CommentPostComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    CommentPostComponent.propDecorators = {
        placeholder: [{ type: Input }],
        commentEdit: [{ type: Input }],
        onCancel: [{ type: Output }],
        onPost: [{ type: Output }],
        messageEl: [{ type: ViewChild, args: ['messageEl',] }],
        messageAutoSize: [{ type: ViewChild, args: [AutoSizeDirective,] }],
        indicator: [{ type: ViewChild, args: [ProgressComponent,] }]
    };
    return CommentPostComponent;
}());
export { CommentPostComponent };
if (false) {
    /** @type {?} */
    CommentPostComponent.prototype.placeholder;
    /** @type {?} */
    CommentPostComponent.prototype.commentEdit;
    /** @type {?} */
    CommentPostComponent.prototype.onCancel;
    /** @type {?} */
    CommentPostComponent.prototype.onPost;
    /** @type {?} */
    CommentPostComponent.prototype.messageEl;
    /** @type {?} */
    CommentPostComponent.prototype.messageAutoSize;
    /** @type {?} */
    CommentPostComponent.prototype.indicator;
    /** @type {?} */
    CommentPostComponent.prototype.message;
    /** @type {?} */
    CommentPostComponent.prototype.files;
    /** @type {?} */
    CommentPostComponent.prototype.removeFiles;
    /**
     * @type {?}
     * @private
     */
    CommentPostComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1wb3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2NvbW1lbnQtcG9zdC9jb21tZW50LXBvc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUU1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFakU7SUFvQkksOEJBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBZHZDLGdCQUFXLEdBQVcsc0JBQXNCLENBQUM7UUFHNUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFNM0MsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQUMzQixnQkFBVyxHQUFtQixFQUFFLENBQUM7SUFFbUIsQ0FBQzs7OztJQUVyRCx1Q0FBUTs7O0lBQVI7UUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDOzs7OztJQUVELHdDQUFTOzs7O0lBQVQsVUFBVSxLQUFLO1FBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQscUNBQU07OztJQUFOOztZQUNVLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsdUNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDOzs7O0lBRUQsc0NBQU87OztJQUFQOztZQUNRLE1BQU0sR0FBUTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN4QjtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QztTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDOUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN2QyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUM5QztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lBRUQsMENBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBRTlCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUUvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUV4QixDQUFDOzs7O0lBRUQsd0NBQVM7OztJQUFUO1FBQ0ksYUFBYTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQzs7OztJQUVELDJDQUFZOzs7SUFBWjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRU8sOENBQWU7Ozs7SUFBdkI7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEVBQUUsRUFBUCxDQUFPLEVBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsRUFBRSxFQUFQLENBQU8sRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7OztJQUVPLDJDQUFZOzs7O0lBQXBCO1FBQUEsaUJBSUM7UUFIRyxVQUFVOzs7UUFBQztZQUNQLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7Z0JBaEhKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsaTRCQUE0Qzs7aUJBRS9DOzs7O2dCQVBPLGFBQWE7Ozs4QkFTaEIsS0FBSzs4QkFDTCxLQUFLOzJCQUVMLE1BQU07eUJBQ04sTUFBTTs0QkFFTixTQUFTLFNBQUMsV0FBVztrQ0FDckIsU0FBUyxTQUFDLGlCQUFpQjs0QkFDM0IsU0FBUyxTQUFDLGlCQUFpQjs7SUFtR2hDLDJCQUFDO0NBQUEsQUFqSEQsSUFpSEM7U0E1R1ksb0JBQW9COzs7SUFDN0IsMkNBQXNEOztJQUN0RCwyQ0FBb0M7O0lBRXBDLHdDQUE2Qzs7SUFDN0Msc0NBQTJDOztJQUUzQyx5Q0FBOEM7O0lBQzlDLCtDQUFpRTs7SUFDakUseUNBQTJEOztJQUUzRCx1Q0FBcUI7O0lBQ3JCLHFDQUEyQjs7SUFDM0IsMkNBQWlDOzs7OztJQUVyQiw2Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbENvbW1lbnR9IGZyb20gJy4uL21vZGVsL0NvbW1lbnQnO1xuaW1wb3J0IHtBdXRvU2l6ZURpcmVjdGl2ZX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7RmlsZUxpc3RJdGVtfSBmcm9tICdpbmV0LXVpJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSBcIi4uL3NvY2lhbC5zZXJ2aWNlXCI7XG5pbXBvcnQge1Byb2dyZXNzQ29tcG9uZW50fSBmcm9tIFwiLi4vcHJvZ3Jlc3MvcHJvZ3Jlc3MuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW2NvbW1lbnRQb3N0XScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbW1lbnQtcG9zdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29tbWVudC1wb3N0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tZW50UG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdO4buZaSBkdW5nIHRo4bqjbyBsdeG6rW4uLic7XG4gICAgQElucHV0KCkgY29tbWVudEVkaXQ6IFNvY2lhbENvbW1lbnQ7XG5cbiAgICBAT3V0cHV0KCkgb25DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgb25Qb3N0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdtZXNzYWdlRWwnKSBtZXNzYWdlRWw6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChBdXRvU2l6ZURpcmVjdGl2ZSkgbWVzc2FnZUF1dG9TaXplOiBBdXRvU2l6ZURpcmVjdGl2ZTtcbiAgICBAVmlld0NoaWxkKFByb2dyZXNzQ29tcG9uZW50KSBpbmRpY2F0b3I6IFByb2dyZXNzQ29tcG9uZW50O1xuXG4gICAgbWVzc2FnZTogc3RyaW5nID0gJyc7XG4gICAgZmlsZXM6IEZpbGVMaXN0SXRlbVtdID0gW107XG4gICAgcmVtb3ZlRmlsZXM6IEZpbGVMaXN0SXRlbVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbW1lbnRFZGl0KSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRDb21tZW50KHRoaXMuY29tbWVudEVkaXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW50ZXJQb3N0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZG9Qb3N0KCk7XG4gICAgfVxuXG4gICAgZG9Qb3N0KCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgaWYgKCFwYXJhbXMubWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNNZXNzYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblBvc3QuZW1pdChwYXJhbXMpO1xuICAgICAgICB0aGlzLmluZGljYXRvci5zaG93KCk7XG4gICAgfVxuXG4gICAgZG9DYW5jZWwoKSB7XG4gICAgICAgIHRoaXMub25DYW5jZWwuZW1pdCh0aGlzLmNvbW1lbnRFZGl0KTtcbiAgICAgICAgaWYgKHRoaXMuY29tbWVudEVkaXQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGb3JtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREYXRhKCkge1xuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2VcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5maWxlc1tpXS5pZCkge1xuICAgICAgICAgICAgICAgIHBhcmFtc1snZmlsZS0nICsgaV0gPSB0aGlzLmZpbGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29tbWVudEVkaXQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hY3Rpdml0eSA9IHRoaXMuY29tbWVudEVkaXQuYWN0aXZpdHlJRDtcbiAgICAgICAgICAgIHBhcmFtcy5jb21tZW50ID0gdGhpcy5jb21tZW50RWRpdC51dWlkO1xuICAgICAgICAgICAgcGFyYW1zLmdyaWRmc1VVSUQgPSB0aGlzLl9nZXRSZW1vdmVGaWxlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBlZGl0Q29tbWVudChjb21tZW50OiBTb2NpYWxDb21tZW50KSB7XG5cbiAgICAgICAgdGhpcy5yZXNldEZvcm0oKTtcblxuICAgICAgICB0aGlzLmNvbW1lbnRFZGl0ID0gY29tbWVudDtcblxuICAgICAgICB0aGlzLmZpbGVzID0gdGhpcy5zb2NpYWxTZXJ2aWNlLmF0dGFjaG1lbnRUb0ZpbGVzKGNvbW1lbnQuYXR0YWNobWVudHMpO1xuXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGNvbW1lbnQubWVzc2FnZTtcblxuICAgICAgICB0aGlzLmZvY3VzTWVzc2FnZSgpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgaW5wdXQgdG8gYWRqdXN0IHNpemVcbiAgICAgICAgdGhpcy5fcmVzaXplSW5wdXQoKTtcblxuICAgIH1cblxuICAgIHJlc2V0Rm9ybSgpIHtcbiAgICAgICAgLy8gQ2xlYXIgZGF0YVxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcblxuICAgICAgICB0aGlzLmZpbGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucmVtb3ZlRmlsZXMubGVuZ3RoID0gMDtcblxuICAgICAgICB0aGlzLl9yZXNpemVJbnB1dCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmluZGljYXRvcikge1xuICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3IuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UmVtb3ZlRmlsZXMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlRmlsZXMuZmlsdGVyKGZpbGUgPT4gZmlsZS5pZCkubWFwKGZpbGUgPT4gZmlsZS5pZCkuam9pbignLCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2l6ZUlucHV0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUF1dG9TaXplLmFkanVzdCgpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG59XG4iXX0=