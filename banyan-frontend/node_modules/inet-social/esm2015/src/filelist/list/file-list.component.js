/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgxGalleryAnimation } from "ngx-gallery";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2ZpbGVsaXN0L2xpc3QvZmlsZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFDLG1CQUFtQixFQUFxQyxNQUFNLGFBQWEsQ0FBQztBQU9wRixNQUFNLE9BQU8saUJBQWlCO0lBTDlCO1FBT2EsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFDM0IsY0FBUyxHQUFZLElBQUksQ0FBQztRQUd6QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFtRzFELENBQUM7Ozs7SUFoR0csUUFBUTtRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCO2dCQUNJLEtBQUssRUFBRSxPQUFPO2dCQUNkLE1BQU0sRUFBRSxPQUFPO2dCQUNmLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3BCLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLO2FBQzVDO1lBQ0QsZ0JBQWdCO1lBQ2hCO2dCQUNJLFVBQVUsRUFBRSxHQUFHO2dCQUNmLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxPQUFPO2dCQUNmLFlBQVksRUFBRSxFQUFFO2dCQUNoQixpQkFBaUIsRUFBRSxFQUFFO2dCQUNyQixnQkFBZ0IsRUFBRSxFQUFFO2dCQUNwQixlQUFlLEVBQUUsRUFBRTthQUN0QjtZQUNELGdCQUFnQjtZQUNoQjtnQkFDSSxVQUFVLEVB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Q1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLHcwQkFBeUM7O2FBRTVDOzs7cUJBRUksS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFFTCxNQUFNO3VCQUNOLE1BQU07Ozs7SUFOUCxtQ0FBa0M7O0lBQ2xDLGtDQUFvQzs7SUFDcEMsc0NBQW1DOztJQUNuQyxxQ0FBb0M7O0lBRXBDLG9DQUE0Qzs7SUFDNUMscUNBQXNEOztJQUN0RCwyQ0FBb0M7O0lBQ3BDLDBDQUFpQzs7Ozs7QUFtR3JDLGtDQUlDOzs7SUFIRywwQkFBWTs7SUFDWiwyQkFBYTs7SUFDYiw2QkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4R2FsbGVyeUFuaW1hdGlvbiwgTmd4R2FsbGVyeUltYWdlLCBOZ3hHYWxsZXJ5T3B0aW9uc30gZnJvbSBcIm5neC1nYWxsZXJ5XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmlsZS1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9maWxlLWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBmaWxlRWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgQElucHV0KCkgZmlsZXM6IEZpbGVMaXN0SXRlbVtdID0gW107XG4gICAgQElucHV0KCkgcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlTGlzdEl0ZW0+KCk7XG4gICAgZ2FsbGVyeU9wdGlvbnM6IE5neEdhbGxlcnlPcHRpb25zW107XG4gICAgZ2FsbGVyeUltYWdlczogTmd4R2FsbGVyeUltYWdlW107XG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmaWxlcycsIHRoaXMuZmlsZXMubGVuZ3RoLCB0aGlzLmZpbGVzKVxuICAgICAgICB0aGlzLmdhbGxlcnlPcHRpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzQwMHB4JyxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxzQ29sdW1uczogNCxcbiAgICAgICAgICAgICAgICBpbWFnZUFuaW1hdGlvbjogTmd4R2FsbGVyeUFuaW1hdGlvbi5TbGlkZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG1heC13aWR0aCA4MDBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA4MDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICc2MDBweCcsXG4gICAgICAgICAgICAgICAgaW1hZ2VQZXJjZW50OiA4MCxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxzUGVyY2VudDogMjAsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsc01hcmdpbjogMjAsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsTWFyZ2luOiAyMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG1heC13aWR0aCA0MDBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MDAsXG4gICAgICAgICAgICAgICAgcHJldmlldzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLmdhbGxlcnlJbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc21hbGw6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MDI0MDczMTI3My03ODIxYTZlZWI2YmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcbiAgICAgICAgICAgICAgICBtZWRpdW06ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MDI0MDczMTI3My03ODIxYTZlZWI2YmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcbiAgICAgICAgICAgICAgICBiaWc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MDI0MDczMTI3My03ODIxYTZlZWI2YmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzbWFsbDogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcwMjQwNzMxMjczLTc4MjFhNmVlYjZiZD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxuICAgICAgICAgICAgICAgIG1lZGl1bTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcwMjQwNzMxMjczLTc4MjFhNmVlYjZiZD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxuICAgICAgICAgICAgICAgIGJpZzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDcwMjQwNzMxMjczLTc4MjFhNmVlYjZiZD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNtYWxsOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzAyNDA3MzEyNzMtNzgyMWE2ZWViNmJkP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXG4gICAgICAgICAgICAgICAgbWVkaXVtOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzAyNDA3MzEyNzMtNzgyMWE2ZWViNmJkP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXG4gICAgICAgICAgICAgICAgYmlnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NzAyNDA3MzEyNzMtNzgyMWE2ZWViNmJkP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5faW5pdEZpbGVFbCgpO1xuICAgIH1cblxuICAgIGNsaWNrRmlsZShmaWxlOiBGaWxlTGlzdEl0ZW0sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KHtmaWxlLCBldmVudH0pO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbGUoZmlsZTogRmlsZUxpc3RJdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkRmlsZXMoZmlsZXM6IEZpbGVMaXN0IHwgRmlsZVtdKSB7XG4gICAgICAgIC8vIFJlYWQgYXMgYmFzZTY0IGlmIGltYWdlXG4gICAgICAgIGZvciAobGV0IGkgID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpbGVJc0ltYWdlKGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgZmlsZVsnaW1hZ2UnXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZEltYWdlQmFzZTY0KGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEZpbGVFbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUVsKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVFbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWxlRWwuZmlsZXM7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVhZCBhcyBiYXNlNjQgaWYgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlcyhmaWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgZmlsZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVFbC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVhZEltYWdlQmFzZTY0KGZpbGUpIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZpbGUudXJsID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maWxlSXNJbWFnZShmaWxlOiBGaWxlTGlzdEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGZpbGUudHlwZSAmJiBmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA+IC0xO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlTGlzdEl0ZW0gZXh0ZW5kcyBGaWxlIHtcbiAgICBpZD86IHN0cmluZztcbiAgICB1cmw/OiBzdHJpbmc7XG4gICAgaW1hZ2U/OiBib29sZWFuO1xufVxuIl19