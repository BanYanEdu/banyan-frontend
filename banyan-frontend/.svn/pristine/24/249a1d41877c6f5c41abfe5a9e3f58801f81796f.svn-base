/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ErrorMessage } from 'inet-core';
import { Subject } from 'rxjs/Rx';
import { OrganizationService } from '../organization.service';
import { LocationService } from "../../common/location.service";
import { Organization } from "../../model/organization";
import { DictionaryService } from "../../common/dictionary.service";
var OrganizationGeneralInformationComponent = /** @class */ (function () {
    function OrganizationGeneralInformationComponent(location, orgService, fb, locationService, dictionaryService, translate) {
        this.location = location;
        this.orgService = orgService;
        this.fb = fb;
        this.locationService = locationService;
        this.dictionaryService = dictionaryService;
        this.translate = translate;
        this.orgInfo = new Organization();
        this.editable = false;
        this.langs = [];
        this.countries = [];
        this.provinces = [];
        this.districts = [];
        this.companySizeCodes = [];
        this.industries = [];
        this.countryCode = 'VN';
        this.onValidate = new EventEmitter();
        this.formChanged = new Subject();
    }
    /**
     * @return {?}
     */
    OrganizationGeneralInformationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.langs = this.translate.getLangs(); // Languages
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this.onValidate.emit(v);
        }));
        this.orgInfoForm = this.fb.group({
            name: [null, Validators.required],
            primaryEmail: [null, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')],
            address: [null, null],
            primaryPhone: [null, null],
            foreignName: [null, null],
            abbreviationName: [null, null],
            legalRepName: [null, null],
            taxCode: [null, Validators.required],
            industry: [null, null],
            website: [null, null],
            description: [null, null],
            companySize: [null, null],
            country: [null, null],
            street: [null, null],
            district: [null, null],
            province: [null, null]
        });
        this.orgInfoForm.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this.formChanged.next(_this.orgInfoForm.valid);
        }));
        this.loadAddress();
        // this.loadDictionary();
        this.setData(this.orgInfo);
    };
    /**
     * @param {?} org
     * @return {?}
     */
    OrganizationGeneralInformationComponent.prototype.setData = /**
     * @param {?} org
     * @return {?}
     */
    function (org) {
        /** @type {?} */
        var controls = this.orgInfoForm.controls;
        controls['name'].setValue(org.name);
        controls['foreignName'].setValue(org.foreignName);
        controls['abbreviationName'].setValue(org.abbreviationName);
        controls['industry'].setValue(org.industry);
        controls['legalRepName'].setValue(org.legalRepName);
        controls['companySize'].setValue(org.companySize);
        controls['taxCode'].setValue(org.taxCode);
        controls['address'].setValue(org.address);
        controls['primaryPhone'].setValue(org.primaryPhone);
        controls['primaryEmail'].setValue(org.primaryEmail);
        controls['website'].setValue(org.website);
        controls['description'].setValue(org.description);
        controls['street'].setValue(org.officeAddress.address);
        controls['country'].setValue(org.officeAddress.countryCode);
        controls['province'].setValue(org.officeAddress.provinceCode);
        controls['district'].setValue(org.officeAddress.districtCode);
        if (this.editable) {
            this.orgInfoForm.enable();
        }
        else {
            this.orgInfoForm.disable();
        }
    };
    /**
     * @return {?}
     */
    OrganizationGeneralInformationComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var controls = this.orgInfoForm.controls;
        /** @type {?} */
        var data = {
            name: controls['name'].value,
            foreignName: controls['foreignName'].value,
            abbreviationName: controls['abbreviationName'].value,
            industry: controls['industry'].value,
            legalRepName: controls['legalRepName'].value,
            companySize: controls['companySize'].value,
            taxCode: controls['taxCode'].value,
            address: controls['address'].value,
            primaryPhone: controls['primaryPhone'].value,
            primaryEmail: controls['primaryEmail'].value,
            website: controls['website'].value,
            description: controls['description'].value,
        };
        if (controls['street'].value) {
            this.orgInfo.officeAddress.address = controls['street'].value;
        }
        if (controls['country'].value) {
            this.orgInfo.officeAddress.countryCode = controls['country'].value;
        }
        if (controls['province'].value) {
            this.orgInfo.officeAddress.provinceCode = controls['province'].value;
        }
        if (controls['district'].value) {
            this.orgInfo.officeAddress.districtCode = controls['district'].value;
        }
        return tslib_1.__assign({}, this.orgInfo, data);
    };
    /*
    private loadDictionary () {
        this.dictionaryService.findByKeys('INDUSTRY;COMPANY_SIZE').subscribe((response: any) => {
            if (ErrorMessage.TYPE !== response.type) {
                //console.log('industry: ',response);
                const {data} = response;
                const {INDUSTRY, COMPANY_SIZE} = data;
                this.industries = INDUSTRY;
                this.companySizeCodes = COMPANY_SIZE;
            }
        });
    }

     */
    /*
        private loadDictionary () {
            this.dictionaryService.findByKeys('INDUSTRY;COMPANY_SIZE').subscribe((response: any) => {
                if (ErrorMessage.TYPE !== response.type) {
                    //console.log('industry: ',response);
                    const {data} = response;
                    const {INDUSTRY, COMPANY_SIZE} = data;
                    this.industries = INDUSTRY;
                    this.companySizeCodes = COMPANY_SIZE;
                }
            });
        }
    
         */
    /**
     * @private
     * @return {?}
     */
    OrganizationGeneralInformationComponent.prototype.loadAddress = /*
        private loadDictionary () {
            this.dictionaryService.findByKeys('INDUSTRY;COMPANY_SIZE').subscribe((response: any) => {
                if (ErrorMessage.TYPE !== response.type) {
                    //console.log('industry: ',response);
                    const {data} = response;
                    const {INDUSTRY, COMPANY_SIZE} = data;
                    this.industries = INDUSTRY;
                    this.companySizeCodes = COMPANY_SIZE;
                }
            });
        }
    
         */
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
                if (_this.orgInfo.officeAddress.countryCode) {
                    _this.loadProvinceByCountryCode(_this.orgInfo.officeAddress.countryCode);
                    if (_this.orgInfo.officeAddress.provinceCode) {
                        _this.loadDistrictByCode(_this.orgInfo.officeAddress.countryCode, _this.orgInfo.officeAddress.provinceCode);
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
    OrganizationGeneralInformationComponent.prototype.loadProvinceByCountryCode = /**
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
    OrganizationGeneralInformationComponent.prototype.loadDistrictByCode = /**
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
    OrganizationGeneralInformationComponent.prototype.onChangeCountry = /**
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
    OrganizationGeneralInformationComponent.prototype.onChangeProvince = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var target$ = $event.target;
        // const countryId = target$.options[target$.selectedIndex].getAttribute('data-uuid');
        this.loadDistrictByCode(this.countryCode, target$.value);
    };
    OrganizationGeneralInformationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-organization-general-information',
                    template: "<form [formGroup]=\"orgInfoForm\">\n    <div class=\"row mt-3\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.NAME' | translate}} <i class=\"required\"></i> :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['name']\" name=\"name\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['name'].hasError('required') && orgInfoForm.controls['name'].touched}\"\n                           type=\"text\" maxlength=\"256\" required/>\n                    <div *ngIf=\"orgInfoForm.controls['name'].hasError('required') && orgInfoForm.controls['name'].touched\"\n                         class=\"text-danger\"><i class=\"fa fa-exclamation-triangle\"></i>\n                        {{'COMMON.MODULE.ORGANIZATION.NAME_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.FOREIGN_NAME' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['foreignName']\" name=\"foreignName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"256\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.ABBREVIATION_NAME' | translate}} :</label>\n                <div class=\"col-sm-3\">\n                    <input [formControl]=\"orgInfoForm.controls['abbreviationName']\" name=\"abbreviationName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                </div>\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.INDUSTRY' | translate}} :</label>\n                <div class=\"col-sm-4\">\n                    <input [formControl]=\"orgInfoForm.controls['industry']\" name=\"industry\"\n                           name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"/>\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.LEGAL_REPRESENTATIVE' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['legalRepName']\"  name=\"legalRepName\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.COMPANY_SIZE' | translate}} :</label>\n                <div class=\"col-sm-3\">\n                    <input [formControl]=\"orgInfoForm.controls['companySize']\" name=\"companySize\"\n                            name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"/>\n                </div>\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.TAX_CODE' | translate}}  <i class=\"required\"></i>:</label>\n                <div class=\"col-sm-4\">\n                    <input [formControl]=\"orgInfoForm.controls['taxCode']\" name=\"taxCode\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['taxCode'].hasError('required') && orgInfoForm.controls['taxCode'].touched}\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"128\"/>\n                    <div *ngIf=\"orgInfoForm.controls['taxCode'].hasError('required') && orgInfoForm.controls['taxCode'].touched\"\n                         class=\"text-danger\"><i class=\"fa fa-exclamation-triangle\"></i>\n                        {{'COMMON.MODULE.ORGANIZATION.TAXCODE_REQUIRED_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.BILLING_ADDRESS' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['address']\" name=\"address\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                           autocomplete=\"off\" type=\"text\" maxlength=\"1024\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.STREET' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input name=\"street\" [formControl]=\"orgInfoForm.controls['street']\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           type=\"text\" maxlength=\"1024\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.COUNTRY' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['country']\" name=\"country\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                            (change)=\"onChangeCountry($event)\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.countryCode ? orgInfo.officeAddress.countryCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let country of countries\" [value]=\"country['code']\" [attr.data-uuid]=\"country.uuid\">{{country.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.CITY' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['province']\" name=\"province\" class=\"form-control form-control-sm col-xs-12 col-sm-12\"\n                            (change)=\"onChangeProvince($event)\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.provinceCode ? orgInfo.officeAddress.provinceCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let province of provinces\" [value]=\"province['code']\" [attr.data-uuid]=\"province.uuid\">{{province.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ADDRESS.DISTRICT' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <select [formControl]=\"orgInfoForm.controls['district']\" name=\"district\" class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                        <option [ngValue]=\"!orgInfo.officeAddress.districtCode ? orgInfo.officeAddress.districtCode : null\">{{'COMMON.SELECTION.DEFAULT_VALUE' | translate}}</option>\n                        <option *ngFor=\"let district of districts\" [value]=\"district['code']\">{{district.name}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.PHONE' | translate}} :</label>\n                <div class=\"col-sm-3 input-group\">\n                    <div class=\"input-group-prepend\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-phone\"></i></div>\n                    </div>\n                    <input style=\"height: 100%;\" [formControl]=\"orgInfoForm.controls['primaryPhone']\" name=\"primaryPhone\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           type=\"text\" maxlength=\"64\"/>\n                </div>\n\n\n                <label class=\"control-label col-form-label col-sm-2 font-weight-bold\">\n                    {{'COMMON.MODULE.ORGANIZATION.EMAIL' | translate}} :</label>\n                <div class=\"col-sm-4 input-group\">\n                    <div class=\"input-group-prepend\">\n                        <div class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></div>\n                    </div>\n                    <input style=\"height: 100%;\" [formControl]=\"orgInfoForm.controls['primaryEmail']\" name=\"primaryEmail\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\"\n                           [ngClass]=\"{'is-invalid':orgInfoForm.controls['primaryEmail'].hasError('pattern') && orgInfoForm.controls['primaryEmail'].touched}\"\n                           type=\"email\" maxlength=\"64\"/>\n                    <div *ngIf=\"orgInfoForm.controls['primaryEmail'].hasError('pattern') && orgInfoForm.controls['primaryEmail'].touched\"\n                         class=\"pl-0 ml-0 col-xs-12 col-sm-12 text-danger\">\n                        <i class=\"fa fa-exclamation-triangle\"></i> {{'COMMON.MODULE.ORGANIZATION.EMAIL_INVALID_MSG' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.WEBSITE' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <input [formControl]=\"orgInfoForm.controls['website']\" name=\"website\"\n                           class=\"form-control form-control-sm col-xs-12 col-sm-12\" autocomplete=\"off\" type=\"text\" maxlength=\"64\"/>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group margin-b-form-group row\">\n                <label class=\"control-label col-form-label col-sm-3 font-weight-bold\">{{'COMMON.MODULE.ORGANIZATION.DESCRIPTION' | translate}} :</label>\n                <div class=\"col-sm-9\">\n                    <textarea [formControl]=\"orgInfoForm.controls['description']\" name=\"description\" style=\"resize: none\" rows=\"2\"\n                              class=\"form-control form-control-sm col-xs-12 col-sm-12\"></textarea>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n"
                }] }
    ];
    /** @nocollapse */
    OrganizationGeneralInformationComponent.ctorParameters = function () { return [
        { type: Location },
        { type: OrganizationService },
        { type: FormBuilder },
        { type: LocationService },
        { type: DictionaryService },
        { type: TranslateService }
    ]; };
    OrganizationGeneralInformationComponent.propDecorators = {
        orgInfo: [{ type: Input }],
        editable: [{ type: Input }],
        onValidate: [{ type: Output }]
    };
    return OrganizationGeneralInformationComponent;
}());
export { OrganizationGeneralInformationComponent };
if (false) {
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.orgInfo;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.editable;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.orgInfoForm;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.link;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.langs;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.countries;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.provinces;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.districts;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.companySizeCodes;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.industries;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.countryCode;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.provinceCode;
    /** @type {?} */
    OrganizationGeneralInformationComponent.prototype.onValidate;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.formChanged;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.locationService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.dictionaryService;
    /**
     * @type {?}
     * @private
     */
    OrganizationGeneralInformationComponent.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9vcmdhbml6YXRpb24vb3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24vb3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsV0FBVyxFQUFhLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFlLE1BQU0sV0FBVyxDQUFDO0FBQ3JELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRTtJQXVCSSxpREFBb0IsUUFBa0IsRUFDbEIsVUFBK0IsRUFDL0IsRUFBZSxFQUNmLGVBQWdDLEVBQ2hDLGlCQUFvQyxFQUNwQyxTQUEyQjtRQUwzQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQXFCO1FBQy9CLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMs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LHFEQUF1Qjs7Ozs7SUFDdkIsa0VBQXdDOzs7OztJQUN4QyxvRUFBNEM7Ozs7O0lBQzVDLDREQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Vycm9yTWVzc2FnZSwgUmVzcG9uc2VEYXRhfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7T3JnYW5pemF0aW9uU2VydmljZX0gZnJvbSAnLi4vb3JnYW5pemF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtMb2NhdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHtPcmdhbml6YXRpb259IGZyb20gXCIuLi8uLi9tb2RlbC9vcmdhbml6YXRpb25cIjtcbmltcG9ydCB7RGljdGlvbmFyeVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vZGljdGlvbmFyeS5zZXJ2aWNlXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1vcmdhbml6YXRpb24tZ2VuZXJhbC1pbmZvcm1hdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29yZ2FuaXphdGlvbi1nZW5lcmFsLWluZm9ybWF0aW9uLmNvbXBvbmVudC5odG1sJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25HZW5lcmFsSW5mb3JtYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIG9yZ0luZm86IE9yZ2FuaXphdGlvbiA9IG5ldyBPcmdhbml6YXRpb24oKTtcbiAgICBASW5wdXQoKSBlZGl0YWJsZSA9ICBmYWxzZTtcbiAgICBvcmdJbmZvRm9ybTogRm9ybUdyb3VwO1xuICAgIGxpbms6IHN0cmluZztcbiAgICBsYW5nczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGNvdW50cmllczogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByb3ZpbmNlczogQXJyYXk8YW55PiA9IFtdO1xuICAgIGRpc3RyaWN0czogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgY29tcGFueVNpemVDb2RlczogQXJyYXk8YW55PiA9IFtdO1xuICAgIGluZHVzdHJpZXM6IEFycmF5PGFueT4gPSBbXTtcblxuICAgIHByaXZhdGUgY291bnRyeUNvZGUgPSAnVk4nO1xuICAgIHByaXZhdGUgcHJvdmluY2VDb2RlOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIG9uVmFsaWRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgcHJpdmF0ZSBmb3JtQ2hhbmdlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG9yZ1NlcnZpY2U6IE9yZ2FuaXphdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsb2NhdGlvblNlcnZpY2U6IExvY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRpY3Rpb25hcnlTZXJ2aWNlOiBEaWN0aW9uYXJ5U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxhbmdzID0gdGhpcy50cmFuc2xhdGUuZ2V0TGFuZ3MoKTsgLy8gTGFuZ3VhZ2VzXG5cbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlZC5kZWJvdW5jZVRpbWUoMjUwKS5kaXN0aW5jdFVudGlsQ2hhbmdlZCgpLnN1YnNjcmliZSh2ID0+IHtcbiAgICAgICAgICAgIHRoaXMub25WYWxpZGF0ZS5lbWl0KHYpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9yZ0luZm9Gb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBuYW1lOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwcmltYXJ5RW1haWw6IFtudWxsLCBWYWxpZGF0b3JzLnBhdHRlcm4oJ15cXFxcdysoW1xcXFwuLV0/XFxcXHcrKSpAXFxcXHcrKFtcXFxcLi1dP1xcXFx3KykqKFxcXFwuXFxcXHd7MiwzfSkrJCcpXSxcbiAgICAgICAgICAgIGFkZHJlc3M6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHByaW1hcnlQaG9uZTogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZm9yZWlnbk5hbWU6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGFiYnJldmlhdGlvbk5hbWU6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGxlZ2FsUmVwTmFtZTogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgdGF4Q29kZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgaW5kdXN0cnk6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHdlYnNpdGU6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBjb21wYW55U2l6ZTogIFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGNvdW50cnk6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHN0cmVldDogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZGlzdHJpY3Q6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIHByb3ZpbmNlOiBbbnVsbCwgbnVsbF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcmdJbmZvRm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2OiBPcmdhbml6YXRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNoYW5nZWQubmV4dCh0aGlzLm9yZ0luZm9Gb3JtLnZhbGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkQWRkcmVzcygpO1xuICAgICAgICAvLyB0aGlzLmxvYWREaWN0aW9uYXJ5KCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLm9yZ0luZm8pO1xuICAgIH1cblxuICAgICBzZXREYXRhKG9yZzogT3JnYW5pemF0aW9uKXtcbiAgICAgICAgY29uc3QgY29udHJvbHMgPSB0aGlzLm9yZ0luZm9Gb3JtLmNvbnRyb2xzO1xuICAgICAgICBjb250cm9sc1snbmFtZSddLnNldFZhbHVlKG9yZy5uYW1lKTtcbiAgICAgICAgY29udHJvbHNbJ2ZvcmVpZ25OYW1lJ10uc2V0VmFsdWUob3JnLmZvcmVpZ25OYW1lKTtcbiAgICAgICAgY29udHJvbHNbJ2FiYnJldmlhdGlvbk5hbWUnXS5zZXRWYWx1ZShvcmcuYWJicmV2aWF0aW9uTmFtZSk7XG4gICAgICAgIGNvbnRyb2xzWydpbmR1c3RyeSddLnNldFZhbHVlKG9yZy5pbmR1c3RyeSk7XG4gICAgICAgIGNvbnRyb2xzWydsZWdhbFJlcE5hbWUnXS5zZXRWYWx1ZShvcmcubGVnYWxSZXBOYW1lKTtcbiAgICAgICAgY29udHJvbHNbJ2NvbXBhbnlTaXplJ10uc2V0VmFsdWUob3JnLmNvbXBhbnlTaXplKTtcbiAgICAgICAgY29udHJvbHNbJ3RheENvZGUnXS5zZXRWYWx1ZShvcmcudGF4Q29kZSk7XG4gICAgICAgIGNvbnRyb2xzWydhZGRyZXNzJ10uc2V0VmFsdWUob3JnLmFkZHJlc3MpO1xuICAgICAgICBjb250cm9sc1sncHJpbWFyeVBob25lJ10uc2V0VmFsdWUob3JnLnByaW1hcnlQaG9uZSk7XG4gICAgICAgIGNvbnRyb2xzWydwcmltYXJ5RW1haWwnXS5zZXRWYWx1ZShvcmcucHJpbWFyeUVtYWlsKTtcbiAgICAgICAgY29udHJvbHNbJ3dlYnNpdGUnXS5zZXRWYWx1ZShvcmcud2Vic2l0ZSk7XG4gICAgICAgIGNvbnRyb2xzWydkZXNjcmlwdGlvbiddLnNldFZhbHVlKG9yZy5kZXNjcmlwdGlvbik7XG5cbiAgICAgICAgY29udHJvbHNbJ3N0cmVldCddLnNldFZhbHVlKG9yZy5vZmZpY2VBZGRyZXNzLmFkZHJlc3MpO1xuICAgICAgICBjb250cm9sc1snY291bnRyeSddLnNldFZhbHVlKG9yZy5vZmZpY2VBZGRyZXNzLmNvdW50cnlDb2RlKTtcbiAgICAgICAgY29udHJvbHNbJ3Byb3ZpbmNlJ10uc2V0VmFsdWUob3JnLm9mZmljZUFkZHJlc3MucHJvdmluY2VDb2RlKTtcbiAgICAgICAgY29udHJvbHNbJ2Rpc3RyaWN0J10uc2V0VmFsdWUob3JnLm9mZmljZUFkZHJlc3MuZGlzdHJpY3RDb2RlKTtcblxuICAgICAgICBpZih0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9yZ0luZm9Gb3JtLmVuYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcmdJbmZvRm9ybS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREYXRhKCk6IE9yZ2FuaXphdGlvbiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzID0gdGhpcy5vcmdJbmZvRm9ybS5jb250cm9scztcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGNvbnRyb2xzWyduYW1lJ10udmFsdWUsXG4gICAgICAgICAgICBmb3JlaWduTmFtZTogY29udHJvbHNbJ2ZvcmVpZ25OYW1lJ10udmFsdWUsXG4gICAgICAgICAgICBhYmJyZXZpYXRpb25OYW1lOiBjb250cm9sc1snYWJicmV2aWF0aW9uTmFtZSddLnZhbHVlLFxuICAgICAgICAgICAgaW5kdXN0cnk6Y29udHJvbHNbJ2luZHVzdHJ5J10udmFsdWUsXG4gICAgICAgICAgICBsZWdhbFJlcE5hbWU6IGNvbnRyb2xzWydsZWdhbFJlcE5hbWUnXS52YWx1ZSxcbiAgICAgICAgICAgIGNvbXBhbnlTaXplOiBjb250cm9sc1snY29tcGFueVNpemUnXS52YWx1ZSxcbiAgICAgICAgICAgIHRheENvZGU6ICBjb250cm9sc1sndGF4Q29kZSddLnZhbHVlLFxuICAgICAgICAgICAgYWRkcmVzczogY29udHJvbHNbJ2FkZHJlc3MnXS52YWx1ZSxcbiAgICAgICAgICAgIHByaW1hcnlQaG9uZTogY29udHJvbHNbJ3ByaW1hcnlQaG9uZSddLnZhbHVlLFxuICAgICAgICAgICAgcHJpbWFyeUVtYWlsOiBjb250cm9sc1sncHJpbWFyeUVtYWlsJ10udmFsdWUsXG4gICAgICAgICAgICB3ZWJzaXRlOiBjb250cm9sc1snd2Vic2l0ZSddLnZhbHVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGNvbnRyb2xzWydkZXNjcmlwdGlvbiddLnZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICBpZihjb250cm9sc1snc3RyZWV0J10udmFsdWUpe1xuICAgICAgICAgICAgdGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MuYWRkcmVzcyA9ICBjb250cm9sc1snc3RyZWV0J10udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udHJvbHNbJ2NvdW50cnknXS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MuY291bnRyeUNvZGUgPSBjb250cm9sc1snY291bnRyeSddLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbnRyb2xzWydwcm92aW5jZSddLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLm9yZ0luZm8ub2ZmaWNlQWRkcmVzcy5wcm92aW5jZUNvZGUgPSBjb250cm9sc1sncHJvdmluY2UnXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihjb250cm9sc1snZGlzdHJpY3QnXS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MuZGlzdHJpY3RDb2RlID0gY29udHJvbHNbJ2Rpc3RyaWN0J10udmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gey4uLnRoaXMub3JnSW5mbywgLi4uZGF0YX07XG4gICAgfVxuICAgIC8qXG4gICAgcHJpdmF0ZSBsb2FkRGljdGlvbmFyeSAoKSB7XG4gICAgICAgIHRoaXMuZGljdGlvbmFyeVNlcnZpY2UuZmluZEJ5S2V5cygnSU5EVVNUUlk7Q09NUEFOWV9TSVpFJykuc3Vic2NyaWJlKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IHJlc3BvbnNlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdpbmR1c3RyeTogJyxyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc3Qge2RhdGF9ID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgY29uc3Qge0lORFVTVFJZLCBDT01QQU5ZX1NJWkV9ID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZHVzdHJpZXMgPSBJTkRVU1RSWTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhbnlTaXplQ29kZXMgPSBDT01QQU5ZX1NJWkU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICAqL1xuXG4gICAgcHJpdmF0ZSBsb2FkQWRkcmVzcygpIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvblNlcnZpY2UubGlzdENvdW50cnkoKS5zdWJzY3JpYmUoKGRhdGE6IFJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50cmllcyA9IGRhdGEuaXRlbXMgfHwgW107XG4gICAgICAgICAgICAgICAgaWYodGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MuY291bnRyeUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkUHJvdmluY2VCeUNvdW50cnlDb2RlKHRoaXMub3JnSW5mby5vZmZpY2VBZGRyZXNzLmNvdW50cnlDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MucHJvdmluY2VDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWREaXN0cmljdEJ5Q29kZSh0aGlzLm9yZ0luZm8ub2ZmaWNlQWRkcmVzcy5jb3VudHJ5Q29kZSwgdGhpcy5vcmdJbmZvLm9mZmljZUFkZHJlc3MucHJvdmluY2VDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkUHJvdmluY2VCeUNvdW50cnlDb2RlKGNvdW50cnlDb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlO1xuICAgICAgICB0aGlzLnByb3ZpbmNlQ29kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzdHJpY3RzID0gW107XG4gICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLmdldFByb3ZpbmNlQnlDb3VudHJ5Q29kZShjb3VudHJ5Q29kZSkuc3Vic2NyaWJlKChkYXRhOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aW5jZXMgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREaXN0cmljdEJ5Q29kZShjb3VudHJ5Q29kZTogc3RyaW5nLCBwcm92aW5jZUNvZGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnByb3ZpbmNlQ29kZSA9IHByb3ZpbmNlQ29kZTtcbiAgICAgICAgdGhpcy5sb2NhdGlvblNlcnZpY2UuZ2V0RGlzdHJpY3RCeUNvZGUoY291bnRyeUNvZGUsIHByb3ZpbmNlQ29kZSkuc3Vic2NyaWJlKChkYXRhOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChFcnJvck1lc3NhZ2UuVFlQRSAhPT0gZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0cmljdHMgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZUNvdW50cnkoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0JCA9ICRldmVudC50YXJnZXQ7XG4gICAgICAgIC8vY29uc3QgY291bnRyeUlkID0gdGFyZ2V0JC5vcHRpb25zW3RhcmdldCQuc2VsZWN0ZWRJbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLXV1aWQnKTtcbiAgICAgICAgdGhpcy5sb2FkUHJvdmluY2VCeUNvdW50cnlDb2RlKHRhcmdldCQudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlUHJvdmluY2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0JCA9ICRldmVudC50YXJnZXQ7XG4gICAgICAgIC8vIGNvbnN0IGNvdW50cnlJZCA9IHRhcmdldCQub3B0aW9uc1t0YXJnZXQkLnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS11dWlkJyk7XG4gICAgICAgIHRoaXMubG9hZERpc3RyaWN0QnlDb2RlKHRoaXMuY291bnRyeUNvZGUsIHRhcmdldCQudmFsdWUpO1xuICAgIH1cblxufVxuIl19