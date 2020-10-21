/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
export class FileListComponent {
    constructor() {
        this.files = [];
        this.removable = true;
        this.onClick = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._initFileEl();
    }
    /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    clickFile(file, event) {
        this.onClick.emit({ file, event });
    }
    /**
     * @param {?} file
     * @return {?}
     */
    removeFile(file) {
        /** @type {?} */
        const index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
            this.onRemove.emit(file);
        }
    }
    /**
     * @param {?} files
     * @return {?}
     */
    addFiles(files) {
        // Read as base64 if image
        for (let i = 0; i < files.length; i++) {
            /** @type {?} */
            let file = files[i];
            if (this._fileIsImage(file)) {
                file['image'] = true;
                this._readImageBase64(file);
            }
            this.files.push(file);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initFileEl() {
        if (this.fileEl) {
            this.fileEl.addEventListener('change', (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                /** @type {?} */
                const files = this.fileEl.files;
                if (files.length > 0) {
                    // Read as base64 if image
                    this.addFiles(files);
                    // Reset file
                    this.fileEl.value = '';
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    _readImageBase64(file) {
        /** @type {?} */
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (/**
         * @return {?}
         */
        function () {
            file.url = reader.result;
        });
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    _fileIsImage(file) {
        return file.type && file.type.indexOf('image') > -1;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS9saXN0L2ZpbGUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTzFGLE1BQU0sT0FBTyxpQkFBaUI7SUFMOUI7UUFPYSxVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQUMzQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBR3pCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQXdEMUQsQ0FBQzs7OztJQXRERyxRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxJQUFrQixFQUFFLEtBQUs7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxJQUFrQjs7Y0FDbkIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN0QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQXdCO1FBQzdCLDBCQUEwQjtRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ2hDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7OztJQUVPLFdBQVc7UUFDZixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVE7Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFOztzQkFDbkMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDL0IsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDbEIsMEJBQTBCO29CQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVyQixhQUFhO29CQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztpQkFDMUI7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsSUFBSTs7Y0FDbkIsTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO1FBQy9CLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLE1BQU07OztRQUFHO1lBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdCLENBQUMsQ0FBQSxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLElBQWtCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7WUFuRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQix5dUJBQXlDOzthQUU1Qzs7O3FCQUVJLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBRUwsTUFBTTt1QkFDTixNQUFNOzs7O0lBTlAsbUNBQWtDOztJQUNsQyxrQ0FBb0M7O0lBQ3BDLHNDQUFtQzs7SUFDbkMscUNBQW9DOztJQUVwQyxvQ0FBNEM7O0lBQzVDLHFDQUFzRDs7Ozs7QUEwRDFELGtDQUlDOzs7SUFIRywwQkFBWTs7SUFDWiwyQkFBYTs7SUFDYiw2QkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmaWxlLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9maWxlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ZpbGUtbGlzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlsZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZpbGVFbDogSFRNTElucHV0RWxlbWVudDtcbiAgICBASW5wdXQoKSBmaWxlczogRmlsZUxpc3RJdGVtW10gPSBbXTtcbiAgICBASW5wdXQoKSByZW1vdmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgb25SZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVMaXN0SXRlbT4oKTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pbml0RmlsZUVsKCk7XG4gICAgfVxuXG4gICAgY2xpY2tGaWxlKGZpbGU6IEZpbGVMaXN0SXRlbSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoe2ZpbGUsIGV2ZW50fSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsZShmaWxlOiBGaWxlTGlzdEl0ZW0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRGaWxlcyhmaWxlczogRmlsZUxpc3QgfCBGaWxlW10pIHtcbiAgICAgICAgLy8gUmVhZCBhcyBiYXNlNjQgaWYgaW1hZ2VcbiAgICAgICAgZm9yIChsZXQgaSAgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5fZmlsZUlzSW1hZ2UoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICBmaWxlWydpbWFnZSddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWFkSW1hZ2VCYXNlNjQoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0RmlsZUVsKCkge1xuICAgICAgICBpZiAodGhpcy5maWxlRWwpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmZpbGVFbC5maWxlcztcbiAgICAgICAgICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZWFkIGFzIGJhc2U2NCBpZiBpbWFnZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEZpbGVzKGZpbGVzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldCBmaWxlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZUVsLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWFkSW1hZ2VCYXNlNjQoZmlsZSkge1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZmlsZS51cmwgPSByZWFkZXIucmVzdWx0O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbGVJc0ltYWdlKGZpbGU6IEZpbGVMaXN0SXRlbSkge1xuICAgICAgICByZXR1cm4gZmlsZS50eXBlICYmIGZpbGUudHlwZS5pbmRleE9mKCdpbWFnZScpID4gLTE7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVMaXN0SXRlbSBleHRlbmRzIEZpbGUge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIHVybD86IHN0cmluZztcbiAgICBpbWFnZT86IGJvb2xlYW47XG59XG4iXX0=