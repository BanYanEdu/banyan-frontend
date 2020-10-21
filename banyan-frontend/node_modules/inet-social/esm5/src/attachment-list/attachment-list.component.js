/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SocialService } from '../social.service';
var AttachmentListComponent = /** @class */ (function () {
    function AttachmentListComponent(socialService) {
        this.socialService = socialService;
        this.attachments = [];
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
        if (changes.attachments) {
            this._indexFiles();
        }
    };
    /**
     * @param {?} file
     * @param {?} imageEl
     * @return {?}
     */
    AttachmentListComponent.prototype.viewImage = /**
     * @param {?} file
     * @param {?} imageEl
     * @return {?}
     */
    function (file, imageEl) {
        /** @type {?} */
        var options = {
            index: this._getImageIndex(file.id),
            clickElement: imageEl
        };
        this.socialService.viewImages(this._images, options);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    AttachmentListComponent.prototype.viewAttachment = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var file = data.file;
        /** @type {?} */
        var attachment = this._getAttachmentById(file.id);
        if (attachment) {
            if (file.image) {
                /** @type {?} */
                var imageEl = data.event.target;
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
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    AttachmentListComponent.prototype._getAttachmentById = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        for (var i = 0; i < this.attachments.length; i++) {
            if (this.attachments[i].gridfsUUID === id) {
                return this.attachments[i];
            }
        }
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    AttachmentListComponent.prototype._getImageIndex = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        for (var i = 0; i < this._images.length; i++) {
            if (this._images[i].id === id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * @private
     * @return {?}
     */
    AttachmentListComponent.prototype._indexFiles = /**
     * @private
     * @return {?}
     */
    function () {
        this.files = this.socialService.attachmentToFiles(this.attachments);
        // Index images to view later
        this._images = [];
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].image) {
                /** @type {?} */
                var attachment = this.attachments[i];
                this._images.push({
                    src: attachment.pathView,
                    id: attachment.gridfsUUID,
                    w: 1,
                    h: 1,
                    sizeDynamic: true
                });
            }
        }
    };
    AttachmentListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[attachmentList]',
                    template: "<file-list [files]=\"files\" [removable]=\"false\" (onClick)=\"viewAttachment($event)\"></file-list>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    AttachmentListComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    AttachmentListComponent.propDecorators = {
        attachments: [{ type: Input }]
    };
    return AttachmentListComponent;
}());
export { AttachmentListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2F0dGFjaG1lbnQtbGlzdC9hdHRhY2htZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBSWhEO0lBVUksaUNBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSnZDLGdCQUFXLEdBQWlCLEVBQUUsQ0FBQztRQUN4QyxVQUFLLEdBQW1CLEVBQUUsQ0FBQztJQUd5QixDQUFDOzs7OztJQUNyRCw2Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7Ozs7OztJQUVELDJDQUFTOzs7OztJQUFULFVBQVUsSUFBa0IsRUFBRSxPQUFvQjs7WUFDeEMsT0FBTyxHQUFHO1lBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNuQyxZQUFZLEVBQUUsT0FBTztTQUN4QjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7SUFFRCxnREFBYzs7OztJQUFkLFVBQWUsSUFBSTs7WUFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7O1lBQ2hCLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuRCxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTs7b0JBQ1IsT0FBTyxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQzVDLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7b0JBQzNCLDBCQUEwQjtvQkFDMUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDakQ7U0FDSjtJQUNMLENBQUM7Ozs7OztJQUVPLG9EQUFrQjs7Ozs7SUFBMUIsVUFBMkIsRUFBVTtRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtTQUNKO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sZ0RBQWM7Ozs7O0lBQXRCLFVBQXVCLEVBQVU7UUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMzQixPQUFPLENBQUMsQ0FBQzthQUNaO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Ozs7O0lBRU8sNkNBQVc7Ozs7SUFBbkI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBFLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTs7b0JBQ2YsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDZCxHQUFHLEVBQUUsVUFBVSxDQUFDLFFBQVE7b0JBQ3hCLEVBQUUsRUFBRSxVQUFVLENBQUMsVUFBVTtvQkFDekIsQ0FBQyxFQUFFLENBQUM7b0JBQ0osQ0FBQyxFQUFFLENBQUM7b0JBQ0osV0FBVyxFQUFFLElBQUk7aUJBQ3BCLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxDQUFDOztnQkE3RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGdIQUErQzs7aUJBRWxEOzs7O2dCQVJPLGFBQWE7Ozs4QkFVaEIsS0FBSzs7SUF3RVYsOEJBQUM7Q0FBQSxBQTlFRCxJQThFQztTQXpFWSx1QkFBdUI7OztJQUNoQyw4Q0FBd0M7O0lBQ3hDLHdDQUEyQjs7Ozs7SUFDM0IsMENBQXlCOzs7OztJQUViLGdEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSAnLi4vc29jaWFsLnNlcnZpY2UnO1xuaW1wb3J0IHtBdHRhY2htZW50fSBmcm9tICcuLi9tb2RlbC9BdHRhY2htZW50JztcbmltcG9ydCB7UGhvdG8sIEZpbGVMaXN0SXRlbX0gZnJvbSBcImluZXQtdWlcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbYXR0YWNobWVudExpc3RdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXR0YWNobWVudC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hdHRhY2htZW50LWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEF0dGFjaG1lbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBhdHRhY2htZW50czogQXR0YWNobWVudFtdID0gW107XG4gICAgZmlsZXM6IEZpbGVMaXN0SXRlbVtdID0gW107XG4gICAgcHJpdmF0ZSBfaW1hZ2VzOiBQaG90b1tdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlKSB7IH1cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRleEZpbGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2aWV3SW1hZ2UoZmlsZTogRmlsZUxpc3RJdGVtLCBpbWFnZUVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgaW5kZXg6IHRoaXMuX2dldEltYWdlSW5kZXgoZmlsZS5pZCksXG4gICAgICAgICAgICBjbGlja0VsZW1lbnQ6IGltYWdlRWxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLnZpZXdJbWFnZXModGhpcy5faW1hZ2VzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICB2aWV3QXR0YWNobWVudChkYXRhKSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBkYXRhLmZpbGU7XG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSB0aGlzLl9nZXRBdHRhY2htZW50QnlJZChmaWxlLmlkKTtcbiAgICAgICAgaWYgKGF0dGFjaG1lbnQpIHtcbiAgICAgICAgICAgIGlmIChmaWxlLmltYWdlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltYWdlRWw6IEhUTUxFbGVtZW50ID0gZGF0YS5ldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKGltYWdlRWwudGFnTmFtZSAhPT0gJ0lNRycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xpY2sgb24gaW1hZ2UncyBwYXJlbnRcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VFbCA9IGltYWdlRWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudmlld0ltYWdlKGZpbGUsIGltYWdlRWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2Uudmlld0F0dGFjaG1lbnQoYXR0YWNobWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRBdHRhY2htZW50QnlJZChpZDogc3RyaW5nKTogQXR0YWNobWVudCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRhY2htZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNbaV0uZ3JpZGZzVVVJRCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hdHRhY2htZW50c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEltYWdlSW5kZXgoaWQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5faW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW1hZ2VzW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luZGV4RmlsZXMoKSB7XG4gICAgICAgIHRoaXMuZmlsZXMgPSB0aGlzLnNvY2lhbFNlcnZpY2UuYXR0YWNobWVudFRvRmlsZXModGhpcy5hdHRhY2htZW50cyk7XG5cbiAgICAgICAgLy8gSW5kZXggaW1hZ2VzIHRvIHZpZXcgbGF0ZXJcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZXNbaV0uaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2htZW50ID0gdGhpcy5hdHRhY2htZW50c1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbWFnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogYXR0YWNobWVudC5wYXRoVmlldyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGF0dGFjaG1lbnQuZ3JpZGZzVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgdzogMSxcbiAgICAgICAgICAgICAgICAgICAgaDogMSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZUR5bmFtaWM6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==