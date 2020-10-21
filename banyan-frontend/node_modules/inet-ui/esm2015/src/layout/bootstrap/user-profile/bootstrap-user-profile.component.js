/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { CoreService, ErrorMessage, NewPassword, NotificationService, UserProfile, UserProfileService } from "inet-core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { Contact } from "../../../model/contact";
import { Address } from "../../../model/address";
import { GlobalContactService } from "../../../user-profile/global-contact.service";
import { TranslateService } from "@ngx-translate/core";
/** @type {?} */
const newPassword = new FormControl('', Validators.required);
/** @type {?} */
const confirmNewPassword = new FormControl('', CustomValidators.equalTo(newPassword));
export class BootstrapUserProfileComponent {
    /**
     * @param {?} location
     * @param {?} fb
     * @param {?} translate
     * @param {?} notificationService
     * @param {?} contactService
     * @param {?} userProfileService
     * @param {?} coreService
     */
    constructor(location, fb, translate, notificationService, contactService, userProfileService, coreService) {
        this.location = location;
        this.fb = fb;
        this.translate = translate;
        this.notificationService = notificationService;
        this.contactService = contactService;
        this.userProfileService = userProfileService;
        this.coreService = coreService;
        this.generalFormValid = false;
        this.password = new NewPassword();
        this.tabName = 'profile-general-info'; //default tab
        this.userProfile = new UserProfile();
        this.translateSubscription = translate.get(['COMMON.MODULE.USER_PROFILE']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.userTranslations = res['COMMON.MODULE.USER_PROFILE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadProfile();
        this.frmChangePassword = this.fb.group({
            password: [null, Validators.required],
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        });
        this.frmSignature = this.fb.group({
            signVerify: [null, Validators.required],
            fileUpload: [null, Validators.required]
        });
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
     * @private
     * @return {?}
     */
    loadProfile() {
        this.userProfileService.getProfile().subscribe((/**
         * @param {?} profile
         * @return {?}
         */
        (profile) => {
            this.userProfile = Object.assign(new UserProfile(), profile);
            this.profile = Object.assign(new Contact(), profile);
            // console.log("profile on load: ",this.profile);
            this.profile.lastName = this.userProfile.lname;
            this.profile.middleName = this.userProfile.mname;
            this.profile.firstName = this.userProfile.fname;
            if (this.userProfile.birthday) {
                this.profile.fullDateOfBirth = new Date(this.userProfile.birthday);
            }
            if (this.userProfile.phone) {
                this.profile.mobilePhone = this.userProfile.phone;
            }
            if (this.userProfile.email) {
                this.profile.primaryEmail = this.userProfile.email;
            }
            // if (this.profile.dateOfBirth) {
            //     this.profile.fullDateOfBirth = new Date(this.profile.dateOfBirth);
            // }
            this.profile.fullName = [this.profile.lastName, this.profile.middleName, this.profile.firstName].join(' ');
            if (!this.profile.address) {
                this.profile.address = new Address();
            }
            /*
            if (this.profile.avatar) {
                let avatarUrl: string;
                avatarUrl = this.coreService.getFileUrl(this.profile.avatar);
                if (this.userProfileService.getAvatarVersion() > 0) {
                    avatarUrl = `${avatarUrl}?version=${this.userProfileService.getAvatarVersion()}`;
                }
                this.avatarUrl = avatarUrl;
            }
             */
        }));
        this.userProfileService.getAvatarUrl().then((/**
         * @param {?} url
         * @return {?}
         */
        url => {
            this.avatarUrl = url;
        }));
        this.userProfileService.getSignPictureId().then((/**
         * @param {?} pictureId
         * @return {?}
         */
        pictureId => {
            if (pictureId) { //get signature image from contact service
                this.signatureUrl = this.contactService.getSignatureImageUrl();
            }
        }));
        this.userProfileService.getSignVerifyNumber().then((/**
         * @param {?} signVerifyNumber
         * @return {?}
         */
        signVerifyNumber => {
            if (signVerifyNumber) { //get signature image from contact service
                this.signVerifyNumber = signVerifyNumber;
            }
        }));
        /*
        this.contactService.getProfile().subscribe((data: Contact) => {
            this.profile = Object.assign(new Contact(), data);
            if (this.profile.dateOfBirth) {
                this.profile.fullDateOfBirth = new Date(this.profile.dateOfBirth);
            }
            this.profile.fullName = [this.profile.lastName, this.profile.middleName, this.profile.firstName].join(' ');
            if (!this.profile.address) {
                this.profile.address = new Address();
            }
            if(this.profile.avatar) {
                this.avatarUrl = this.coreService.getFileUrl(this.profile.avatar);
            }
        });
        */
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChange($event) {
        this.generalFormValid = $event;
    }
    /**
     * @return {?}
     */
    back() {
        this.location.back();
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    updateProfile($event) {
        if (this.generalFormValid) {
            /** @type {?} */
            let userProfile = Object.assign(new UserProfile(), this.profile);
            // console.log(userProfile, this.profile);
            userProfile.fname = this.profile.firstName;
            userProfile.mname = this.profile.middleName;
            userProfile.lname = this.profile.lastName;
            if (this.profile.fullDateOfBirth) {
                userProfile.birthday = this.profile.fullDateOfBirth.valueOf();
            }
            if (this.profile.mobilePhone) {
                userProfile.phone = this.profile.mobilePhone;
            }
            if (this.profile.primaryEmail) {
                userProfile.email = this.profile.primaryEmail;
            }
            if (userProfile.address) {
                userProfile.addressStr = JSON.stringify(userProfile.address);
            }
            delete userProfile.address;
            delete userProfile.fullName;
            this.userProfileService.update(userProfile).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                const { TITLE, UPDATE_PROFILE_SUCCESSFUL_MSG, UPDATE_PROFILE_ERROR_MSG } = this.userTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    this.notificationService.showMessage(UPDATE_PROFILE_SUCCESSFUL_MSG, 'success', TITLE);
                }
                else {
                    this.notificationService.showMessage(UPDATE_PROFILE_ERROR_MSG, 'error', TITLE);
                }
            }));
        }
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    changePassword($event) {
        if (this.frmChangePassword.valid) {
            this.contactService.showLoading();
            this.userProfileService.changePassword(this.password).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                const { USERNAME, CHANGE_PASSWORD_SUCCESSFUL_MSG, CURRENT_PASSWORD_INCORRECT, CHANGE_PASSWORD_ERROR_MSG } = this.userTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    if ("SUCCESS" === data.uuid) {
                        this.notificationService.showMessage(CHANGE_PASSWORD_SUCCESSFUL_MSG, 'sucsess', USERNAME);
                        this.frmChangePassword.reset();
                    }
                    else {
                        this.notificationService.showMessage(CURRENT_PASSWORD_INCORRECT, 'error', USERNAME);
                    }
                }
                else {
                    this.notificationService.showMessage(CHANGE_PASSWORD_ERROR_MSG, 'error', USERNAME);
                }
            }));
        }
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    updateSignature($event) {
        if (this.frmSignature.valid) {
            /** @type {?} */
            const formData = new FormData(this.frmSignaturePhotoElementRef.nativeElement);
            // Upload Signature
            this.contactService.uploadSignaturePhoto(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                const { SIGNATURE_INFORMATION, UPDATE_SIGNATURE_SUCCESSFUL_MSG, UPDATE_SIGNATURE_ERROR_MSG } = this.userTranslations;
                if (ErrorMessage.TYPE !== data.type) {
                    this.notificationService.showMessage(UPDATE_SIGNATURE_SUCCESSFUL_MSG, 'success', SIGNATURE_INFORMATION);
                }
                else {
                    this.notificationService.showMessage(UPDATE_SIGNATURE_ERROR_MSG, 'error', SIGNATURE_INFORMATION);
                }
            }));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeSignatureFile($event) {
        /** @type {?} */
        const files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            const image = files[0];
            if (image) {
                this.fileName = image['name'];
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => {
                    image.url = e.target.result;
                    this.signatureUrl = image.url;
                });
                reader.readAsDataURL(image);
            }
        }
        else {
            this.signatureUrl = null;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelectSignatureFile($event) {
        if (this.signatureFileUpload && this.signatureFileUpload.nativeElement) {
            this.signatureFileUpload.nativeElement.click();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    updateBlankImage($event) {
        if ($event) {
            this.signatureUrl = iNet.BLANK_IMAGE_URL;
        }
    }
    /**
     * @return {?}
     */
    clearSignatureForm() {
        if (this.signatureFileUpload.nativeElement.value) {
            this.signatureFileUpload.nativeElement.value = '';
            this.fileName = '';
            if (this.profile.avatar) {
                this.avatarUrl = this.coreService.getFileUrl(this.profile.avatar);
            }
        }
    }
    /**
     * @param {?} tabName
     * @return {?}
     */
    onSelectTab(tabName) {
        this.tabName = tabName;
    }
}
BootstrapUserProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-bootstrap-user-profile',
                template: "<div class=\"default-layout tb-visible\">\n    <app-common-toolbar></app-common-toolbar>\n    <div *ngIf=\"tabName!=='sharing-information'\" class=\"container-fluid nav-fixed-top cp-toolbar\">\n        <button *ngIf=\"tabName=='profile-general-info'\" [title]=\"'C\u1EADp nh\u1EADt th\u00F4ng tin c\u00E1 nh\u00E2n'\" (click)=\"updateProfile($event)\" class=\"btn btn-primary btn-sm\" [disabled]=\"!generalFormValid\" type=\"button\">\n            <i class=\"fa fa-save\"></i>\n        </button>\n        <button *ngIf=\"tabName==='profile-signature-info'\" [title]=\"'C\u1EADp nh\u1EADt ch\u1EEF k\u00FD s\u1ED1'\" class=\"btn btn-primary btn-sm\" [disabled]=\"!frmSignature.valid\" type=\"button\"\n                (click)=\"updateSignature($event)\">\n            <i class=\"fa fa-save\"></i> <!--{{'COMMON.MODULE.USER_PROFILE.UPDATE_SIGNATURE' | translate}}-->\n        </button>\n        <button *ngIf=\"tabName==='profile-security-info'\" [title]=\"'\u0110\u1ED5i m\u1EADt kh\u1EA9u'\" class=\"btn btn-primary btn-sm\" [disabled]=\"!frmChangePassword.valid\" type=\"button\"\n                (click)=\"changePassword($event)\">\n                <i class=\"fa fa-key\"></i> <!--{{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD' | translate}}-->\n        </button>\n    </div>\n    <div class=\"cp-content\" [ngClass]=\"tabName==='sharing-information'?'toolbar-none':''\">\n        <div class=\"container-fluid p-1\">\n            <app-user-profile *ngIf=\"profile\" [profile]=\"profile\" [imageAvatarUrl]=\"avatarUrl\" [upload]=\"true\">\n                <ng-template #tabContent>\n                    <tabset>\n                        <tab (select)=\"onSelectTab('profile-general-info')\" id=\"profile-general-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-id-card margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.GENERAL_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"mt-3\">\n                                <app-user-profile-info [profile]=\"profile\" [editable]=\"true\" (onValidate)=\"onChange($event)\"></app-user-profile-info>\n                            </div>\n<!--                            <div class=\"form-group margin-b-form-group row\">-->\n<!--                                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                <div class=\"col-sm-9 pl-0\">-->\n<!--                                    <button class=\"btn btn-primary btn-sm\" [disabled]=\"!generalFormValid\" type=\"button\" (click)=\"updateProfile($event)\">-->\n<!--                                        <i class=\"fa fa-save\"></i> {{'TOOLBAR.UPDATE' | translate}}-->\n<!--                                    </button>-->\n<!--                                </div>-->\n<!--                            </div>-->\n                        </tab>\n                        <tab (select)=\"onSelectTab('profile-signature-info')\" id=\"profile-signature-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-gear margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <form #frmSignaturePhoto [formGroup]=\"frmSignature\" (ngSubmit)=\"updateSignature($event)\" class=\"col-sm-12\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_VERIFY' | translate}}  <i class=\"required\"></i>:</label>\n                                            <div class=\"col-sm-4 pl-0\">\n                                                <div class=\"input-group\">\n                                                    <div class=\"input-group-prepend\">\n                                                        <div class=\"input-group-text\"><i class=\"fa fa-phone\"></i></div>\n                                                    </div>\n                                                    <input [formControl]=\"frmSignature.controls['signVerify']\" [(ngModel)]=\"signVerifyNumber\" name=\"phone\"\n                                                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                                                           [ngClass]=\"{'is-invalid':frmSignature.controls['signVerify'].hasError('required')\n                                                            && frmSignature.controls['signVerify'].touched}\"\n                                                           type=\"text\" maxlength=\"64\"/>\n                                                </div>\n                                                <div *ngIf=\"frmSignature.controls['signVerify'].hasError('required') && frmSignature.controls['signVerify'].touched\" class=\"text-danger mt-1\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_VERIFY_REQUIRED_MSG' | translate}}\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_FILE' | translate}}  <i class=\"required\"></i>:\n                                            </label>\n                                            <div class=\"col-sm-4 pl-0\">\n                                                <label class=\"i-file-input\">\n                                                    <input #signatureFileUpload [formControl]=\"frmSignature.controls['fileUpload']\" required\n                                                           name=\"fileUpload\" type=\"file\" accept=\"image/*\" (change)=\"changeSignatureFile($event)\"\n                                                           class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                                                        <span class=\"i-file-container\" [ngClass]=\"{'selected': fileName}\" [attr.data-title]=\"'COMMON.MODULE.USER_PROFILE.CHOOSE' | translate\">\n                                                            <span class=\"i-file-name\" [attr.data-title]=\"fileName || ('COMMON.MODULE.USER_PROFILE.NO_FILE' | translate)\">\n                                                                <i class=\"file-icon fa fa-upload\"></i>\n                                                            </span>\n                                                        </span>\n                                                    <a class=\"remove\" *ngIf=\"fileName\" href=\"javascript:;\" (click)=\"clearSignatureForm()\">\n                                                        <i class=\"fa fa-times\"></i>\n                                                    </a>\n                                                </label>\n                                                <!--input #signatureFileUpload [formControl]=\"frmSignature.controls['fileUpload']\" required\n                                                       name=\"fileUpload\" type=\"file\" accept=\"image/*\" (change)=\"changeSignatureFile($event)\"\n                                                       class=\"form-control form-control-sm col-xs-12 col-sm-12\"-->\n                                                <div *ngIf=\"!signatureUrl || frmSignature.controls['fileUpload'].hasError('required') && frmSignature.controls['fileUpload'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_FILE_REQUIRED_MSG' | translate}}\n                                                </div>\n                                                <div class=\"thumb-xl member-thumb mt-3 m-b-10 center-block\">\n                                                    <img *ngIf=\"signatureUrl\" (click)=\"onSelectSignatureFile($event)\" [src]=\"signatureUrl\" (error)=\"updateBlankImage($event)\"\n                                                         class=\"signature-thumbnail border\" alt=\"Signature\">\n                                                    <div *ngIf=\"!signatureUrl\" class=\"text-center upload-signature-photo mt-3\" (click)=\"onSelectSignatureFile($event)\">\n                                                        <i aria-hidden=\"true\" class=\"fa fa-picture-o\"></i>\n                                                    </div>\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n<!--                                    <div class=\"col-sm-12 mt-3\">-->\n<!--                                        <div class=\"form-group margin-b-form-group row\">-->\n<!--                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                            <div class=\"col-sm-9 pl-0\">-->\n<!--                                                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!frmSignature.valid\" type=\"button\" (click)=\"updateSignature($event)\">-->\n<!--                                                    <i class=\"fa fa-save\"></i> {{'COMMON.MODULE.USER_PROFILE.UPDATE_SIGNATURE' | translate}}-->\n<!--                                                </button>-->\n<!--                                            </div>-->\n<!--                                        </div>-->\n<!--                                    </div>-->\n                                </form>\n\n                            </div>\n                        </tab>\n                        <!--tab id=\"profile-access-role\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-user-secret margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.ACCESS_ROLE' | translate}}</b>\n                            </ng-template>\n                            <div class=\"mt-3\">\n                                <app-access-role></app-access-role>\n                            </div>\n                        </tab-->\n                        <tab (select)=\"onSelectTab('profile-security-info')\" id=\"profile-security-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-lock margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.SECURITY_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <form [formGroup]=\"frmChangePassword\" (ngSubmit)=\"changePassword($event)\" class=\"col-sm-12\">\n                                    <div class=\"col-sm-12 alert alert-info\">\n                                        {{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD_INFO_MSG' | translate}}\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.CURRENT_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.oldpass\" name=\"password\"\n                                                       [formControl]=\"frmChangePassword.controls['password']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid':frmChangePassword.controls['password'].hasError('required')\n                                                        && frmChangePassword.controls['password'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['password'].hasError('required')\n                                                 && frmChangePassword.controls['password'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.CURRENT_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.NEW_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.newpass\" name=\"newPassword\"\n                                                       [formControl]=\"frmChangePassword.controls['newPassword']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid':frmChangePassword.controls['newPassword'].hasError('required')\n                                                        && frmChangePassword.controls['newPassword'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['newPassword'].hasError('required')\n                                                 && frmChangePassword.controls['newPassword'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.NEW_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.CONFIRM_NEW_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.confirmpass\" name=\"confirmNewPassword\"\n                                                       [formControl]=\"frmChangePassword.controls['confirmNewPassword']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid': (frmChangePassword.controls['confirmNewPassword'].hasError('required')\n                                                        || frmChangePassword.controls['confirmNewPassword'].hasError('equalTo'))\n                                                        && frmChangePassword.controls['confirmNewPassword'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['confirmNewPassword'].hasError('required')\n                                                 && frmChangePassword.controls['confirmNewPassword'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.CONFIRM_NEW_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n\n                                                <div *ngIf=\"frmChangePassword.controls['confirmNewPassword'].hasError('equalTo')\n                                                 && frmChangePassword.controls['confirmNewPassword'].touched\"  class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.PASSWORD_DO_NOT_MATCH' | translate}}\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n<!--                                    <div class=\"col-sm-12\">-->\n<!--                                        <div class=\"form-group margin-b-form-group row\">-->\n<!--                                        <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                            <div class=\"col-sm-9 pl-0\">-->\n<!--                                                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!frmChangePassword.valid\" type=\"button\" (click)=\"changePassword($event)\">-->\n<!--                                                    <i class=\"fa fa-key\"></i> {{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD' | translate}}-->\n<!--                                                </button>-->\n<!--                                            </div>-->\n<!--                                        </div>-->\n<!--                                    </div>-->\n                                </form>\n                            </div>\n                        </tab>\n                        <tab (select)=\"onSelectTab('sharing-information')\" id=\"sharing-information\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-share-alt-square margin-r-5\"></i> {{'Chia s\u1EBB th\u00F4ng tin' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <div class=\"col-lg-12 p-0\">\n                                    <app-sharing-information-template></app-sharing-information-template>\n                                </div>\n                            </div>\n                        </tab>\n                    </tabset>\n                </ng-template>\n            </app-user-profile>\n        </div>\n    </div>\n</div>\n",
                styles: [':host { width: 100%; }']
            }] }
];
/** @nocollapse */
BootstrapUserProfileComponent.ctorParameters = () => [
    { type: Location },
    { type: FormBuilder },
    { type: TranslateService },
    { type: NotificationService },
    { type: GlobalContactService },
    { type: UserProfileService },
    { type: CoreService }
];
BootstrapUserProfileComponent.propDecorators = {
    profile: [{ type: Input }],
    frmSignaturePhotoElementRef: [{ type: ViewChild, args: ['frmSignaturePhoto',] }],
    signatureFileUpload: [{ type: ViewChild, args: ['signatureFileUpload',] }]
};
if (false) {
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.profile;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.generalFormValid;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.password;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.frmChangePassword;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.frmSignature;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.avatarUrl;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.signatureUrl;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.tabName;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.navButtonTitle;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.userTranslations;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.translateSubscription;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.userProfile;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.fileName;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.signVerifyNumber;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.frmSignaturePhotoElementRef;
    /** @type {?} */
    BootstrapUserProfileComponent.prototype.signatureFileUpload;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.notificationService;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.contactService;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.userProfileService;
    /**
     * @type {?}
     * @private
     */
    BootstrapUserProfileComponent.prototype.coreService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLXVzZXItcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2xheW91dC9ib290c3RyYXAvdXNlci1wcm9maWxlL2Jvb3RzdHJhcC11c2VyLXByb2ZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNILFdBQVcsRUFDWCxZQUFZLEVBQ1osV0FBVyxFQUNYLG1CQUFtQixFQUNMLFdBQVcsRUFDekIsa0JBQWtCLEVBQ3JCLE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBQyxXQUFXLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7O01BSy9DLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQzs7TUFDdEQsa0JBQWtCLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQVFyRixNQUFNLE9BQU8sNkJBQTZCOzs7Ozs7Ozs7O0lBcUJ0QyxZQUFvQixRQUFrQixFQUNsQixFQUFlLEVB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c0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7XG4gICAgQ29yZVNlcnZpY2UsXG4gICAgRXJyb3JNZXNzYWdlLFxuICAgIE5ld1Bhc3N3b3JkLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgUmVzcG9uc2VEYXRhLCBVc2VyUHJvZmlsZSxcbiAgICBVc2VyUHJvZmlsZVNlcnZpY2Vcbn0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gXCJuZzItdmFsaWRhdGlvblwiO1xuaW1wb3J0IHtDb250YWN0fSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvY29udGFjdFwiO1xuaW1wb3J0IHtBZGRyZXNzfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvYWRkcmVzc1wiO1xuaW1wb3J0IHtHbG9iYWxDb250YWN0U2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL3VzZXItcHJvZmlsZS9nbG9iYWwtY29udGFjdC5zZXJ2aWNlXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anMvU3Vic2NyaXB0aW9uXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuY29uc3QgbmV3UGFzc3dvcmQgPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuY29uc3QgY29uZmlybU5ld1Bhc3N3b3JkID0gbmV3IEZvcm1Db250cm9sKCcnLCBDdXN0b21WYWxpZGF0b3JzLmVxdWFsVG8obmV3UGFzc3dvcmQpKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtYm9vdHN0cmFwLXVzZXItcHJvZmlsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Jvb3RzdHJhcC11c2VyLXByb2ZpbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlczogWyc6aG9zdCB7IHdpZHRoOiAxMDAlOyB9J11cbn0pXG5cbmV4cG9ydCBjbGFzcyBCb290c3RyYXBVc2VyUHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBwcm9maWxlOiBDb250YWN0O1xuICAgIGdlbmVyYWxGb3JtVmFsaWQgPSBmYWxzZTtcblxuICAgIHBhc3N3b3JkID0gbmV3IE5ld1Bhc3N3b3JkKCk7XG4gICAgZnJtQ2hhbmdlUGFzc3dvcmQ6IEZvcm1Hcm91cDtcbiAgICBmcm1TaWduYXR1cmU6IEZvcm1Hcm91cDtcbiAgICBhdmF0YXJVcmw6IHN0cmluZztcbiAgICBzaWduYXR1cmVVcmw6IHN0cmluZztcblxuICAgIHRhYk5hbWU6IHN0cmluZyA9ICdwcm9maWxlLWdlbmVyYWwtaW5mbyc7IC8vZGVmYXVsdCB0YWJcbiAgICBuYXZCdXR0b25UaXRsZTogc3RyaW5nO1xuICAgIHByaXZhdGUgdXNlclRyYW5zbGF0aW9uczogYW55O1xuICAgIHByaXZhdGUgdHJhbnNsYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgdXNlclByb2ZpbGU6IFVzZXJQcm9maWxlID0gbmV3IFVzZXJQcm9maWxlKCk7XG4gICAgZmlsZU5hbWU6IHN0cmluZztcbiAgICBzaWduVmVyaWZ5TnVtYmVyOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKCdmcm1TaWduYXR1cmVQaG90bycpIGZybVNpZ25hdHVyZVBob3RvRWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdzaWduYXR1cmVGaWxlVXBsb2FkJykgc2lnbmF0dXJlRmlsZVVwbG9hZDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbnRhY3RTZXJ2aWNlOiBHbG9iYWxDb250YWN0U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJQcm9maWxlU2VydmljZTogVXNlclByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24gPSB0cmFuc2xhdGUuZ2V0KFsnQ09NTU9OLk1PRFVMRS5VU0VSX1BST0ZJTEUnXSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXJUcmFuc2xhdGlvbnMgPSByZXNbJ0NPTU1PTi5NT0RVTEUuVVNFUl9QUk9GSUxFJ107XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvYWRQcm9maWxlKCk7XG5cbiAgICAgICAgdGhpcy5mcm1DaGFuZ2VQYXNzd29yZCA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgcGFzc3dvcmQ6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIGNvbmZpcm1OZXdQYXNzd29yZDogY29uZmlybU5ld1Bhc3N3b3JkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZnJtU2lnbmF0dXJlID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBzaWduVmVyaWZ5OiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBmaWxlVXBsb2FkOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZFByb2ZpbGUoKSB7XG4gICAgICAgIHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmdldFByb2ZpbGUoKS5zdWJzY3JpYmUoKHByb2ZpbGU6IFVzZXJQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlID0gT2JqZWN0LmFzc2lnbihuZXcgVXNlclByb2ZpbGUoKSwgcHJvZmlsZSk7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUgPSBPYmplY3QuYXNzaWduKG5ldyBDb250YWN0KCksIHByb2ZpbGUpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByb2ZpbGUgb24gbG9hZDogXCIsdGhpcy5wcm9maWxlKTtcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZS5sYXN0TmFtZSA9IHRoaXMudXNlclByb2ZpbGUubG5hbWU7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUubWlkZGxlTmFtZSA9IHRoaXMudXNlclByb2ZpbGUubW5hbWU7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUuZmlyc3ROYW1lID0gdGhpcy51c2VyUHJvZmlsZS5mbmFtZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclByb2ZpbGUuYmlydGhkYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGUuZnVsbERhdGVPZkJpcnRoID0gbmV3IERhdGUodGhpcy51c2VyUHJvZmlsZS5iaXJ0aGRheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyUHJvZmlsZS5waG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZS5tb2JpbGVQaG9uZSA9IHRoaXMudXNlclByb2ZpbGUucGhvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyUHJvZmlsZS5lbWFpbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZS5wcmltYXJ5RW1haWwgPSB0aGlzLnVzZXJQcm9maWxlLmVtYWlsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnByb2ZpbGUuZGF0ZU9mQmlydGgpIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnByb2ZpbGUuZnVsbERhdGVPZkJpcnRoID0gbmV3IERhdGUodGhpcy5wcm9maWxlLmRhdGVPZkJpcnRoKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMucHJvZmlsZS5mdWxsTmFtZSA9IFt0aGlzLnByb2ZpbGUubGFzdE5hbWUsIHRoaXMucHJvZmlsZS5taWRkbGVOYW1lLCB0aGlzLnByb2ZpbGUuZmlyc3ROYW1lXS5qb2luKCcgJyk7XG4gICAgICAgICAgICBpZiAoIXRoaXMucHJvZmlsZS5hZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlLmFkZHJlc3MgPSBuZXcgQWRkcmVzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGUuYXZhdGFyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGF2YXRhclVybDogc3RyaW5nO1xuICAgICAgICAgICAgICAgIGF2YXRhclVybCA9IHRoaXMuY29yZVNlcnZpY2UuZ2V0RmlsZVVybCh0aGlzLnByb2ZpbGUuYXZhdGFyKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0QXZhdGFyVmVyc2lvbigpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmwgPSBgJHthdmF0YXJVcmx9P3ZlcnNpb249JHt0aGlzLnVzZXJQcm9maWxlU2VydmljZS5nZXRBdmF0YXJWZXJzaW9uKCl9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSBhdmF0YXJVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0QXZhdGFyVXJsKCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSB1cmxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0U2lnblBpY3R1cmVJZCgpLnRoZW4ocGljdHVyZUlkID0+IHtcbiAgICAgICAgICAgIGlmIChwaWN0dXJlSWQpIHsgLy9nZXQgc2lnbmF0dXJlIGltYWdlIGZyb20gY29udGFjdCBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgdGhpcy5zaWduYXR1cmVVcmwgPSB0aGlzLmNvbnRhY3RTZXJ2aWNlLmdldFNpZ25hdHVyZUltYWdlVXJsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmdldFNpZ25WZXJpZnlOdW1iZXIoKS50aGVuKHNpZ25WZXJpZnlOdW1iZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHNpZ25WZXJpZnlOdW1iZXIpIHsgLy9nZXQgc2lnbmF0dXJlIGltYWdlIGZyb20gY29udGFjdCBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgdGhpcy5zaWduVmVyaWZ5TnVtYmVyID0gc2lnblZlcmlmeU51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLypcbiAgICAgICAgdGhpcy5jb250YWN0U2VydmljZS5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKChkYXRhOiBDb250YWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUgPSBPYmplY3QuYXNzaWduKG5ldyBDb250YWN0KCksIGRhdGEpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZmlsZS5kYXRlT2ZCaXJ0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZS5mdWxsRGF0ZU9mQmlydGggPSBuZXcgRGF0ZSh0aGlzLnByb2ZpbGUuZGF0ZU9mQmlydGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm9maWxlLmZ1bGxOYW1lID0gW3RoaXMucHJvZmlsZS5sYXN0TmFtZSwgdGhpcy5wcm9maWxlLm1pZGRsZU5hbWUsIHRoaXMucHJvZmlsZS5maXJzdE5hbWVdLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9maWxlLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGUuYWRkcmVzcyA9IG5ldyBBZGRyZXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnByb2ZpbGUuYXZhdGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSB0aGlzLmNvcmVTZXJ2aWNlLmdldEZpbGVVcmwodGhpcy5wcm9maWxlLmF2YXRhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIG9uQ2hhbmdlKCRldmVudCkge1xuICAgICAgICB0aGlzLmdlbmVyYWxGb3JtVmFsaWQgPSAkZXZlbnQ7XG4gICAgfVxuXG4gICAgYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUHJvZmlsZSgkZXZlbnQ/IDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmdlbmVyYWxGb3JtVmFsaWQpIHtcbiAgICAgICAgICAgIGxldCB1c2VyUHJvZmlsZSA9IE9iamVjdC5hc3NpZ24obmV3IFVzZXJQcm9maWxlKCksIHRoaXMucHJvZmlsZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VyUHJvZmlsZSwgdGhpcy5wcm9maWxlKTtcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLmZuYW1lID0gdGhpcy5wcm9maWxlLmZpcnN0TmFtZTtcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLm1uYW1lID0gdGhpcy5wcm9maWxlLm1pZGRsZU5hbWU7XG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5sbmFtZSA9IHRoaXMucHJvZmlsZS5sYXN0TmFtZTtcblxuICAgICAgICAgICAgaWYodGhpcy5wcm9maWxlLmZ1bGxEYXRlT2ZCaXJ0aCl7XG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuYmlydGhkYXkgPSB0aGlzLnByb2ZpbGUuZnVsbERhdGVPZkJpcnRoLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucHJvZmlsZS5tb2JpbGVQaG9uZSl7XG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUucGhvbmUgPSB0aGlzLnByb2ZpbGUubW9iaWxlUGhvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnByb2ZpbGUucHJpbWFyeUVtYWlsKXtcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5lbWFpbCA9IHRoaXMucHJvZmlsZS5wcmltYXJ5RW1haWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1c2VyUHJvZmlsZS5hZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuYWRkcmVzc1N0ciA9IEpTT04uc3RyaW5naWZ5KHVzZXJQcm9maWxlLmFkZHJlc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHVzZXJQcm9maWxlLmFkZHJlc3M7XG4gICAgICAgICAgICBkZWxldGUgdXNlclByb2ZpbGUuZnVsbE5hbWU7XG4gICAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlU2VydmljZS51cGRhdGUodXNlclByb2ZpbGUpLnN1YnNjcmliZSgoZGF0YTogUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtUSVRMRSwgVVBEQVRFX1BST0ZJTEVfU1VDQ0VTU0ZVTF9NU0csIFVQREFURV9QUk9GSUxFX0VSUk9SX01TR30gPSB0aGlzLnVzZXJUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd01lc3NhZ2UoVVBEQVRFX1BST0ZJTEVfU1VDQ0VTU0ZVTF9NU0csICdzdWNjZXNzJywgVElUTEUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dNZXNzYWdlKFVQREFURV9QUk9GSUxFX0VSUk9SX01TRywgJ2Vycm9yJywgVElUTEUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY2hhbmdlUGFzc3dvcmQoJGV2ZW50Pykge1xuICAgICAgICBpZiAodGhpcy5mcm1DaGFuZ2VQYXNzd29yZC52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWN0U2VydmljZS5zaG93TG9hZGluZygpO1xuICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuY2hhbmdlUGFzc3dvcmQodGhpcy5wYXNzd29yZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge1VTRVJOQU1FLCBDSEFOR0VfUEFTU1dPUkRfU1VDQ0VTU0ZVTF9NU0csIENVUlJFTlRfUEFTU1dPUkRfSU5DT1JSRUNULCBDSEFOR0VfUEFTU1dPUkRfRVJST1JfTVNHfSA9IHRoaXMudXNlclRyYW5zbGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlNVQ0NFU1NcIiA9PT0gZGF0YS51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dNZXNzYWdlKENIQU5HRV9QQVNTV09SRF9TVUNDRVNTRlVMX01TRywgJ3N1Y3Nlc3MnLCBVU0VSTkFNRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm1DaGFuZ2VQYXNzd29yZC5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd01lc3NhZ2UoQ1VSUkVOVF9QQVNTV09SRF9JTkNPUlJFQ1QsICdlcnJvcicsIFVTRVJOQU1FKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93TWVzc2FnZShDSEFOR0VfUEFTU1dPUkRfRVJST1JfTVNHLCAnZXJyb3InLCBVU0VSTkFNRSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU2lnbmF0dXJlKCRldmVudD8pIHtcbiAgICAgICAgaWYgKHRoaXMuZnJtU2lnbmF0dXJlLnZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmZybVNpZ25hdHVyZVBob3RvRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIC8vIFVwbG9hZCBTaWduYXR1cmVcbiAgICAgICAgICAgIHRoaXMuY29udGFjdFNlcnZpY2UudXBsb2FkU2lnbmF0dXJlUGhvdG8oZm9ybURhdGEpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1NJR05BVFVSRV9JTkZPUk1BVElPTiwgVVBEQVRFX1NJR05BVFVSRV9TVUNDRVNTRlVMX01TRywgVVBEQVRFX1NJR05BVFVSRV9FUlJPUl9NU0d9ID0gdGhpcy51c2VyVHJhbnNsYXRpb25zO1xuXG4gICAgICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dNZXNzYWdlKFVQREFURV9TSUdOQVRVUkVfU1VDQ0VTU0ZVTF9NU0csICdzdWNjZXNzJywgU0lHTkFUVVJFX0lORk9STUFUSU9OKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd01lc3NhZ2UoVVBEQVRFX1NJR05BVFVSRV9FUlJPUl9NU0csICdlcnJvcicsIFNJR05BVFVSRV9JTkZPUk1BVElPTik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VTaWduYXR1cmVGaWxlKCRldmVudCkge1xuICAgICAgICBjb25zdCBmaWxlcyA9ICRldmVudC50YXJnZXQuZmlsZXM7XG4gICAgICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGZpbGVzWzBdO1xuICAgICAgICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTmFtZSA9IGltYWdlWyduYW1lJ107XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZS51cmwgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmF0dXJlVXJsID0gaW1hZ2UudXJsO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaWduYXR1cmVVcmwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZWxlY3RTaWduYXR1cmVGaWxlKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zaWduYXR1cmVGaWxlVXBsb2FkICYmIHRoaXMuc2lnbmF0dXJlRmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNpZ25hdHVyZUZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQmxhbmtJbWFnZSgkZXZlbnQpIHtcbiAgICAgICAgaWYgKCRldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zaWduYXR1cmVVcmwgPSBpTmV0LkJMQU5LX0lNQUdFX1VSTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2lnbmF0dXJlRm9ybSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmF0dXJlRmlsZVVwbG9hZC5uYXRpdmVFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNpZ25hdHVyZUZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5maWxlTmFtZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZmlsZS5hdmF0YXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuY29yZVNlcnZpY2UuZ2V0RmlsZVVybCh0aGlzLnByb2ZpbGUuYXZhdGFyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0VGFiKHRhYk5hbWU6IHN0cmluZyl7XG4gICAgICAgIHRoaXMudGFiTmFtZT10YWJOYW1lO1xuICAgIH1cblxufVxuIl19