/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SocialService } from '../social.service';
import { SocialActivity } from '../model/Activity';
import { CommentPostComponent } from "../comment-post/comment-post.component";
export class CommentListComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
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
        activityId => {
            if (activityId === this.activity.uuid) {
                this.load(true);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.load(true);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.load(true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._commentChange.unsubscribe();
    }
    /**
     * @return {?}
     */
    focusForm() {
        if (this.commentPost) {
            this.commentPost.focusMessage();
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    commentCreate(params) {
        params.activity = this.activity.uuid;
        this.socialService.commentPost(params, this.commentPosted.bind(this));
    }
    /**
     * @param {?=} isInit
     * @return {?}
     */
    load(isInit) {
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
        data => {
            /** @type {?} */
            const comments = data && data['items'] || [];
            comments.forEach((/**
             * @param {?} comment
             * @return {?}
             */
            comment => this.replaceOrAddComment(comment)));
            this.activity.comments.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return b.posted - a.posted;
            }));
            this.remainComments =
                (data.total - (this.commentParams.pageNumber + 1) * this.commentParams.pageSize) || 0;
            this.commentLoad.emit(data);
        }));
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    commentUpdated(comment) {
        this.replaceOrAddComment(comment);
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    commentDeleted(comment) {
        this.removeComment(comment.uuid);
    }
    /**
     * @private
     * @param {?} comment
     * @param {?} err
     * @return {?}
     */
    commentPosted(comment, err) {
        if (comment && comment.uuid && this.commentPost) {
            this.commentPost.resetForm();
            this.replaceOrAddComment(comment, true);
        }
    }
    /**
     * @private
     * @param {?} uuid
     * @return {?}
     */
    getIndexComment(uuid) {
        for (let i = 0; i < this.activity.comments.length; i++) {
            if (this.activity.comments[i].uuid === uuid) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @private
     * @param {?} comment
     * @param {?=} insertAtFirst
     * @return {?}
     */
    replaceOrAddComment(comment, insertAtFirst) {
        /** @type {?} */
        const index = this.getIndexComment(comment.uuid);
        if (index > -1) {
            this.activity.comments[index] = comment;
        }
        else {
            this.activity.comments[insertAtFirst ? 'unshift' : 'push'](comment);
        }
    }
    /**
     * @protected
     * @param {?} uuid
     * @return {?}
     */
    removeComment(uuid) {
        /** @type {?} */
        const index = this.getIndexComment(uuid);
        if (index > -1) {
            this.activity.comments.splice(index, 1);
        }
    }
}
CommentListComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialCommentList]',
                template: "<div *ngIf=\"allowComment\" class=\"social-comment\">\n    <img userAvatar class=\"social-comment__avatar\">\n    <div commentPost (onPost)=\"commentCreate($event)\" class=\"social-comment__content\"></div>\n</div>\n\n<div socialComment\n     *ngFor=\"let comment of activity.comments\"\n     [comment]=\"comment\"\n     (onUpdated)=\"commentUpdated($event)\"\n     (onDeleted)=\"commentDeleted($event)\"\n>\n</div>\n\n<div *ngIf=\"remainComments > 0\" (click)=\"load()\" class=\"social-comment__more\">Xem th\u00EAm..</div>\n",
                styles: [".social-block{display:block;margin-top:10px}.social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-comment{padding:7px 0;color:#212121;font-size:13px}.social-comment__avatar{width:30px;height:30px;border-radius:50%;margin-right:10px;float:left}.social-comment__content{overflow:hidden;line-height:16px}.social-comment__name{color:#2067b0}.social-comment__action{color:#6c757d;font-size:12px}.social-comment__more{cursor:pointer;color:#2067b0;margin-left:40px;padding-bottom:10px}"]
            }] }
];
/** @nocollapse */
CommentListComponent.ctorParameters = () => [
    { type: SocialService }
];
CommentListComponent.propDecorators = {
    activity: [{ type: Input }],
    allowComment: [{ type: Input }],
    commentLoad: [{ type: Output }],
    commentPost: [{ type: ViewChild, args: [CommentPostComponent,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2NvbW1lbnQtbGlzdC9jb21tZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR2pELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBTzVFLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFrQjdCLFlBQ2MsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFqQmpDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQU94QyxrQkFBYSxHQUFRO1lBQ3pCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsVUFBVSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQVFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFFNUMsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUzs7OztRQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFFLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLG1CQUFtQjtJQUN2QixDQUFDOzs7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SUFDdkIsd0NBQWlCOzs7OztJQUVqQiw2Q0FHRTs7Ozs7SUFFRiw4Q0FBcUM7Ozs7O0lBR2pDLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uL3NvY2lhbC5zZXJ2aWNlJztcbmltcG9ydCB7U29jaWFsQWN0aXZpdHl9IGZyb20gJy4uL21vZGVsL0FjdGl2aXR5JztcbmltcG9ydCB7U29jaWFsQ29tbWVudH0gZnJvbSAnLi4vbW9kZWwvQ29tbWVudCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7Q29tbWVudFBvc3RDb21wb25lbnR9IGZyb20gXCIuLi9jb21tZW50LXBvc3QvY29tbWVudC1wb3N0LmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tzb2NpYWxDb21tZW50TGlzdF0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb21tZW50LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuLi9jb21tZW50L2NvbW1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbW1lbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5O1xuICAgIEBJbnB1dCgpIGFsbG93Q29tbWVudDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAT3V0cHV0KCkgY29tbWVudExvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoQ29tbWVudFBvc3RDb21wb25lbnQpIGNvbW1lbnRQb3N0OiBDb21tZW50UG9zdENvbXBvbmVudDtcblxuICAgIHJlbWFpbkNvbW1lbnRzOiBudW1iZXI7XG4gICAgdmlld0RhdGU6IHN0cmluZztcblxuICAgIHByaXZhdGUgY29tbWVudFBhcmFtczogYW55ID0ge1xuICAgICAgICBwYWdlU2l6ZTogNSxcbiAgICAgICAgcGFnZU51bWJlcjogMFxuICAgIH07XG5cbiAgICBwcml2YXRlIF9jb21tZW50Q2hhbmdlOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2VcbiAgICApIHtcblxuICAgICAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5zb2NpYWxTZXJ2aWNlLnZpZXdEYXRlO1xuXG4gICAgICAgIC8vIFJlY2VpdmUgY29tbWVudCBub3RpZnkgcmVhbCB0aW1lXG4gICAgICAgIHRoaXMuX2NvbW1lbnRDaGFuZ2UgPSB0aGlzLnNvY2lhbFNlcnZpY2UuY29tbWVudENoYW5nZS5zdWJzY3JpYmUoYWN0aXZpdHlJZCA9PiB7XG4gICAgICAgICAgICBpZiAoYWN0aXZpdHlJZCA9PT0gdGhpcy5hY3Rpdml0eS51dWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy5sb2FkKHRydWUpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5sb2FkKHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9jb21tZW50Q2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZm9jdXNGb3JtKCkge1xuICAgICAgICBpZiAodGhpcy5jb21tZW50UG9zdCkge1xuICAgICAgICAgICAgdGhpcy5jb21tZW50UG9zdC5mb2N1c01lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbW1lbnRDcmVhdGUocGFyYW1zOiBhbnkpIHtcbiAgICAgICAgcGFyYW1zLmFjdGl2aXR5ID0gdGhpcy5hY3Rpdml0eS51dWlkO1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuY29tbWVudFBvc3QocGFyYW1zLCB0aGlzLmNvbW1lbnRQb3N0ZWQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbG9hZChpc0luaXQ/OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0luaXQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudFBhcmFtcy5wYWdlTnVtYmVyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudFBhcmFtcy5wYWdlTnVtYmVyKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbW1lbnRQYXJhbXMuYWN0aXZpdHkgPSB0aGlzLmFjdGl2aXR5LnV1aWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2aXR5LmNvbW1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5LmNvbW1lbnRzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuY29tbWVudFdhbGwodGhpcy5jb21tZW50UGFyYW1zLCBkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRzID0gZGF0YSAmJiBkYXRhWydpdGVtcyddIHx8IFtdO1xuICAgICAgICAgICAgY29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHRoaXMucmVwbGFjZU9yQWRkQ29tbWVudChjb21tZW50KSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkuY29tbWVudHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiLnBvc3RlZCAtIGEucG9zdGVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVtYWluQ29tbWVudHMgPVxuICAgICAgICAgICAgICAgIChkYXRhLnRvdGFsIC0gKHRoaXMuY29tbWVudFBhcmFtcy5wYWdlTnVtYmVyICsgMSkgKiB0aGlzLmNvbW1lbnRQYXJhbXMucGFnZVNpemUpIHx8IDA7XG5cbiAgICAgICAgICAgIHRoaXMuY29tbWVudExvYWQuZW1pdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tbWVudFVwZGF0ZWQoY29tbWVudDogU29jaWFsQ29tbWVudCkge1xuICAgICAgICB0aGlzLnJlcGxhY2VPckFkZENvbW1lbnQoY29tbWVudCk7XG4gICAgfVxuXG4gICAgY29tbWVudERlbGV0ZWQoY29tbWVudDogU29jaWFsQ29tbWVudCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbW1lbnQoY29tbWVudC51dWlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbW1lbnRQb3N0ZWQoY29tbWVudDogU29jaWFsQ29tbWVudCwgZXJyOiBhbnkpIHtcbiAgICAgICAgaWYgKGNvbW1lbnQgJiYgY29tbWVudC51dWlkICYmIHRoaXMuY29tbWVudFBvc3QpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudFBvc3QucmVzZXRGb3JtKCk7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VPckFkZENvbW1lbnQoY29tbWVudCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluZGV4Q29tbWVudCh1dWlkOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZpdHkuY29tbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5LmNvbW1lbnRzW2ldLnV1aWQgPT09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXBsYWNlT3JBZGRDb21tZW50KGNvbW1lbnQ6IFNvY2lhbENvbW1lbnQsIGluc2VydEF0Rmlyc3Q/OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleENvbW1lbnQoY29tbWVudC51dWlkKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkuY29tbWVudHNbaW5kZXhdID0gY29tbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkuY29tbWVudHNbaW5zZXJ0QXRGaXJzdCA/ICd1bnNoaWZ0JyA6ICdwdXNoJ10oY29tbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlQ29tbWVudCh1dWlkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4Q29tbWVudCh1dWlkKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkuY29tbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==