/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorMessage } from "inet-core";
import { Contact } from "../../model/contact";
import { LocationService } from "../../common/location.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { CustomValidators } from "ng2-validation";
import { DictionaryService } from "../../common/dictionary.service";
import * as moment from 'moment';
window['moment'] = window['moment'] || moment;
var UserProfileInfoComponent = /** @class */ (function () {
    function UserProfileInfoComponent(dictionaryService, locationService, fb) {
        this.dictionaryService = dictionaryService;
        this.locationService = locationService;
        this.fb = fb;
        this.profile = new Contact();
        this.countries = [];
        this.provinces = [];
        this.districts = [];
        this.genders = [
            { code: "M", key: "COMMON.MODULE.USER_PROFILE.MALE" },
            { code: "FM", key: "COMMON.MODULE.USER_PROFILE.FEMALE" },
            { code: "OT", key: "COMMON.MODULE.USER_PROFILE.OTHER" }
        ];
        this.countryCode = 'VN';
        this.onValidate = new EventEmitter();
        this.editable = false;
        this.formChanged = new Subject();
    }
    /**
     * @return {?}
     */
    UserProfileInfoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this.onValidate.emit(v);
        }));
        this.profileForm = this.fb.group({
            lastName: [null, Validators.required],
            middleName: [null, null],
            firstName: [null, Validators.required],
            email: [null, Validators.compose([CustomValidators.email])],
            fullDateOfBirth: [null, null],
            sex: [null, null],
            phone: [null, null],
            country: [null, null],
            street: [null, null],
            district: [null, null],
            province: [null, null]
        });
        this.onChanges();
        this.loadAddress();
    };
    /*
    private loadDictionary() {
        this.dictionaryService.findByKeys('SEX').subscribe((response: ResponseData) => {
            if (ErrorMessage.TYPE !== response.type) {
                // const {data} = response.data.items||[];
                // const {SEX} = data;
                // this.genders = SEX;
                this.genders = response.items || [];
            }
        });
    }
    */
    //
    // private loadGender(){
    //     this.dictionaryService.getSex({}).subscribe((response: ResponseData) => {
    //         if (ErrorMessage.TYPE !== response.type) {
    //             this.genders = response.items || [];
    //         }
    //     });
    // }
    /*
        private loadDictionary() {
            this.dictionaryService.findByKeys('SEX').subscribe((response: ResponseData) => {
                if (ErrorMessage.TYPE !== response.type) {
                    // const {data} = response.data.items||[];
                    // const {SEX} = data;
                    // this.genders = SEX;
                    this.genders = response.items || [];
                }
            });
        }
        */
    //
    // private loadGender(){
    //     this.dictionaryService.getSex({}).subscribe((response: ResponseData) => {
    //         if (ErrorMessage.TYPE !== response.type) {
    //             this.genders = response.items || [];
    //         }
    //     });
    // }
    /**
     * @private
     * @return {?}
     */
    UserProfileInfoComponent.prototype.loadAddress = /*
        private loadDictionary() {
            this.dictionaryService.findByKeys('SEX').subscribe((response: ResponseData) => {
                if (ErrorMessage.TYPE !== response.type) {
                    // const {data} = response.data.items||[];
                    // const {SEX} = data;
                    // this.genders = SEX;
                    this.genders = response.items || [];
                }
            });
        }
        */
    //
    // private loadGender(){
    //     this.dictionaryService.getSex({}).subscribe((response: ResponseData) => {
    //         if (ErrorMessage.TYPE !== response.type) {
    //             this.genders = response.items || [];
    //         }
    //     });
    // }
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.locationService.listCountry().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (ErrorMessage.TYPE !== data.type) {
                _this.countries = data.items || [];
                if (_this.profile.address.countryCode) {
                    _this.loadProvinceByCountryCode(_this.profile.address.countryCode);
                    if (_this.profile.address.provinceCode) {
                        _this.loadDistrictByCode(_this.profile.address.countryCode, _this.profile.address.provinceCode);
                    }
                }
            }
        }));
    };
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    UserProfileInfoComponent.prototype.loadProvinceByCountryCode = /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    function (countryCode) {
        var _this = this;
        this.countryCode = countryCode;
        this.provinceCode = null;
        this.districts = [];
        this.locationService.getProvinceByCountryCode(countryCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (ErrorMessage.TYPE !== data.type) {
                _this.provinces = data.items || [];
            }
        }));
    };
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    UserProfileInfoComponent.prototype.loadDistrictByCode = /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    function (countryCode, provinceCode) {
        var _this = this;
        this.provinceCode = provinceCode;
        this.locationService.getDistrictByCode(countryCode, provinceCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (ErrorMessage.TYPE !== data.type) {
                _this.districts = data.items || [];
            }
        }));
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    UserProfileInfoComponent.prototype.onChangeCountry = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var target$ = $event.target;
        //const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadProvinceByCountryCode(target$.value);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    UserProfileInfoComponent.prototype.onChangeProvince = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var target$ = $event.target;
        // const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadDistrictByCode(this.countryCode, target$.value);
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    UserProfileInfoComponent.prototype.onChangeDate = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (window['moment']) {
            /** @type {?} */
            var date = window['moment'](new Date(event));
            if ((!date.isValid())) {
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.profile.fullDateOfBirth = new Date(); }));
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    UserProfileInfoComponent.prototype.onChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.profileForm.valueChanges.subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            _this.formChanged.next(_this.profileForm.valid);
        }));
        if (this.editable) {
            this.profileForm.enable();
        }
        else {
            this.profileForm.disable();
        }
    };
    UserProfileInfoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-profile-info',
                    template: "<form [formGroup]=\"profileForm\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.USER_PROFILE.LAST_NAME' | translate}} : <i class=\"required\"></i>\n                </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.lastName\" [formControl]=\"profileForm.controls['lastName']\" required name=\"lastName\"\n                           [ngClass]=\"{'is-invalid':profileForm.controls['lastName'].hasError('required') && profileForm.controls['lastName'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" maxlength=\"256\"/>\n                    <div *ngIf=\"profileForm.controls['lastName'].hasError('required') && profileForm.controls['lastName'].touched\" class=\"text-danger col-sm-12 pl-0\"><i\n                            class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.LAST_NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.MIDDLE_NAME' | translate}} : </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.middleName\" [formControl]=\"profileForm.controls['middleName']\"\n                           name=\"middleName\" class=\"form-control form-control-sm col-xs-12 col-sm-12\" maxlength=\"64\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.USER_PROFILE.FIRST_NAME' | translate}} : <i class=\"required\"></i></label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.firstName\" [formControl]=\"profileForm.controls['firstName']\" required name=\"firstName\"\n                           [ngClass]=\"{'is-invalid':profileForm.controls['firstName'].hasError('required') && profileForm.controls['firstName'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12 \"/>\n                    <div *ngIf=\"profileForm.controls['firstName'].hasError('required') && profileForm.controls['firstName'].touched\"\n                         class=\"text-danger col-sm-12 pl-0\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.FIRST_NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.BIRTHDAY' | translate}} :</label>\n                <div class=\"input-group input-group-sm col-sm-3 pl-0\">\n                    <input [(ngModel)]=\"profile.fullDateOfBirth\" [formControl]=\"profileForm.controls['fullDateOfBirth']\"\n                           type=\"text\" name=\"fullDateOfBirth\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           bsDatepicker #fullDateOfBirth=\"bsDatepicker\"\n                           (bsValueChange)=\"onChangeDate($event)\">\n                    <div (click)=\"fullDateOfBirth.toggle()\" class=\"input-group-append input-group-sm\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-calendar\"></i></div>\n                    </div>\n                </div>\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.GENDER' | translate}} : </label>\n                <div class=\"col-sm-3 pl-0\">\n                    <select [(ngModel)]=\"profile.sex\" name=\"sex\" [formControl]=\"profileForm.controls['sex']\" class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.sex ? profile.sex : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let gender of genders\" [value]=\"gender.code\">\n                            {{gender.key | translate}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.EMAIL' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0 input-group input-group-sm\">\n                    <div class=\"input-group-prepend input-group-sm\">\n                        <div class=\"input-group-text icon-div\"><i class=\"fa fa-envelope\"></i></div>\n                    </div>\n                    <input [(ngModel)]=\"profile.primaryEmail\" name=\"primaryEmail\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           type=\"email\" [formControl]=\"profileForm.controls['email']\"\n                           [ngClass]=\"{'is-invalid': profileForm.controls['email'].hasError('pattern')\n                           && profileForm.controls['email'].touched}\"/>\n                    <!--div *ngIf=\"profileForm.controls['email'].hasError('required') && profileForm.controls['email'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'MODULE.USER_MANAGER.EMAIL_REQUIRED_MSG' | translate}}\n                    </div-->\n                    <div *ngIf=\"profileForm.controls['email'].hasError('email') && profileForm.controls['email'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'MODULE.USER_MANAGER.EMAIL_INVALID_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.MOBILE' | translate}}: </label>\n                <div class=\"col-sm-9 pl-0 input-group input-group-sm\">\n                    <div class=\"input-group-prepend input-group-sm\">\n                        <div class=\"input-group-text icon-div\"><i class=\"fa fa-phone icon-custom\"></i>\n                        </div>\n                    </div>\n                    <input [(ngModel)]=\"profile.mobilePhone\" [formControl]=\"profileForm.controls['phone']\" name=\"mobilePhone\" class=\"form-control form-control-sm col-xs-12 col-sm-12\" type=\"text\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.ADDRESS.STREET' | translate}} : </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.address.address\" name=\"street\" [formControl]=\"profileForm.controls['street']\" class=\"form-control form-control-sm col-xs-12 col-sm-12 \"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.ADDRESS.COUNTRY' | translate}}:</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.countryCode\" name=\"country\" [formControl]=\"profileForm.controls['country']\" (change)=\"onChangeCountry($event)\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.countryCode ? profile.address.countryCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let country of countries\" [value]=\"country.code\">\n                            {{country.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\"> {{'COMMON.MODULE.ADDRESS.CITY' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.provinceCode\" name=\"province\" [formControl]=\"profileForm.controls['province']\" (change)=\"onChangeProvince($event)\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.provinceCode ? profile.address.provinceCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let province of provinces\" [value]=\"province.code\">\n                            {{province.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\"> {{'COMMON.MODULE.ADDRESS.DISTRICT' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.districtCode\" name=\"district\" [formControl]=\"profileForm.controls['district']\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.districtCode ? profile.address.districtCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let district of districts\" [value]=\"district.code\">\n                            {{district.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n"
                }] }
    ];
    /** @nocollapse */
    UserProfileInfoComponent.ctorParameters = function () { return [
        { type: DictionaryService },
        { type: LocationService },
        { type: FormBuilder }
    ]; };
    UserProfileInfoComponent.propDecorators = {
        profile: [{ type: Input }],
        onValidate: [{ type: Output }],
        editable: [{ type: Input }]
    };
    return UserProfileInfoComponent;
}());
export { UserProfileInfoComponent };
if (false) {
    /** @type {?} */
    UserProfileInfoComponent.prototype.profile;
    /** @type {?} */
    UserProfileInfoComponent.prototype.profileForm;
    /** @type {?} */
    UserProfileInfoComponent.prototype.countries;
    /** @type {?} */
    UserProfileInfoComponent.prototype.provinces;
    /** @type {?} */
    UserProfileInfoComponent.prototype.districts;
    /** @type {?} */
    UserProfileInfoComponent.prototype.genders;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.countryCode;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.provinceCode;
    /** @type {?} */
    UserProfileInfoComponent.prototype.onValidate;
    /** @type {?} */
    UserProfileInfoComponent.prototype.editable;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.formChanged;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.dictionaryService;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.locationService;
    /**
     * @type {?}
     * @private
     */
    UserProfileInfoComponent.prototype.fb;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLWluZm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy91c2VyLXByb2ZpbGUvdXNlci1wcm9maWxlLWluZm8vdXNlci1wcm9maWxlLWluZm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQWUsTUFBTSxXQUFXLENBQUM7QUFDckQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsV0FBVyxFQUFhLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDckMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUM7QUFFOUM7SUFzQkksa0NBQW9CLGlCQUFvQyxFQUNwQyxlQUFnQyxFQUNoQyxFQUFlO1FBRmYsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQW5CMUIsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFHakMsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQixjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQzNC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O29CQUNqQyxpa1ZBQWlEO2lCQUNwRDs7OztnQkFQTyxpQkFBaUI7Z0JBSmpCLGVBQWU7Z0JBQ2YsV0FBVzs7OzBCQVlkLEtBQUs7NkJBYUwsTUFBTTsyQkFDTixLQUFLOztJQXVIViwrQkFBQztDQUFBLEFBMUlELElBMElDO1NBdElZLHdCQUF3Qjs7O0lBQ2pDLDJDQUFpQzs7SUFFakMsK0NBQXVCOztJQUN2Qiw2Q0FBMkI7O0lBQzNCLDZDQUEyQjs7SUFDM0IsNkNBQTJCOztJQUMzQiwyQ0FHMkQ7Ozs7O0lBRTNELCtDQUEyQjs7Ozs7SUFDM0IsZ0RBQTZCOztJQUM3Qiw4Q0FBMEM7O0lBQzFDLDRDQUEyQjs7Ozs7SUFDM0IsK0NBQStEOzs7OztJQUVuRCxxREFBNEM7Ozs7O0lBQzVDLG1EQUF3Qzs7Ozs7SUFDeEMsc0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RXJyb3JNZXNzYWdlLCBSZXNwb25zZURhdGF9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7Q29udGFjdH0gZnJvbSBcIi4uLy4uL21vZGVsL2NvbnRhY3RcIjtcbmltcG9ydCB7TG9jYXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gXCJyeGpzL1N1YmplY3RcIjtcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSBcIm5nMi12YWxpZGF0aW9uXCI7XG5pbXBvcnQge0RpY3Rpb25hcnlTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpY3Rpb25hcnkuc2VydmljZVwiO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG53aW5kb3dbJ21vbWVudCddID0gd2luZG93Wydtb21lbnQnXSB8fCBtb21lbnQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXVzZXItcHJvZmlsZS1pbmZvJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdXNlci1wcm9maWxlLWluZm8uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlSW5mb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHJvZmlsZSA9IG5ldyBDb250YWN0KCk7XG5cbiAgICBwcm9maWxlRm9ybTogRm9ybUdyb3VwO1xuICAgIGNvdW50cmllczogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByb3ZpbmNlczogQXJyYXk8YW55PiA9IFtdO1xuICAgIGRpc3RyaWN0czogQXJyYXk8YW55PiA9IFtdO1xuICAgIGdlbmRlcnM6IEFycmF5PGFueT4gPSBbXG4gICAgICAgIHtjb2RlOiBcIk1cIiwga2V5OiBcIkNPTU1PTi5NT0RVTEUuVVNFUl9QUk9GSUxFLk1BTEVcIn0sXG4gICAgICAgIHtjb2RlOiBcIkZNXCIsIGtleTogXCJDT01NT04uTU9EVUxFLlVTRVJfUFJPRklMRS5GRU1BTEVcIn0sXG4gICAgICAgIHtjb2RlOiBcIk9UXCIsIGtleTogXCJDT01NT04uTU9EVUxFLlVTRVJfUFJPRklMRS5PVEhFUlwifV07XG5cbiAgICBwcml2YXRlIGNvdW50cnlDb2RlID0gJ1ZOJztcbiAgICBwcml2YXRlIHByb3ZpbmNlQ29kZTogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvblZhbGlkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIGVkaXRhYmxlID0gIGZhbHNlO1xuICAgIHByaXZhdGUgZm9ybUNoYW5nZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWN0aW9uYXJ5U2VydmljZTogRGljdGlvbmFyeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsb2NhdGlvblNlcnZpY2U6IExvY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VkLmRlYm91bmNlVGltZSgyNTApLmRpc3RpbmN0VW50aWxDaGFuZ2VkKCkuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRlLmVtaXQodik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvZmlsZUZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGxhc3ROYW1lOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBtaWRkbGVOYW1lOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaXJzdE5hbWU6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGVtYWlsOiBbbnVsbCwgVmFsaWRhdG9ycy5jb21wb3NlKFtDdXN0b21WYWxpZGF0b3JzLmVtYWlsXSldLFxuICAgICAgICAgICAgZnVsbERhdGVPZkJpcnRoOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBzZXg6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHBob25lOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBjb3VudHJ5OiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBzdHJlZXQ6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGRpc3RyaWN0OiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBwcm92aW5jZTogW251bGwsIG51bGxdXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZXMoKTtcbiAgICAgICAgdGhpcy5sb2FkQWRkcmVzcygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgcHJpdmF0ZSBsb2FkRGljdGlvbmFyeSgpIHtcbiAgICAgICAgdGhpcy5kaWN0aW9uYXJ5U2VydmljZS5maW5kQnlLZXlzKCdTRVgnKS5zdWJzY3JpYmUoKHJlc3BvbnNlOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gcmVzcG9uc2UudHlwZSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHtkYXRhfSA9IHJlc3BvbnNlLmRhdGEuaXRlbXN8fFtdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHtTRVh9ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdlbmRlcnMgPSBTRVg7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5kZXJzID0gcmVzcG9uc2UuaXRlbXMgfHwgW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAqL1xuICAgIC8vXG4gICAgLy8gcHJpdmF0ZSBsb2FkR2VuZGVyKCl7XG4gICAgLy8gICAgIHRoaXMuZGljdGlvbmFyeVNlcnZpY2UuZ2V0U2V4KHt9KS5zdWJzY3JpYmUoKHJlc3BvbnNlOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAvLyAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gcmVzcG9uc2UudHlwZSkge1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuZ2VuZGVycyA9IHJlc3BvbnNlLml0ZW1zIHx8IFtdO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIGxvYWRBZGRyZXNzKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uU2VydmljZS5saXN0Q291bnRyeSgpLnN1YnNjcmliZSgoZGF0YTogUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyaWVzID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLmFkZHJlc3MuY291bnRyeUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkUHJvdmluY2VCeUNvdW50cnlDb2RlKHRoaXMucHJvZmlsZS5hZGRyZXNzLmNvdW50cnlDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvZmlsZS5hZGRyZXNzLnByb3ZpbmNlQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRGlzdHJpY3RCeUNvZGUodGhpcy5wcm9maWxlLmFkZHJlc3MuY291bnRyeUNvZGUsIHRoaXMucHJvZmlsZS5hZGRyZXNzLnByb3ZpbmNlQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZFByb3ZpbmNlQnlDb3VudHJ5Q29kZShjb3VudHJ5Q29kZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY291bnRyeUNvZGUgPSBjb3VudHJ5Q29kZTtcbiAgICAgICAgdGhpcy5wcm92aW5jZUNvZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3RyaWN0cyA9IFtdO1xuICAgICAgICB0aGlzLmxvY2F0aW9uU2VydmljZS5nZXRQcm92aW5jZUJ5Q291bnRyeUNvZGUoY291bnRyeUNvZGUpLnN1YnNjcmliZSgoZGF0YTogUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmluY2VzID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGU6IHN0cmluZywgcHJvdmluY2VDb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wcm92aW5jZUNvZGUgPSBwcm92aW5jZUNvZGU7XG4gICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLmdldERpc3RyaWN0QnlDb2RlKGNvdW50cnlDb2RlLCBwcm92aW5jZUNvZGUpLnN1YnNjcmliZSgoZGF0YTogUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzdHJpY3RzID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VDb3VudHJ5KCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCQgPSAkZXZlbnQudGFyZ2V0O1xuICAgICAgICAvL2NvbnN0IGNvdW50cnlJZCA9IHRhcmdldCQub3B0aW9uc1t0YXJnZXQkLnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS11dWlkJyk7XG4gICAgICAgIHRoaXMubG9hZFByb3ZpbmNlQnlDb3VudHJ5Q29kZSh0YXJnZXQkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZVByb3ZpbmNlKCRldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCQgPSAkZXZlbnQudGFyZ2V0O1xuICAgICAgICAvLyBjb25zdCBjb3VudHJ5SWQgPSB0YXJnZXQkLm9wdGlvbnNbdGFyZ2V0JC5zZWxlY3RlZEluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXVpZCcpO1xuICAgICAgICB0aGlzLmxvYWREaXN0cmljdEJ5Q29kZSh0aGlzLmNvdW50cnlDb2RlLCB0YXJnZXQkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZURhdGUoZXZlbnQ/OiBhbnkpIHtcbiAgICAgICAgaWYod2luZG93Wydtb21lbnQnXSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHdpbmRvd1snbW9tZW50J10obmV3IERhdGUoZXZlbnQpKTtcbiAgICAgICAgICAgIGlmICgoIWRhdGUuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9maWxlLmZ1bGxEYXRlT2ZCaXJ0aCA9IG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZmlsZUZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ2hhbmdlZC5uZXh0KHRoaXMucHJvZmlsZUZvcm0udmFsaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZih0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVGb3JtLmVuYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlRm9ybS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=