/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { SocialComment } from '../model/Comment';
import { AutoSizeDirective } from 'inet-core';
import { SocialService } from "../social.service";
import { ProgressComponent } from "../progress/progress.component";
export class CommentPostComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
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
    ngOnInit() {
        if (this.commentEdit) {
            this.editComment(this.commentEdit);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    enterPost(event) {
        event.preventDefault();
        this.doPost();
    }
    /**
     * @return {?}
     */
    doPost() {
        /** @type {?} */
        const params = this.getData();
        if (!params.message) {
            return this.focusMessage();
        }
        this.onPost.emit(params);
        this.indicator.show();
    }
    /**
     * @return {?}
     */
    doCancel() {
        this.onCancel.emit(this.commentEdit);
        if (this.commentEdit) {
            this.resetForm();
        }
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        let params = {
            message: this.message
        };
        for (let i = 0; i < this.files.length; i++) {
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
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    editComment(comment) {
        this.resetForm();
        this.commentEdit = comment;
        this.files = this.socialService.attachmentToFiles(comment.attachments);
        this.message = comment.message;
        this.focusMessage();
        // Trigger input to adjust size
        this._resizeInput();
    }
    /**
     * @return {?}
     */
    resetForm() {
        // Clear data
        this.message = '';
        this.files.length = 0;
        this.removeFiles.length = 0;
        this._resizeInput();
        if (this.indicator) {
            this.indicator.hide();
        }
    }
    /**
     * @return {?}
     */
    focusMessage() {
        this.messageEl.nativeElement.focus();
    }
    /**
     * @private
     * @return {?}
     */
    _getRemoveFiles() {
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
    /**
     * @private
     * @return {?}
     */
    _resizeInput() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.messageAutoSize.adjust();
        }), 0);
    }
}
CommentPostComponent.decorators = [
    { type: Component, args: [{
                selector: '[commentPost]',
                template: "<div class=\"comment-input\">\n    <textarea class=\"comment-textarea\"\n              rows=\"1\"\n              [placeholder]=\"placeholder\"\n              #messageEl\n              appAutoSize\n              (keydown.esc)=\"doCancel()\"\n              (keydown.enter)=\"enterPost($event)\"\n              [(ngModel)]=\"message\"></textarea>\n    <i class=\"comment-file__icon fa fa-image\">\n        <input #fileEl type=\"file\" multiple class=\"file-post\">\n    </i>\n</div>\n\n<file-list class=\"social-block\" [files]=\"files\" [fileEl]=\"fileEl\" (onRemove)=\"removeFiles.push($event)\"></file-list>\n\n<div *ngIf=\"commentEdit\">\n    <button class=\"btn btn-primary btn-sm mr-1\" (click)=\"doPost()\">C\u1EACP NH\u1EACT</button>\n    <button class=\"btn btn-light btn-sm active\" (click)=\"doCancel()\">HU\u1EF6</button>\n</div>\n\n<progress-indicator></progress-indicator>\n",
                styles: [".social-block{display:block;margin-top:10px}:host{position:relative}.comment-input{position:relative;background:#e3e5e5;border-radius:4px;padding:7px 10px 3px;margin-bottom:10px}.comment-textarea{border:0;padding:0 40px 0 0;line-height:16px;margin:0;outline:0!important;width:100%;background:0 0}.comment-file__icon{position:absolute;right:0;top:0;width:30px;height:30px;line-height:30px;text-align:center;cursor:pointer}.file-post{position:absolute;-webkit-appearance:none;-moz-appearance:none;appearance:none;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0;z-index:100}"]
            }] }
];
/** @nocollapse */
CommentPostComponent.ctorParameters = () => [
    { type: SocialService }
];
CommentPostComponent.propDecorators = {
    placeholder: [{ type: Input }],
    commentEdit: [{ type: Input }],
    onCancel: [{ type: Output }],
    onPost: [{ type: Output }],
    messageEl: [{ type: ViewChild, args: ['messageEl',] }],
    messageAutoSize: [{ type: ViewChild, args: [AutoSizeDirective,] }],
    indicator: [{ type: ViewChild, args: [ProgressComponent,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1wb3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2NvbW1lbnQtcG9zdC9jb21tZW50LXBvc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUU1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFPakUsTUFBTSxPQUFPLG9CQUFvQjs7OztJQWU3QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWR2QyxnQkFBVyxHQUFXLHNCQUFzQixDQUFDO1FBRzVDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ25DLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBTTNDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO0lBRW1CLENBQUM7Ozs7SUFFckQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7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QUU7WUFDWixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7OztZQWhISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLGk0QkFBNEM7O2FBRS9DOzs7O1lBUE8sYUFBYTs7OzBCQVNoQixLQUFLOzBCQUNMLEtBQUs7dUJBRUwsTUFBTTtxQkFDTixNQUFNO3dCQUVOLFNBQVMsU0FBQyxXQUFXOzhCQUNyQixTQUFTLFNBQUMsaUJBQWlCO3dCQUMzQixTQUFTLFNBQUMsaUJBQWlCOzs7O0lBUjVCLDJDQUFzRDs7SUFDdEQsMkNBQW9DOztJQUVwQyx3Q0FBNkM7O0lBQzdDLHNDQUEyQzs7SUFFM0MseUNBQThDOztJQUM5QywrQ0FBaUU7O0lBQ2pFLHlDQUEyRDs7SUFFM0QsdUNBQXFCOztJQUNyQixxQ0FBMkI7O0lBQzNCLDJDQUFpQzs7Ozs7SUFFckIsNkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxDb21tZW50fSBmcm9tICcuLi9tb2RlbC9Db21tZW50JztcbmltcG9ydCB7QXV0b1NpemVEaXJlY3RpdmV9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge0ZpbGVMaXN0SXRlbX0gZnJvbSAnaW5ldC11aSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gXCIuLi9zb2NpYWwuc2VydmljZVwiO1xuaW1wb3J0IHtQcm9ncmVzc0NvbXBvbmVudH0gZnJvbSBcIi4uL3Byb2dyZXNzL3Byb2dyZXNzLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tjb21tZW50UG9zdF0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb21tZW50LXBvc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbW1lbnQtcG9zdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29tbWVudFBvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnTuG7mWkgZHVuZyB0aOG6o28gbHXhuq1uLi4nO1xuICAgIEBJbnB1dCgpIGNvbW1lbnRFZGl0OiBTb2NpYWxDb21tZW50O1xuXG4gICAgQE91dHB1dCgpIG9uQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uUG9zdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbWVzc2FnZUVsJykgbWVzc2FnZUVsOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoQXV0b1NpemVEaXJlY3RpdmUpIG1lc3NhZ2VBdXRvU2l6ZTogQXV0b1NpemVEaXJlY3RpdmU7XG4gICAgQFZpZXdDaGlsZChQcm9ncmVzc0NvbXBvbmVudCkgaW5kaWNhdG9yOiBQcm9ncmVzc0NvbXBvbmVudDtcblxuICAgIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICAgIGZpbGVzOiBGaWxlTGlzdEl0ZW1bXSA9IFtdO1xuICAgIHJlbW92ZUZpbGVzOiBGaWxlTGlzdEl0ZW1bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5jb21tZW50RWRpdCkge1xuICAgICAgICAgICAgdGhpcy5lZGl0Q29tbWVudCh0aGlzLmNvbW1lbnRFZGl0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVudGVyUG9zdChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmRvUG9zdCgpO1xuICAgIH1cblxuICAgIGRvUG9zdCgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5nZXREYXRhKCk7XG4gICAgICAgIGlmICghcGFyYW1zLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvY3VzTWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Qb3N0LmVtaXQocGFyYW1zKTtcbiAgICAgICAgdGhpcy5pbmRpY2F0b3Iuc2hvdygpO1xuICAgIH1cblxuICAgIGRvQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm9uQ2FuY2VsLmVtaXQodGhpcy5jb21tZW50RWRpdCk7XG4gICAgICAgIGlmICh0aGlzLmNvbW1lbnRFZGl0KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsZXNbaV0uaWQpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNbJ2ZpbGUtJyArIGldID0gdGhpcy5maWxlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbW1lbnRFZGl0KSB7XG4gICAgICAgICAgICBwYXJhbXMuYWN0aXZpdHkgPSB0aGlzLmNvbW1lbnRFZGl0LmFjdGl2aXR5SUQ7XG4gICAgICAgICAgICBwYXJhbXMuY29tbWVudCA9IHRoaXMuY29tbWVudEVkaXQudXVpZDtcbiAgICAgICAgICAgIHBhcmFtcy5ncmlkZnNVVUlEID0gdGhpcy5fZ2V0UmVtb3ZlRmlsZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgZWRpdENvbW1lbnQoY29tbWVudDogU29jaWFsQ29tbWVudCkge1xuXG4gICAgICAgIHRoaXMucmVzZXRGb3JtKCk7XG5cbiAgICAgICAgdGhpcy5jb21tZW50RWRpdCA9IGNvbW1lbnQ7XG5cbiAgICAgICAgdGhpcy5maWxlcyA9IHRoaXMuc29jaWFsU2VydmljZS5hdHRhY2htZW50VG9GaWxlcyhjb21tZW50LmF0dGFjaG1lbnRzKTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBjb21tZW50Lm1lc3NhZ2U7XG5cbiAgICAgICAgdGhpcy5mb2N1c01lc3NhZ2UoKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGlucHV0IHRvIGFkanVzdCBzaXplXG4gICAgICAgIHRoaXMuX3Jlc2l6ZUlucHV0KCk7XG5cbiAgICB9XG5cbiAgICByZXNldEZvcm0oKSB7XG4gICAgICAgIC8vIENsZWFyIGRhdGFcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG5cbiAgICAgICAgdGhpcy5maWxlcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJlbW92ZUZpbGVzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgdGhpcy5fcmVzaXplSW5wdXQoKTtcblxuICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzTWVzc2FnZSgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJlbW92ZUZpbGVzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUZpbGVzLmZpbHRlcihmaWxlID0+IGZpbGUuaWQpLm1hcChmaWxlID0+IGZpbGUuaWQpLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemVJbnB1dCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VBdXRvU2l6ZS5hZGp1c3QoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxufVxuIl19