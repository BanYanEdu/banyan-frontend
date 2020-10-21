/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgxGalleryAnimation } from "ngx-gallery";
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
        console.log('files', this.files.length, this.files);
        this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];
        this.galleryImages = [
            {
                small: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                medium: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                big: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
            },
            {
                small: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                medium: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                big: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
            },
            {
                small: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                medium: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                big: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
            }
        ];
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
                    template: "<ng-container *ngFor=\"let file of files\">\n    <ng-template *ngTemplateOutlet=\"template ? template : fileItem; context: {file: file}\">\n    </ng-template>\n</ng-container>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\" (click)=\"clickFile(file, $event)\">\n        <img *ngIf=\"file.image; else icon\" [src]=\"file.url\" class=\"file-item__image\">\n        <ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n\n        <ng-template #icon>\n            <img [src]=\"file.name | fileIcon\" class=\"file-item__image_type\">\n            <div class=\"file-item__name\">{{file.name}}</div>\n        </ng-template>\n        <i *ngIf=\"removable\" (click)=\"removeFile(file)\" class=\"fa fa-times file-item__remove\"></i>\n    </div>\n</ng-template>",
                    styles: [":host{display:block}.file-item{display:flex;align-items:center;width:auto;height:100%;border-radius:2px;position:relative;margin-right:5px;margin-bottom:5px;overflow:hidden;padding:0 5px;cursor:pointer}.file-item__image_type{max-width:36px;max-height:36px;margin-bottom:5px;margin-top:5px;margin-right:5px}.file-item__name{font-size:12px;line-height:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-item__remove{position:absolute;right:3px;top:3px;cursor:pointer;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;font-size:12px}.file-item__remove:hover{background:rgba(0,0,0,.5)}"]
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
    /** @type {?} */
    FileListComponent.prototype.galleryOptions;
    /** @type {?} */
    FileListComponent.prototype.galleryImages;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2ZpbGVsaXN0L2xpc3QvZmlsZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFDLG1CQUFtQixFQUFxQyxNQUFNLGFBQWEsQ0FBQztBQUVwRjtJQUFBO1FBT2EsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFDM0IsY0FBUyxHQUFZLElBQUksQ0FBQztRQUd6QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFtRzFELENBQUM7Ozs7SUFoR0csb0NBQVE7OztJQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbEI7Z0JBQ0ksS0FBSyxFQUFFLE9BQU87Z0JBQ2QsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsaUJBQWlCLEVBQUUsQ0FBQztnQkFDcEIsY0FBYyxFQUFFLG1CQUFtQixDQUFDLEtBQUs7YUFDNUM7WUFDRCxnQkFBZ0I7WUFDaEI7Z0JBQ0ksVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3JCLGdCQUFnQixFQUFFLEVBQUU7Z0JBQ3BCLGVBQWUsRUFBRSxFQUFFO2FBQ3RCO1lBQ0QsZ0JBQWdCO1lBQ2hCO2dCQUNJLFVBQVUsRUFBRSxHQUFHO2dC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T0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Z0JBOUdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsV0FBVztvQkFDckIsdzBCQUF5Qzs7aUJBRTVDOzs7eUJBRUksS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFFTCxNQUFNOzJCQUNOLE1BQU07O0lBbUdYLHdCQUFDO0NBQUEsQUEvR0QsSUErR0M7U0ExR1ksaUJBQWlCOzs7SUFDMUIsbUNBQWtDOztJQUNsQyxrQ0FBb0M7O0lBQ3BDLHNDQUFtQzs7SUFDbkMscUNBQW9DOztJQUVwQyxvQ0FBNEM7O0lBQzVDLHFDQUFzRDs7SUFDdEQsMkNBQW9DOztJQUNwQywwQ0FBaUM7Ozs7O0FBbUdyQyxrQ0FJQzs7O0lBSEcsMEJBQVk7O0lBQ1osMkJBQWE7O0lBQ2IsNkJBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neEdhbGxlcnlBbmltYXRpb24sIE5neEdhbGxlcnlJbWFnZSwgTmd4R2FsbGVyeU9wdGlvbnN9IGZyb20gXCJuZ3gtZ2FsbGVyeVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZpbGUtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmlsZS1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgZmlsZUVsOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIEBJbnB1dCgpIGZpbGVzOiBGaWxlTGlzdEl0ZW1bXSA9IFtdO1xuICAgIEBJbnB1dCgpIHJlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KCkgb25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvblJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUxpc3RJdGVtPigpO1xuICAgIGdhbGxlcnlPcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9uc1tdO1xuICAgIGdhbGxlcnlJbWFnZXM6IE5neEdhbGxlcnlJbWFnZVtdO1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnZmlsZXMnLCB0aGlzLmZpbGVzLmxlbmd0aCwgdGhpcy5maWxlcylcbiAgICAgICAgdGhpcy5nYWxsZXJ5T3B0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICc0MDBweCcsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsc0NvbHVtbnM6IDQsXG4gICAgICAgICAgICAgICAgaW1hZ2VBbmltYXRpb246IE5neEdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtYXgtd2lkdGggODAwXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogODAwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnNjAwcHgnLFxuICAgICAgICAgICAgICAgIGltYWdlUGVyY2VudDogODAsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsc1BlcmNlbnQ6IDIwLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbHNNYXJnaW46IDIwLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbE1hcmdpbjogMjBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtYXgtd2lkdGggNDAwXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDAwLFxuICAgICAgICAgICAgICAgIHByZXZpZXc6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5nYWxsZXJ5SW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNtYWxsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzAyNDA3MzEyNzMtNzgyMWE2ZWViNmJkP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXG4gICAgICAgICAgICAgICAgbWVkaXVtOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzAyNDA3MzEyNzMtNzgyMWE2ZWViNmJkP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXG4gICAgICAgICAgICAgICAgYmlnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzAyNDA3MzEyNzMtNzgyMWE2ZWViNmJkP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc21hbGw6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MDI0MDczMTI3My03ODIxYTZlZWI2YmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcbiAgICAgICAgICAgICAgICBtZWRpdW06ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MDI0MDczMTI3My03ODIxYTZlZWI2YmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcbiAgICAgICAgICAgICAgICBiaWc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MDI0MDczMTI3My03ODIxYTZlZWI2YmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbWFsbDogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcwMjQwNzMxMjczLTc4MjFhNmVlYjZiZD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxuICAgICAgICAgICAgICAgIG1lZGl1bTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcwMjQwNzMxMjczLTc4MjFhNmVlYjZiZD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxuICAgICAgICAgICAgICAgIGJpZzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcwMjQwNzMxMjczLTc4MjFhNmVlYjZiZD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX2luaXRGaWxlRWwoKTtcbiAgICB9XG5cbiAgICBjbGlja0ZpbGUoZmlsZTogRmlsZUxpc3RJdGVtLCBldmVudCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdCh7ZmlsZSwgZXZlbnR9KTtcbiAgICB9XG5cbiAgICByZW1vdmVGaWxlKGZpbGU6IEZpbGVMaXN0SXRlbSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmlsZXMuaW5kZXhPZihmaWxlKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmUuZW1pdChmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEZpbGVzKGZpbGVzOiBGaWxlTGlzdCB8IEZpbGVbXSkge1xuICAgICAgICAvLyBSZWFkIGFzIGJhc2U2NCBpZiBpbWFnZVxuICAgICAgICBmb3IgKGxldCBpICA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBmaWxlc1tpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9maWxlSXNJbWFnZShmaWxlKSkge1xuICAgICAgICAgICAgICAgIGZpbGVbJ2ltYWdlJ10gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlYWRJbWFnZUJhc2U2NChmaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRGaWxlRWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVFbCkge1xuICAgICAgICAgICAgdGhpcy5maWxlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IHRoaXMuZmlsZUVsLmZpbGVzO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlYWQgYXMgYmFzZTY0IGlmIGltYWdlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRmlsZXMoZmlsZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IGZpbGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlRWwudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3JlYWRJbWFnZUJhc2U2NChmaWxlKSB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmaWxlLnVybCA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlsZUlzSW1hZ2UoZmlsZTogRmlsZUxpc3RJdGVtKSB7XG4gICAgICAgIHJldHVybiBmaWxlLnR5cGUgJiYgZmlsZS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPiAtMTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZUxpc3RJdGVtIGV4dGVuZHMgRmlsZSB7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgdXJsPzogc3RyaW5nO1xuICAgIGltYWdlPzogYm9vbGVhbjtcbn1cbiJdfQ==