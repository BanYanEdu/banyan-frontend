/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { Contact } from "../../model/contact";
import { Address } from "../../model/address";
import { GlobalContactService } from "../global-contact.service";
import { ErrorMessage, NotificationService, UserProfileService } from "inet-core";
import { TranslateService } from "@ngx-translate/core";
import { CropperAvatarDialogComponent } from "../../image-cropper/cropper-avatar/cropper-avatar-dialog.component";
export class UserProfileComponent {
    /**
     * @param {?} contactService
     * @param {?} userProfileService
     * @param {?} notification
     * @param {?} translate
     */
    constructor(contactService, userProfileService, notification, translate) {
        this.contactService = contactService;
        this.userProfileService = userProfileService;
        this.notification = notification;
        this.translate = translate;
        this.profile = new Contact();
        this.defaultAvatarUrl = UserProfileService.DEFAULT_AVATAR_URL;
        this.address = new Address();
        this.isAvatarExist = false;
        this.translateSubscription = translate.get(['COMMON.MODULE.USER_PROFILE']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.profileTranslations = res['COMMON.MODULE.USER_PROFILE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.profile.address) {
            this.profile.address = new Address();
        }
        this.isAvatarExist = !!(this.imageAvatarUrl); // Check avatar exist to delete
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeFileAvatar($event) {
        /** @type {?} */
        const files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            const image = files[0];
            image['value'] = image;
            if (image) {
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => {
                    image.url = e.target.result;
                    this.imageAvatarUrl = image.url;
                });
                reader.readAsDataURL(image);
            }
            this.cropperAvatarDialog.show($event);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelectFile($event) {
        if (!this.upload) {
            return;
        }
        if (this.fileUpload && this.fileUpload.nativeElement) {
            this.fileUpload.nativeElement.click();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    uploadImage($event) {
        if (this.fileUpload.nativeElement.value) {
            this.updateAvatar();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    removeImage($event) {
        if (this.fileUpload.nativeElement.value) {
            this.fileUpload.nativeElement.value = '';
            if (this.isAvatarExist) {
                this.userProfileService.getAvatarUrl().then((/**
                 * @param {?} url
                 * @return {?}
                 */
                url => {
                    this.imageAvatarUrl = url;
                }));
            }
            else {
                this.imageAvatarUrl = this.defaultAvatarUrl;
            }
            //this.imageChangedEvent = $event;
        }
        // Delete avatar
        /*
        if (this.upload && this.isAvatarExist) {
            this.contactService.deleteAvatar().subscribe((data: any) => {
                const {AVATAR, IMAGE_REMOVE_SUCCESSFUL_MSG, IMAGE_REMOVE_ERROR_MSG} = this.profileTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    this.fileUpload.nativeElement.value = '';
                    this.notification.showMessage(IMAGE_REMOVE_SUCCESSFUL_MSG, 'success', AVATAR);
                } else {
                    this.notification.showMessage(IMAGE_REMOVE_ERROR_MSG, 'error', AVATAR);
                }
            });
        }
        */
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateBlankImage($event) {
        if ($event) {
            this.imageAvatarUrl = this.defaultAvatarUrl;
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateAvatar() {
        /** @type {?} */
        const formData = new FormData(this.photoFrmElementRef.nativeElement);
        /** @type {?} */
        const name = this.fileUpload.nativeElement.name;
        formData.delete(name);
        //Upload Blob (cropped image) instead of file.
        formData.append(name, this.cropperAvatarDialog.getImageBlob());
        // Upload Avatar
        this.contactService.uploadPhoto(formData).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            const { AVATAR, IMAGE_UPDATE_SUCCESSFUL_MSG, IMAGE_UPDATE_ERROR_MSG } = this.profileTranslations;
            if (ErrorMessage.TYPE !== data.type) {
                this.fileUpload.nativeElement.value = '';
                this.userProfileService.increaseAvatarVersion();
                this.notification.showMessage(IMAGE_UPDATE_SUCCESSFUL_MSG, 'success', AVATAR);
            }
            else {
                this.notification.showMessage(IMAGE_UPDATE_ERROR_MSG, 'error', AVATAR);
            }
        }));
    }
    /**
     * @param {?} url
     * @return {?}
     */
    onCropped(url) {
        this.imageAvatarUrl = url;
    }
}
UserProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-user-profile',
                template: "<div class=\"content-profile\">\n    <div class=\"row\">\n        <div class=\"col-lg-4\">\n            <div class=\"text-center card-box\">\n                <div class=\"member-card\">\n                    <div class=\"thumb-xl member-thumb mb-3 center-block\">\n                        <form #userPhotoFrm style=\"display: none\">\n                            <input #fileAvatar name=\"fileUpload\" (change)=\"changeFileAvatar($event)\" type=\"file\"\n                                   accept=\"image/*\"\n                                   class=\"form-control-file\">\n                        </form>\n                        <img [src]=\"imageAvatarUrl ? imageAvatarUrl: defaultAvatarUrl\" (error)=\"updateBlankImage($event)\"\n                             class=\"rounded-circle\" [ngClass]=\"{'empty-photo': !imageAvatarUrl, 'img-thumbnail': imageAvatarUrl}\"\n                             (click)=\"onSelectFile($event)\">\n                    </div>\n                    <div>\n                        <div *ngIf=\"upload\" class=\"m-t-10\">\n                            <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"fileAvatar.click()\">\n                                <i class=\"fa fa-picture-o\"></i> {{'COMMON.MODULE.USER_PROFILE.CHOSEN_IMAGE' | translate}}\n                            </button>\n                            <button *ngIf=\"fileUpload?.nativeElement?.value\" type=\"button\" class=\"btn btn-success btn-sm ml-1\" (click)=\"uploadImage($event)\">\n                                <i class=\"fa fa-upload\"></i> {{'COMMON.MODULE.USER_PROFILE.SAVE_IMAGE' | translate}}\n                            </button>\n                            <button *ngIf=\"fileUpload?.nativeElement?.value\" type=\"button\" (click)=\"removeImage($event)\" class=\"btn btn-danger btn-sm ml-1\">\n                                <i class=\"fa fa-trash\"></i> {{'COMMON.MODULE.USER_PROFILE.REMOVE_IMAGE' | translate}}\n                            </button>\n                        </div>\n                        <div class=\"mt-3\">\n                            <h5 *ngIf=\"profile.salutationType\">{{profile.salutationType}}. {{profile.firstName}}</h5>\n                            <h5 *ngIf=\"!profile.salutationType\">{{profile.fullName}}</h5>\n                            <p *ngIf=\"profile.userCode\" class=\"mt-0\">\n                                <i class=\"fa fa-user-circle\" aria-hidden=\"true\"></i>\n                                {{profile.userCode}}\n                            </p>\n                        </div>\n                    </div>\n                    <div class=\"text-left\">\n                        <div *ngIf=\"profile.salutationType\">\n                            <strong><i class=\"fa fa-id-card margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.FULL_NAME' | translate}}</strong>\n                            <p>{{profile.fullName}}</p>\n                        </div>\n                        <hr>\n                        <strong><i class=\"fa fa-phone margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.MOBILE' | translate}}</strong>\n                        <p class=\"text-muted\"><a href=\"tel:{{profile.mobilePhone}}\">{{profile.mobilePhone}}</a></p>\n                        <hr>\n                        <strong><i class=\"fa fa-envelope margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.EMAIL' | translate}}</strong>\n                        <p class=\"text-muted\"><a href=\"mailto:{{profile.primaryEmail}}\">{{profile.primaryEmail}}</a></p>\n                        <hr>\n                        <strong><i class=\"fa fa-map-marker margin-r-5\"></i> {{'COMMON.MODULE.ADDRESS.ADDRESS' | translate}}</strong>\n                        <p>{{profile.address?.address}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-lg-8 p-0\">\n            <div class=\"info-box\">\n                <div class=\"card tab-style1\">\n                    <div>\n                        <ng-template [ngTemplateOutlet]=\"tabContent\"></ng-template>\n                        <tabset *ngIf=\"!tabContent\">\n                            <tab id=\"profile-general-tab\">\n                                <ng-template tabHeading>\n                                    <b><i class=\"fa fa-id-card margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.GENERAL_INFORMATION' | translate}}</b>\n                                </ng-template>\n                                <app-user-profile-info [profile]=\"profile\"></app-user-profile-info>\n                            </tab>\n                        </tabset>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <app-cropper-avatar-dialog (onCropped)=\"onCropped($event)\" (onSelectFile)=\"onSelectFile($event)\"></app-cropper-avatar-dialog>\n</div>\n",
                styles: [".content-profile{min-height:250px;padding:0 15px 15px 0}.m-b-3{margin-bottom:30px!important}.box-profile{padding:10px}.img-circle{border-radius:50%}.m-b-2{margin-bottom:20px!important}.profile-username{font-size:21px;margin-top:5px}.info-box{display:block;min-height:90px;background:#fff;width:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa;border-radius:5px;height:100%;padding:15px}.margin-r-5{margin-right:5px}.card{position:relative;display:flex;flex-direction:column;background-color:#fff;border-radius:.25rem}.tab-style1{border:0}.card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;background-color:#fff;height:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.img-thumbnail{padding:0;width:150px;height:150px;cursor:pointer}.text-muted{color:#80898e!important}:host /deep/ .icon-div{width:42px;position:relative}:host /deep/ .icon-custom{position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%,-50%)}:host /deep/ .upload-signature-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;width:260px;cursor:pointer}:host /deep/ .signature-thumbnail{cursor:pointer;max-width:100%;max-height:300px}.empty-photo{text-align:center;border:2px dashed #acacac;background:#f3f3f3;cursor:pointer;height:150px;width:150px}"]
            }] }
];
/** @nocollapse */
UserProfileComponent.ctorParameters = () => [
    { type: GlobalContactService },
    { type: UserProfileService },
    { type: NotificationService },
    { type: TranslateService }
];
UserProfileComponent.propDecorators = {
    tabContent: [{ type: ContentChild, args: ['tabContent',] }],
    photoFrmElementRef: [{ type: ViewChild, args: ['userPhotoFrm',] }],
    fileUpload: [{ type: ViewChild, args: ['fileAvatar',] }],
    cropperAvatarDialog: [{ type: ViewChild, args: [CropperAvatarDialogComponent,] }],
    profile: [{ type: Input }],
    imageAvatarUrl: [{ type: Input }],
    upload: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    UserProfileComponent.prototype.tabContent;
    /** @type {?} */
    UserProfileComponent.prototype.photoFrmElementRef;
    /** @type {?} */
    UserProfileComponent.prototype.fileUpload;
    /** @type {?} */
    UserProfileComponent.prototype.cropperAvatarDialog;
    /** @type {?} */
    UserProfileComponent.prototype.profile;
    /** @type {?} */
    UserProfileComponent.prototype.imageAvatarUrl;
    /** @type {?} */
    UserProfileComponent.prototype.upload;
    /** @type {?} */
    UserProfileComponent.prototype.defaultAvatarUrl;
    /** @type {?} */
    UserProfileComponent.prototype.address;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.isAvatarExist;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.profileTranslations;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.contactService;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.userProfileService;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    UserProfileComponent.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdXNlci1wcm9maWxlL3VzZXItcHJvZmlsZS91c2VyLXByb2ZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFL0QsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNoRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvRUFBb0UsQ0FBQztBQU1oSCxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7O0lBbUI3QixZQUFvQixjQUFvQyxFQUNwQyxrQkFBc0MsRUFDdEMsWUFBaUMsRUFDakMsU0FBMkI7UUFIM0IsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3BDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBZnRDLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBSWpDLHFCQUFnQixHQUFHLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDO1FBQ3pELFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWhCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBVTFCLElB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LEdBQUcsQ0FBQztJQUM5QixDQUFDOzs7WUF2SUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDB3SkFBNEM7O2FBRS9DOzs7O1lBVE8sb0JBQW9CO1lBRWUsa0JBQWtCO1lBQXZDLG1CQUFtQjtZQUNqQyxnQkFBZ0I7Ozt5QkFTbkIsWUFBWSxTQUFDLFlBQVk7aUNBQ3pCLFNBQVMsU0FBQyxjQUFjO3lCQUN4QixTQUFTLFNBQUMsWUFBWTtrQ0FDdEIsU0FBUyxTQUFDLDRCQUE0QjtzQkFFdEMsS0FBSzs2QkFFTCxLQUFLO3FCQUNMLEtBQUs7Ozs7SUFSTiwwQ0FBZ0U7O0lBQ2hFLGtEQUEwRDs7SUFDMUQsMENBQWdEOztJQUNoRCxtREFBMkY7O0lBRTNGLHVDQUFpQzs7SUFFakMsOENBQWdDOztJQUNoQyxzQ0FBeUI7O0lBQ3pCLGdEQUF5RDs7SUFDekQsdUNBQXdCOzs7OztJQUV4Qiw2Q0FBOEI7Ozs7O0lBRTlCLG1EQUFpQzs7Ozs7SUFDakMscURBQXFEOzs7OztJQUV6Qyw4Q0FBNEM7Ozs7O0lBQzVDLGtEQUE4Qzs7Ozs7SUFDOUMsNENBQXlDOzs7OztJQUN6Qyx5Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250YWN0fSBmcm9tIFwiLi4vLi4vbW9kZWwvY29udGFjdFwiO1xuaW1wb3J0IHtBZGRyZXNzfSBmcm9tIFwiLi4vLi4vbW9kZWwvYWRkcmVzc1wiO1xuaW1wb3J0IHtHbG9iYWxDb250YWN0U2VydmljZX0gZnJvbSBcIi4uL2dsb2JhbC1jb250YWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtFcnJvck1lc3NhZ2UsIE5vdGlmaWNhdGlvblNlcnZpY2UsIFVzZXJQcm9maWxlU2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuaW1wb3J0IHtDcm9wcGVyQXZhdGFyRGlhbG9nQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vaW1hZ2UtY3JvcHBlci9jcm9wcGVyLWF2YXRhci9jcm9wcGVyLWF2YXRhci1kaWFsb2cuY29tcG9uZW50XCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC11c2VyLXByb2ZpbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi91c2VyLXByb2ZpbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3VzZXItcHJvZmlsZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVXNlclByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAQ29udGVudENoaWxkKCd0YWJDb250ZW50JykgdGFiQ29udGVudDogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQFZpZXdDaGlsZCgndXNlclBob3RvRnJtJykgcGhvdG9Gcm1FbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2ZpbGVBdmF0YXInKSBmaWxlVXBsb2FkOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoQ3JvcHBlckF2YXRhckRpYWxvZ0NvbXBvbmVudCkgY3JvcHBlckF2YXRhckRpYWxvZzogQ3JvcHBlckF2YXRhckRpYWxvZ0NvbXBvbmVudDtcblxuICAgIEBJbnB1dCgpIHByb2ZpbGUgPSBuZXcgQ29udGFjdCgpO1xuXG4gICAgQElucHV0KCkgaW1hZ2VBdmF0YXJVcmw6IHN0cmluZztcbiAgICBASW5wdXQoKSB1cGxvYWQ6IGJvb2xlYW47XG4gICAgZGVmYXVsdEF2YXRhclVybCA9IFVzZXJQcm9maWxlU2VydmljZS5ERUZBVUxUX0FWQVRBUl9VUkw7XG4gICAgYWRkcmVzcyA9IG5ldyBBZGRyZXNzKCk7XG5cbiAgICBwcml2YXRlIGlzQXZhdGFyRXhpc3QgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcHJvZmlsZVRyYW5zbGF0aW9uczogYW55O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNsYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhY3RTZXJ2aWNlOiBHbG9iYWxDb250YWN0U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJQcm9maWxlU2VydmljZTogVXNlclByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24gPSB0cmFuc2xhdGUuZ2V0KFsnQ09NTU9OLk1PRFVMRS5VU0VSX1BST0ZJTEUnXSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVUcmFuc2xhdGlvbnMgPSByZXNbJ0NPTU1PTi5NT0RVTEUuVVNFUl9QUk9GSUxFJ107XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvZmlsZS5hZGRyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUuYWRkcmVzcyA9IG5ldyBBZGRyZXNzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0F2YXRhckV4aXN0ID0gISEodGhpcy5pbWFnZUF2YXRhclVybCk7IC8vIENoZWNrIGF2YXRhciBleGlzdCB0byBkZWxldGVcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlRmlsZUF2YXRhcigkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSAkZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBmaWxlc1swXTtcbiAgICAgICAgICAgIGltYWdlWyd2YWx1ZSddID0gaW1hZ2U7XG4gICAgICAgICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnVybCA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZUF2YXRhclVybCA9IGltYWdlLnVybDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3JvcHBlckF2YXRhckRpYWxvZy5zaG93KCRldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNlbGVjdEZpbGUoJGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy51cGxvYWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5maWxlVXBsb2FkICYmIHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBsb2FkSW1hZ2UoJGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBdmF0YXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUltYWdlKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5maWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0F2YXRhckV4aXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0QXZhdGFyVXJsKCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlQXZhdGFyVXJsID0gdXJsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlQXZhdGFyVXJsID0gdGhpcy5kZWZhdWx0QXZhdGFyVXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RoaXMuaW1hZ2VDaGFuZ2VkRXZlbnQgPSAkZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGVsZXRlIGF2YXRhclxuICAgICAgICAvKlxuICAgICAgICBpZiAodGhpcy51cGxvYWQgJiYgdGhpcy5pc0F2YXRhckV4aXN0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhY3RTZXJ2aWNlLmRlbGV0ZUF2YXRhcigpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge0FWQVRBUiwgSU1BR0VfUkVNT1ZFX1NVQ0NFU1NGVUxfTVNHLCBJTUFHRV9SRU1PVkVfRVJST1JfTVNHfSA9IHRoaXMucHJvZmlsZVRyYW5zbGF0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShJTUFHRV9SRU1PVkVfU1VDQ0VTU0ZVTF9NU0csICdzdWNjZXNzJywgQVZBVEFSKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShJTUFHRV9SRU1PVkVfRVJST1JfTVNHLCAnZXJyb3InLCBBVkFUQVIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgdXBkYXRlQmxhbmtJbWFnZSgkZXZlbnQpIHtcbiAgICAgICAgaWYgKCRldmVudCkge1xuICAgICAgICAgICAgdGhpcy5pbWFnZUF2YXRhclVybCA9IHRoaXMuZGVmYXVsdEF2YXRhclVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQXZhdGFyKCkge1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLnBob3RvRnJtRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgY29uc3QgbmFtZSAgPSB0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC5uYW1lO1xuICAgICAgICBmb3JtRGF0YS5kZWxldGUobmFtZSk7XG4gICAgICAgIC8vVXBsb2FkIEJsb2IgKGNyb3BwZWQgaW1hZ2UpIGluc3RlYWQgb2YgZmlsZS5cbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKG5hbWUsIHRoaXMuY3JvcHBlckF2YXRhckRpYWxvZy5nZXRJbWFnZUJsb2IoKSk7XG4gICAgICAgIC8vIFVwbG9hZCBBdmF0YXJcbiAgICAgICAgdGhpcy5jb250YWN0U2VydmljZS51cGxvYWRQaG90byhmb3JtRGF0YSkuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtBVkFUQVIsIElNQUdFX1VQREFURV9TVUNDRVNTRlVMX01TRywgSU1BR0VfVVBEQVRFX0VSUk9SX01TR30gPSB0aGlzLnByb2ZpbGVUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuaW5jcmVhc2VBdmF0YXJWZXJzaW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoSU1BR0VfVVBEQVRFX1NVQ0NFU1NGVUxfTVNHLCAnc3VjY2VzcycsIEFWQVRBUik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKElNQUdFX1VQREFURV9FUlJPUl9NU0csICdlcnJvcicsIEFWQVRBUik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQ3JvcHBlZCh1cmw6IHN0cmluZykge1xuICAgICAgICB0aGlzLmltYWdlQXZhdGFyVXJsID0gdXJsO1xuICAgIH1cblxufVxuIl19