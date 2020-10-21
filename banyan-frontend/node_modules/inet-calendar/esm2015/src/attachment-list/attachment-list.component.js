/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { xCalendar } from "../utils/xCalendar";
import { CalendarService } from "../calendar.service";
import { BsModalService } from "ngx-bootstrap";
import { FileListComponent } from "../remote-module/filelist/list/file-list.component";
export class AttachmentListComponent {
    /**
     * @param {?} calendarService
     * @param {?} modalService
     */
    constructor(calendarService, modalService) {
        this.calendarService = calendarService;
        this.modalService = modalService;
        this.files = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.calEvent) {
            this._attachmentToFiles();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.modalRef) {
            this.modalRef.hide();
        }
    }
    /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    viewAttachment(file, event) {
        window.open(xCalendar.getFileViewUrl(file.data, null, event));
    }
    /**
     * @param {?} file
     * @param {?} template
     * @return {?}
     */
    removeAttachment(file, template) {
        if (file.id) {
            this._file = file;
            this.confirmMessage = 'Tệp tin <b>"' + file.name + '"</b> sẽ bị xoá?';
            this.modalRef = this.modalService.show(template);
        }
        else {
            this.fileList.removeFile(file);
        }
    }
    /**
     * @return {?}
     */
    removeFile() {
        if (!this._file) {
            return;
        }
        this.modalRef.hide();
        this.calendarService.deleteAttachment({ fileID: this._file.id, element: this.calEvent.uuid }, (/**
         * @return {?}
         */
        () => { }));
        this.fileList.removeFile(this._file);
        this._file = null;
    }
    /**
     * @private
     * @return {?}
     */
    _attachmentToFiles() {
        if (this.calEvent && this.calEvent.attachments) {
            this.files = this.calEvent.attachments.map((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                return {
                    name: item.file,
                    type: item.mimetype,
                    size: item.size,
                    id: item.gridfsUUID,
                    data: item
                };
            }));
        }
        else {
            this.files = [];
        }
    }
}
AttachmentListComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-attachment-list',
                template: "<file-list [template]=\"fileItem\" [files]=\"files\" [fileEl]=\"fileEl\" [removable]=\"removable\"></file-list>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\">\n        <img [src]=\"file.name | fileIcon\" class=\"file-item__image\">\n        <div class=\"file-item__name text-primary\" (click)=\"viewAttachment(file, $event)\">{{file.name}}</div>\n        <i *ngIf=\"removable\" (click)=\"removeAttachment(file, template)\"\n           class=\"fa fa-trash file-item__remove text-danger\"></i>\n    </div>\n</ng-template>\n<ng-template #template>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Th\u00F4ng b\u00E1o</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\" [innerHTML]=\"confirmMessage\"></div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"removeFile()\">X\u00F3a</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalRef.hide()\">\u0110\u00F3ng</button>\n    </div>\n</ng-template>",
                styles: [".file-item{height:24px;line-height:24px;overflow:hidden;font-size:13px;cursor:pointer;margin-bottom:5px}.file-item__image{float:left;width:24px;height:24px;margin-right:10px}.file-item__name{float:left;max-width:80%;white-space:nowrap;overflow:hidden}.file-item__remove{width:24px;height:24px;line-height:24px;text-align:center}"]
            }] }
];
/** @nocollapse */
AttachmentListComponent.ctorParameters = () => [
    { type: CalendarService },
    { type: BsModalService }
];
AttachmentListComponent.propDecorators = {
    calEvent: [{ type: Input }],
    fileEl: [{ type: Input }],
    removable: [{ type: Input }],
    fileList: [{ type: ViewChild, args: [FileListComponent,] }]
};
if (false) {
    /** @type {?} */
    AttachmentListComponent.prototype.calEvent;
    /** @type {?} */
    AttachmentListComponent.prototype.fileEl;
    /** @type {?} */
    AttachmentListComponent.prototype.removable;
    /** @type {?} */
    AttachmentListComponent.prototype.fileList;
    /** @type {?} */
    AttachmentListComponent.prototype.files;
    /** @type {?} */
    AttachmentListComponent.prototype.modalRef;
    /** @type {?} */
    AttachmentListComponent.prototype.confirmMessage;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype._file;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype.calendarService;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype.modalService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvYXR0YWNobWVudC1saXN0L2F0dGFjaG1lbnQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvRCxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQWEsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBT3JGLE1BQU0sT0FBTyx1QkFBdUI7Ozs7O0lBU2hDLFlBQW9CLGVBQWdDLEVBQ2hDLFlBQTRCO1FBRDVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFMaEQsVUFBSyxHQUFVLEVBQUUsQ0FBQztJQU9sQixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDOzs7Ozs7SUFFRCxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQWU7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQTBCO1FBQzdDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7WUFDdEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQzs7O1FBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU8sa0JBQWtCO1FBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLElBQW1CLEVBQUUsRUFBRTtnQkFDL0QsT0FBTztvQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRO29CQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUNuQixJQUFJLEVBQUUsSUFBSTtpQkFDYixDQUFDO1lBQ04sQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDOzs7WUFyRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLGt1Q0FBK0M7O2FBRWxEOzs7O1lBUk8sZUFBZTtZQUNILGNBQWM7Ozt1QkFTN0IsS0FBSztxQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsU0FBUyxTQUFDLGlCQUFpQjs7OztJQUg1QiwyQ0FBNEI7O0lBQzVCLHlDQUFrQzs7SUFDbEMsNENBQTRCOztJQUM1QiwyQ0FBMEQ7O0lBQzFELHdDQUFrQjs7SUFDbEIsMkNBQXFCOztJQUNyQixpREFBdUI7Ozs7O0lBQ3ZCLHdDQUFjOzs7OztJQUNGLGtEQUF3Qzs7Ozs7SUFDeEMsK0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3hDYWxlbmRhcn0gZnJvbSBcIi4uL3V0aWxzL3hDYWxlbmRhclwiO1xuaW1wb3J0IHtDYWxFdmVudH0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEV2ZW50XCI7XG5pbXBvcnQge0NhbEF0dGFjaG1lbnR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxBdHRhY2htZW50XCI7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSBcIi4uL2NhbGVuZGFyLnNlcnZpY2VcIjtcbmltcG9ydCB7QnNNb2RhbFJlZiwgQnNNb2RhbFNlcnZpY2V9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5pbXBvcnQge0ZpbGVMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi4vcmVtb3RlLW1vZHVsZS9maWxlbGlzdC9saXN0L2ZpbGUtbGlzdC5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjYWxlbmRhci1hdHRhY2htZW50LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hdHRhY2htZW50LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2F0dGFjaG1lbnQtbGlzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXR0YWNobWVudExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgY2FsRXZlbnQ6IENhbEV2ZW50O1xuICAgIEBJbnB1dCgpIGZpbGVFbDogSFRNTElucHV0RWxlbWVudDtcbiAgICBASW5wdXQoKSByZW1vdmFibGU6IGJvb2xlYW47XG4gICAgQFZpZXdDaGlsZChGaWxlTGlzdENvbXBvbmVudCkgZmlsZUxpc3Q6IEZpbGVMaXN0Q29tcG9uZW50O1xuICAgIGZpbGVzOiBhbnlbXSA9IFtdO1xuICAgIG1vZGFsUmVmOiBCc01vZGFsUmVmO1xuICAgIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZmlsZTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyU2VydmljZTogQ2FsZW5kYXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBCc01vZGFsU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5jYWxFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNobWVudFRvRmlsZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RhbFJlZikge1xuICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2aWV3QXR0YWNobWVudChmaWxlLCBldmVudDogQ2FsRXZlbnQpIHtcbiAgICAgICAgd2luZG93Lm9wZW4oeENhbGVuZGFyLmdldEZpbGVWaWV3VXJsKGZpbGUuZGF0YSwgbnVsbCwgZXZlbnQpKTtcbiAgICB9XG5cbiAgICByZW1vdmVBdHRhY2htZW50KGZpbGUsIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIGlmIChmaWxlLmlkKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxlID0gZmlsZTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2UgPSAnVOG7h3AgdGluIDxiPlwiJyArIGZpbGUubmFtZSArICdcIjwvYj4gc+G6vSBi4buLIHhvw6E/JztcbiAgICAgICAgICAgIHRoaXMubW9kYWxSZWYgPSB0aGlzLm1vZGFsU2VydmljZS5zaG93KHRlbXBsYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QucmVtb3ZlRmlsZShmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUZpbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kYWxSZWYuaGlkZSgpO1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5kZWxldGVBdHRhY2htZW50KHtmaWxlSUQ6IHRoaXMuX2ZpbGUuaWQsIGVsZW1lbnQ6IHRoaXMuY2FsRXZlbnQudXVpZH0sKCkgPT4ge30pO1xuICAgICAgICB0aGlzLmZpbGVMaXN0LnJlbW92ZUZpbGUodGhpcy5fZmlsZSk7XG4gICAgICAgIHRoaXMuX2ZpbGUgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F0dGFjaG1lbnRUb0ZpbGVzKCkge1xuICAgICAgICBpZiAodGhpcy5jYWxFdmVudCAmJiB0aGlzLmNhbEV2ZW50LmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVzID0gdGhpcy5jYWxFdmVudC5hdHRhY2htZW50cy5tYXAoKGl0ZW06IENhbEF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGl0ZW0ubWltZXR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IGl0ZW0uc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uZ3JpZGZzVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaXRlbVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==