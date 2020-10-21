/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SocialService } from '../social.service';
import { SocialActivity } from '../model/Activity';
import { CommentPostComponent } from "../comment-post/comment-post.component";
var CommentListComponent = /** @class */ (function () {
    function CommentListComponent(socialService) {
        var _this = this;
        this.socialService = socialService;
        this.allowComment = true;
        this.commentLoad = new EventEmitter();
        this.commentParams = {
            pageSize: 5,
            pageNumber: 0
        };
        this.viewDate = this.socialService.viewDate;
        // Receive comment notify real time
        this._commentChange = this.socialService.commentChange.subscribe((/**
         * @param {?} activityId
         * @return {?}
         */
        function (activityId) {
            if (activityId === _this.activity.uuid) {
                _this.load(true);
            }
        }));
    }
    /**
     * @return {?}
     */
    CommentListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this.load(true);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CommentListComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.load(true);
    };
    /**
     * @return {?}
     */
    CommentListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._commentChange.unsubscribe();
    };
    /**
     * @return {?}
     */
    CommentListComponent.prototype.focusForm = /**
     * @return {?}
     */
    function () {
        if (this.commentPost) {
            this.commentPost.focusMessage();
        }
    };
    /**
     * @param {?} params
     * @return {?}
     */
    CommentListComponent.prototype.commentCreate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        params.activity = this.activity.uuid;
        this.socialService.commentPost(params, this.commentPosted.bind(this));
    };
    /**
     * @param {?=} isInit
     * @return {?}
     */
    CommentListComponent.prototype.load = /**
     * @param {?=} isInit
     * @return {?}
     */
    function (isInit) {
        var _this = this;
        if (isInit) {
            this.commentParams.pageNumber = 0;
        }
        else {
            this.commentParams.pageNumber++;
        }
        this.commentParams.activity = this.activity.uuid;
        if (!this.activity.comments) {
            this.activity.comments = [];
        }
        this.socialService.commentWall(this.commentParams, (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var comments = data && data['items'] || [];
            comments.forEach((/**
             * @param {?} comment
             * @return {?}
             */
            function (comment) { return _this.replaceOrAddComment(comment); }));
            _this.activity.comments.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return b.posted - a.posted;
            }));
            _this.remainComments =
                (data.total - (_this.commentParams.pageNumber + 1) * _this.commentParams.pageSize) || 0;
            _this.commentLoad.emit(data);
        }));
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    CommentListComponent.prototype.commentUpdated = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.replaceOrAddComment(comment);
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    CommentListComponent.prototype.commentDeleted = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.removeComment(comment.uuid);
    };
    /**
     * @private
     * @param {?} comment
     * @param {?} err
     * @return {?}
     */
    CommentListComponent.prototype.commentPosted = /**
     * @private
     * @param {?} comment
     * @param {?} err
     * @return {?}
     */
    function (comment, err) {
        if (comment && comment.uuid && this.commentPost) {
            this.commentPost.resetForm();
            this.replaceOrAddComment(comment, true);
        }
    };
    /**
     * @private
     * @param {?} uuid
     * @return {?}
     */
    CommentListComponent.prototype.getIndexComment = /**
     * @private
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        for (var i = 0; i < this.activity.comments.length; i++) {
            if (this.activity.comments[i].uuid === uuid) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @private
     * @param {?} comment
     * @param {?=} insertAtFirst
     * @return {?}
     */
    CommentListComponent.prototype.replaceOrAddComment = /**
     * @private
     * @param {?} comment
     * @param {?=} insertAtFirst
     * @return {?}
     */
    function (comment, insertAtFirst) {
        /** @type {?} */
        var index = this.getIndexComment(comment.uuid);
        if (index > -1) {
            this.activity.comments[index] = comment;
        }
        else {
            this.activity.comments[insertAtFirst ? 'unshift' : 'push'](comment);
        }
    };
    /**
     * @protected
     * @param {?} uuid
     * @return {?}
     */
    CommentListComponent.prototype.removeComment = /**
     * @protected
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        /** @type {?} */
        var index = this.getIndexComment(uuid);
        if (index > -1) {
            this.activity.comments.splice(index, 1);
        }
    };
    CommentListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialCommentList]',
                    template: "<div *ngIf=\"allowComment\" class=\"social-comment\">\n    <img userAvatar class=\"social-comment__avatar\">\n    <div commentPost (onPost)=\"commentCreate($event)\" class=\"social-comment__content\"></div>\n</div>\n\n<div socialComment\n     *ngFor=\"let comment of activity.comments\"\n     [comment]=\"comment\"\n     (onUpdated)=\"commentUpdated($event)\"\n     (onDeleted)=\"commentDeleted($event)\"\n>\n</div>\n\n<div *ngIf=\"remainComments > 0\" (click)=\"load()\" class=\"social-comment__more\">Xem th\u00EAm..</div>\n",
                    styles: [".social-block{display:block;margin-top:10px}.social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-comment{padding:7px 0;color:#212121;font-size:13px}.social-comment__avatar{width:30px;height:30px;border-radius:50%;margin-right:10px;float:left}.social-comment__content{overflow:hidden;line-height:16px}.social-comment__name{color:#2067b0}.social-comment__action{color:#6c757d;font-size:12px}.social-comment__more{cursor:pointer;color:#2067b0;margin-left:40px;padding-bottom:10px}"]
                }] }
    ];
    /** @nocollapse */
    CommentListComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    CommentListComponent.propDecorators = {
        activity: [{ type: Input }],
        allowComment: [{ type: Input }],
        commentLoad: [{ type: Output }],
        commentPost: [{ type: ViewChild, args: [CommentPostComponent,] }]
    };
    return CommentListComponent;
}());
export { CommentListComponent };
if (false) {
    /** @type {?} */
    CommentListComponent.prototype.activity;
    /** @type {?} */
    CommentListComponent.prototype.allowComment;
    /** @type {?} */
    CommentListComponent.prototype.commentLoad;
    /** @type {?} */
    CommentListComponent.prototype.commentPost;
    /** @type {?} */
    CommentListComponent.prototype.remainComments;
    /** @type {?} */
    CommentListComponent.prototype.viewDate;
    /**
     * @type {?}
     * @private
     */
    CommentListComponent.prototype.commentParams;
    /**
     * @type {?}
     * @private
     */
    CommentListComponent.prototype._commentChange;
    /**
     * @type {?}
     * @protected
     */
    CommentListComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2NvbW1lbnQtbGlzdC9jb21tZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR2pELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRTVFO0lBdUJJLDhCQUNjLGFBQTRCO1FBRDFDLGlCQVlDO1FBWGEsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFqQmpDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQU94QyxrQkFBYSxHQUFRO1lBQ3pCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsVUFBVSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQVFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFFNUMsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsVUFBVTtZQUN2RSxJQUFJLFVBQVUsS0FBSyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDbkMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELHVDQUFROzs7SUFBUjtRQUNJLG1CQUFtQjtJQUN2QixDQUFDOzs7OztJQUVE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aEIsS0FBSzsrQkFDTCxLQUFLOzhCQUVMLE1BQU07OEJBRU4sU0FBUyxTQUFDLG9CQUFvQjs7SUFvSG5DLDJCQUFDO0NBQUEsQUEvSEQsSUErSEM7U0ExSFksb0JBQW9COzs7SUFDN0Isd0NBQWtDOztJQUNsQyw0Q0FBc0M7O0lBRXRDLDJDQUFnRDs7SUFFaEQsMkNBQW1FOztJQUVuRSw4Q0FBdUI7O0lBQ3ZCLHdDQUFpQjs7Ozs7SUFFakIsNkNBR0U7Ozs7O0lBRUYsOENBQXFDOzs7OztJQUdqQyw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tICcuLi9zb2NpYWwuc2VydmljZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tICcuLi9tb2RlbC9BY3Rpdml0eSc7XG5pbXBvcnQge1NvY2lhbENvbW1lbnR9IGZyb20gJy4uL21vZGVsL0NvbW1lbnQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0NvbW1lbnRQb3N0Q29tcG9uZW50fSBmcm9tIFwiLi4vY29tbWVudC1wb3N0L2NvbW1lbnQtcG9zdC5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc29jaWFsQ29tbWVudExpc3RdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tbWVudC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi4vY29tbWVudC9jb21tZW50LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tZW50TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eTtcbiAgICBASW5wdXQoKSBhbGxvd0NvbW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQE91dHB1dCgpIGNvbW1lbnRMb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAVmlld0NoaWxkKENvbW1lbnRQb3N0Q29tcG9uZW50KSBjb21tZW50UG9zdDogQ29tbWVudFBvc3RDb21wb25lbnQ7XG5cbiAgICByZW1haW5Db21tZW50czogbnVtYmVyO1xuICAgIHZpZXdEYXRlOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGNvbW1lbnRQYXJhbXM6IGFueSA9IHtcbiAgICAgICAgcGFnZVNpemU6IDUsXG4gICAgICAgIHBhZ2VOdW1iZXI6IDBcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfY29tbWVudENoYW5nZTogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlXG4gICAgKSB7XG5cbiAgICAgICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuc29jaWFsU2VydmljZS52aWV3RGF0ZTtcblxuICAgICAgICAvLyBSZWNlaXZlIGNvbW1lbnQgbm90aWZ5IHJlYWwgdGltZVxuICAgICAgICB0aGlzLl9jb21tZW50Q2hhbmdlID0gdGhpcy5zb2NpYWxTZXJ2aWNlLmNvbW1lbnRDaGFuZ2Uuc3Vic2NyaWJlKGFjdGl2aXR5SWQgPT4ge1xuICAgICAgICAgICAgaWYgKGFjdGl2aXR5SWQgPT09IHRoaXMuYWN0aXZpdHkudXVpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMubG9hZCh0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMubG9hZCh0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fY29tbWVudENoYW5nZS51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGZvY3VzRm9ybSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29tbWVudFBvc3QpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudFBvc3QuZm9jdXNNZXNzYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21tZW50Q3JlYXRlKHBhcmFtczogYW55KSB7XG4gICAgICAgIHBhcmFtcy5hY3Rpdml0eSA9IHRoaXMuYWN0aXZpdHkudXVpZDtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmNvbW1lbnRQb3N0KHBhcmFtcywgdGhpcy5jb21tZW50UG9zdGVkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGxvYWQoaXNJbml0PzogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNJbml0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRQYXJhbXMucGFnZU51bWJlciA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRQYXJhbXMucGFnZU51bWJlcisrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21tZW50UGFyYW1zLmFjdGl2aXR5ID0gdGhpcy5hY3Rpdml0eS51dWlkO1xuXG4gICAgICAgIGlmICghdGhpcy5hY3Rpdml0eS5jb21tZW50cykge1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eS5jb21tZW50cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmNvbW1lbnRXYWxsKHRoaXMuY29tbWVudFBhcmFtcywgZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb21tZW50cyA9IGRhdGEgJiYgZGF0YVsnaXRlbXMnXSB8fCBbXTtcbiAgICAgICAgICAgIGNvbW1lbnRzLmZvckVhY2goY29tbWVudCA9PiB0aGlzLnJlcGxhY2VPckFkZENvbW1lbnQoY29tbWVudCkpO1xuXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmNvbW1lbnRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5wb3N0ZWQgLSBhLnBvc3RlZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnJlbWFpbkNvbW1lbnRzID1cbiAgICAgICAgICAgICAgICAoZGF0YS50b3RhbCAtICh0aGlzLmNvbW1lbnRQYXJhbXMucGFnZU51bWJlciArIDEpICogdGhpcy5jb21tZW50UGFyYW1zLnBhZ2VTaXplKSB8fCAwO1xuXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRMb2FkLmVtaXQoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbW1lbnRVcGRhdGVkKGNvbW1lbnQ6IFNvY2lhbENvbW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3JBZGRDb21tZW50KGNvbW1lbnQpO1xuICAgIH1cblxuICAgIGNvbW1lbnREZWxldGVkKGNvbW1lbnQ6IFNvY2lhbENvbW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDb21tZW50KGNvbW1lbnQudXVpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21tZW50UG9zdGVkKGNvbW1lbnQ6IFNvY2lhbENvbW1lbnQsIGVycjogYW55KSB7XG4gICAgICAgIGlmIChjb21tZW50ICYmIGNvbW1lbnQudXVpZCAmJiB0aGlzLmNvbW1lbnRQb3N0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRQb3N0LnJlc2V0Rm9ybSgpO1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlT3JBZGRDb21tZW50KGNvbW1lbnQsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJbmRleENvbW1lbnQodXVpZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2aXR5LmNvbW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpdml0eS5jb21tZW50c1tpXS51dWlkID09PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVwbGFjZU9yQWRkQ29tbWVudChjb21tZW50OiBTb2NpYWxDb21tZW50LCBpbnNlcnRBdEZpcnN0PzogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhDb21tZW50KGNvbW1lbnQudXVpZCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmNvbW1lbnRzW2luZGV4XSA9IGNvbW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmNvbW1lbnRzW2luc2VydEF0Rmlyc3QgPyAndW5zaGlmdCcgOiAncHVzaCddKGNvbW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZUNvbW1lbnQodXVpZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleENvbW1lbnQodXVpZCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmNvbW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=