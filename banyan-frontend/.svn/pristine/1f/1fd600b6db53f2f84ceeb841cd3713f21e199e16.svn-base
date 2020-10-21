/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
var FileListComponent = /** @class */ (function () {
    function FileListComponent() {
        this.files = [];
        this.removable = true;
        this.onClick = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FileListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._initFileEl();
    };
    /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    FileListComponent.prototype.clickFile = /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    function (file, event) {
        this.onClick.emit({ file: file, event: event });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    FileListComponent.prototype.removeFile = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
            this.onRemove.emit(file);
        }
    };
    /**
     * @param {?} files
     * @return {?}
     */
    FileListComponent.prototype.addFiles = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        // Read as base64 if image
        for (var i = 0; i < files.length; i++) {
            /** @type {?} */
            var file = files[i];
            if (this._fileIsImage(file)) {
                file['image'] = true;
                this._readImageBase64(file);
            }
            this.files.push(file);
        }
    };
    /**
     * @private
     * @return {?}
     */
    FileListComponent.prototype._initFileEl = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.fileEl) {
            this.fileEl.addEventListener('change', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                /** @type {?} */
                var files = _this.fileEl.files;
                if (files.length > 0) {
                    // Read as base64 if image
                    _this.addFiles(files);
                    // Reset file
                    _this.fileEl.value = '';
                }
            }));
        }
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    FileListComponent.prototype._readImageBase64 = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (/**
         * @return {?}
         */
        function () {
            file.url = reader.result;
        });
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    FileListComponent.prototype._fileIsImage = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return file.type && file.type.indexOf('image') > -1;
    };
    FileListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-list',
                    template: "<ng-container *ngFor=\"let file of files\">\n    <ng-template *ngTemplateOutlet=\"template ? template : fileItem; context: {file: file}\">\n    </ng-template>\n</ng-container>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\" (click)=\"clickFile(file, $event)\">\n        <img *ngIf=\"file.image; else icon\" [src]=\"file.url\" class=\"file-item__image\">\n        <ng-template #icon>\n            <img [src]=\"file.name | fileIcon\" class=\"file-item__image_type\">\n            <div class=\"file-item__name\">{{file.name}}</div>\n        </ng-template>\n        <i *ngIf=\"removable\" (click)=\"removeFile(file)\" class=\"fa fa-times file-item__remove\"></i>\n    </div>\n</ng-template>",
                    styles: [":host{display:block}.file-item{display:inline-block;text-align:center;width:80px;height:80px;border-radius:2px;position:relative;margin-right:5px;margin-bottom:5px;border:1px solid #ddd;overflow:hidden;padding:0 5px;cursor:pointer;background:#fff}.file-item__image{max-width:100%;position:absolute;left:50%;top:50%;transform:translate3d(-50%,-50%,0)}.file-item__image_type{max-width:20px;max-height:20px;margin-bottom:5px;margin-top:10px}.file-item__name{font-size:12px;line-height:13px;max-height:40px;overflow:hidden}.file-item__remove{position:absolute;right:3px;top:3px;cursor:pointer;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;font-size:12px}.file-item__remove:hover{background:rgba(0,0,0,.5)}"]
                }] }
    ];
    FileListComponent.propDecorators = {
        fileEl: [{ type: Input }],
        files: [{ type: Input }],
        removable: [{ type: Input }],
        template: [{ type: Input }],
        onClick: [{ type: Output }],
        onRemove: [{ type: Output }]
    };
    return FileListComponent;
}());
export { FileListComponent };
if (false) {
    /** @type {?} */
    FileListComponent.prototype.fileEl;
    /** @type {?} */
    FileListComponent.prototype.files;
    /** @type {?} */
    FileListComponent.prototype.removable;
    /** @type {?} */
    FileListComponent.prototype.template;
    /** @type {?} */
    FileListComponent.prototype.onClick;
    /** @type {?} */
    FileListComponent.prototype.onRemove;
}
/**
 * @record
 */
export function FileListItem() { }
if (false) {
    /** @type {?|undefined} */
    FileListItem.prototype.id;
    /** @type {?|undefined} */
    FileListItem.prototype.url;
    /** @type {?|undefined} */
    FileListItem.prototype.image;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS9saXN0L2ZpbGUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFGO0lBQUE7UUFPYSxVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQUMzQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBR3pCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQXdEMUQsQ0FBQzs7OztJQXRERyxvQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBRUQscUNBQVM7Ozs7O0lBQVQsVUFBVSxJQUFrQixFQUFFLEtBQUs7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLE1BQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFRCxzQ0FBVTs7OztJQUFWLFVBQVcsSUFBa0I7O1lBQ25CLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7OztJQUVELG9DQUFROzs7O0lBQVIsVUFBUyxLQUF3QjtRQUM3QiwwQkFBMEI7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUNoQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQzs7Ozs7SUFFTyx1Q0FBVzs7OztJQUFuQjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFROzs7O1lBQUUsVUFBQyxDQUFDOztvQkFDL0IsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDL0IsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDbEIsMEJBQTBCO29CQUMxQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVyQixhQUFhO29CQUNiLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztpQkFDMUI7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sNENBQWdCOzs7OztJQUF4QixVQUF5QixJQUFJOztZQUNuQixNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7UUFDL0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsTUFBTTs7O1FBQUc7WUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQyxDQUFBLENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFTyx3Q0FBWTs7Ozs7SUFBcEIsVUFBcUIsSUFBa0I7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7O2dCQW5FSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLHl1QkFBeUM7O2lCQUU1Qzs7O3lCQUVJLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBRUwsTUFBTTsyQkFDTixNQUFNOztJQXdEWCx3QkFBQztDQUFBLEFBcEVELElBb0VDO1NBL0RZLGlCQUFpQjs7O0lBQzFCLG1DQUFrQzs7SUFDbEMsa0NBQW9DOztJQUNwQyxzQ0FBbUM7O0lBQ25DLHFDQUFvQzs7SUFFcEMsb0NBQTRDOztJQUM1QyxxQ0FBc0Q7Ozs7O0FBMEQxRCxrQ0FJQzs7O0lBSEcsMEJBQVk7O0lBQ1osMkJBQWE7O0lBQ2IsNkJBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmlsZS1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9maWxlLWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBmaWxlRWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgQElucHV0KCkgZmlsZXM6IEZpbGVMaXN0SXRlbVtdID0gW107XG4gICAgQElucHV0KCkgcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlTGlzdEl0ZW0+KCk7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW5pdEZpbGVFbCgpO1xuICAgIH1cblxuICAgIGNsaWNrRmlsZShmaWxlOiBGaWxlTGlzdEl0ZW0sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KHtmaWxlLCBldmVudH0pO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbGUoZmlsZTogRmlsZUxpc3RJdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkRmlsZXMoZmlsZXM6IEZpbGVMaXN0IHwgRmlsZVtdKSB7XG4gICAgICAgIC8vIFJlYWQgYXMgYmFzZTY0IGlmIGltYWdlXG4gICAgICAgIGZvciAobGV0IGkgID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpbGVJc0ltYWdlKGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgZmlsZVsnaW1hZ2UnXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZEltYWdlQmFzZTY0KGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEZpbGVFbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUVsKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVFbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWxlRWwuZmlsZXM7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVhZCBhcyBiYXNlNjQgaWYgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlcyhmaWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgZmlsZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVFbC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVhZEltYWdlQmFzZTY0KGZpbGUpIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZpbGUudXJsID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maWxlSXNJbWFnZShmaWxlOiBGaWxlTGlzdEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGZpbGUudHlwZSAmJiBmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA+IC0xO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlTGlzdEl0ZW0gZXh0ZW5kcyBGaWxlIHtcbiAgICBpZD86IHN0cmluZztcbiAgICB1cmw/OiBzdHJpbmc7XG4gICAgaW1hZ2U/OiBib29sZWFuO1xufVxuIl19