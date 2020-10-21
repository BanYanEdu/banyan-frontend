/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { xCalendar } from "../utils/xCalendar";
import { CalendarService } from "../calendar.service";
import { BsModalService } from "ngx-bootstrap";
import { FileListComponent } from "../remote-module/filelist/list/file-list.component";
var AttachmentListComponent = /** @class */ (function () {
    function AttachmentListComponent(calendarService, modalService) {
        this.calendarService = calendarService;
        this.modalService = modalService;
        this.files = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    AttachmentListComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.calEvent) {
            this._attachmentToFiles();
        }
    };
    /**
     * @return {?}
     */
    AttachmentListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.modalRef) {
            this.modalRef.hide();
        }
    };
    /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    AttachmentListComponent.prototype.viewAttachment = /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    function (file, event) {
        window.open(xCalendar.getFileViewUrl(file.data, null, event));
    };
    /**
     * @param {?} file
     * @param {?} template
     * @return {?}
     */
    AttachmentListComponent.prototype.removeAttachment = /**
     * @param {?} file
     * @param {?} template
     * @return {?}
     */
    function (file, template) {
        if (file.id) {
            this._file = file;
            this.confirmMessage = 'Tệp tin <b>"' + file.name + '"</b> sẽ bị xoá?';
            this.modalRef = this.modalService.show(template);
        }
        else {
            this.fileList.removeFile(file);
        }
    };
    /**
     * @return {?}
     */
    AttachmentListComponent.prototype.removeFile = /**
     * @return {?}
     */
    function () {
        if (!this._file) {
            return;
        }
        this.modalRef.hide();
        this.calendarService.deleteAttachment({ fileID: this._file.id, element: this.calEvent.uuid }, (/**
         * @return {?}
         */
        function () { }));
        this.fileList.removeFile(this._file);
        this._file = null;
    };
    /**
     * @private
     * @return {?}
     */
    AttachmentListComponent.prototype._attachmentToFiles = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.calEvent && this.calEvent.attachments) {
            this.files = this.calEvent.attachments.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
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
    };
    AttachmentListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'calendar-attachment-list',
                    template: "<file-list [template]=\"fileItem\" [files]=\"files\" [fileEl]=\"fileEl\" [removable]=\"removable\"></file-list>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\">\n        <img [src]=\"file.name | fileIcon\" class=\"file-item__image\">\n        <div class=\"file-item__name text-primary\" (click)=\"viewAttachment(file, $event)\">{{file.name}}</div>\n        <i *ngIf=\"removable\" (click)=\"removeAttachment(file, template)\"\n           class=\"fa fa-trash file-item__remove text-danger\"></i>\n    </div>\n</ng-template>\n<ng-template #template>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Th\u00F4ng b\u00E1o</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\" [innerHTML]=\"confirmMessage\"></div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"removeFile()\">X\u00F3a</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalRef.hide()\">\u0110\u00F3ng</button>\n    </div>\n</ng-template>",
                    styles: [".file-item{height:24px;line-height:24px;overflow:hidden;font-size:13px;cursor:pointer;margin-bottom:5px}.file-item__image{float:left;width:24px;height:24px;margin-right:10px}.file-item__name{float:left;max-width:80%;white-space:nowrap;overflow:hidden}.file-item__remove{width:24px;height:24px;line-height:24px;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    AttachmentListComponent.ctorParameters = function () { return [
        { type: CalendarService },
        { type: BsModalService }
    ]; };
    AttachmentListComponent.propDecorators = {
        calEvent: [{ type: Input }],
        fileEl: [{ type: Input }],
        removable: [{ type: Input }],
        fileList: [{ type: ViewChild, args: [FileListComponent,] }]
    };
    return AttachmentListComponent;
}());
export { AttachmentListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvYXR0YWNobWVudC1saXN0L2F0dGFjaG1lbnQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvRCxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQWEsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBRXJGO0lBY0ksaUNBQW9CLGVBQWdDLEVBQ2hDLFlBQTRCO1FBRDVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFMaEQsVUFBSyxHQUFVLEVBQUUsQ0FBQztJQU9sQixDQUFDOzs7OztJQUVELDZDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDOzs7O0lBRUQsNkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7Ozs7OztJQUVELGdEQUFjOzs7OztJQUFkLFVBQWUsSUFBSSxFQUFFLEtBQWU7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7O0lBRUQsa0RBQWdCOzs7OztJQUFoQixVQUFpQixJQUFJLEVBQUUsUUFBMEI7UUFDN0MsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7Ozs7SUFFRCw0Q0FBVTs7O0lBQVY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUM7OztRQUFDLGNBQU8sQ0FBQyxFQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU8sb0RBQWtCOzs7O0lBQTFCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsSUFBbUI7Z0JBQzNELE9BQU87b0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDbkIsSUFBSSxFQUFFLElBQUk7aUJBQ2IsQ0FBQztZQUNOLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQzs7Z0JBckVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxrdUNBQStDOztpQkFFbEQ7Ozs7Z0JBUk8sZUFBZTtnQkFDSCxjQUFjOzs7MkJBUzdCLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLFNBQVMsU0FBQyxpQkFBaUI7O0lBNkRoQyw4QkFBQztDQUFBLEFBdEVELElBc0VDO1NBakVZLHVCQUF1Qjs7O0lBQ2hDLDJDQUE0Qjs7SUFDNUIseUNBQWtDOztJQUNsQyw0Q0FBNEI7O0lBQzVCLDJDQUEwRDs7SUFDMUQsd0NBQWtCOztJQUNsQiwyQ0FBcUI7O0lBQ3JCLGlEQUF1Qjs7Ozs7SUFDdkIsd0NBQWM7Ozs7O0lBQ0Ysa0RBQXdDOzs7OztJQUN4QywrQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7eENhbGVuZGFyfSBmcm9tIFwiLi4vdXRpbHMveENhbGVuZGFyXCI7XG5pbXBvcnQge0NhbEV2ZW50fSBmcm9tIFwiLi4vdXRpbHMvbW9kZWwvQ2FsRXZlbnRcIjtcbmltcG9ydCB7Q2FsQXR0YWNobWVudH0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEF0dGFjaG1lbnRcIjtcbmltcG9ydCB7Q2FsZW5kYXJTZXJ2aWNlfSBmcm9tIFwiLi4vY2FsZW5kYXIuc2VydmljZVwiO1xuaW1wb3J0IHtCc01vZGFsUmVmLCBCc01vZGFsU2VydmljZX0gZnJvbSBcIm5neC1ib290c3RyYXBcIjtcbmltcG9ydCB7RmlsZUxpc3RDb21wb25lbnR9IGZyb20gXCIuLi9yZW1vdGUtbW9kdWxlL2ZpbGVsaXN0L2xpc3QvZmlsZS1saXN0LmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NhbGVuZGFyLWF0dGFjaG1lbnQtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2F0dGFjaG1lbnQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXR0YWNobWVudC1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBdHRhY2htZW50TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBjYWxFdmVudDogQ2FsRXZlbnQ7XG4gICAgQElucHV0KCkgZmlsZUVsOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIEBJbnB1dCgpIHJlbW92YWJsZTogYm9vbGVhbjtcbiAgICBAVmlld0NoaWxkKEZpbGVMaXN0Q29tcG9uZW50KSBmaWxlTGlzdDogRmlsZUxpc3RDb21wb25lbnQ7XG4gICAgZmlsZXM6IGFueVtdID0gW107XG4gICAgbW9kYWxSZWY6IEJzTW9kYWxSZWY7XG4gICAgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcbiAgICBwcml2YXRlIF9maWxlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXJTZXJ2aWNlOiBDYWxlbmRhclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IEJzTW9kYWxTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmNhbEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2htZW50VG9GaWxlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vZGFsUmVmKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZpZXdBdHRhY2htZW50KGZpbGUsIGV2ZW50OiBDYWxFdmVudCkge1xuICAgICAgICB3aW5kb3cub3Blbih4Q2FsZW5kYXIuZ2V0RmlsZVZpZXdVcmwoZmlsZS5kYXRhLCBudWxsLCBldmVudCkpO1xuICAgIH1cblxuICAgIHJlbW92ZUF0dGFjaG1lbnQoZmlsZSwgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgaWYgKGZpbGUuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGUgPSBmaWxlO1xuICAgICAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZSA9ICdU4buHcCB0aW4gPGI+XCInICsgZmlsZS5uYW1lICsgJ1wiPC9iPiBz4bq9IGLhu4sgeG/DoT8nO1xuICAgICAgICAgICAgdGhpcy5tb2RhbFJlZiA9IHRoaXMubW9kYWxTZXJ2aWNlLnNob3codGVtcGxhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5yZW1vdmVGaWxlKGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RhbFJlZi5oaWRlKCk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmRlbGV0ZUF0dGFjaG1lbnQoe2ZpbGVJRDogdGhpcy5fZmlsZS5pZCwgZWxlbWVudDogdGhpcy5jYWxFdmVudC51dWlkfSwoKSA9PiB7fSk7XG4gICAgICAgIHRoaXMuZmlsZUxpc3QucmVtb3ZlRmlsZSh0aGlzLl9maWxlKTtcbiAgICAgICAgdGhpcy5fZmlsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXR0YWNobWVudFRvRmlsZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbEV2ZW50ICYmIHRoaXMuY2FsRXZlbnQuYXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZXMgPSB0aGlzLmNhbEV2ZW50LmF0dGFjaG1lbnRzLm1hcCgoaXRlbTogQ2FsQXR0YWNobWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0uZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogaXRlbS5taW1ldHlwZSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogaXRlbS5zaXplLFxuICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS5ncmlkZnNVVUlELFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpdGVtXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19