/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ErrorMessage, NotificationService } from 'inet-core';
import { OrganizationInformation } from '../../model/organization-information';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from '../organization.service';
import { Organization } from '../../model/organization';
export class OrganizationInformationComponent {
    /**
     * @param {?} location
     * @param {?} orgService
     * @param {?} notification
     * @param {?} translate
     */
    constructor(location, orgService, notification, translate) {
        this.location = location;
        this.orgService = orgService;
        this.notification = notification;
        this.translate = translate;
        this.orgInfo = new OrganizationInformation();
        this.organization = new Organization();
        this.editable = false;
        this.isAvatarExist = false;
        this.isChanged = false;
        this.translateSubscription = translate.get(['COMMON.MODULE.ORGANIZATION']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.orgTranslations = res['COMMON.MODULE.ORGANIZATION'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.logoUrl = this.orgService.getLogoUrlByOrganization(this.organization);
        this.isAvatarExist = !!(this.logoUrl);
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
    onSelectFile($event) {
        if (this.fileUpload && this.fileUpload.nativeElement) {
            this.fileUpload.nativeElement.click();
        }
    }
    /**
     * @return {?}
     */
    onSave() {
        if (this.fileUpload && this.fileUpload.nativeElement.value) {
            this.updateLogo();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateBlankImage($event) {
        if ($event) {
            this.logoUrl = iNet.BLANK_IMAGE_URL;
        }
    }
    /**
     * @return {?}
     */
    removeImage() {
        const { REMOVE_LOGO, REMOVE_LOGO_SUCCESSFUL_MSG, REMOVE_LOGO_ERROR_MSG } = this.orgTranslations;
        this.isAvatarExist = false;
        this.isChanged = false;
        if (this.fileUpload.nativeElement.value) {
            this.fileUpload.nativeElement.value = '';
            this.logoUrl = '';
        }
        else {
            /** @type {?} */
            const fd = new FormData(this.logoFrmElementRef.nativeElement);
            fd.append('remove', 'true');
            this.orgService.updateLogo(fd).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (ErrorMessage.TYPE !== data.type) {
                    this.notification.showMessage(REMOVE_LOGO_SUCCESSFUL_MSG, 'success', REMOVE_LOGO);
                    this.logoUrl = '';
                }
                else {
                    this.notification.showMessage(REMOVE_LOGO_ERROR_MSG, 'error', REMOVE_LOGO);
                }
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeFile(event) {
        /** @type {?} */
        const files = event.target.files;
        this.isChanged = this.fileUpload.nativeElement.value;
        if (files.length > 0) {
            /** @type {?} */
            const image = files[0];
            if (image) {
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => {
                    image.url = e.target.result;
                    this.logoUrl = image.url;
                });
                reader.readAsDataURL(image);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateLogo() {
        if (!this.orgInfo.organId) { // Organization not exist
            return;
        }
        /** @type {?} */
        const formData = new FormData(this.logoFrmElementRef.nativeElement);
        formData.append('orgId', this.orgInfo.organId);
        // Upload Image to Media server
        this.orgService.updateLogo(formData).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                /** @type {?} */
                const orgInfo = Object.assign(new OrganizationInformation(), data);
                this.fileUpload.nativeElement.value = '';
                this.isChanged = false;
                this.logoUrl = this.orgService.getLogoUrlByOrganization(orgInfo);
            }
            else {
                const { TITLE, UPDATE_LOGO_ERROR_MSG } = this.orgTranslations;
                this.notification.showMessage(UPDATE_LOGO_ERROR_MSG, 'error', TITLE);
            }
        }));
    }
}
OrganizationInformationComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-organization-information',
                template: "<div class=\"row m-0 p-0\">\n    <div class=\"col-xl-4 col-lg-4 pl-0\">\n        <div class=\"text-center card-box\">\n            <div class=\"member-card\">\n                <div class=\"thumb-xl member-thumb mt-3 m-b-10 center-block\">\n                    <img *ngIf=\"logoUrl\" (click)=\"onSelectFile($event)\" [src]=\"logoUrl\"\n                         (error)=\"updateBlankImage($event)\"\n                         class=\"bg-logo img-thumbnail \" alt=\"Logo\">\n                    <div *ngIf=\"!logoUrl\" class=\"text-center upload-photo mt-3\" (click)=\"onSelectFile($event)\">\n                        <i aria-hidden=\"true\" class=\"fa fa-picture-o\"></i>\n                    </div>\n                </div>\n                <div class=\"mt-3\">\n                    <h5 class=\"m-b-5\">{{organization.name}}</h5>\n                    <p class=\"text-muted\">{{organization.organId}}</p>\n                </div>\n                <div *ngIf=\"editable\">\n                    <form #logoFrm class=\"mt-3\">\n                        <input #fileLogo name=\"fileUploadLogo\" type=\"file\" accept=\"image/*\" (change)=\"changeFile($event)\"\n                               class=\"form-control form-control-sm col-xs-12 col-sm-12 hide\">\n                    </form>\n                    <button type=\"button\" class=\"btn btn-primary btn-sm m-t-10\" (click)=\"onSelectFile($event)\">\n                        <i class=\"fa fa-upload\"></i> {{'COMMON.MODULE.ORGANIZATION.CHOSEN_IMAGE' | translate}}\n                    </button>\n                    <button *ngIf=\"isChanged\" type=\"button\" class=\"btn btn-success btn-sm ml-1 m-t-10\"\n                            (click)=\"onSave()\">\n                        <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> {{'COMMON.MODULE.ORGANIZATION.SAVE_LOGO' |\n                        translate}}\n                    </button>\n                    <button *ngIf=\"isChanged || orgInfo.logo\" type=\"button\"\n                            (click)=\"removeImage()\" class=\"btn btn-danger btn-sm ml-1\">\n                        <i class=\"fa fa-trash\"></i> {{'COMMON.MODULE.ORGANIZATION.REMOVE_LOGO' | translate}}\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-xl-8 col-lg-8 p-0\">\n        <div class=\"card-box bs-form\" style=\"height: 100%;\">\n            <ng-template [ngTemplateOutlet]=\"tabContent\"></ng-template>\n        </div>\n    </div>\n</div>\n",
                styles: [".content-profile{min-height:250px;padding:0 15px 15px 0}.m-b-3{margin-bottom:30px!important}.box-profile{padding:10px}.img-circle{border-radius:50%}.m-b-2{margin-bottom:20px!important}.profile-username{font-size:21px;margin-top:5px}.info-box{display:block;min-height:90px;background:#fff;width:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa;border-radius:5px;height:100%;padding:15px}.margin-r-5{margin-right:5px}.card{position:relative;display:flex;flex-direction:column;background-color:#fff;border-radius:.25rem}.tab-style1{border:0}.card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;background-color:#fff;height:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.text-muted{color:#80898e!important}:host /deep/ .icon-div{width:42px;position:relative}:host /deep/ .icon-custom{position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%,-50%)}:host /deep/ .upload-signature-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;width:260px;cursor:pointer}:host /deep/ .signature-thumbnail{cursor:pointer;max-width:100%;max-height:300px}.empty-photo{text-align:center;border:2px dashed #acacac;background:#f3f3f3;cursor:pointer;height:150px;width:150px}:host /deep/ .card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.img-thumbnail{padding:0;width:220px;height:100%;cursor:pointer}.upload-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;max-height:220px;width:100%;cursor:pointer}"]
            }] }
];
/** @nocollapse */
OrganizationInformationComponent.ctorParameters = () => [
    { type: Location },
    { type: OrganizationService },
    { type: NotificationService },
    { type: TranslateService }
];
OrganizationInformationComponent.propDecorators = {
    orgInfo: [{ type: Input }],
    organization: [{ type: Input }],
    editable: [{ type: Input }],
    fileUpload: [{ type: ViewChild, args: ['fileLogo',] }],
    logoFrmElementRef: [{ type: ViewChild, args: ['logoFrm',] }],
    tabContent: [{ type: ContentChild, args: ['tabContent',] }]
};
if (false) {
    /** @type {?} */
    OrganizationInformationComponent.prototype.orgInfo;
    /** @type {?} */
    OrganizationInformationComponent.prototype.organization;
    /** @type {?} */
    OrganizationInformationComponent.prototype.editable;
    /** @type {?} */
    OrganizationInformationComponent.prototype.logoUrl;
    /** @type {?} */
    OrganizationInformationComponent.prototype.fileUpload;
    /** @type {?} */
    OrganizationInformationComponent.prototype.logoFrmElementRef;
    /** @type {?} */
    OrganizationInformationComponent.prototype.tabContent;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.orgTranslations;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.translateSubscription;
    /** @type {?} */
    OrganizationInformationComponent.prototype.isAvatarExist;
    /** @type {?} */
    OrganizationInformationComponent.prototype.isChanged;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    OrganizationInformationComponent.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWluZm9ybWF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi1pbmZvcm1hdGlvbi9vcmdhbml6YXRpb24taW5mb3JtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLFdBQVcsRUFDWCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBU3RELE1BQU0sT0FBTyxnQ0FBZ0M7Ozs7Ozs7SUFnQnpDLFlBQW9CLFFBQWtCLEVBQ2xCLFVBQStCLEVBQy9CLFlBQWlDLEVBQ2pDLFNBQTJCO1FBSDNCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBakJ0QyxZQUFPLEdBQTRCLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUNqRSxpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELGFBQVEsR0FBSSxLQUFLLENBQUM7UUFRM0Isa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFFLEtBQUssQ0FBQztRQU9iLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUN2RixJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzdELENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBTTtRQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6QztJQUNMLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtZQUN4RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE1BQU07UUFDbkIsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDdkM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztjQUNELEVBQUMsV0FBVyxFQUFFLDBCQUEwQixFQUFFLHFCQUFxQixFQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWU7UUFDN0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNyQjthQUNJOztrQkFDSyxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUM3RCxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDbEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNILElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDOUU7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTs7Y0FDWCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3JELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O2tCQUNaLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksS0FBSyxFQUFFOztzQkFDRCxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNOzs7O2dCQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUU7b0JBQ3ZCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDN0IsQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUseUJBQXlCO1lBQ2xELE9BQU87U0FDVjs7Y0FDSyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUNuRSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9DLCtCQUErQjtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUN6RCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTs7c0JBQzNCLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksdUJBQXVCLEVBQUUsRUFBRSxJQUFJLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEU7aUJBQU07c0JBQ0csRUFBQyxLQUFLLEVBQUUscUJBQXFCLEVBQUMsR0FBRyxJQUFJLENBQUMsZUFBZTtnQkFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3hFO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFySEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLGk5RUFBd0Q7O2FBRTNEOzs7O1lBZE8sUUFBUTtZQUtSLG1CQUFtQjtZQUpMLG1CQUFtQjtZQUVqQyxnQkFBZ0I7OztzQkFjbkIsS0FBSzsyQkFDTCxLQUFLO3VCQUVMLEtBQUs7eUJBRUwsU0FBUyxTQUFDLFVBQVU7Z0NBQ3BCLFNBQVMsU0FBQyxTQUFTO3lCQUVuQixZQUFZLFNBQUMsWUFBWTs7OztJQVIxQixtREFBMEU7O0lBQzFFLHdEQUF5RDs7SUFFekQsb0RBQTJCOztJQUMzQixtREFBZ0I7O0lBQ2hCLHNEQUE4Qzs7SUFDOUMsNkRBQW9EOztJQUVwRCxzREFBZ0U7Ozs7O0lBQ2hFLDJEQUE2Qjs7Ozs7SUFDN0IsaUVBQXFEOztJQUNyRCx5REFBc0I7O0lBQ3RCLHFEQUFpQjs7Ozs7SUFFTCxvREFBMEI7Ozs7O0lBQzFCLHNEQUF1Qzs7Ozs7SUFDdkMsd0RBQXlDOzs7OztJQUN6QyxxREFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Vycm9yTWVzc2FnZSwgTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7T3JnYW5pemF0aW9uSW5mb3JtYXRpb259IGZyb20gJy4uLy4uL21vZGVsL29yZ2FuaXphdGlvbi1pbmZvcm1hdGlvbic7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHtPcmdhbml6YXRpb25TZXJ2aWNlfSBmcm9tICcuLi9vcmdhbml6YXRpb24uc2VydmljZSc7XG5pbXBvcnQge09yZ2FuaXphdGlvbn0gZnJvbSAnLi4vLi4vbW9kZWwvb3JnYW5pemF0aW9uJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1vcmdhbml6YXRpb24taW5mb3JtYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmdhbml6YXRpb24taW5mb3JtYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29yZ2FuaXphdGlvbi1pbmZvcm1hdGlvbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uSW5mb3JtYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBvcmdJbmZvOiBPcmdhbml6YXRpb25JbmZvcm1hdGlvbiA9IG5ldyBPcmdhbml6YXRpb25JbmZvcm1hdGlvbigpO1xuICAgIEBJbnB1dCgpIG9yZ2FuaXphdGlvbjogT3JnYW5pemF0aW9uID0gbmV3IE9yZ2FuaXphdGlvbigpO1xuXG4gICAgQElucHV0KCkgZWRpdGFibGUgPSAgZmFsc2U7XG4gICAgbG9nb1VybDogc3RyaW5nO1xuICAgIEBWaWV3Q2hpbGQoJ2ZpbGVMb2dvJykgZmlsZVVwbG9hZDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdsb2dvRnJtJykgbG9nb0ZybUVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkKCd0YWJDb250ZW50JykgdGFiQ29udGVudDogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgcHJpdmF0ZSBvcmdUcmFuc2xhdGlvbnM6IGFueTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRyYW5zbGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGlzQXZhdGFyRXhpc3QgPSBmYWxzZTtcbiAgICBpc0NoYW5nZWQ9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBvcmdTZXJ2aWNlOiBPcmdhbml6YXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdHJhbnNsYXRlLmdldChbJ0NPTU1PTi5NT0RVTEUuT1JHQU5JWkFUSU9OJ10pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcmdUcmFuc2xhdGlvbnMgPSByZXNbJ0NPTU1PTi5NT0RVTEUuT1JHQU5JWkFUSU9OJ107XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvZ29VcmwgPSB0aGlzLm9yZ1NlcnZpY2UuZ2V0TG9nb1VybEJ5T3JnYW5pemF0aW9uKHRoaXMub3JnYW5pemF0aW9uKTtcbiAgICAgICAgdGhpcy5pc0F2YXRhckV4aXN0ID0gISEodGhpcy5sb2dvVXJsKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZWxlY3RGaWxlKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5maWxlVXBsb2FkICYmIHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TYXZlKCkge1xuICAgICAgICBpZiAodGhpcy5maWxlVXBsb2FkICYmIHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxvZ28oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUJsYW5rSW1hZ2UoJGV2ZW50KSB7XG4gICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nb1VybCA9IGlOZXQuQkxBTktfSU1BR0VfVVJMO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlSW1hZ2UoKSB7XG4gICAgICAgIGNvbnN0IHtSRU1PVkVfTE9HTywgUkVNT1ZFX0xPR09fU1VDQ0VTU0ZVTF9NU0csIFJFTU9WRV9MT0dPX0VSUk9SX01TR30gPSB0aGlzLm9yZ1RyYW5zbGF0aW9ucztcbiAgICAgICAgdGhpcy5pc0F2YXRhckV4aXN0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5maWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMubG9nb1VybCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmQgPSBuZXcgRm9ybURhdGEodGhpcy5sb2dvRnJtRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGZkLmFwcGVuZCgncmVtb3ZlJywgJ3RydWUnKTtcbiAgICAgICAgICAgIHRoaXMub3JnU2VydmljZS51cGRhdGVMb2dvKGZkKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKFJFTU9WRV9MT0dPX1NVQ0NFU1NGVUxfTVNHLCAnc3VjY2VzcycsIFJFTU9WRV9MT0dPKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dvVXJsID0gJyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoUkVNT1ZFX0xPR09fRVJST1JfTVNHLCAnZXJyb3InLCBSRU1PVkVfTE9HTyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VGaWxlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgICAgIHRoaXMuaXNDaGFuZ2VkID0gdGhpcy5maWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGZpbGVzWzBdO1xuICAgICAgICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZS51cmwgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nb1VybCA9IGltYWdlLnVybDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTG9nbygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9yZ0luZm8ub3JnYW5JZCkgeyAvLyBPcmdhbml6YXRpb24gbm90IGV4aXN0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5sb2dvRnJtRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdvcmdJZCcsIHRoaXMub3JnSW5mby5vcmdhbklkKTtcblxuICAgICAgICAvLyBVcGxvYWQgSW1hZ2UgdG8gTWVkaWEgc2VydmVyXG4gICAgICAgIHRoaXMub3JnU2VydmljZS51cGRhdGVMb2dvKGZvcm1EYXRhKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmdJbmZvID0gT2JqZWN0LmFzc2lnbihuZXcgT3JnYW5pemF0aW9uSW5mb3JtYXRpb24oKSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nb1VybCA9IHRoaXMub3JnU2VydmljZS5nZXRMb2dvVXJsQnlPcmdhbml6YXRpb24ob3JnSW5mbyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtUSVRMRSwgVVBEQVRFX0xPR09fRVJST1JfTVNHfSA9IHRoaXMub3JnVHJhbnNsYXRpb25zO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKFVQREFURV9MT0dPX0VSUk9SX01TRywgJ2Vycm9yJywgVElUTEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=