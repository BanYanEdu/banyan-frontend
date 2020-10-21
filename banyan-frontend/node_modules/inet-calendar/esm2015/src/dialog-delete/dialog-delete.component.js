/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CalendarService } from "../calendar.service";
import { ModalDirective } from "ngx-bootstrap";
export class CalendarDialogDelete {
    /**
     * @param {?} calendarService
     */
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.onDelete = new EventEmitter();
        this.dialogTitle = 'Lịch công tác';
        this.dialogContent = '';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._initDialogDelete();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyDialogDelete();
    }
    /**
     * @return {?}
     */
    hide() {
        this.confirmDialog.hide();
    }
    /**
     * @return {?}
     */
    delete() {
        this.calendarService.removeEvent({
            element: this.calEvent.uuid,
            orgid: this.calEvent.firmUUID
        }, (/**
         * @return {?}
         */
        () => {
            this.hide();
            this.onDelete.emit();
        }));
    }
    /**
     * @return {?}
     */
    show() {
        this.dialogContent = 'Bạn có đồng ý xóa sự kiện <b>"' + this.calEvent.subject + '"</b> không?';
        this.confirmDialog.show();
    }
    /**
     * @private
     * @return {?}
     */
    _initDialogDelete() {
        this._$dialogDelete = $(this.dialogDelete.nativeElement).hide();
        // Click outside to close
        this.hide = this.hide.bind(this);
        document.body.addEventListener('click', this.hide);
        // Prevent close
        this._$dialogDelete.on('click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.stopPropagation()));
        // Append modal to body
        $(document.body).append(this._$dialogDelete);
    }
    /**
     * @private
     * @return {?}
     */
    _destroyDialogDelete() {
        document.body.removeEventListener('click', this.hide);
        this._$dialogDelete.remove();
    }
}
CalendarDialogDelete.decorators = [
    { type: Component, args: [{
                selector: 'calendar-dialog-delete',
                template: "<div #dialogDelete class=\"modal fade\" bsModal #confirmDialog=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title pull-left\"> {{dialogTitle}}</h4>\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hide()\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\" [innerHTML]=\"dialogContent\">\n            </div>\n            <div class=\"modal-footer\">\n                <div class=\"text-right\">\n                    <button type=\"button\" class=\"btn btn-lg btn-danger btn-sm\" (click)=\"delete()\">\n                        <i class=\"fa fa-trash\"></i> X\u00F3a\n                    </button>\n                    <button type=\"button\" class=\"btn btn-lg btn-default ml-2 btn-sm\" (click)=\"hide()\">\n                        <i class=\"fa fa-times\"></i> \u0110\u00F3ng\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
CalendarDialogDelete.ctorParameters = () => [
    { type: CalendarService }
];
CalendarDialogDelete.propDecorators = {
    calEvent: [{ type: Input }],
    onDelete: [{ type: Output }],
    confirmDialog: [{ type: ViewChild, args: [ModalDirective,] }],
    dialogDelete: [{ type: ViewChild, args: ['dialogDelete',] }]
};
if (false) {
    /** @type {?} */
    CalendarDialogDelete.prototype.calEvent;
    /** @type {?} */
    CalendarDialogDelete.prototype.onDelete;
    /** @type {?} */
    CalendarDialogDelete.prototype.confirmDialog;
    /** @type {?} */
    CalendarDialogDelete.prototype.dialogDelete;
    /** @type {?} */
    CalendarDialogDelete.prototype.dialogTitle;
    /** @type {?} */
    CalendarDialogDelete.prototype.dialogContent;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogDelete.prototype._$dialogDelete;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogDelete.prototype.calendarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWRlbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2RpYWxvZy1kZWxldGUvZGlhbG9nLWRlbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVE3QyxNQUFNLE9BQU8sb0JBQW9COzs7O0lBVzdCLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVQxQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUl4QyxnQkFBVyxHQUFXLGVBQWUsQ0FBQztRQUN0QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztJQUk0QixDQUFDOzs7O0lBRXhELGVBQWU7UUFDWCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1lBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7WUFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtTQUNoQzs7O1FBQUUsR0FBRyxFQUFFO1lBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDL0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVPLGlCQUFpQjtRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWhFLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUMsQ0FBQztRQUU1RCx1QkFBdUI7UUFDdkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRU8sb0JBQW9CO1FBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7OztZQTlESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsb3RDQUE2Qzs7YUFFaEQ7Ozs7WUFUTyxlQUFlOzs7dUJBV2xCLEtBQUs7dUJBQ0wsTUFBTTs0QkFDTixTQUFTLFNBQUMsY0FBYzsyQkFDeEIsU0FBUyxTQUFDLGNBQWM7Ozs7SUFIekIsd0NBQTRCOztJQUM1Qix3Q0FBd0M7O0lBQ3hDLDZDQUF5RDs7SUFDekQsNENBQW9EOztJQUVwRCwyQ0FBc0M7O0lBQ3RDLDZDQUEyQjs7Ozs7SUFFM0IsOENBQXVCOzs7OztJQUVYLCtDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSBcIi4uL2NhbGVuZGFyLnNlcnZpY2VcIjtcbmltcG9ydCB7Q2FsRXZlbnR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0IHtNb2RhbERpcmVjdGl2ZX0gZnJvbSBcIm5neC1ib290c3RyYXBcIjtcbmRlY2xhcmUgbGV0ICQ6YW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NhbGVuZGFyLWRpYWxvZy1kZWxldGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2ctZGVsZXRlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kaWFsb2ctZGVsZXRlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRpYWxvZ0RlbGV0ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveXtcbiAgICBASW5wdXQoKSBjYWxFdmVudDogQ2FsRXZlbnQ7XG4gICAgQE91dHB1dCgpIG9uRGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBWaWV3Q2hpbGQoTW9kYWxEaXJlY3RpdmUpIGNvbmZpcm1EaWFsb2c6IE1vZGFsRGlyZWN0aXZlO1xuICAgIEBWaWV3Q2hpbGQoJ2RpYWxvZ0RlbGV0ZScpIGRpYWxvZ0RlbGV0ZTogRWxlbWVudFJlZjtcblxuICAgIGRpYWxvZ1RpdGxlOiBzdHJpbmcgPSAnTOG7i2NoIGPDtG5nIHTDoWMnO1xuICAgIGRpYWxvZ0NvbnRlbnQ6IHN0cmluZyA9ICcnO1xuXG4gICAgcHJpdmF0ZSBfJGRpYWxvZ0RlbGV0ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXJTZXJ2aWNlOiBDYWxlbmRhclNlcnZpY2UpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2luaXREaWFsb2dEZWxldGUoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveURpYWxvZ0RlbGV0ZSgpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuY29uZmlybURpYWxvZy5oaWRlKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5yZW1vdmVFdmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmNhbEV2ZW50LnV1aWQsXG4gICAgICAgICAgICBvcmdpZDogdGhpcy5jYWxFdmVudC5maXJtVVVJRFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMub25EZWxldGUuZW1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbnRlbnQgPSAnQuG6oW4gY8OzIMSR4buTbmcgw70geMOzYSBz4buxIGtp4buHbiA8Yj5cIicgKyB0aGlzLmNhbEV2ZW50LnN1YmplY3QgKyAnXCI8L2I+IGtow7RuZz8nO1xuICAgICAgICB0aGlzLmNvbmZpcm1EaWFsb2cuc2hvdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXREaWFsb2dEZWxldGUoKSB7XG4gICAgICAgIHRoaXMuXyRkaWFsb2dEZWxldGUgPSAkKHRoaXMuZGlhbG9nRGVsZXRlLm5hdGl2ZUVsZW1lbnQpLmhpZGUoKTtcblxuICAgICAgICAvLyBDbGljayBvdXRzaWRlIHRvIGNsb3NlXG4gICAgICAgIHRoaXMuaGlkZSA9IHRoaXMuaGlkZS5iaW5kKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcblxuICAgICAgICAvLyBQcmV2ZW50IGNsb3NlXG4gICAgICAgIHRoaXMuXyRkaWFsb2dEZWxldGUub24oJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xuXG4gICAgICAgIC8vIEFwcGVuZCBtb2RhbCB0byBib2R5XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkuYXBwZW5kKHRoaXMuXyRkaWFsb2dEZWxldGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rlc3Ryb3lEaWFsb2dEZWxldGUoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUpO1xuICAgICAgICB0aGlzLl8kZGlhbG9nRGVsZXRlLnJlbW92ZSgpO1xuICAgIH1cbn1cbiJdfQ==