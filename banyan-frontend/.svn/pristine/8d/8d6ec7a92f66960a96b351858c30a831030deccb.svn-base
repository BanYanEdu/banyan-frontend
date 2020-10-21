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
export class UserProfileInfoComponent {
    /**
     * @param {?} dictionaryService
     * @param {?} locationService
     * @param {?} fb
     */
    constructor(dictionaryService, locationService, fb) {
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
    ngOnInit() {
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            this.onValidate.emit(v);
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
    }
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
    loadAddress() {
        this.locationService.listCountry().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.countries = data.items || [];
                if (this.profile.address.countryCode) {
                    this.loadProvinceByCountryCode(this.profile.address.countryCode);
                    if (this.profile.address.provinceCode) {
                        this.loadDistrictByCode(this.profile.address.countryCode, this.profile.address.provinceCode);
                    }
                }
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @return {?}
     */
    loadProvinceByCountryCode(countryCode) {
        this.countryCode = countryCode;
        this.provinceCode = null;
        this.districts = [];
        this.locationService.getProvinceByCountryCode(countryCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.provinces = data.items || [];
            }
        }));
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} provinceCode
     * @return {?}
     */
    loadDistrictByCode(countryCode, provinceCode) {
        this.provinceCode = provinceCode;
        this.locationService.getDistrictByCode(countryCode, provinceCode).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (ErrorMessage.TYPE !== data.type) {
                this.districts = data.items || [];
            }
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeCountry($event) {
        /** @type {?} */
        const target$ = $event.target;
        //const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadProvinceByCountryCode(target$.value);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeProvince($event) {
        /** @type {?} */
        const target$ = $event.target;
        // const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadDistrictByCode(this.countryCode, target$.value);
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    onChangeDate(event) {
        if (window['moment']) {
            /** @type {?} */
            const date = window['moment'](new Date(event));
            if ((!date.isValid())) {
                setTimeout((/**
                 * @return {?}
                 */
                () => this.profile.fullDateOfBirth = new Date()));
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    onChanges() {
        this.profileForm.valueChanges.subscribe((/**
         * @param {?} val
         * @return {?}
         */
        val => {
            this.formChanged.next(this.profileForm.valid);
        }));
        if (this.editable) {
            this.profileForm.enable();
        }
        else {
            this.profileForm.disable();
        }
    }
}
UserProfileInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-user-profile-info',
                template: "<form [formGroup]=\"profileForm\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.USER_PROFILE.LAST_NAME' | translate}} : <i class=\"required\"></i>\n                </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.lastName\" [formControl]=\"profileForm.controls['lastName']\" required name=\"lastName\"\n                           [ngClass]=\"{'is-invalid':profileForm.controls['lastName'].hasError('required') && profileForm.controls['lastName'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" maxlength=\"256\"/>\n                    <div *ngIf=\"profileForm.controls['lastName'].hasError('required') && profileForm.controls['lastName'].touched\" class=\"text-danger col-sm-12 pl-0\"><i\n                            class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.LAST_NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.MIDDLE_NAME' | translate}} : </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.middleName\" [formControl]=\"profileForm.controls['middleName']\"\n                           name=\"middleName\" class=\"form-control form-control-sm col-xs-12 col-sm-12\" maxlength=\"64\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.USER_PROFILE.FIRST_NAME' | translate}} : <i class=\"required\"></i></label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.firstName\" [formControl]=\"profileForm.controls['firstName']\" required name=\"firstName\"\n                           [ngClass]=\"{'is-invalid':profileForm.controls['firstName'].hasError('required') && profileForm.controls['firstName'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12 \"/>\n                    <div *ngIf=\"profileForm.controls['firstName'].hasError('required') && profileForm.controls['firstName'].touched\"\n                         class=\"text-danger col-sm-12 pl-0\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.USER_PROFILE.FIRST_NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.BIRTHDAY' | translate}} :</label>\n                <div class=\"input-group input-group-sm col-sm-3 pl-0\">\n                    <input [(ngModel)]=\"profile.fullDateOfBirth\" [formControl]=\"profileForm.controls['fullDateOfBirth']\"\n                           type=\"text\" name=\"fullDateOfBirth\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           bsDatepicker #fullDateOfBirth=\"bsDatepicker\"\n                           (bsValueChange)=\"onChangeDate($event)\">\n                    <div (click)=\"fullDateOfBirth.toggle()\" class=\"input-group-append input-group-sm\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-calendar\"></i></div>\n                    </div>\n                </div>\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.GENDER' | translate}} : </label>\n                <div class=\"col-sm-3 pl-0\">\n                    <select [(ngModel)]=\"profile.sex\" name=\"sex\" [formControl]=\"profileForm.controls['sex']\" class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.sex ? profile.sex : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let gender of genders\" [value]=\"gender.code\">\n                            {{gender.key | translate}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.EMAIL' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0 input-group input-group-sm\">\n                    <div class=\"input-group-prepend input-group-sm\">\n                        <div class=\"input-group-text icon-div\"><i class=\"fa fa-envelope\"></i></div>\n                    </div>\n                    <input [(ngModel)]=\"profile.primaryEmail\" name=\"primaryEmail\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           type=\"email\" [formControl]=\"profileForm.controls['email']\"\n                           [ngClass]=\"{'is-invalid': profileForm.controls['email'].hasError('pattern')\n                           && profileForm.controls['email'].touched}\"/>\n                    <!--div *ngIf=\"profileForm.controls['email'].hasError('required') && profileForm.controls['email'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'MODULE.USER_MANAGER.EMAIL_REQUIRED_MSG' | translate}}\n                    </div-->\n                    <div *ngIf=\"profileForm.controls['email'].hasError('email') && profileForm.controls['email'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'MODULE.USER_MANAGER.EMAIL_INVALID_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.USER_PROFILE.MOBILE' | translate}}: </label>\n                <div class=\"col-sm-9 pl-0 input-group input-group-sm\">\n                    <div class=\"input-group-prepend input-group-sm\">\n                        <div class=\"input-group-text icon-div\"><i class=\"fa fa-phone icon-custom\"></i>\n                        </div>\n                    </div>\n                    <input [(ngModel)]=\"profile.mobilePhone\" [formControl]=\"profileForm.controls['phone']\" name=\"mobilePhone\" class=\"form-control form-control-sm col-xs-12 col-sm-12\" type=\"text\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">\n                    {{'COMMON.MODULE.ADDRESS.STREET' | translate}} : </label>\n                <div class=\"col-sm-9 pl-0\">\n                    <input [(ngModel)]=\"profile.address.address\" name=\"street\" [formControl]=\"profileForm.controls['street']\" class=\"form-control form-control-sm col-xs-12 col-sm-12 \"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\">{{'COMMON.MODULE.ADDRESS.COUNTRY' | translate}}:</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.countryCode\" name=\"country\" [formControl]=\"profileForm.controls['country']\" (change)=\"onChangeCountry($event)\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.countryCode ? profile.address.countryCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let country of countries\" [value]=\"country.code\">\n                            {{country.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\"> {{'COMMON.MODULE.ADDRESS.CITY' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.provinceCode\" name=\"province\" [formControl]=\"profileForm.controls['province']\" (change)=\"onChangeProvince($event)\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.provinceCode ? profile.address.provinceCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let province of provinces\" [value]=\"province.code\">\n                            {{province.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 lbl-bold\"> {{'COMMON.MODULE.ADDRESS.DISTRICT' | translate}} :</label>\n                <div class=\"col-sm-9 pl-0\">\n                    <select [(ngModel)]=\"profile.address.districtCode\" name=\"district\" [formControl]=\"profileForm.controls['district']\"\n                            class=\"form-control form-control-sm col-xs-12 col-sm-12 \">\n                        <option [ngValue]=\"!profile.address.districtCode ? profile.address.districtCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let district of districts\" [value]=\"district.code\">\n                            {{district.name}}\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n"
            }] }
];
/** @nocollapse */
UserProfileInfoComponent.ctorParameters = () => [
    { type: DictionaryService },
    { type: LocationService },
    { type: FormBuilder }
];
UserProfileInfoComponent.propDecorators = {
    profile: [{ type: Input }],
    onValidate: [{ type: Output }],
    editable: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLWluZm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy91c2VyLXByb2ZpbGUvdXNlci1wcm9maWxlLWluZm8vdXNlci1wcm9maWxlLWluZm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQWUsTUFBTSxXQUFXLENBQUM7QUFDckQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsV0FBVyxFQUFhLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDckMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUM7QUFNOUMsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBa0JqQyxZQUFvQixpQkFBb0MsRUFDcEMsZUFBZ0MsRUFDaEMsRUFBZTtRQUZmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFuQjFCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBR2pDLGNBQVMsR0FBZSxFQUFFLENBQUM7UUFDM0IsY0FB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Qzs7SUFDMUMsNENBQTJCOzs7OztJQUMzQiwrQ0FBK0Q7Ozs7O0lBRW5ELHFEQUE0Qzs7Ozs7SUFDNUMsbURBQXdDOzs7OztJQUN4QyxzQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFcnJvck1lc3NhZ2UsIFJlc3BvbnNlRGF0YX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtDb250YWN0fSBmcm9tIFwiLi4vLi4vbW9kZWwvY29udGFjdFwiO1xuaW1wb3J0IHtMb2NhdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7U3ViamVjdH0gZnJvbSBcInJ4anMvU3ViamVjdFwiO1xuaW1wb3J0IHtDdXN0b21WYWxpZGF0b3JzfSBmcm9tIFwibmcyLXZhbGlkYXRpb25cIjtcbmltcG9ydCB7RGljdGlvbmFyeVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vZGljdGlvbmFyeS5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbndpbmRvd1snbW9tZW50J10gPSB3aW5kb3dbJ21vbWVudCddIHx8IG1vbWVudDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdXNlci1wcm9maWxlLWluZm8nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi91c2VyLXByb2ZpbGUtaW5mby5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlclByb2ZpbGVJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwcm9maWxlID0gbmV3IENvbnRhY3QoKTtcblxuICAgIHByb2ZpbGVGb3JtOiBGb3JtR3JvdXA7XG4gICAgY291bnRyaWVzOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJvdmluY2VzOiBBcnJheTxhbnk+ID0gW107XG4gICAgZGlzdHJpY3RzOiBBcnJheTxhbnk+ID0gW107XG4gICAgZ2VuZGVyczogQXJyYXk8YW55PiA9IFtcbiAgICAgICAge2NvZGU6IFwiTVwiLCBrZXk6IFwiQ09NTU9OLk1PRFVMRS5VU0VSX1BST0ZJTEUuTUFMRVwifSxcbiAgICAgICAge2NvZGU6IFwiRk1cIiwga2V5OiBcIkNPTU1PTi5NT0RVTEUuVVNFUl9QUk9GSUxFLkZFTUFMRVwifSxcbiAgICAgICAge2NvZGU6IFwiT1RcIiwga2V5OiBcIkNPTU1PTi5NT0RVTEUuVVNFUl9QUk9GSUxFLk9USEVSXCJ9XTtcblxuICAgIHByaXZhdGUgY291bnRyeUNvZGUgPSAnVk4nO1xuICAgIHByaXZhdGUgcHJvdmluY2VDb2RlOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIG9uVmFsaWRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQElucHV0KCkgZWRpdGFibGUgPSAgZmFsc2U7XG4gICAgcHJpdmF0ZSBmb3JtQ2hhbmdlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpY3Rpb25hcnlTZXJ2aWNlOiBEaWN0aW9uYXJ5U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxvY2F0aW9uU2VydmljZTogTG9jYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybUNoYW5nZWQuZGVib3VuY2VUaW1lKDI1MCkuZGlzdGluY3RVbnRpbENoYW5nZWQoKS5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsaWRhdGUuZW1pdCh2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9maWxlRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgbGFzdE5hbWU6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIG1pZGRsZU5hbWU6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGZpcnN0TmFtZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZW1haWw6IFtudWxsLCBWYWxpZGF0b3JzLmNvbXBvc2UoW0N1c3RvbVZhbGlkYXRvcnMuZW1haWxdKV0sXG4gICAgICAgICAgICBmdWxsRGF0ZU9mQmlydGg6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHNleDogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgcGhvbmU6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGNvdW50cnk6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHN0cmVldDogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZGlzdHJpY3Q6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHByb3ZpbmNlOiBbbnVsbCwgbnVsbF1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLm9uQ2hhbmdlcygpO1xuICAgICAgICB0aGlzLmxvYWRBZGRyZXNzKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICBwcml2YXRlIGxvYWREaWN0aW9uYXJ5KCkge1xuICAgICAgICB0aGlzLmRpY3Rpb25hcnlTZXJ2aWNlLmZpbmRCeUtleXMoJ1NFWCcpLnN1YnNjcmliZSgocmVzcG9uc2U6IFJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSByZXNwb25zZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qge2RhdGF9ID0gcmVzcG9uc2UuZGF0YS5pdGVtc3x8W107XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qge1NFWH0gPSBkYXRhO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2VuZGVycyA9IFNFWDtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmRlcnMgPSByZXNwb25zZS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgICovXG4gICAgLy9cbiAgICAvLyBwcml2YXRlIGxvYWRHZW5kZXIoKXtcbiAgICAvLyAgICAgdGhpcy5kaWN0aW9uYXJ5U2VydmljZS5nZXRTZXgoe30pLnN1YnNjcmliZSgocmVzcG9uc2U6IFJlc3BvbnNlRGF0YSkgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSByZXNwb25zZS50eXBlKSB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5nZW5kZXJzID0gcmVzcG9uc2UuaXRlbXMgfHwgW107XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxuICAgIHByaXZhdGUgbG9hZEFkZHJlc3MoKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLmxpc3RDb3VudHJ5KCkuc3Vic2NyaWJlKChkYXRhOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJpZXMgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGUuYWRkcmVzcy5jb3VudHJ5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRQcm92aW5jZUJ5Q291bnRyeUNvZGUodGhpcy5wcm9maWxlLmFkZHJlc3MuY291bnRyeUNvZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9maWxlLmFkZHJlc3MucHJvdmluY2VDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWREaXN0cmljdEJ5Q29kZSh0aGlzLnByb2ZpbGUuYWRkcmVzcy5jb3VudHJ5Q29kZSwgdGhpcy5wcm9maWxlLmFkZHJlc3MucHJvdmluY2VDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkUHJvdmluY2VCeUNvdW50cnlDb2RlKGNvdW50cnlDb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlO1xuICAgICAgICB0aGlzLnByb3ZpbmNlQ29kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzdHJpY3RzID0gW107XG4gICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLmdldFByb3ZpbmNlQnlDb3VudHJ5Q29kZShjb3VudHJ5Q29kZSkuc3Vic2NyaWJlKChkYXRhOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aW5jZXMgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREaXN0cmljdEJ5Q29kZShjb3VudHJ5Q29kZTogc3RyaW5nLCBwcm92aW5jZUNvZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnByb3ZpbmNlQ29kZSA9IHByb3ZpbmNlQ29kZTtcbiAgICAgICAgdGhpcy5sb2NhdGlvblNlcnZpY2UuZ2V0RGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGUsIHByb3ZpbmNlQ29kZSkuc3Vic2NyaWJlKChkYXRhOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0cmljdHMgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZUNvdW50cnkoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0JCA9ICRldmVudC50YXJnZXQ7XG4gICAgICAgIC8vY29uc3QgY291bnRyeUlkID0gdGFyZ2V0JC5vcHRpb25zW3RhcmdldCQuc2VsZWN0ZWRJbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLXV1aWQnKTtcbiAgICAgICAgdGhpcy5sb2FkUHJvdmluY2VCeUNvdW50cnlDb2RlKHRhcmdldCQudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlUHJvdmluY2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0JCA9ICRldmVudC50YXJnZXQ7XG4gICAgICAgIC8vIGNvbnN0IGNvdW50cnlJZCA9IHRhcmdldCQub3B0aW9uc1t0YXJnZXQkLnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS11dWlkJyk7XG4gICAgICAgIHRoaXMubG9hZERpc3RyaWN0QnlDb2RlKHRoaXMuY291bnRyeUNvZGUsIHRhcmdldCQudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRGF0ZShldmVudD86IGFueSkge1xuICAgICAgICBpZih3aW5kb3dbJ21vbWVudCddKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gd2luZG93Wydtb21lbnQnXShuZXcgRGF0ZShldmVudCkpO1xuICAgICAgICAgICAgaWYgKCghZGF0ZS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb2ZpbGUuZnVsbERhdGVPZkJpcnRoID0gbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcm9maWxlRm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1DaGFuZ2VkLm5leHQodGhpcy5wcm9maWxlRm9ybS52YWxpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMuZWRpdGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZUZvcm0uZW5hYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVGb3JtLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==