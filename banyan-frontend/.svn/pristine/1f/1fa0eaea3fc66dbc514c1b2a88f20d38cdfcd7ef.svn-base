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
var OrganizationInformationComponent = /** @class */ (function () {
    function OrganizationInformationComponent(location, orgService, notification, translate) {
        var _this = this;
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
        function (res) {
            _this.orgTranslations = res['COMMON.MODULE.ORGANIZATION'];
        }));
    }
    /**
     * @return {?}
     */
    OrganizationInformationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.logoUrl = this.orgService.getLogoUrlByOrganization(this.organization);
        this.isAvatarExist = !!(this.logoUrl);
    };
    /**
     * @return {?}
     */
    OrganizationInformationComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    OrganizationInformationComponent.prototype.onSelectFile = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.fileUpload && this.fileUpload.nativeElement) {
            this.fileUpload.nativeElement.click();
        }
    };
    /**
     * @return {?}
     */
    OrganizationInformationComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        if (this.fileUpload && this.fileUpload.nativeElement.value) {
            this.updateLogo();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    OrganizationInformationComponent.prototype.updateBlankImage = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event) {
            this.logoUrl = iNet.BLANK_IMAGE_URL;
        }
    };
    /**
     * @return {?}
     */
    OrganizationInformationComponent.prototype.removeImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.orgTranslations, REMOVE_LOGO = _a.REMOVE_LOGO, REMOVE_LOGO_SUCCESSFUL_MSG = _a.REMOVE_LOGO_SUCCESSFUL_MSG, REMOVE_LOGO_ERROR_MSG = _a.REMOVE_LOGO_ERROR_MSG;
        this.isAvatarExist = false;
        this.isChanged = false;
        if (this.fileUpload.nativeElement.value) {
            this.fileUpload.nativeElement.value = '';
            this.logoUrl = '';
        }
        else {
            /** @type {?} */
            var fd = new FormData(this.logoFrmElementRef.nativeElement);
            fd.append('remove', 'true');
            this.orgService.updateLogo(fd).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (ErrorMessage.TYPE !== data.type) {
                    _this.notification.showMessage(REMOVE_LOGO_SUCCESSFUL_MSG, 'success', REMOVE_LOGO);
                    _this.logoUrl = '';
                }
                else {
                    _this.notification.showMessage(REMOVE_LOGO_ERROR_MSG, 'error', REMOVE_LOGO);
                }
            }));
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OrganizationInformationComponent.prototype.changeFile = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var files = event.target.files;
        this.isChanged = this.fileUpload.nativeElement.value;
        if (files.length > 0) {
            /** @type {?} */
            var image_1 = files[0];
            if (image_1) {
                /** @type {?} */
                var reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    image_1.url = e.target.result;
                    _this.logoUrl = image_1.url;
                });
                reader.readAsDataURL(image_1);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    OrganizationInformationComponent.prototype.updateLogo = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.orgInfo.organId) { // Organization not exist
            return;
        }
        /** @type {?} */
        var formData = new FormData(this.logoFrmElementRef.nativeElement);
        formData.append('orgId', this.orgInfo.organId);
        // Upload Image to Media server
        this.orgService.updateLogo(formData).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (ErrorMessage.TYPE !== data.type) {
                /** @type {?} */
                var orgInfo = Object.assign(new OrganizationInformation(), data);
                _this.fileUpload.nativeElement.value = '';
                _this.isChanged = false;
                _this.logoUrl = _this.orgService.getLogoUrlByOrganization(orgInfo);
            }
            else {
                var _a = _this.orgTranslations, TITLE = _a.TITLE, UPDATE_LOGO_ERROR_MSG = _a.UPDATE_LOGO_ERROR_MSG;
                _this.notification.showMessage(UPDATE_LOGO_ERROR_MSG, 'error', TITLE);
            }
        }));
    };
    OrganizationInformationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-organization-information',
                    template: "<div class=\"row m-0 p-0\">\n    <div class=\"col-xl-4 col-lg-4 pl-0\">\n        <div class=\"text-center card-box\">\n            <div class=\"member-card\">\n                <div class=\"thumb-xl member-thumb mt-3 m-b-10 center-block\">\n                    <img *ngIf=\"logoUrl\" (click)=\"onSelectFile($event)\" [src]=\"logoUrl\"\n                         (error)=\"updateBlankImage($event)\"\n                         class=\"bg-logo img-thumbnail \" alt=\"Logo\">\n                    <div *ngIf=\"!logoUrl\" class=\"text-center upload-photo mt-3\" (click)=\"onSelectFile($event)\">\n                        <i aria-hidden=\"true\" class=\"fa fa-picture-o\"></i>\n                    </div>\n                </div>\n                <div class=\"mt-3\">\n                    <h5 class=\"m-b-5\">{{organization.name}}</h5>\n                    <p class=\"text-muted\">{{organization.organId}}</p>\n                </div>\n                <div *ngIf=\"editable\">\n                    <form #logoFrm class=\"mt-3\">\n                        <input #fileLogo name=\"fileUploadLogo\" type=\"file\" accept=\"image/*\" (change)=\"changeFile($event)\"\n                               class=\"form-control form-control-sm col-xs-12 col-sm-12 hide\">\n                    </form>\n                    <button type=\"button\" class=\"btn btn-primary btn-sm m-t-10\" (click)=\"onSelectFile($event)\">\n                        <i class=\"fa fa-upload\"></i> {{'COMMON.MODULE.ORGANIZATION.CHOSEN_IMAGE' | translate}}\n                    </button>\n                    <button *ngIf=\"isChanged\" type=\"button\" class=\"btn btn-success btn-sm ml-1 m-t-10\"\n                            (click)=\"onSave()\">\n                        <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> {{'COMMON.MODULE.ORGANIZATION.SAVE_LOGO' |\n                        translate}}\n                    </button>\n                    <button *ngIf=\"isChanged || orgInfo.logo\" type=\"button\"\n                            (click)=\"removeImage()\" class=\"btn btn-danger btn-sm ml-1\">\n                        <i class=\"fa fa-trash\"></i> {{'COMMON.MODULE.ORGANIZATION.REMOVE_LOGO' | translate}}\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-xl-8 col-lg-8 p-0\">\n        <div class=\"card-box bs-form\" style=\"height: 100%;\">\n            <ng-template [ngTemplateOutlet]=\"tabContent\"></ng-template>\n        </div>\n    </div>\n</div>\n",
                    styles: [".content-profile{min-height:250px;padding:0 15px 15px 0}.m-b-3{margin-bottom:30px!important}.box-profile{padding:10px}.img-circle{border-radius:50%}.m-b-2{margin-bottom:20px!important}.profile-username{font-size:21px;margin-top:5px}.info-box{display:block;min-height:90px;background:#fff;width:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa;border-radius:5px;height:100%;padding:15px}.margin-r-5{margin-right:5px}.card{position:relative;display:flex;flex-direction:column;background-color:#fff;border-radius:.25rem}.tab-style1{border:0}.card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;background-color:#fff;height:100%;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.text-muted{color:#80898e!important}:host /deep/ .icon-div{width:42px;position:relative}:host /deep/ .icon-custom{position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%,-50%)}:host /deep/ .upload-signature-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;width:260px;cursor:pointer}:host /deep/ .signature-thumbnail{cursor:pointer;max-width:100%;max-height:300px}.empty-photo{text-align:center;border:2px dashed #acacac;background:#f3f3f3;cursor:pointer;height:150px;width:150px}:host /deep/ .card-box{padding:10px 20px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;box-shadow:1px 1px 20px #bababa;-o-box-shadow:1px 1px 20px #bababa;-webkit-box-shadow:1px 1px 20px #bababa;-moz-box-shadow:1px 1px 20px #bababa}.img-thumbnail{padding:0;width:220px;height:100%;cursor:pointer}.upload-photo{text-align:center;font-size:130px;border:2px dashed #acacac;background:#f3f3f3;max-height:220px;width:100%;cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    OrganizationInformationComponent.ctorParameters = function () { return [
        { type: Location },
        { type: OrganizationService },
        { type: NotificationService },
        { type: TranslateService }
    ]; };
    OrganizationInformationComponent.propDecorators = {
        orgInfo: [{ type: Input }],
        organization: [{ type: Input }],
        editable: [{ type: Input }],
        fileUpload: [{ type: ViewChild, args: ['fileLogo',] }],
        logoFrmElementRef: [{ type: ViewChild, args: ['logoFrm',] }],
        tabContent: [{ type: ContentChild, args: ['tabContent',] }]
    };
    return OrganizationInformationComponent;
}());
export { OrganizationInformationComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWluZm9ybWF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi1pbmZvcm1hdGlvbi9vcmdhbml6YXRpb24taW5mb3JtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLFdBQVcsRUFDWCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBSXREO0lBcUJJLDBDQUFvQixRQUFrQixFQUNsQixVQUErQixFQUMvQixZQUFpQyxFQUNqQyxTQUEyQjtRQUgvQyxpQkFRQztRQVJtQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQXFCO1FBQy9CLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQWpCdEMsWUFBTyxHQUE0QixJQUFJLHVCQUF1QixFQUFFLENBQUM7UUFDakUsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxhQUFRLEdBQUksS0FBSyxDQUFDO1FBUTNCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGNBQVMsR0FB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R0FBRyxFQUFFLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0csSUFBQSwwQkFBcUQsRUFBcEQsZ0JBQUssRUFBRSxnREFBNkM7Z0JBQzNELEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN4RTtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBckhKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxpOUVBQXdEOztpQkFFM0Q7Ozs7Z0JBZE8sUUFBUTtnQkFLUixtQkFBbUI7Z0JBSkwsbUJBQW1CO2dCQUVqQyxnQkFBZ0I7OzswQkFjbkIsS0FBSzsrQkFDTCxLQUFLOzJCQUVMLEtBQUs7NkJBRUwsU0FBUyxTQUFDLFVBQVU7b0NBQ3BCLFNBQVMsU0FBQyxTQUFTOzZCQUVuQixZQUFZLFNBQUMsWUFBWTs7SUF1RzlCLHVDQUFDO0NBQUEsQUF0SEQsSUFzSEM7U0FqSFksZ0NBQWdDOzs7SUFFekMsbURBQTBFOztJQUMxRSx3REFBeUQ7O0lBRXpELG9EQUEyQjs7SUFDM0IsbURBQWdCOztJQUNoQixzREFBOEM7O0lBQzlDLDZEQUFvRDs7SUFFcEQsc0RBQWdFOzs7OztJQUNoRSwyREFBNkI7Ozs7O0lBQzdCLGlFQUFxRDs7SUFDckQseURBQXNCOztJQUN0QixxREFBaUI7Ozs7O0lBRUwsb0RBQTBCOzs7OztJQUMxQixzREFBdUM7Ozs7O0lBQ3ZDLHdEQUF5Qzs7Ozs7SUFDekMscURBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFcnJvck1lc3NhZ2UsIE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge09yZ2FuaXphdGlvbkluZm9ybWF0aW9ufSBmcm9tICcuLi8uLi9tb2RlbC9vcmdhbml6YXRpb24taW5mb3JtYXRpb24nO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7T3JnYW5pemF0aW9uU2VydmljZX0gZnJvbSAnLi4vb3JnYW5pemF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtPcmdhbml6YXRpb259IGZyb20gJy4uLy4uL21vZGVsL29yZ2FuaXphdGlvbic7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtb3JnYW5pemF0aW9uLWluZm9ybWF0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JnYW5pemF0aW9uLWluZm9ybWF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9vcmdhbml6YXRpb24taW5mb3JtYXRpb24uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvbkluZm9ybWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgb3JnSW5mbzogT3JnYW5pemF0aW9uSW5mb3JtYXRpb24gPSBuZXcgT3JnYW5pemF0aW9uSW5mb3JtYXRpb24oKTtcbiAgICBASW5wdXQoKSBvcmdhbml6YXRpb246IE9yZ2FuaXphdGlvbiA9IG5ldyBPcmdhbml6YXRpb24oKTtcblxuICAgIEBJbnB1dCgpIGVkaXRhYmxlID0gIGZhbHNlO1xuICAgIGxvZ29Vcmw6IHN0cmluZztcbiAgICBAVmlld0NoaWxkKCdmaWxlTG9nbycpIGZpbGVVcGxvYWQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbG9nb0ZybScpIGxvZ29Gcm1FbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZCgndGFiQ29udGVudCcpIHRhYkNvbnRlbnQ6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIHByaXZhdGUgb3JnVHJhbnNsYXRpb25zOiBhbnk7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0cmFuc2xhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBpc0F2YXRhckV4aXN0ID0gZmFsc2U7XG4gICAgaXNDaGFuZ2VkPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3JnU2VydmljZTogT3JnYW5pemF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbiA9IHRyYW5zbGF0ZS5nZXQoWydDT01NT04uTU9EVUxFLk9SR0FOSVpBVElPTiddKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMub3JnVHJhbnNsYXRpb25zID0gcmVzWydDT01NT04uTU9EVUxFLk9SR0FOSVpBVElPTiddO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2dvVXJsID0gdGhpcy5vcmdTZXJ2aWNlLmdldExvZ29VcmxCeU9yZ2FuaXphdGlvbih0aGlzLm9yZ2FuaXphdGlvbik7XG4gICAgICAgIHRoaXMuaXNBdmF0YXJFeGlzdCA9ICEhKHRoaXMubG9nb1VybCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0RmlsZSgkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZVVwbG9hZCAmJiB0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5maWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2F2ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZVVwbG9hZCAmJiB0aGlzLmZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMb2dvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVCbGFua0ltYWdlKCRldmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmxvZ29VcmwgPSBpTmV0LkJMQU5LX0lNQUdFX1VSTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUltYWdlKCkge1xuICAgICAgICBjb25zdCB7UkVNT1ZFX0xPR08sIFJFTU9WRV9MT0dPX1NVQ0NFU1NGVUxfTVNHLCBSRU1PVkVfTE9HT19FUlJPUl9NU0d9ID0gdGhpcy5vcmdUcmFuc2xhdGlvbnM7XG4gICAgICAgIHRoaXMuaXNBdmF0YXJFeGlzdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5maWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB0aGlzLmxvZ29VcmwgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZkID0gbmV3IEZvcm1EYXRhKHRoaXMubG9nb0ZybUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBmZC5hcHBlbmQoJ3JlbW92ZScsICd0cnVlJyk7XG4gICAgICAgICAgICB0aGlzLm9yZ1NlcnZpY2UudXBkYXRlTG9nbyhmZCkuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShSRU1PVkVfTE9HT19TVUNDRVNTRlVMX01TRywgJ3N1Y2Nlc3MnLCBSRU1PVkVfTE9HTyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nb1VybCA9ICcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKFJFTU9WRV9MT0dPX0VSUk9SX01TRywgJ2Vycm9yJywgUkVNT1ZFX0xPR08pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlRmlsZShldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICB0aGlzLmlzQ2hhbmdlZCA9IHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBmaWxlc1swXTtcbiAgICAgICAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UudXJsID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ29VcmwgPSBpbWFnZS51cmw7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChpbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxvZ28oKSB7XG4gICAgICAgIGlmICghdGhpcy5vcmdJbmZvLm9yZ2FuSWQpIHsgLy8gT3JnYW5pemF0aW9uIG5vdCBleGlzdFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMubG9nb0ZybUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnb3JnSWQnLCB0aGlzLm9yZ0luZm8ub3JnYW5JZCk7XG5cbiAgICAgICAgLy8gVXBsb2FkIEltYWdlIHRvIE1lZGlhIHNlcnZlclxuICAgICAgICB0aGlzLm9yZ1NlcnZpY2UudXBkYXRlTG9nbyhmb3JtRGF0YSkuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JnSW5mbyA9IE9iamVjdC5hc3NpZ24obmV3IE9yZ2FuaXphdGlvbkluZm9ybWF0aW9uKCksIGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ29VcmwgPSB0aGlzLm9yZ1NlcnZpY2UuZ2V0TG9nb1VybEJ5T3JnYW5pemF0aW9uKG9yZ0luZm8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7VElUTEUsIFVQREFURV9MT0dPX0VSUk9SX01TR30gPSB0aGlzLm9yZ1RyYW5zbGF0aW9ucztcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShVUERBVEVfTE9HT19FUlJPUl9NU0csICdlcnJvcicsIFRJVExFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19