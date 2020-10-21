/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
export class CropperAvatarDialogComponent {
    /**
     * @param {?} modalService
     */
    constructor(modalService) {
        this.modalService = modalService;
        this.cropperReady = false;
        this.onCropped = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onSelectFile = new EventEmitter();
        this.isModalShown = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.modalService.onShow.subscribe((/**
         * @return {?}
         */
        () => {
            this.isModalShown = true;
        }));
        this.modalService.onHide.subscribe((/**
         * @return {?}
         */
        () => {
            this.isModalShown = false;
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    imageCropped(event) {
        this.imageCroppedEvent = event;
    }
    /**
     * @return {?}
     */
    imageLoaded() {
        this.cropperReady = true;
    }
    /**
     * @return {?}
     */
    loadImageFailed() {
        //console.log('Load failed');
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    setImageChangedEvent($event) {
        this.imageChangedEvent = $event;
    }
    /**
     * @return {?}
     */
    hide() {
        this.modalRef.hide();
        this.setImageChangedEvent({});
        this.onHide.emit(this.imageCroppedEvent.base64);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    show($event) {
        this.setImageChangedEvent($event);
        if (!this.isModalShown) {
            this.modalRef = this.modalService.show(this.cropperModal);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    select($event) {
        this.onSelectFile.emit($event);
    }
    /**
     * @return {?}
     */
    submit() {
        this.onCropped.emit(this.imageCroppedEvent.base64);
        this.hide();
    }
    /**
     * @return {?}
     */
    getImageBlob() {
        return this.imageCroppedEvent.file;
    }
}
CropperAvatarDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-cropper-avatar-dialog',
                template: "<ng-template #cropperAvatarModal>\n    <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\"><i class=\"fa fa-crop\"></i> {{'COMMON.MODULE.CROPPER.TITLE' | translate }}</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body p-0\">\n        <image-cropper [imageChangedEvent]=\"imageChangedEvent\"\n                       [maintainAspectRatio]=\"true\"\n                       [aspectRatio]=\"1\" [resizeToWidth]=\"150\"\n                       [roundCropper]=\"true\" format=\"png\" outputType=\"both\"\n                       (imageCropped)=\"imageCropped($event)\"\n                       (imageLoaded)=\"imageLoaded()\"\n                       (loadImageFailed)=\"loadImageFailed()\"\n                       [style.display]=\"cropperReady ? null : 'none'\"></image-cropper>\n    </div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"select($event)\">\n            <i class=\"fa fa-picture-o\"></i> {{ 'COMMON.MODULE.CROPPER.SELECT_NEW_IMAGE'  | translate}}\n        </button>\n\n        <button type=\"button\" class=\"btn btn-success btn-sm ml-1\" (click)=\"submit()\">\n            <i class=\"fa fa-crop\"></i> {{ 'TOOLBAR.OK' | translate }}\n        </button>\n        <button type=\"button\" class=\"btn btn-danger btn-sm ml-1\" (click)=\"hide()\">\n            <i class=\"fa fa-times\"></i> {{ 'TOOLBAR.CANCEL' | translate }}\n        </button>\n    </div>\n</ng-template>"
            }] }
];
/** @nocollapse */
CropperAvatarDialogComponent.ctorParameters = () => [
    { type: BsModalService }
];
CropperAvatarDialogComponent.propDecorators = {
    cropperModal: [{ type: ViewChild, args: ['cropperAvatarModal',] }],
    onCropped: [{ type: Output }],
    onHide: [{ type: Output }],
    onSelectFile: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.cropperModal;
    /**
     * @type {?}
     * @private
     */
    CropperAvatarDialogComponent.prototype.modalRef;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.cropperReady;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.imageChangedEvent;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.imageCroppedEvent;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.onCropped;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.onHide;
    /** @type {?} */
    CropperAvatarDialogComponent.prototype.onSelectFile;
    /**
     * @type {?}
     * @private
     */
    CropperAvatarDialogComponent.prototype.isModalShown;
    /**
     * @type {?}
     * @private
     */
    CropperAvatarDialogComponent.prototype.modalService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci1hdmF0YXItZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvaW1hZ2UtY3JvcHBlci9jcm9wcGVyLWF2YXRhci9jcm9wcGVyLWF2YXRhci1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFPbkQsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQWFyQyxZQUFvQixZQUE0QjtRQUE1QixpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFQaEQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHWCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEMsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFDc0IsQ0FBQzs7OztJQUVwRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBd0I7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ1gsNkJBQTZCO0lBQ2pDLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsTUFBVztRQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLE1BQU07UUFDUCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7OztZQXJFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsK2xEQUFxRDthQUN4RDs7OztZQU5PLGNBQWM7OzsyQkFTakIsU0FBUyxTQUFDLG9CQUFvQjt3QkFPOUIsTUFBTTtxQkFDTixNQUFNOzJCQUNOLE1BQU07Ozs7SUFUUCxvREFBZ0U7Ozs7O0lBRWhFLGdEQUE2Qjs7SUFFN0Isb0RBQXFCOztJQUNyQix5REFBdUI7O0lBQ3ZCLHlEQUFxQzs7SUFDckMsaURBQXlDOztJQUN6Qyw4Q0FBc0M7O0lBQ3RDLG9EQUE0Qzs7Ozs7SUFDNUMsb0RBQTZCOzs7OztJQUNqQixvREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JzTW9kYWxTZXJ2aWNlfSBmcm9tICduZ3gtYm9vdHN0cmFwL21vZGFsJztcbmltcG9ydCB7QnNNb2RhbFJlZn0gZnJvbSAnbmd4LWJvb3RzdHJhcC9tb2RhbC9icy1tb2RhbC1yZWYuc2VydmljZSc7XG5pbXBvcnQge0ltYWdlQ3JvcHBlZEV2ZW50fSBmcm9tIFwiLi4vaW1hZ2UtY3JvcHBlci5jb21wb25lbnRcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWNyb3BwZXItYXZhdGFyLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Nyb3BwZXItYXZhdGFyLWRpYWxvZy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ3JvcHBlckF2YXRhckRpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdjcm9wcGVyQXZhdGFyTW9kYWwnKSBjcm9wcGVyTW9kYWw6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwcml2YXRlIG1vZGFsUmVmOiBCc01vZGFsUmVmO1xuXG4gICAgY3JvcHBlclJlYWR5ID0gZmFsc2U7XG4gICAgaW1hZ2VDaGFuZ2VkRXZlbnQ6IGFueTtcbiAgICBpbWFnZUNyb3BwZWRFdmVudDogSW1hZ2VDcm9wcGVkRXZlbnQ7XG4gICAgQE91dHB1dCgpIG9uQ3JvcHBlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25IaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdEZpbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgcHJpdmF0ZSBpc01vZGFsU2hvd24gPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogQnNNb2RhbFNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub25TaG93LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzTW9kYWxTaG93biA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLm9uSGlkZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc01vZGFsU2hvd24gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW1hZ2VDcm9wcGVkKGV2ZW50OiBJbWFnZUNyb3BwZWRFdmVudCkge1xuICAgICAgICB0aGlzLmltYWdlQ3JvcHBlZEV2ZW50ID0gZXZlbnQ7XG4gICAgfVxuXG4gICAgaW1hZ2VMb2FkZWQoKSB7XG4gICAgICAgIHRoaXMuY3JvcHBlclJlYWR5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsb2FkSW1hZ2VGYWlsZWQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0xvYWQgZmFpbGVkJyk7XG4gICAgfVxuXG4gICAgc2V0SW1hZ2VDaGFuZ2VkRXZlbnQoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbWFnZUNoYW5nZWRFdmVudCA9ICRldmVudDtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLm1vZGFsUmVmLmhpZGUoKTtcbiAgICAgICAgdGhpcy5zZXRJbWFnZUNoYW5nZWRFdmVudCh7fSk7XG4gICAgICAgIHRoaXMub25IaWRlLmVtaXQodGhpcy5pbWFnZUNyb3BwZWRFdmVudC5iYXNlNjQpO1xuICAgIH1cblxuICAgIHNob3coJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0SW1hZ2VDaGFuZ2VkRXZlbnQoJGV2ZW50KTtcbiAgICAgICAgaWYoIXRoaXMuaXNNb2RhbFNob3duKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmID0gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvdyh0aGlzLmNyb3BwZXJNb2RhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25TZWxlY3RGaWxlLmVtaXQoJGV2ZW50KTtcbiAgICB9XG5cbiAgICBzdWJtaXQoKSB7XG4gICAgICAgIHRoaXMub25Dcm9wcGVkLmVtaXQodGhpcy5pbWFnZUNyb3BwZWRFdmVudC5iYXNlNjQpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZUJsb2IoKTogQmxvYiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlQ3JvcHBlZEV2ZW50LmZpbGU7XG4gICAgfVxuXG59XG5cbiJdfQ==