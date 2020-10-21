/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocialComment } from '../model/Comment';
import { SocialService } from '../social.service';
var CommentComponent = /** @class */ (function () {
    function CommentComponent(socialService) {
        this.socialService = socialService;
        this.editable = true;
        this.onUpdated = new EventEmitter();
        this.onDeleted = new EventEmitter();
        this.viewDate = this.socialService.viewDate;
    }
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentCancelEdit = /**
     * @return {?}
     */
    function () {
        this.editing = false;
    };
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentEdit = /**
     * @return {?}
     */
    function () {
        this.editing = true;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    CommentComponent.prototype.commentUpdate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var _this = this;
        this.socialService.commentUpdate(params, (/**
         * @param {?} comment
         * @return {?}
         */
        function (comment) {
            if (comment && comment.uuid) {
                _this.commentCancelEdit();
                _this.onUpdated.emit(comment);
            }
        }));
    };
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentDelete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.commentRemove({
            comment: this.comment.uuid,
            activity: this.comment.activityID
        }, (/**
         * @param {?} comment
         * @return {?}
         */
        function (comment) {
            if (comment && comment.uuid) {
                _this.onDeleted.emit(comment);
            }
        }));
    };
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentLike = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            activity: this.comment.activityID,
            comment: this.comment.uuid,
        };
        this.comment.likeStatus = !this.comment.likeStatus;
        if (this.comment.likeStatus) {
            this.comment.likeCount++;
            this.socialService.commentLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { }));
        }
        else {
            this.comment.likeCount--;
            this.socialService.commentUnLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { }));
        }
    };
    CommentComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialComment]',
                    template: "<div class=\"social-comment\">\n\n    <img userAvatar [usercode]=\"comment.creator\" class=\"social-comment__avatar\">\n\n    <div *ngIf=\"!editing; else commentPost;\">\n        <div actionMore dropdown\n             *ngIf=\"comment._editable\"\n             [data]=\"comment\"\n             (onEdit)=\"commentEdit()\"\n             (onDelete)=\"commentDelete()\" class=\"social-action-more\"></div>\n        <div class=\"social-comment__content\">\n            <b class=\"social-comment__name\">{{ comment.fullname }} </b>\n            <span [innerHTML]=\"comment._displayMessage\"></span>\n            <div *ngIf=\"comment.attachments.length\" attachmentList [attachments]=\"comment.attachments\" class=\"social-block\"></div>\n\n            <div class=\"social-comment__action\">\n            <span [title]=\"comment.posted | date:viewDate\">\n                {{comment.posted | dateShortcut}}\n            </span>\n                <button class=\"social-flat-btn\" (click)=\"commentLike()\" [ngClass]=\"{'active': comment.likeStatus}\">\n                    <i class=\"fa fa-thumbs-up\"></i>\n                    <span *ngIf=\"comment.likeCount\">{{comment.likeCount}}</span>\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #commentPost>\n        <div commentPost\n             [commentEdit]=\"comment\"\n             (onPost)=\"commentUpdate($event)\"\n             (onCancel)=\"commentCancelEdit()\" class=\"social-comment__content\"></div>\n    </ng-template>\n\n</div>\n",
                    styles: [".social-block{display:block;margin-top:10px}.social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-comment{padding:7px 0;color:#212121;font-size:13px}.social-comment__avatar{width:30px;height:30px;border-radius:50%;margin-right:10px;float:left}.social-comment__content{overflow:hidden;line-height:16px}.social-comment__name{color:#2067b0}.social-comment__action{color:#6c757d;font-size:12px}.social-comment__more{cursor:pointer;color:#2067b0;margin-left:40px;padding-bottom:10px}"]
                }] }
    ];
    /** @nocollapse */
    CommentComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    CommentComponent.propDecorators = {
        comment: [{ type: Input }],
        editable: [{ type: Input }],
        onUpdated: [{ type: Output }],
        onDeleted: [{ type: Output }]
    };
    return CommentComponent;
}());
export { CommentComponent };
if (false) {
    /** @type {?} */
    CommentComponent.prototype.comment;
    /** @type {?} */
    CommentComponent.prototype.editable;
    /** @type {?} */
    CommentComponent.prototype.onUpdated;
    /** @type {?} */
    CommentComponent.prototype.onDeleted;
    /** @type {?} */
    CommentComponent.prototype.viewDate;
    /** @type {?} */
    CommentComponent.prototype.editing;
    /**
     * @type {?}
     * @private
     */
    CommentComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9jb21tZW50L2NvbW1lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQ7SUFlSSwwQkFDWSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVQvQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXhCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFRcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNoRCxDQUFDOzs7O0lBRUQsNENBQWlCOzs7SUFBakI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCx3Q0FBYTs7OztJQUFiLFVBQWMsTUFBTTtRQUFwQixpQkFPQztRQU5HLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU07Ozs7UUFBRSxVQUFDLE9BQXNCO1lBQzVELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3pCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELHdDQUFhOzs7SUFBYjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7WUFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1NBQ3BDOzs7O1FBQUUsVUFBQyxPQUFzQjtZQUN0QixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUN6QixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELHNDQUFXOzs7SUFBWDs7WUFDVSxNQUFNLEdBQUc7WUFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQ2pDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7U0FDN0I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ25ELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNOzs7O1lBQUUsVUFBQSxJQUFJLElBQUssQ0FBQyxFQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTTs7OztZQUFFLFVBQUEsSUFBSSxJQUFLLENBQUMsRUFBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQzs7Z0JBOURKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixrZ0RBQXVDOztpQkFFMUM7Ozs7Z0JBTk8sYUFBYTs7OzBCQVFoQixLQUFLOzJCQUNMLEtBQUs7NEJBRUwsTUFBTTs0QkFDTixNQUFNOztJQXFEWCx1QkFBQztDQUFBLEFBL0RELElBK0RDO1NBMURZLGdCQUFnQjs7O0lBQ3pCLG1DQUFnQzs7SUFDaEMsb0NBQWtDOztJQUVsQyxxQ0FBd0Q7O0lBQ3hELHFDQUF3RDs7SUFFeEQsb0NBQWlCOztJQUNqQixtQ0FBaUI7Ozs7O0lBR2IseUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbENvbW1lbnR9IGZyb20gJy4uL21vZGVsL0NvbW1lbnQnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tICcuLi9zb2NpYWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3NvY2lhbENvbW1lbnRdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tbWVudC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29tbWVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29tbWVudENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgY29tbWVudDogU29jaWFsQ29tbWVudDtcbiAgICBASW5wdXQoKSBlZGl0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAT3V0cHV0KCkgb25VcGRhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTb2NpYWxDb21tZW50PigpO1xuICAgIEBPdXRwdXQoKSBvbkRlbGV0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNvY2lhbENvbW1lbnQ+KCk7XG5cbiAgICB2aWV3RGF0ZTogc3RyaW5nO1xuICAgIGVkaXRpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMudmlld0RhdGUgPSB0aGlzLnNvY2lhbFNlcnZpY2Uudmlld0RhdGU7XG4gICAgfVxuXG4gICAgY29tbWVudENhbmNlbEVkaXQoKSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbW1lbnRFZGl0KCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbW1lbnRVcGRhdGUocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5jb21tZW50VXBkYXRlKHBhcmFtcywgKGNvbW1lbnQ6IFNvY2lhbENvbW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb21tZW50ICYmIGNvbW1lbnQudXVpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudENhbmNlbEVkaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVXBkYXRlZC5lbWl0KGNvbW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21tZW50RGVsZXRlKCkge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuY29tbWVudFJlbW92ZSh7XG4gICAgICAgICAgICBjb21tZW50OiB0aGlzLmNvbW1lbnQudXVpZCxcbiAgICAgICAgICAgIGFjdGl2aXR5OiB0aGlzLmNvbW1lbnQuYWN0aXZpdHlJRFxuICAgICAgICB9LCAoY29tbWVudDogU29jaWFsQ29tbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbW1lbnQgJiYgY29tbWVudC51dWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZWQuZW1pdChjb21tZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tbWVudExpa2UoKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIGFjdGl2aXR5OiB0aGlzLmNvbW1lbnQuYWN0aXZpdHlJRCxcbiAgICAgICAgICAgIGNvbW1lbnQ6IHRoaXMuY29tbWVudC51dWlkLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbW1lbnQubGlrZVN0YXR1cyA9ICF0aGlzLmNvbW1lbnQubGlrZVN0YXR1cztcbiAgICAgICAgaWYgKHRoaXMuY29tbWVudC5saWtlU3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQubGlrZUNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuY29tbWVudExpa2UocGFyYW1zLCBkYXRhID0+IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudC5saWtlQ291bnQtLTtcbiAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5jb21tZW50VW5MaWtlKHBhcmFtcywgZGF0YSA9PiB7fSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=