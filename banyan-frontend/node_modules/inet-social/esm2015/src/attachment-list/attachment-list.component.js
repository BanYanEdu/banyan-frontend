/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SocialService } from '../social.service';
export class AttachmentListComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
        this.socialService = socialService;
        this.attachments = [];
        this.files = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.attachments) {
            this._indexFiles();
        }
    }
    /**
     * @param {?} file
     * @param {?} imageEl
     * @return {?}
     */
    viewImage(file, imageEl) {
        /** @type {?} */
        const options = {
            index: this._getImageIndex(file.id),
            clickElement: imageEl
        };
        this.socialService.viewImages(this._images, options);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    viewAttachment(data) {
        /** @type {?} */
        const file = data.file;
        /** @type {?} */
        const attachment = this._getAttachmentById(file.id);
        if (attachment) {
            if (file.image) {
                /** @type {?} */
                let imageEl = data.event.target;
                if (imageEl.tagName !== 'IMG') {
                    // click on image's parent
                    imageEl = imageEl.getElementsByTagName('img')[0];
                }
                this.viewImage(file, imageEl);
            }
            else {
                this.socialService.viewAttachment(attachment);
            }
        }
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    _getAttachmentById(id) {
        for (let i = 0; i < this.attachments.length; i++) {
            if (this.attachments[i].gridfsUUID === id) {
                return this.attachments[i];
            }
        }
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    _getImageIndex(id) {
        for (let i = 0; i < this._images.length; i++) {
            if (this._images[i].id === id) {
                return i;
            }
        }
        return 0;
    }
    /**
     * @private
     * @return {?}
     */
    _indexFiles() {
        this.files = this.socialService.attachmentToFiles(this.attachments);
        // Index images to view later
        this._images = [];
        for (let i = 0; i < this.files.length; i++) {
            if (this.files[i].image) {
                /** @type {?} */
                const attachment = this.attachments[i];
                this._images.push({
                    src: attachment.pathView,
                    id: attachment.gridfsUUID,
                    w: 1,
                    h: 1,
                    sizeDynamic: true
                });
            }
        }
    }
}
AttachmentListComponent.decorators = [
    { type: Component, args: [{
                selector: '[attachmentList]',
                template: "<file-list [files]=\"files\" [removable]=\"false\" (onClick)=\"viewAttachment($event)\"></file-list>",
                styles: [""]
            }] }
];
/** @nocollapse */
AttachmentListComponent.ctorParameters = () => [
    { type: SocialService }
];
AttachmentListComponent.propDecorators = {
    attachments: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AttachmentListComponent.prototype.attachments;
    /** @type {?} */
    AttachmentListComponent.prototype.files;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype._images;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2F0dGFjaG1lbnQtbGlzdC9hdHRhY2htZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBU2hELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFLaEMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKdkMsZ0JBQVcsR0FBaUIsRUFBRSxDQUFDO1FBQ3hDLFVBQUssR0FBbUIsRUFBRSxDQUFDO0lBR3lCLENBQUM7Ozs7O0lBQ3JELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLElBQWtCLEVBQUUsT0FBb0I7O2NBQ3hDLE9BQU8sR0FBRztZQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbkMsWUFBWSxFQUFFLE9BQU87U0FDeEI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQUk7O2NBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJOztjQUNoQixVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkQsSUFBSSxVQUFVLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7O29CQUNSLE9BQU8sR0FBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2dCQUM1QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO29CQUMzQiwwQkFBMEI7b0JBQzFCLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BEO2dCQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxFQUFVO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsRUFBVTtRQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7SUFFTyxXQUFXO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRSw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7O3NCQUNmLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsR0FBRyxFQUFFLFVBQVUsQ0FBQyxRQUFRO29CQUN4QixFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVU7b0JBQ3pCLENBQUMsRUFBRSxDQUFDO29CQUNKLENBQUMsRUFBRSxDQUFDO29CQUNKLFdBQVcsRUFBRSxJQUFJO2lCQUNwQixDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQzs7O1lBN0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixnSEFBK0M7O2FBRWxEOzs7O1lBUk8sYUFBYTs7OzBCQVVoQixLQUFLOzs7O0lBQU4sOENBQXdDOztJQUN4Qyx3Q0FBMkI7Ozs7O0lBQzNCLDBDQUF5Qjs7Ozs7SUFFYixnREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uL3NvY2lhbC5zZXJ2aWNlJztcbmltcG9ydCB7QXR0YWNobWVudH0gZnJvbSAnLi4vbW9kZWwvQXR0YWNobWVudCc7XG5pbXBvcnQge1Bob3RvLCBGaWxlTGlzdEl0ZW19IGZyb20gXCJpbmV0LXVpXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW2F0dGFjaG1lbnRMaXN0XScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2F0dGFjaG1lbnQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXR0YWNobWVudC1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBdHRhY2htZW50TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgYXR0YWNobWVudHM6IEF0dGFjaG1lbnRbXSA9IFtdO1xuICAgIGZpbGVzOiBGaWxlTGlzdEl0ZW1bXSA9IFtdO1xuICAgIHByaXZhdGUgX2ltYWdlczogUGhvdG9bXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZSkgeyB9XG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5hdHRhY2htZW50cykge1xuICAgICAgICAgICAgdGhpcy5faW5kZXhGaWxlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmlld0ltYWdlKGZpbGU6IEZpbGVMaXN0SXRlbSwgaW1hZ2VFbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLl9nZXRJbWFnZUluZGV4KGZpbGUuaWQpLFxuICAgICAgICAgICAgY2xpY2tFbGVtZW50OiBpbWFnZUVsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc29jaWFsU2VydmljZS52aWV3SW1hZ2VzKHRoaXMuX2ltYWdlcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdmlld0F0dGFjaG1lbnQoZGF0YSkge1xuICAgICAgICBjb25zdCBmaWxlID0gZGF0YS5maWxlO1xuICAgICAgICBjb25zdCBhdHRhY2htZW50ID0gdGhpcy5fZ2V0QXR0YWNobWVudEJ5SWQoZmlsZS5pZCk7XG4gICAgICAgIGlmIChhdHRhY2htZW50KSB7XG4gICAgICAgICAgICBpZiAoZmlsZS5pbWFnZSkge1xuICAgICAgICAgICAgICAgIGxldCBpbWFnZUVsOiBIVE1MRWxlbWVudCA9IGRhdGEuZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmIChpbWFnZUVsLnRhZ05hbWUgIT09ICdJTUcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsaWNrIG9uIGltYWdlJ3MgcGFyZW50XG4gICAgICAgICAgICAgICAgICAgIGltYWdlRWwgPSBpbWFnZUVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdJbWFnZShmaWxlLCBpbWFnZUVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLnZpZXdBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0QXR0YWNobWVudEJ5SWQoaWQ6IHN0cmluZyk6IEF0dGFjaG1lbnQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXR0YWNobWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzW2ldLmdyaWRmc1VVSUQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXR0YWNobWVudHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRJbWFnZUluZGV4KGlkOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2ltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2ltYWdlc1tpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbmRleEZpbGVzKCkge1xuICAgICAgICB0aGlzLmZpbGVzID0gdGhpcy5zb2NpYWxTZXJ2aWNlLmF0dGFjaG1lbnRUb0ZpbGVzKHRoaXMuYXR0YWNobWVudHMpO1xuXG4gICAgICAgIC8vIEluZGV4IGltYWdlcyB0byB2aWV3IGxhdGVyXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVzW2ldLmltYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0YWNobWVudCA9IHRoaXMuYXR0YWNobWVudHNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5faW1hZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzcmM6IGF0dGFjaG1lbnQucGF0aFZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBhdHRhY2htZW50LmdyaWRmc1VVSUQsXG4gICAgICAgICAgICAgICAgICAgIHc6IDEsXG4gICAgICAgICAgICAgICAgICAgIGg6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNpemVEeW5hbWljOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=