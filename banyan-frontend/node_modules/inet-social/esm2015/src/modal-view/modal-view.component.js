/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
export class SocialModalViewComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.$modal = $(this.viewModal.nativeElement);
        this.$modal.on('hidden.bs.modal', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            delete this.activity;
        }));
        $(document.body).append(this.$modal);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.$modal.remove();
    }
    /**
     * @param {?} activity
     * @return {?}
     */
    viewActivity(activity) {
        this.activity = activity;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.$modal.modal('show');
        }), 100);
    }
}
SocialModalViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-social-modal-view',
                template: "<div #viewModal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Th\u1EA3o lu\u1EADn</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n                <div *ngIf=\"activity\" socialActivity [activity]=\"activity\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
SocialModalViewComponent.ctorParameters = () => [];
SocialModalViewComponent.propDecorators = {
    viewModal: [{ type: ViewChild, args: ['viewModal',] }]
};
if (false) {
    /** @type {?} */
    SocialModalViewComponent.prototype.viewModal;
    /** @type {?} */
    SocialModalViewComponent.prototype.activity;
    /** @type {?} */
    SocialModalViewComponent.prototype.$modal;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9tb2RhbC12aWV3L21vZGFsLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBU3pGLE1BQU0sT0FBTyx3QkFBd0I7SUFLbkMsZ0JBQWdCLENBQUM7Ozs7SUFFakIsZUFBZTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7UUFFSCxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLFFBQXdCO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7OztZQS9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsZ3JCQUEwQzs7YUFFM0M7Ozs7O3dCQUVFLFNBQVMsU0FBQyxXQUFXOzs7O0lBQXRCLDZDQUE4Qzs7SUFDOUMsNENBQXlCOztJQUN6QiwwQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tICcuLi9tb2RlbC9BY3Rpdml0eSc7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zb2NpYWwtbW9kYWwtdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kYWwtdmlldy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU29jaWFsTW9kYWxWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgndmlld01vZGFsJykgdmlld01vZGFsOiBFbGVtZW50UmVmO1xuICBhY3Rpdml0eTogU29jaWFsQWN0aXZpdHk7XG4gICRtb2RhbDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLnZpZXdNb2RhbC5uYXRpdmVFbGVtZW50KTtcblxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoZSkgPT4ge1xuICAgICAgZGVsZXRlIHRoaXMuYWN0aXZpdHk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50LmJvZHkpLmFwcGVuZCh0aGlzLiRtb2RhbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLiRtb2RhbC5yZW1vdmUoKTtcbiAgfVxuXG4gIHZpZXdBY3Rpdml0eShhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpIHtcbiAgICB0aGlzLmFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xuICAgIH0sIDEwMCk7XG4gIH1cbn1cbiJdfQ==