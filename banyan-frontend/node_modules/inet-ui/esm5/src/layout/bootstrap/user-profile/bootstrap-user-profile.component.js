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
var newPassword = new FormControl('', Validators.required);
/** @type {?} */
var confirmNewPassword = new FormControl('', CustomValidators.equalTo(newPassword));
var BootstrapUserProfileComponent = /** @class */ (function () {
    function BootstrapUserProfileComponent(location, fb, translate, notificationService, contactService, userProfileService, coreService) {
        var _this = this;
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
        function (res) {
            _this.userTranslations = res['COMMON.MODULE.USER_PROFILE'];
        }));
    }
    /**
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    };
    /**
     * @private
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.loadProfile = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.userProfileService.getProfile().subscribe((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            _this.userProfile = Object.assign(new UserProfile(), profile);
            _this.profile = Object.assign(new Contact(), profile);
            // console.log("profile on load: ",this.profile);
            _this.profile.lastName = _this.userProfile.lname;
            _this.profile.middleName = _this.userProfile.mname;
            _this.profile.firstName = _this.userProfile.fname;
            if (_this.userProfile.birthday) {
                _this.profile.fullDateOfBirth = new Date(_this.userProfile.birthday);
            }
            if (_this.userProfile.phone) {
                _this.profile.mobilePhone = _this.userProfile.phone;
            }
            if (_this.userProfile.email) {
                _this.profile.primaryEmail = _this.userProfile.email;
            }
            // if (this.profile.dateOfBirth) {
            //     this.profile.fullDateOfBirth = new Date(this.profile.dateOfBirth);
            // }
            _this.profile.fullName = [_this.profile.lastName, _this.profile.middleName, _this.profile.firstName].join(' ');
            if (!_this.profile.address) {
                _this.profile.address = new Address();
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
        function (url) {
            _this.avatarUrl = url;
        }));
        this.userProfileService.getSignPictureId().then((/**
         * @param {?} pictureId
         * @return {?}
         */
        function (pictureId) {
            if (pictureId) { //get signature image from contact service
                _this.signatureUrl = _this.contactService.getSignatureImageUrl();
            }
        }));
        this.userProfileService.getSignVerifyNumber().then((/**
         * @param {?} signVerifyNumber
         * @return {?}
         */
        function (signVerifyNumber) {
            if (signVerifyNumber) { //get signature image from contact service
                _this.signVerifyNumber = signVerifyNumber;
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
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.onChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.generalFormValid = $event;
    };
    /**
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        this.location.back();
    };
    /**
     * @param {?=} $event
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.updateProfile = /**
     * @param {?=} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        if (this.generalFormValid) {
            /** @type {?} */
            var userProfile = Object.assign(new UserProfile(), this.profile);
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
            function (data) {
                var _a = _this.userTranslations, TITLE = _a.TITLE, UPDATE_PROFILE_SUCCESSFUL_MSG = _a.UPDATE_PROFILE_SUCCESSFUL_MSG, UPDATE_PROFILE_ERROR_MSG = _a.UPDATE_PROFILE_ERROR_MSG;
                if (ErrorMessage.TYPE !== data.type) {
                    _this.notificationService.showMessage(UPDATE_PROFILE_SUCCESSFUL_MSG, 'success', TITLE);
                }
                else {
                    _this.notificationService.showMessage(UPDATE_PROFILE_ERROR_MSG, 'error', TITLE);
                }
            }));
        }
    };
    /**
     * @param {?=} $event
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.changePassword = /**
     * @param {?=} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        if (this.frmChangePassword.valid) {
            this.contactService.showLoading();
            this.userProfileService.changePassword(this.password).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                var _a = _this.userTranslations, USERNAME = _a.USERNAME, CHANGE_PASSWORD_SUCCESSFUL_MSG = _a.CHANGE_PASSWORD_SUCCESSFUL_MSG, CURRENT_PASSWORD_INCORRECT = _a.CURRENT_PASSWORD_INCORRECT, CHANGE_PASSWORD_ERROR_MSG = _a.CHANGE_PASSWORD_ERROR_MSG;
                if (ErrorMessage.TYPE !== data.type) {
                    if ("SUCCESS" === data.uuid) {
                        _this.notificationService.showMessage(CHANGE_PASSWORD_SUCCESSFUL_MSG, 'sucsess', USERNAME);
                        _this.frmChangePassword.reset();
                    }
                    else {
                        _this.notificationService.showMessage(CURRENT_PASSWORD_INCORRECT, 'error', USERNAME);
                    }
                }
                else {
                    _this.notificationService.showMessage(CHANGE_PASSWORD_ERROR_MSG, 'error', USERNAME);
                }
            }));
        }
    };
    /**
     * @param {?=} $event
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.updateSignature = /**
     * @param {?=} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        if (this.frmSignature.valid) {
            /** @type {?} */
            var formData = new FormData(this.frmSignaturePhotoElementRef.nativeElement);
            // Upload Signature
            this.contactService.uploadSignaturePhoto(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                var _a = _this.userTranslations, SIGNATURE_INFORMATION = _a.SIGNATURE_INFORMATION, UPDATE_SIGNATURE_SUCCESSFUL_MSG = _a.UPDATE_SIGNATURE_SUCCESSFUL_MSG, UPDATE_SIGNATURE_ERROR_MSG = _a.UPDATE_SIGNATURE_ERROR_MSG;
                if (ErrorMessage.TYPE !== data.type) {
                    _this.notificationService.showMessage(UPDATE_SIGNATURE_SUCCESSFUL_MSG, 'success', SIGNATURE_INFORMATION);
                }
                else {
                    _this.notificationService.showMessage(UPDATE_SIGNATURE_ERROR_MSG, 'error', SIGNATURE_INFORMATION);
                }
            }));
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.changeSignatureFile = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        /** @type {?} */
        var files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            var image_1 = files[0];
            if (image_1) {
                this.fileName = image_1['name'];
                /** @type {?} */
                var reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    image_1.url = e.target.result;
                    _this.signatureUrl = image_1.url;
                });
                reader.readAsDataURL(image_1);
            }
        }
        else {
            this.signatureUrl = null;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.onSelectSignatureFile = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.signatureFileUpload && this.signatureFileUpload.nativeElement) {
            this.signatureFileUpload.nativeElement.click();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.updateBlankImage = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event) {
            this.signatureUrl = iNet.BLANK_IMAGE_URL;
        }
    };
    /**
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.clearSignatureForm = /**
     * @return {?}
     */
    function () {
        if (this.signatureFileUpload.nativeElement.value) {
            this.signatureFileUpload.nativeElement.value = '';
            this.fileName = '';
            if (this.profile.avatar) {
                this.avatarUrl = this.coreService.getFileUrl(this.profile.avatar);
            }
        }
    };
    /**
     * @param {?} tabName
     * @return {?}
     */
    BootstrapUserProfileComponent.prototype.onSelectTab = /**
     * @param {?} tabName
     * @return {?}
     */
    function (tabName) {
        this.tabName = tabName;
    };
    BootstrapUserProfileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-bootstrap-user-profile',
                    template: "<div class=\"default-layout tb-visible\">\n    <app-common-toolbar></app-common-toolbar>\n    <div *ngIf=\"tabName!=='sharing-information'\" class=\"container-fluid nav-fixed-top cp-toolbar\">\n        <button *ngIf=\"tabName=='profile-general-info'\" [title]=\"'C\u1EADp nh\u1EADt th\u00F4ng tin c\u00E1 nh\u00E2n'\" (click)=\"updateProfile($event)\" class=\"btn btn-primary btn-sm\" [disabled]=\"!generalFormValid\" type=\"button\">\n            <i class=\"fa fa-save\"></i>\n        </button>\n        <button *ngIf=\"tabName==='profile-signature-info'\" [title]=\"'C\u1EADp nh\u1EADt ch\u1EEF k\u00FD s\u1ED1'\" class=\"btn btn-primary btn-sm\" [disabled]=\"!frmSignature.valid\" type=\"button\"\n                (click)=\"updateSignature($event)\">\n            <i class=\"fa fa-save\"></i> <!--{{'COMMON.MODULE.USER_PROFILE.UPDATE_SIGNATURE' | translate}}-->\n        </button>\n        <button *ngIf=\"tabName==='profile-security-info'\" [title]=\"'\u0110\u1ED5i m\u1EADt kh\u1EA9u'\" class=\"btn btn-primary btn-sm\" [disabled]=\"!frmChangePassword.valid\" type=\"button\"\n                (click)=\"changePassword($event)\">\n                <i class=\"fa fa-key\"></i> <!--{{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD' | translate}}-->\n        </button>\n    </div>\n    <div class=\"cp-content\" [ngClass]=\"tabName==='sharing-information'?'toolbar-none':''\">\n        <div class=\"container-fluid p-1\">\n            <app-user-profile *ngIf=\"profile\" [profile]=\"profile\" [imageAvatarUrl]=\"avatarUrl\" [upload]=\"true\">\n                <ng-template #tabContent>\n                    <tabset>\n                        <tab (select)=\"onSelectTab('profile-general-info')\" id=\"profile-general-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-id-card margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.GENERAL_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"mt-3\">\n                                <app-user-profile-info [profile]=\"profile\" [editable]=\"true\" (onValidate)=\"onChange($event)\"></app-user-profile-info>\n                            </div>\n<!--                            <div class=\"form-group margin-b-form-group row\">-->\n<!--                                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                <div class=\"col-sm-9 pl-0\">-->\n<!--                                    <button class=\"btn btn-primary btn-sm\" [disabled]=\"!generalFormValid\" type=\"button\" (click)=\"updateProfile($event)\">-->\n<!--                                        <i class=\"fa fa-save\"></i> {{'TOOLBAR.UPDATE' | translate}}-->\n<!--                                    </button>-->\n<!--                                </div>-->\n<!--                            </div>-->\n                        </tab>\n                        <tab (select)=\"onSelectTab('profile-signature-info')\" id=\"profile-signature-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-gear margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <form #frmSignaturePhoto [formGroup]=\"frmSignature\" (ngSubmit)=\"updateSignature($event)\" class=\"col-sm-12\">\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_VERIFY' | translate}}  <i class=\"required\"></i>:</label>\n                                            <div class=\"col-sm-4 pl-0\">\n                                                <div class=\"input-group\">\n                                                    <div class=\"input-group-prepend\">\n                                                        <div class=\"input-group-text\"><i class=\"fa fa-phone\"></i></div>\n                                                    </div>\n                                                    <input [formControl]=\"frmSignature.controls['signVerify']\" [(ngModel)]=\"signVerifyNumber\" name=\"phone\"\n                                                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                                                           [ngClass]=\"{'is-invalid':frmSignature.controls['signVerify'].hasError('required')\n                                                            && frmSignature.controls['signVerify'].touched}\"\n                                                           type=\"text\" maxlength=\"64\"/>\n                                                </div>\n                                                <div *ngIf=\"frmSignature.controls['signVerify'].hasError('required') && frmSignature.controls['signVerify'].touched\" class=\"text-danger mt-1\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_VERIFY_REQUIRED_MSG' | translate}}\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_FILE' | translate}}  <i class=\"required\"></i>:\n                                            </label>\n                                            <div class=\"col-sm-4 pl-0\">\n                                                <label class=\"i-file-input\">\n                                                    <input #signatureFileUpload [formControl]=\"frmSignature.controls['fileUpload']\" required\n                                                           name=\"fileUpload\" type=\"file\" accept=\"image/*\" (change)=\"changeSignatureFile($event)\"\n                                                           class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                                                        <span class=\"i-file-container\" [ngClass]=\"{'selected': fileName}\" [attr.data-title]=\"'COMMON.MODULE.USER_PROFILE.CHOOSE' | translate\">\n                                                            <span class=\"i-file-name\" [attr.data-title]=\"fileName || ('COMMON.MODULE.USER_PROFILE.NO_FILE' | translate)\">\n                                                                <i class=\"file-icon fa fa-upload\"></i>\n                                                            </span>\n                                                        </span>\n                                                    <a class=\"remove\" *ngIf=\"fileName\" href=\"javascript:;\" (click)=\"clearSignatureForm()\">\n                                                        <i class=\"fa fa-times\"></i>\n                                                    </a>\n                                                </label>\n                                                <!--input #signatureFileUpload [formControl]=\"frmSignature.controls['fileUpload']\" required\n                                                       name=\"fileUpload\" type=\"file\" accept=\"image/*\" (change)=\"changeSignatureFile($event)\"\n                                                       class=\"form-control form-control-sm col-xs-12 col-sm-12\"-->\n                                                <div *ngIf=\"!signatureUrl || frmSignature.controls['fileUpload'].hasError('required') && frmSignature.controls['fileUpload'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.SIGNATURE_FILE_REQUIRED_MSG' | translate}}\n                                                </div>\n                                                <div class=\"thumb-xl member-thumb mt-3 m-b-10 center-block\">\n                                                    <img *ngIf=\"signatureUrl\" (click)=\"onSelectSignatureFile($event)\" [src]=\"signatureUrl\" (error)=\"updateBlankImage($event)\"\n                                                         class=\"signature-thumbnail border\" alt=\"Signature\">\n                                                    <div *ngIf=\"!signatureUrl\" class=\"text-center upload-signature-photo mt-3\" (click)=\"onSelectSignatureFile($event)\">\n                                                        <i aria-hidden=\"true\" class=\"fa fa-picture-o\"></i>\n                                                    </div>\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n<!--                                    <div class=\"col-sm-12 mt-3\">-->\n<!--                                        <div class=\"form-group margin-b-form-group row\">-->\n<!--                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                            <div class=\"col-sm-9 pl-0\">-->\n<!--                                                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!frmSignature.valid\" type=\"button\" (click)=\"updateSignature($event)\">-->\n<!--                                                    <i class=\"fa fa-save\"></i> {{'COMMON.MODULE.USER_PROFILE.UPDATE_SIGNATURE' | translate}}-->\n<!--                                                </button>-->\n<!--                                            </div>-->\n<!--                                        </div>-->\n<!--                                    </div>-->\n                                </form>\n\n                            </div>\n                        </tab>\n                        <!--tab id=\"profile-access-role\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-user-secret margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.ACCESS_ROLE' | translate}}</b>\n                            </ng-template>\n                            <div class=\"mt-3\">\n                                <app-access-role></app-access-role>\n                            </div>\n                        </tab-->\n                        <tab (select)=\"onSelectTab('profile-security-info')\" id=\"profile-security-info\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-lock margin-r-5\"></i> {{'COMMON.MODULE.USER_PROFILE.SECURITY_INFORMATION' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <form [formGroup]=\"frmChangePassword\" (ngSubmit)=\"changePassword($event)\" class=\"col-sm-12\">\n                                    <div class=\"col-sm-12 alert alert-info\">\n                                        {{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD_INFO_MSG' | translate}}\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.CURRENT_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.oldpass\" name=\"password\"\n                                                       [formControl]=\"frmChangePassword.controls['password']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid':frmChangePassword.controls['password'].hasError('required')\n                                                        && frmChangePassword.controls['password'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['password'].hasError('required')\n                                                 && frmChangePassword.controls['password'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.CURRENT_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.NEW_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.newpass\" name=\"newPassword\"\n                                                       [formControl]=\"frmChangePassword.controls['newPassword']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid':frmChangePassword.controls['newPassword'].hasError('required')\n                                                        && frmChangePassword.controls['newPassword'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['newPassword'].hasError('required')\n                                                 && frmChangePassword.controls['newPassword'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.NEW_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-12\">\n                                        <div class=\"form-group margin-b-form-group row\">\n                                            <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                                                {{'COMMON.MODULE.USER_PROFILE.CONFIRM_NEW_PASSWORD' | translate}} <i class=\"required\"></i>: </label>\n                                            <div class=\"col-sm-9 pl-0\">\n                                                <input type=\"password\" [(ngModel)]=\"password.confirmpass\" name=\"confirmNewPassword\"\n                                                       [formControl]=\"frmChangePassword.controls['confirmNewPassword']\" required maxlength=\"64\"\n                                                       [ngClass]=\"{'is-invalid': (frmChangePassword.controls['confirmNewPassword'].hasError('required')\n                                                        || frmChangePassword.controls['confirmNewPassword'].hasError('equalTo'))\n                                                        && frmChangePassword.controls['confirmNewPassword'].touched}\"\n                                                       class=\"form-control col-xs-12 col-sm-12\" />\n\n                                                <div *ngIf=\"frmChangePassword.controls['confirmNewPassword'].hasError('required')\n                                                 && frmChangePassword.controls['confirmNewPassword'].touched\" class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.CONFIRM_NEW_PASSWORD_REQUIRED_MSG' | translate}}\n                                                </div>\n\n                                                <div *ngIf=\"frmChangePassword.controls['confirmNewPassword'].hasError('equalTo')\n                                                 && frmChangePassword.controls['confirmNewPassword'].touched\"  class=\"text-danger\">\n                                                    <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.PASSWORD_DO_NOT_MATCH' | translate}}\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div>\n<!--                                    <div class=\"col-sm-12\">-->\n<!--                                        <div class=\"form-group margin-b-form-group row\">-->\n<!--                                        <label class=\"control-label col-form-label col-sm-3 font-weight-bold\"></label>-->\n<!--                                            <div class=\"col-sm-9 pl-0\">-->\n<!--                                                <button class=\"btn btn-primary btn-sm\" [disabled]=\"!frmChangePassword.valid\" type=\"button\" (click)=\"changePassword($event)\">-->\n<!--                                                    <i class=\"fa fa-key\"></i> {{'COMMON.MODULE.USER_PROFILE.CHANGE_PASSWORD' | translate}}-->\n<!--                                                </button>-->\n<!--                                            </div>-->\n<!--                                        </div>-->\n<!--                                    </div>-->\n                                </form>\n                            </div>\n                        </tab>\n                        <tab (select)=\"onSelectTab('sharing-information')\" id=\"sharing-information\">\n                            <ng-template tabHeading>\n                                <b><i class=\"fa fa-share-alt-square margin-r-5\"></i> {{'Chia s\u1EBB th\u00F4ng tin' | translate}}</b>\n                            </ng-template>\n                            <div class=\"row mt-3\">\n                                <div class=\"col-lg-12 p-0\">\n                                    <app-sharing-information-template></app-sharing-information-template>\n                                </div>\n                            </div>\n                        </tab>\n                    </tabset>\n                </ng-template>\n            </app-user-profile>\n        </div>\n    </div>\n</div>\n",
                    styles: [':host { width: 100%; }']
                }] }
    ];
    /** @nocollapse */
    BootstrapUserProfileComponent.ctorParameters = function () { return [
        { type: Location },
        { type: FormBuilder },
        { type: TranslateService },
        { type: NotificationService },
        { type: GlobalContactService },
        { type: UserProfileService },
        { type: CoreService }
    ]; };
    BootstrapUserProfileComponent.propDecorators = {
        profile: [{ type: Input }],
        frmSignaturePhotoElementRef: [{ type: ViewChild, args: ['frmSignaturePhoto',] }],
        signatureFileUpload: [{ type: ViewChild, args: ['signatureFileUpload',] }]
    };
    return BootstrapUserProfileComponent;
}());
export { BootstrapUserProfileComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLXVzZXItcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2xheW91dC9ib290c3RyYXAvdXNlci1wcm9maWxlL2Jvb3RzdHJhcC11c2VyLXByb2ZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNILFdBQVcsRUFDWCxZQUFZLEVBQ1osV0FBVyxFQUNYLG1CQUFtQixFQUNMLFdBQVcsRUFDekIsa0JBQWtCLEVBQ3JCLE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBQyxXQUFXLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7O0lBSy9DLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQzs7SUFDdEQsa0JBQWtCLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVyRjtJQTJCSSx1Q0FBb0IsUUFBa0IsRUFDbEIsRUFBZSxFQUNmLFNBQTJCLEVBQzNCLG1CQUF3QyxFQUN4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SUFDMUIsMkNBQXVCOzs7OztJQUN2QixrREFBbUM7Ozs7O0lBQ25DLDREQUFnRDs7Ozs7SUFDaEQsdURBQTRDOzs7OztJQUM1QywyREFBOEM7Ozs7O0lBQzlDLG9EQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1xuICAgIENvcmVTZXJ2aWNlLFxuICAgIEVycm9yTWVzc2FnZSxcbiAgICBOZXdQYXNzd29yZCxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFJlc3BvbnNlRGF0YSwgVXNlclByb2ZpbGUsXG4gICAgVXNlclByb2ZpbGVTZXJ2aWNlXG59IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tIFwibmcyLXZhbGlkYXRpb25cIjtcbmltcG9ydCB7Q29udGFjdH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsL2NvbnRhY3RcIjtcbmltcG9ydCB7QWRkcmVzc30gZnJvbSBcIi4uLy4uLy4uL21vZGVsL2FkZHJlc3NcIjtcbmltcG9ydCB7R2xvYmFsQ29udGFjdFNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi91c2VyLXByb2ZpbGUvZ2xvYmFsLWNvbnRhY3Quc2VydmljZVwiO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzL1N1YnNjcmlwdGlvblwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbmNvbnN0IG5ld1Bhc3N3b3JkID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbmNvbnN0IGNvbmZpcm1OZXdQYXNzd29yZCA9IG5ldyBGb3JtQ29udHJvbCgnJywgQ3VzdG9tVmFsaWRhdG9ycy5lcXVhbFRvKG5ld1Bhc3N3b3JkKSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWJvb3RzdHJhcC11c2VyLXByb2ZpbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ib290c3RyYXAtdXNlci1wcm9maWxlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZXM6IFsnOmhvc3QgeyB3aWR0aDogMTAwJTsgfSddXG59KVxuXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwVXNlclByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcHJvZmlsZTogQ29udGFjdDtcbiAgICBnZW5lcmFsRm9ybVZhbGlkID0gZmFsc2U7XG5cbiAgICBwYXNzd29yZCA9IG5ldyBOZXdQYXNzd29yZCgpO1xuICAgIGZybUNoYW5nZVBhc3N3b3JkOiBGb3JtR3JvdXA7XG4gICAgZnJtU2lnbmF0dXJlOiBGb3JtR3JvdXA7XG4gICAgYXZhdGFyVXJsOiBzdHJpbmc7XG4gICAgc2lnbmF0dXJlVXJsOiBzdHJpbmc7XG5cbiAgICB0YWJOYW1lOiBzdHJpbmcgPSAncHJvZmlsZS1nZW5lcmFsLWluZm8nOyAvL2RlZmF1bHQgdGFiXG4gICAgbmF2QnV0dG9uVGl0bGU6IHN0cmluZztcbiAgICBwcml2YXRlIHVzZXJUcmFuc2xhdGlvbnM6IGFueTtcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHVzZXJQcm9maWxlOiBVc2VyUHJvZmlsZSA9IG5ldyBVc2VyUHJvZmlsZSgpO1xuICAgIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgc2lnblZlcmlmeU51bWJlcjogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnZnJtU2lnbmF0dXJlUGhvdG8nKSBmcm1TaWduYXR1cmVQaG90b0VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2lnbmF0dXJlRmlsZVVwbG9hZCcpIHNpZ25hdHVyZUZpbGVVcGxvYWQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb250YWN0U2VydmljZTogR2xvYmFsQ29udGFjdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VyUHJvZmlsZVNlcnZpY2U6IFVzZXJQcm9maWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvcmVTZXJ2aWNlOiBDb3JlU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdHJhbnNsYXRlLmdldChbJ0NPTU1PTi5NT0RVTEUuVVNFUl9QUk9GSUxFJ10pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyVHJhbnNsYXRpb25zID0gcmVzWydDT01NT04uTU9EVUxFLlVTRVJfUFJPRklMRSddO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2FkUHJvZmlsZSgpO1xuXG4gICAgICAgIHRoaXMuZnJtQ2hhbmdlUGFzc3dvcmQgPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIHBhc3N3b3JkOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBuZXdQYXNzd29yZDogbmV3UGFzc3dvcmQsXG4gICAgICAgICAgICBjb25maXJtTmV3UGFzc3dvcmQ6IGNvbmZpcm1OZXdQYXNzd29yZFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZybVNpZ25hdHVyZSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgc2lnblZlcmlmeTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZmlsZVVwbG9hZDogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRQcm9maWxlKCkge1xuICAgICAgICB0aGlzLnVzZXJQcm9maWxlU2VydmljZS5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKChwcm9maWxlOiBVc2VyUHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZSA9IE9iamVjdC5hc3NpZ24obmV3IFVzZXJQcm9maWxlKCksIHByb2ZpbGUpO1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlID0gT2JqZWN0LmFzc2lnbihuZXcgQ29udGFjdCgpLCBwcm9maWxlKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcm9maWxlIG9uIGxvYWQ6IFwiLHRoaXMucHJvZmlsZSk7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUubGFzdE5hbWUgPSB0aGlzLnVzZXJQcm9maWxlLmxuYW1lO1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlLm1pZGRsZU5hbWUgPSB0aGlzLnVzZXJQcm9maWxlLm1uYW1lO1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlLmZpcnN0TmFtZSA9IHRoaXMudXNlclByb2ZpbGUuZm5hbWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJQcm9maWxlLmJpcnRoZGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlLmZ1bGxEYXRlT2ZCaXJ0aCA9IG5ldyBEYXRlKHRoaXMudXNlclByb2ZpbGUuYmlydGhkYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclByb2ZpbGUucGhvbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGUubW9iaWxlUGhvbmUgPSB0aGlzLnVzZXJQcm9maWxlLnBob25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclByb2ZpbGUuZW1haWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGUucHJpbWFyeUVtYWlsID0gdGhpcy51c2VyUHJvZmlsZS5lbWFpbFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5wcm9maWxlLmRhdGVPZkJpcnRoKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wcm9maWxlLmZ1bGxEYXRlT2ZCaXJ0aCA9IG5ldyBEYXRlKHRoaXMucHJvZmlsZS5kYXRlT2ZCaXJ0aCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUuZnVsbE5hbWUgPSBbdGhpcy5wcm9maWxlLmxhc3ROYW1lLCB0aGlzLnByb2ZpbGUubWlkZGxlTmFtZSwgdGhpcy5wcm9maWxlLmZpcnN0TmFtZV0uam9pbignICcpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnByb2ZpbGUuYWRkcmVzcykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZS5hZGRyZXNzID0gbmV3IEFkZHJlc3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLmF2YXRhcikge1xuICAgICAgICAgICAgICAgIGxldCBhdmF0YXJVcmw6IHN0cmluZztcbiAgICAgICAgICAgICAgICBhdmF0YXJVcmwgPSB0aGlzLmNvcmVTZXJ2aWNlLmdldEZpbGVVcmwodGhpcy5wcm9maWxlLmF2YXRhcik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmdldEF2YXRhclZlcnNpb24oKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsID0gYCR7YXZhdGFyVXJsfT92ZXJzaW9uPSR7dGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0QXZhdGFyVmVyc2lvbigpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gYXZhdGFyVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICovXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmdldEF2YXRhclVybCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gdXJsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmdldFNpZ25QaWN0dXJlSWQoKS50aGVuKHBpY3R1cmVJZCA9PiB7XG4gICAgICAgICAgICBpZiAocGljdHVyZUlkKSB7IC8vZ2V0IHNpZ25hdHVyZSBpbWFnZSBmcm9tIGNvbnRhY3Qgc2VydmljZVxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmF0dXJlVXJsID0gdGhpcy5jb250YWN0U2VydmljZS5nZXRTaWduYXR1cmVJbWFnZVVybCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVzZXJQcm9maWxlU2VydmljZS5nZXRTaWduVmVyaWZ5TnVtYmVyKCkudGhlbihzaWduVmVyaWZ5TnVtYmVyID0+IHtcbiAgICAgICAgICAgIGlmIChzaWduVmVyaWZ5TnVtYmVyKSB7IC8vZ2V0IHNpZ25hdHVyZSBpbWFnZSBmcm9tIGNvbnRhY3Qgc2VydmljZVxuICAgICAgICAgICAgICAgIHRoaXMuc2lnblZlcmlmeU51bWJlciA9IHNpZ25WZXJpZnlOdW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuY29udGFjdFNlcnZpY2UuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgoZGF0YTogQ29udGFjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlID0gT2JqZWN0LmFzc2lnbihuZXcgQ29udGFjdCgpLCBkYXRhKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGUuZGF0ZU9mQmlydGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGUuZnVsbERhdGVPZkJpcnRoID0gbmV3IERhdGUodGhpcy5wcm9maWxlLmRhdGVPZkJpcnRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJvZmlsZS5mdWxsTmFtZSA9IFt0aGlzLnByb2ZpbGUubGFzdE5hbWUsIHRoaXMucHJvZmlsZS5taWRkbGVOYW1lLCB0aGlzLnByb2ZpbGUuZmlyc3ROYW1lXS5qb2luKCcgJyk7XG4gICAgICAgICAgICBpZiAoIXRoaXMucHJvZmlsZS5hZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlLmFkZHJlc3MgPSBuZXcgQWRkcmVzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wcm9maWxlLmF2YXRhcikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gdGhpcy5jb3JlU2VydmljZS5nZXRGaWxlVXJsKHRoaXMucHJvZmlsZS5hdmF0YXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICBvbkNoYW5nZSgkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5nZW5lcmFsRm9ybVZhbGlkID0gJGV2ZW50O1xuICAgIH1cblxuICAgIGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVByb2ZpbGUoJGV2ZW50PyA6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5nZW5lcmFsRm9ybVZhbGlkKSB7XG4gICAgICAgICAgICBsZXQgdXNlclByb2ZpbGUgPSBPYmplY3QuYXNzaWduKG5ldyBVc2VyUHJvZmlsZSgpLCB0aGlzLnByb2ZpbGUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlclByb2ZpbGUsIHRoaXMucHJvZmlsZSk7XG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5mbmFtZSA9IHRoaXMucHJvZmlsZS5maXJzdE5hbWU7XG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5tbmFtZSA9IHRoaXMucHJvZmlsZS5taWRkbGVOYW1lO1xuICAgICAgICAgICAgdXNlclByb2ZpbGUubG5hbWUgPSB0aGlzLnByb2ZpbGUubGFzdE5hbWU7XG5cbiAgICAgICAgICAgIGlmKHRoaXMucHJvZmlsZS5mdWxsRGF0ZU9mQmlydGgpe1xuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLmJpcnRoZGF5ID0gdGhpcy5wcm9maWxlLmZ1bGxEYXRlT2ZCaXJ0aC52YWx1ZU9mKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnByb2ZpbGUubW9iaWxlUGhvbmUpe1xuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLnBob25lID0gdGhpcy5wcm9maWxlLm1vYmlsZVBob25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wcm9maWxlLnByaW1hcnlFbWFpbCl7XG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuZW1haWwgPSB0aGlzLnByb2ZpbGUucHJpbWFyeUVtYWlsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXNlclByb2ZpbGUuYWRkcmVzcykge1xuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLmFkZHJlc3NTdHIgPSBKU09OLnN0cmluZ2lmeSh1c2VyUHJvZmlsZS5hZGRyZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSB1c2VyUHJvZmlsZS5hZGRyZXNzO1xuICAgICAgICAgICAgZGVsZXRlIHVzZXJQcm9maWxlLmZ1bGxOYW1lO1xuICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UudXBkYXRlKHVzZXJQcm9maWxlKS5zdWJzY3JpYmUoKGRhdGE6IFJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7VElUTEUsIFVQREFURV9QUk9GSUxFX1NVQ0NFU1NGVUxfTVNHLCBVUERBVEVfUFJPRklMRV9FUlJPUl9NU0d9ID0gdGhpcy51c2VyVHJhbnNsYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dNZXNzYWdlKFVQREFURV9QUk9GSUxFX1NVQ0NFU1NGVUxfTVNHLCAnc3VjY2VzcycsIFRJVExFKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93TWVzc2FnZShVUERBVEVfUFJPRklMRV9FUlJPUl9NU0csICdlcnJvcicsIFRJVExFKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNoYW5nZVBhc3N3b3JkKCRldmVudD8pIHtcbiAgICAgICAgaWYgKHRoaXMuZnJtQ2hhbmdlUGFzc3dvcmQudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFjdFNlcnZpY2Uuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgICAgIHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmNoYW5nZVBhc3N3b3JkKHRoaXMucGFzc3dvcmQpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtVU0VSTkFNRSwgQ0hBTkdFX1BBU1NXT1JEX1NVQ0NFU1NGVUxfTVNHLCBDVVJSRU5UX1BBU1NXT1JEX0lOQ09SUkVDVCwgQ0hBTkdFX1BBU1NXT1JEX0VSUk9SX01TR30gPSB0aGlzLnVzZXJUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJTVUNDRVNTXCIgPT09IGRhdGEudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93TWVzc2FnZShDSEFOR0VfUEFTU1dPUkRfU1VDQ0VTU0ZVTF9NU0csICdzdWNzZXNzJywgVVNFUk5BTUUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJtQ2hhbmdlUGFzc3dvcmQucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dNZXNzYWdlKENVUlJFTlRfUEFTU1dPUkRfSU5DT1JSRUNULCAnZXJyb3InLCBVU0VSTkFNRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd01lc3NhZ2UoQ0hBTkdFX1BBU1NXT1JEX0VSUk9SX01TRywgJ2Vycm9yJywgVVNFUk5BTUUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNpZ25hdHVyZSgkZXZlbnQ/KSB7XG4gICAgICAgIGlmICh0aGlzLmZybVNpZ25hdHVyZS52YWxpZCkge1xuICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5mcm1TaWduYXR1cmVQaG90b0VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAvLyBVcGxvYWQgU2lnbmF0dXJlXG4gICAgICAgICAgICB0aGlzLmNvbnRhY3RTZXJ2aWNlLnVwbG9hZFNpZ25hdHVyZVBob3RvKGZvcm1EYXRhKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtTSUdOQVRVUkVfSU5GT1JNQVRJT04sIFVQREFURV9TSUdOQVRVUkVfU1VDQ0VTU0ZVTF9NU0csIFVQREFURV9TSUdOQVRVUkVfRVJST1JfTVNHfSA9IHRoaXMudXNlclRyYW5zbGF0aW9ucztcblxuICAgICAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93TWVzc2FnZShVUERBVEVfU0lHTkFUVVJFX1NVQ0NFU1NGVUxfTVNHLCAnc3VjY2VzcycsIFNJR05BVFVSRV9JTkZPUk1BVElPTik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dNZXNzYWdlKFVQREFURV9TSUdOQVRVUkVfRVJST1JfTVNHLCAnZXJyb3InLCBTSUdOQVRVUkVfSU5GT1JNQVRJT04pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlU2lnbmF0dXJlRmlsZSgkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSAkZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBmaWxlc1swXTtcbiAgICAgICAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZU5hbWUgPSBpbWFnZVsnbmFtZSddO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UudXJsID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25hdHVyZVVybCA9IGltYWdlLnVybDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2lnbmF0dXJlVXJsID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0U2lnbmF0dXJlRmlsZSgkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmF0dXJlRmlsZVVwbG9hZCAmJiB0aGlzLnNpZ25hdHVyZUZpbGVVcGxvYWQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zaWduYXR1cmVGaWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUJsYW5rSW1hZ2UoJGV2ZW50KSB7XG4gICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2lnbmF0dXJlVXJsID0gaU5ldC5CTEFOS19JTUFHRV9VUkw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNpZ25hdHVyZUZvcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLnNpZ25hdHVyZUZpbGVVcGxvYWQubmF0aXZlRWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zaWduYXR1cmVGaWxlVXBsb2FkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuZmlsZU5hbWUgPSAnJztcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGUuYXZhdGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSB0aGlzLmNvcmVTZXJ2aWNlLmdldEZpbGVVcmwodGhpcy5wcm9maWxlLmF2YXRhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNlbGVjdFRhYih0YWJOYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLnRhYk5hbWU9dGFiTmFtZTtcbiAgICB9XG5cbn1cbiJdfQ==